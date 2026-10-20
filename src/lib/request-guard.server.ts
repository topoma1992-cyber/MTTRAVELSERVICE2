import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import type { Sql } from "@/lib/db";

const MIN_MS = 5_000;
const MAX_MS = 2 * 60 * 60 * 1000;
const IP_SHORT = 3;
const IP_SHORT_MS = 10 * 60 * 1000;
const IP_DAY = 8;
const MAIL_DAY = 4;
const GLOBAL_HOUR = 30;
const DAY_MS = 24 * 60 * 60 * 1000;
const HOUR_MS = 60 * 60 * 1000;

const DISPOSABLE = new Set([
  "mailinator.com",
  "guerrillamail.com",
  "guerrillamail.org",
  "10minutemail.com",
  "tempmail.com",
  "temp-mail.org",
  "yopmail.com",
  "trashmail.com",
  "getnada.com",
  "dispostable.com",
  "sharklasers.com",
]);

function since(ms: number) {
  return new Date(Date.now() - ms).toISOString();
}

async function secret(sql: Sql) {
  const rows = await sql<{ value: string }>`select value from app_secrets where name = 'booking_guard'`;
  if (rows[0]?.value) return rows[0].value;
  const value = randomBytes(32).toString("base64url");
  await sql`
    insert into app_secrets (name, value)
    values ('booking_guard', ${value})
    on conflict (name) do nothing
  `;
  const saved = await sql<{ value: string }>`select value from app_secrets where name = 'booking_guard'`;
  return saved[0]?.value || value;
}

function sign(key: string, issued: number) {
  return createHmac("sha256", key).update(String(issued)).digest("base64url");
}

export async function issueGuardToken(sql: Sql) {
  const key = await secret(sql);
  const issued = Date.now();
  return `${issued}.${sign(key, issued)}`;
}

async function guardOk(sql: Sql, token: string) {
  const key = await secret(sql);
  const [issuedRaw, sig] = token.split(".");
  const issued = Number(issuedRaw);
  if (!Number.isFinite(issued) || !sig) return "reload" as const;
  const expected = sign(key, issued);
  const left = Buffer.from(sig);
  const right = Buffer.from(expected);
  if (left.length !== right.length || !timingSafeEqual(left, right)) return "reload" as const;
  const age = Date.now() - issued;
  if (age < MIN_MS) return "fast" as const;
  if (age > MAX_MS) return "reload" as const;
  return "ok" as const;
}

async function hits(sql: Sql, bucket: string, from: string) {
  const rows = await sql<{ n: number | string }>`
    select count(*)::int as n from request_hits
    where bucket = ${bucket} and created_at > ${from}
  `;
  return Number(rows[0]?.n ?? 0);
}

async function mark(sql: Sql, bucket: string) {
  await sql`insert into request_hits (bucket) values (${bucket})`;
}

async function prune(sql: Sql) {
  await sql`delete from request_hits where created_at < ${since(2 * DAY_MS)}`;
}

export async function clientIp() {
  try {
    const { getRequest } = await import("@tanstack/react-start/server");
    const req = getRequest();
    const forwarded = req.headers.get("x-forwarded-for") ?? "";
    const raw = (forwarded.split(",")[0] ?? "").trim() || (req.headers.get("x-real-ip") ?? "").trim();
    const ip = raw.replace(/[^0-9a-fA-F:.]/g, "").slice(0, 64);
    return ip || "unknown";
  } catch {
    return "unknown";
  }
}

export function rejectDisposable(email: string) {
  const domain = email.split("@")[1] ?? "";
  if (DISPOSABLE.has(domain)) throw new Error("Usa un indirizzo email reale, non temporaneo.");
}

/** Blocca raffiche e mail verso indirizzi di terzi. Da chiamare prima di salvare. */
export async function assertNewRequest(sql: Sql, input: { guard: string; honeypot: string; email: string }) {
  if (input.honeypot.trim()) throw new Error("Richiesta non inviata.");
  rejectDisposable(input.email);
  const gate = await guardOk(sql, input.guard);
  if (gate === "fast") throw new Error("Richiesta troppo veloce. Attendi un attimo e riprova.");
  if (gate === "reload") throw new Error("Richiesta scaduta. Ricarica la pagina e riprova.");

  await prune(sql);
  const ip = await clientIp();
  const mail = input.email.trim().toLowerCase();
  if (ip !== "unknown") {
    if ((await hits(sql, `ip:${ip}`, since(IP_SHORT_MS))) >= IP_SHORT) {
      throw new Error("Troppe richieste da questa connessione. Riprova tra qualche minuto.");
    }
    if ((await hits(sql, `ip:${ip}`, since(DAY_MS))) >= IP_DAY) {
      throw new Error("Troppe richieste da questa connessione. Riprova domani.");
    }
  }
  if ((await hits(sql, `mail:${mail}`, since(DAY_MS))) >= MAIL_DAY) {
    throw new Error("Troppe richieste per questa email. Riprova domani.");
  }
  if ((await hits(sql, "global", since(HOUR_MS))) >= GLOBAL_HOUR) {
    throw new Error("In questo momento arrivano troppe richieste. Riprova tra poco.");
  }

  if (ip !== "unknown") await mark(sql, `ip:${ip}`);
  await mark(sql, `mail:${mail}`);
  await mark(sql, "global");
}

/** Prima di una modifica dal link del cliente. Limita mail e cambi di indirizzo. */
export async function assertPublicEdit(
  sql: Sql,
  input: { token: string; email: string; previousEmail: string },
) {
  rejectDisposable(input.email);
  await prune(sql);
  const ip = await clientIp();
  const mail = input.email.trim().toLowerCase();
  const previous = input.previousEmail.trim().toLowerCase();
  if (ip !== "unknown" && (await hits(sql, `ip-edit:${ip}`, since(HOUR_MS))) >= 10) {
    throw new Error("Troppe modifiche da questa connessione. Riprova più tardi.");
  }
  if ((await hits(sql, `edit:${input.token}`, since(DAY_MS))) >= 6) {
    throw new Error("Troppe modifiche a questa richiesta. Riprova domani.");
  }
  if ((await hits(sql, `mail:${mail}`, since(DAY_MS))) >= MAIL_DAY) {
    throw new Error("Troppe mail verso questo indirizzo. Riprova domani.");
  }
  if (mail !== previous && (await hits(sql, `editmail:${input.token}`, since(DAY_MS))) >= 1) {
    throw new Error("L'email si può correggere una sola volta.");
  }
  if (ip !== "unknown") await mark(sql, `ip-edit:${ip}`);
  await mark(sql, `edit:${input.token}`);
  await mark(sql, `mail:${mail}`);
  if (mail !== previous) await mark(sql, `editmail:${input.token}`);
}
