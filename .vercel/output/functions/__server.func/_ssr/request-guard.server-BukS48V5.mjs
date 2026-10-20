import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/request-guard.server-BukS48V5.js
var MIN_MS = 5e3;
var MAX_MS = 72e5;
var IP_SHORT = 3;
var IP_SHORT_MS = 6e5;
var IP_DAY = 8;
var MAIL_DAY = 4;
var GLOBAL_HOUR = 30;
var DAY_MS = 864e5;
var HOUR_MS = 36e5;
var DISPOSABLE = /* @__PURE__ */ new Set([
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
	"sharklasers.com"
]);
function since(ms) {
	return new Date(Date.now() - ms).toISOString();
}
async function secret(sql) {
	const rows = await sql`select value from app_secrets where name = 'booking_guard'`;
	if (rows[0]?.value) return rows[0].value;
	const value = randomBytes(32).toString("base64url");
	await sql`
    insert into app_secrets (name, value)
    values ('booking_guard', ${value})
    on conflict (name) do nothing
  `;
	return (await sql`select value from app_secrets where name = 'booking_guard'`)[0]?.value || value;
}
function sign(key, issued) {
	return createHmac("sha256", key).update(String(issued)).digest("base64url");
}
async function issueGuardToken(sql) {
	const key = await secret(sql);
	const issued = Date.now();
	return `${issued}.${sign(key, issued)}`;
}
async function guardOk(sql, token) {
	const key = await secret(sql);
	const [issuedRaw, sig] = token.split(".");
	const issued = Number(issuedRaw);
	if (!Number.isFinite(issued) || !sig) return "reload";
	const expected = sign(key, issued);
	const left = Buffer.from(sig);
	const right = Buffer.from(expected);
	if (left.length !== right.length || !timingSafeEqual(left, right)) return "reload";
	const age = Date.now() - issued;
	if (age < MIN_MS) return "fast";
	if (age > MAX_MS) return "reload";
	return "ok";
}
async function hits(sql, bucket, from) {
	const rows = await sql`
    select count(*)::int as n from request_hits
    where bucket = ${bucket} and created_at > ${from}
  `;
	return Number(rows[0]?.n ?? 0);
}
async function mark(sql, bucket) {
	await sql`insert into request_hits (bucket) values (${bucket})`;
}
async function prune(sql) {
	await sql`delete from request_hits where created_at < ${since(2 * DAY_MS)}`;
}
async function clientIp() {
	try {
		const { getRequest } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
		const req = getRequest();
		return (((req.headers.get("x-forwarded-for") ?? "").split(",")[0] ?? "").trim() || (req.headers.get("x-real-ip") ?? "").trim()).replace(/[^0-9a-fA-F:.]/g, "").slice(0, 64) || "unknown";
	} catch {
		return "unknown";
	}
}
function rejectDisposable(email) {
	const domain = email.split("@")[1] ?? "";
	if (DISPOSABLE.has(domain)) throw new Error("Usa un indirizzo email reale, non temporaneo.");
}
/** Blocca raffiche e mail verso indirizzi di terzi. Da chiamare prima di salvare. */
async function assertNewRequest(sql, input) {
	if (input.honeypot.trim()) throw new Error("Richiesta non inviata.");
	rejectDisposable(input.email);
	const gate = await guardOk(sql, input.guard);
	if (gate === "fast") throw new Error("Richiesta troppo veloce. Attendi un attimo e riprova.");
	if (gate === "reload") throw new Error("Richiesta scaduta. Ricarica la pagina e riprova.");
	await prune(sql);
	const ip = await clientIp();
	const mail = input.email.trim().toLowerCase();
	if (ip !== "unknown") {
		if (await hits(sql, `ip:${ip}`, since(IP_SHORT_MS)) >= IP_SHORT) throw new Error("Troppe richieste da questa connessione. Riprova tra qualche minuto.");
		if (await hits(sql, `ip:${ip}`, since(DAY_MS)) >= IP_DAY) throw new Error("Troppe richieste da questa connessione. Riprova domani.");
	}
	if (await hits(sql, `mail:${mail}`, since(DAY_MS)) >= MAIL_DAY) throw new Error("Troppe richieste per questa email. Riprova domani.");
	if (await hits(sql, "global", since(HOUR_MS)) >= GLOBAL_HOUR) throw new Error("In questo momento arrivano troppe richieste. Riprova tra poco.");
	if (ip !== "unknown") await mark(sql, `ip:${ip}`);
	await mark(sql, `mail:${mail}`);
	await mark(sql, "global");
}
/** Prima di una modifica dal link del cliente. Limita mail e cambi di indirizzo. */
async function assertPublicEdit(sql, input) {
	rejectDisposable(input.email);
	await prune(sql);
	const ip = await clientIp();
	const mail = input.email.trim().toLowerCase();
	const previous = input.previousEmail.trim().toLowerCase();
	if (ip !== "unknown" && await hits(sql, `ip-edit:${ip}`, since(HOUR_MS)) >= 10) throw new Error("Troppe modifiche da questa connessione. Riprova più tardi.");
	if (await hits(sql, `edit:${input.token}`, since(DAY_MS)) >= 6) throw new Error("Troppe modifiche a questa richiesta. Riprova domani.");
	if (await hits(sql, `mail:${mail}`, since(DAY_MS)) >= MAIL_DAY) throw new Error("Troppe mail verso questo indirizzo. Riprova domani.");
	if (mail !== previous && await hits(sql, `editmail:${input.token}`, since(DAY_MS)) >= 1) throw new Error("L'email si può correggere una sola volta.");
	if (ip !== "unknown") await mark(sql, `ip-edit:${ip}`);
	await mark(sql, `edit:${input.token}`);
	await mark(sql, `mail:${mail}`);
	if (mail !== previous) await mark(sql, `editmail:${input.token}`);
}
//#endregion
export { assertNewRequest, assertPublicEdit, issueGuardToken };
