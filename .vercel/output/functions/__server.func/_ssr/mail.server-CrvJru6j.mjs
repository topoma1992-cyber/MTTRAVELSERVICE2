import { B as tripFleet, F as priceMarked, M as paymentLabel, a as REMOTE_NOTICE, h as customerPrice, t as BANK, w as formatWhen, x as fleetLabel } from "./bookings-Bp6VBimL.mjs";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/mail.server-CrvJru6j.js
var FROM_NAME = "MT TRAVEL SERVICE";
function publicHost(value) {
	const host = String(value ?? "").split(",")[0].trim().replace(/^https?:\/\//, "").split("/")[0].split(":")[0].toLowerCase();
	if (!host || !host.includes(".") || !/^[a-z0-9.-]+$/.test(host)) return "";
	if (/^\d{1,3}(?:\.\d{1,3}){3}$/.test(host)) return "";
	if (host === "vercel.app" || host.endsWith(".vercel.app") || host === "vercel.com" || host.endsWith(".vercel.com")) return "";
	return host;
}
function originFrom(value) {
	const raw = String(value ?? "").trim();
	if (!raw) return "";
	try {
		const url = raw.includes("://") ? new URL(raw) : new URL(`https://${raw}`);
		if (!publicHost(url.hostname)) return "";
		const proto = url.protocol === "http:" ? "http" : "https";
		const port = url.port && url.port !== "80" && url.port !== "443" ? `:${url.port}` : "";
		return `${proto}://${url.hostname}${port}`;
	} catch {
		const host = publicHost(raw);
		return host ? `https://${host}` : "";
	}
}
async function requestOrigin(preferred) {
	const published = originFrom(void 0) || originFrom(process.env.VITE_PUBLIC_HOSTNAME);
	if (published) return published;
	const fromClient = originFrom(preferred);
	if (fromClient) return fromClient;
	try {
		const { getRequest } = await import("./ssr.mjs").then((n) => n.a).then((n) => n.t);
		const req = getRequest();
		const host = publicHost(req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "");
		if (!host) return "";
		return `${req.headers.get("x-forwarded-proto") ?? (host === "localhost" || host.startsWith("127.") ? "http" : "https")}://${host}`;
	} catch {
		return "";
	}
}
function tripLines(booking) {
	const { trip, customer, quote } = booking;
	return [
		`${customer.firstName} ${customer.lastName}`.trim(),
		`${trip.origin.label} → ${trip.destination.label}`,
		formatWhen(trip.date, trip.time),
		quote.legs && quote.legs.length > 1 ? quote.legs.map((leg) => `${leg.label} ${leg.km.toFixed(1)} km`).join(" · ") : "",
		`${fleetLabel(tripFleet(trip))} · ${trip.passengers} passeggeri`,
		`Totale ${customerPrice(quote.total, priceMarked(quote))} · ${paymentLabel(booking.paymentMethod)}`,
		trip.flight ? `Volo ${trip.flight}` : ""
	].filter(Boolean);
}
function customerMail(booking, viewUrl, editUrl) {
	const lines = tripLines(booking);
	const text = [
		`Ciao ${booking.customer.firstName},`,
		"",
		`abbiamo ricevuto la richiesta ${booking.code}.`,
		...lines,
		"",
		`Vedi la richiesta: ${viewUrl}`,
		`Modifica: ${editUrl}`,
		"",
		"Non paghi ora. MT TRAVEL SERVICE ti risponde con la conferma e le istruzioni di pagamento.",
		booking.quote.remote ? REMOTE_NOTICE : "",
		"Puoi modificare la richiesta dal link solo fino a 48 ore prima del viaggio.",
		"Se modifichi una richiesta già confermata, torna da confermare.",
		"",
		FROM_NAME
	].join("\n");
	const html = `
    <div style="font-family:sans-serif;color:#101412;line-height:1.45">
      <p>Ciao ${escapeHtml(booking.customer.firstName)},</p>
      <p>abbiamo ricevuto la richiesta <strong>${escapeHtml(booking.code)}</strong>.</p>
      <p>${lines.map(escapeHtml).join("<br>")}</p>
      <p>
        <a href="${escapeHtml(viewUrl)}" style="display:inline-block;margin-right:8px;padding:12px 16px;background:#101412;color:#f4f0e6;text-decoration:none">Vedi la richiesta</a>
        <a href="${escapeHtml(editUrl)}" style="display:inline-block;padding:12px 16px;background:#d4b483;color:#101412;text-decoration:none">Modifica</a>
      </p>
      <p>Non paghi ora. Ti rispondiamo con la conferma e le istruzioni per pagare con il metodo scelto.</p>
      ${booking.quote.remote ? `<p>${escapeHtml(REMOTE_NOTICE)}</p>` : ""}
      <p>Puoi modificare la richiesta dal pulsante solo fino a 48 ore prima del viaggio.</p>
      <p>Se modifichi una richiesta già confermata, torna da confermare.</p>
      <p>${FROM_NAME}<br>${BANK.holder}</p>
    </div>`;
	return {
		subject: `Richiesta ricevuta ${booking.code}`,
		text,
		html
	};
}
function staffChangeMail(booking, viewUrl) {
	const lines = tripLines(booking);
	const text = [
		`Ciao ${booking.customer.firstName},`,
		"",
		`MT TRAVEL SERVICE ha aggiornato il preventivo ${booking.code}.`,
		...lines,
		"",
		`Vedi la richiesta aggiornata: ${viewUrl}`,
		booking.quote.remote ? REMOTE_NOTICE : "",
		"",
		FROM_NAME
	].join("\n");
	const html = `
    <div style="font-family:sans-serif;color:#101412;line-height:1.45">
      <p>Ciao ${escapeHtml(booking.customer.firstName)},</p>
      <p>MT TRAVEL SERVICE ha aggiornato il preventivo <strong>${escapeHtml(booking.code)}</strong>.</p>
      <p>${lines.map(escapeHtml).join("<br>")}</p>
      <p><a href="${escapeHtml(viewUrl)}" style="display:inline-block;padding:12px 16px;background:#101412;color:#f4f0e6;text-decoration:none">Vedi la richiesta</a></p>
      ${booking.quote.remote ? `<p>${escapeHtml(REMOTE_NOTICE)}</p>` : ""}
      <p>${FROM_NAME}</p>
    </div>`;
	return {
		subject: `Preventivo aggiornato ${booking.code}`,
		text,
		html
	};
}
function ownerMail(booking, viewUrl, kind) {
	const lines = tripLines(booking);
	const title = kind === "modificata" ? `Richiesta modificata ${booking.code}` : `Nuova richiesta ${booking.code}`;
	const text = [
		title,
		...lines,
		`Telefono ${booking.customer.phone}`,
		`Email ${booking.customer.email}`,
		`Stato: da confermare`,
		`Link cliente: ${viewUrl}`
	].join("\n");
	return {
		subject: title,
		text,
		html: `<pre style="font-family:sans-serif">${escapeHtml(text)}</pre>`
	};
}
function escapeHtml(value) {
	return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
var SECRET_PREFIX = "enc:";
var staffKeyWarned = false;
function staffKey() {
	const raw = process.env.STAFF_SECRET_KEY?.trim() ?? "";
	if (!raw) {
		if (!staffKeyWarned) {
			staffKeyWarned = true;
			console.warn("STAFF_SECRET_KEY mancante: la password Gmail resta in chiaro.");
		}
		return null;
	}
	const key = Buffer.from(raw, "base64");
	if (key.length !== 32) {
		if (!staffKeyWarned) {
			staffKeyWarned = true;
			console.warn("STAFF_SECRET_KEY deve essere 32 byte in base64: la password Gmail resta in chiaro.");
		}
		return null;
	}
	return key;
}
function sealSecret(plain) {
	const key = staffKey();
	if (!key) return plain;
	const iv = randomBytes(12);
	const cipher = createCipheriv("aes-256-gcm", key, iv);
	const body = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
	const tag = cipher.getAuthTag();
	return `${SECRET_PREFIX}${Buffer.concat([
		iv,
		tag,
		body
	]).toString("base64")}`;
}
function openSecret(stored) {
	if (!stored.startsWith(SECRET_PREFIX)) return stored;
	const key = staffKey();
	if (!key) {
		console.warn("Password Gmail cifrata, ma STAFF_SECRET_KEY non è disponibile.");
		return "";
	}
	try {
		const raw = Buffer.from(stored.slice(4), "base64");
		const iv = raw.subarray(0, 12);
		const tag = raw.subarray(12, 28);
		const body = raw.subarray(28);
		const decipher = createDecipheriv("aes-256-gcm", key, iv);
		decipher.setAuthTag(tag);
		return Buffer.concat([decipher.update(body), decipher.final()]).toString("utf8");
	} catch {
		console.warn("Password Gmail non decifrabile.");
		return "";
	}
}
async function loadAlerts(sql) {
	const row = (await sql`select notify_email, smtp_user, smtp_pass from staff_alerts where id = 1`)[0];
	return {
		notify_email: row?.notify_email || "info@mttravelservice.com",
		smtp_user: row?.smtp_user || "info@mttravelservice.com",
		smtp_pass: openSecret(row?.smtp_pass ?? "")
	};
}
async function deliverMail(options) {
	const alerts = await loadAlerts(options.sql);
	const pass = alerts.smtp_pass.trim();
	if (pass && options.to.includes("@")) {
		await (await import("../_libs/nodemailer.mjs").then((n) => n.t)).createTransport({
			service: "gmail",
			auth: {
				user: alerts.smtp_user || "info@mttravelservice.com",
				pass
			}
		}).sendMail({
			from: `"${FROM_NAME}" <${alerts.smtp_user || "info@mttravelservice.com"}>`,
			to: options.to,
			subject: options.subject,
			text: options.text,
			html: options.html
		});
		return true;
	}
	return false;
}
async function notifyOwnerFallback(email, subject, text) {
	if (!email.includes("@")) return false;
	return (await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json"
		},
		body: JSON.stringify({
			_subject: subject,
			_template: "box",
			message: text
		})
	})).ok;
}
//#endregion
export { customerMail, deliverMail, loadAlerts, notifyOwnerFallback, ownerMail, requestOrigin, sealSecret, staffChangeMail };
