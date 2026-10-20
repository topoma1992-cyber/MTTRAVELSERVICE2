import { A as makeBookingCode, b as fleetForPassengers } from "./bookings-Bp6VBimL.mjs";
import { n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.functions-BfR_O-Nm.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var METHODS = /* @__PURE__ */ new Set([
	"bonifico",
	"link",
	"satispay",
	"rate"
]);
var OWNER_EMAIL = "info@mttravelservice.com";
var BAD_LOGIN = "Mail o codice non validi.";
var LOCKED_LOGIN = "Troppi tentativi. Riprova tra qualche minuto.";
var LOCK_BASE_MS = 9e5;
var LOCK_MAX_MS = 864e5;
var DUMMY_PIN_HASH = `${"ab".repeat(16)}:${"cd".repeat(32)}`;
function cleanPin(value) {
	const pin = typeof value === "string" ? value.trim() : "";
	if (pin.length < 4 || pin.length > 40) throw new Error("Il codice deve avere almeno 4 caratteri.");
	return pin;
}
function cleanNewPin(value) {
	const pin = typeof value === "string" ? value.trim() : "";
	if (pin.length < 8 || pin.length > 40) throw new Error("Il codice deve avere almeno 8 caratteri.");
	return pin;
}
function cleanEmail(value) {
	const email = typeof value === "string" ? value.trim().toLowerCase() : "";
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) throw new Error("Mail non valida.");
	return email;
}
function cleanAuth(input) {
	return {
		staffEmail: cleanEmail(input?.staffEmail),
		pin: cleanPin(input?.pin)
	};
}
async function pinTools() {
	const { scryptSync, randomBytes, timingSafeEqual } = await import("node:crypto");
	return {
		hash(pin) {
			const salt = randomBytes(16).toString("hex");
			return `${salt}:${scryptSync(pin, salt, 32).toString("hex")}`;
		},
		matches(pin, stored) {
			const [salt, hash] = stored.split(":");
			if (!salt || !hash) return false;
			const next = scryptSync(pin, salt, 32);
			const prev = Buffer.from(hash, "hex");
			if (next.length !== prev.length) return false;
			return timingSafeEqual(next, prev);
		}
	};
}
async function requirePin(email, pin) {
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const sql = await getSql();
	const attempt = (await sql`
    select failed, locked_until from staff_attempts where email = ${email}
  `)[0];
	if ((attempt?.locked_until ? new Date(attempt.locked_until).getTime() : 0) > Date.now()) throw new Error(LOCKED_LOGIN);
	const stored = (await sql`select pin_hash from staff_logins where email = ${email}`)[0]?.pin_hash;
	const tools = await pinTools();
	if (!(stored ? tools.matches(pin, stored) : (tools.matches(pin, DUMMY_PIN_HASH), false))) {
		const failed = Number(attempt?.failed ?? 0) + 1;
		const step = failed % 5 === 0 ? Math.min(20, failed / 5) : 0;
		const lockMs = step > 0 ? Math.min(LOCK_MAX_MS, LOCK_BASE_MS * 2 ** (step - 1)) : 0;
		await sql`
      insert into staff_attempts (email, failed, locked_until, updated_at)
      values (${email}, ${failed}, ${lockMs > 0 ? new Date(Date.now() + lockMs).toISOString() : null}, ${(/* @__PURE__ */ new Date()).toISOString()})
      on conflict (email) do update
      set failed = excluded.failed, locked_until = excluded.locked_until, updated_at = excluded.updated_at
    `;
		throw new Error(BAD_LOGIN);
	}
	await sql`
    update staff_attempts
    set failed = 0, locked_until = null, updated_at = ${(/* @__PURE__ */ new Date()).toISOString()}
    where email = ${email}
  `;
	return sql;
}
function jsonValue(value) {
	if (typeof value === "string") try {
		return JSON.parse(value);
	} catch {
		return null;
	}
	return value;
}
function asRecord(value, label) {
	const parsed = jsonValue(value);
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error(`${label} non valido.`);
	return parsed;
}
function text(value, max) {
	return typeof value === "string" ? value.trim().slice(0, max) : "";
}
function place(value) {
	const row = asRecord(value, "Luogo");
	const label = text(row.label, 240);
	const lat = Number(row.lat);
	const lon = Number(row.lon);
	if (label.length < 2 || !Number.isFinite(lat) || !Number.isFinite(lon)) throw new Error("Indirizzo non valido.");
	return {
		label,
		lat,
		lon
	};
}
function incomingBooking(input) {
	const body = asRecord(input, "Richiesta");
	const tripRaw = asRecord(body.trip, "Viaggio");
	const customerRaw = asRecord(body.customer, "Cliente");
	const quoteRaw = asRecord(body.quote, "Preventivo");
	const paymentMethod = text(body.paymentMethod, 20);
	const convenzione = text(quoteRaw.discountCode, 40).toUpperCase() === "CONVENZIONE20";
	if (!convenzione && !METHODS.has(paymentMethod)) throw new Error("Scegli un metodo di pagamento.");
	if (paymentMethod && !METHODS.has(paymentMethod)) throw new Error("Scegli un metodo di pagamento.");
	const firstName = text(customerRaw.firstName, 80);
	const lastName = text(customerRaw.lastName, 80);
	const phone = text(customerRaw.phone, 30);
	const email = text(customerRaw.email, 120);
	if (!convenzione && (firstName.length < 2 || lastName.length < 2)) throw new Error("Nome non valido.");
	if (!convenzione && (phone.replace(/\D/g, "").length < 8 || !email.includes("@"))) throw new Error("Contatti non validi.");
	const vehicle = tripRaw.vehicle === "van" ? "van" : "car";
	if (tripRaw.vehicle !== "van" && tripRaw.vehicle !== "car") throw new Error("Veicolo non valido.");
	const stops = Array.isArray(tripRaw.stops) ? tripRaw.stops.slice(0, 6).map(place) : [];
	const total = Number(quoteRaw.total);
	if (!Number.isFinite(total) || total <= 0) throw new Error("Preventivo non valido.");
	const passengers = Math.min(16, Math.max(1, Number(tripRaw.passengers) || 1));
	const luggage = Math.min(60, Math.max(0, Number(tripRaw.luggage) || 0));
	const fleet = passengers > 8 ? fleetForPassengers(passengers, luggage) : void 0;
	const trip = {
		origin: place(tripRaw.origin),
		destination: place(tripRaw.destination),
		stops,
		roundTrip: Boolean(tripRaw.roundTrip),
		date: text(tripRaw.date, 10),
		time: text(tripRaw.time, 5),
		landingDate: text(tripRaw.landingDate, 10),
		landingTime: text(tripRaw.landingTime, 5),
		returnDate: text(tripRaw.returnDate, 10),
		returnTime: text(tripRaw.returnTime, 5),
		passengers,
		luggage,
		oversized: Boolean(tripRaw.oversized) || luggage > 10,
		oversizedNote: text(tripRaw.oversizedNote, 400),
		vehicle: fleet && fleet.vans > 0 ? "van" : vehicle,
		fleet,
		childSeats: 0,
		boosters: 0,
		meetGreet: Boolean(tripRaw.meetGreet),
		pet: false,
		waitMinutes: Math.min(720, Math.max(0, Number(tripRaw.waitMinutes) || 0)),
		vehicleStay: Boolean(tripRaw.roundTrip) && Boolean(tripRaw.vehicleStay),
		flight: text(tripRaw.flight, 40)
	};
	if (!convenzione && (trip.oversized || trip.luggage > 10) && trip.oversizedNote.length < 3) throw new Error("Descrivi i bagagli fuori misura.");
	if (!convenzione && (!trip.date || !trip.time)) throw new Error("Data non valida.");
	return {
		trip,
		customer: {
			firstName,
			lastName,
			phone,
			email,
			notes: text(customerRaw.notes, 500)
		},
		quote: quoteRaw,
		paymentMethod
	};
}
function rowToBooking(row) {
	const method = METHODS.has(row.payment_method) ? row.payment_method : "";
	return {
		id: row.id,
		code: row.code,
		createdAt: String(row.created_at),
		status: row.status === "confirmed" ? "confirmed" : "pending",
		paymentMethod: method,
		paymentLink: row.payment_link ?? "",
		trip: jsonValue(row.trip),
		customer: jsonValue(row.customer),
		quote: jsonValue(row.quote),
		revised: Boolean(row.revised)
	};
}
var staffStatus_createServerFn_handler = createServerRpc({
	id: "833917ebe57cb0ed8f580890cdd04741469fb29d93924f049abddabfe5dc28ef",
	name: "staffStatus",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => staffStatus.__executeServer(opts));
var staffStatus = createServerFn({ method: "GET" }).handler(staffStatus_createServerFn_handler, async () => {
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const rows = await (await getSql())`select email from staff_logins where owner = true limit 1`;
	return { claimed: Boolean(rows[0]) };
});
var claimStaff_createServerFn_handler = createServerRpc({
	id: "0bfb5b46d38b23d0eb3d86201c468e7af6390b8632380f6ff216ba1d741c7544",
	name: "claimStaff",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => claimStaff.__executeServer(opts));
var claimStaff = createServerFn({ method: "POST" }).validator((input) => ({
	pin: cleanNewPin(input?.pin),
	setupCode: typeof input?.setupCode === "string" ? input.setupCode : ""
})).handler(claimStaff_createServerFn_handler, async ({ data }) => {
	const { createHash, timingSafeEqual } = await import("node:crypto");
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const expected = process.env.STAFF_SETUP_CODE ?? "";
	const left = createHash("sha256").update(data.setupCode).digest();
	const right = createHash("sha256").update(expected).digest();
	if (!expected || !timingSafeEqual(left, right)) throw new Error("Codice di attivazione non valido.");
	const sql = await getSql();
	if ((await sql`select email from staff_logins where owner = true limit 1`)[0]) throw new Error("L'accesso esiste già.");
	await sql`
      insert into staff_logins (email, pin_hash, owner)
      values (${OWNER_EMAIL}, ${(await pinTools()).hash(data.pin)}, true)
    `;
	return { ok: true };
});
var listStaffLogins_createServerFn_handler = createServerRpc({
	id: "2c0a5774eec160fdd3ae5c8073a02030164f0e066fc91801302a5f6fc89f5c7f",
	name: "listStaffLogins",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => listStaffLogins.__executeServer(opts));
var listStaffLogins = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(listStaffLogins_createServerFn_handler, async ({ data }) => {
	return (await (await requirePin(data.staffEmail, data.pin))`
      select email, owner from staff_logins order by owner desc, email
    `).map((row) => ({
		email: row.email,
		owner: row.owner === true || row.owner === "t" || row.owner === "true"
	}));
});
var saveStaffLogin_createServerFn_handler = createServerRpc({
	id: "1e1eb478daded784155386434259b93f5129aa9ca679c4ab2779ba2afa29e4c4",
	name: "saveStaffLogin",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => saveStaffLogin.__executeServer(opts));
var saveStaffLogin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	loginEmail: cleanEmail(input?.loginEmail),
	loginPin: cleanNewPin(input?.loginPin)
})).handler(saveStaffLogin_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	if (data.loginEmail === OWNER_EMAIL) throw new Error("Il codice di info@mttravelservice.com resta quello già impostato.");
	const count = await sql`select count(*)::int as n from staff_logins`;
	if (!(await sql`select email from staff_logins where email = ${data.loginEmail}`)[0] && Number(count[0]?.n) >= 20) throw new Error("Puoi autorizzare al massimo 20 mail.");
	const tools = await pinTools();
	await sql`
      insert into staff_logins (email, pin_hash, owner)
      values (${data.loginEmail}, ${tools.hash(data.loginPin)}, false)
      on conflict (email) do update set pin_hash = excluded.pin_hash
    `;
	return { ok: true };
});
var changeStaffPin_createServerFn_handler = createServerRpc({
	id: "dbbd0d471f5c70d5f5a4c9fc65df6a039312e41d42861e42dd2f6b3badcc77de",
	name: "changeStaffPin",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => changeStaffPin.__executeServer(opts));
var changeStaffPin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	nextPin: cleanNewPin(input?.nextPin)
})).handler(changeStaffPin_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	const rows = await sql`select owner from staff_logins where email = ${data.staffEmail}`;
	if (!(rows[0]?.owner === true || rows[0]?.owner === "t" || rows[0]?.owner === "true")) throw new Error("Solo il titolare può cambiare questo codice.");
	await sql`
      update staff_logins
      set pin_hash = ${(await pinTools()).hash(data.nextPin)}
      where email = ${data.staffEmail} and owner = true
    `;
	return { ok: true };
});
var removeStaffLogin_createServerFn_handler = createServerRpc({
	id: "68695b95de0baedb3aa3744cf38f5ad438ef3c869457f94c81565127fd7bc051",
	name: "removeStaffLogin",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => removeStaffLogin.__executeServer(opts));
var removeStaffLogin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	loginEmail: cleanEmail(input?.loginEmail)
})).handler(removeStaffLogin_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	if (data.loginEmail === OWNER_EMAIL) throw new Error("Questa mail non si può togliere.");
	await sql`delete from staff_logins where email = ${data.loginEmail} and owner = false`;
	return { ok: true };
});
var issueBookingGuard_createServerFn_handler = createServerRpc({
	id: "e918094caa2b266e9f79749e1a7a6abb38e8f4d3b96496e95349258dbf4b9cf5",
	name: "issueBookingGuard",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => issueBookingGuard.__executeServer(opts));
var issueBookingGuard = createServerFn({ method: "GET" }).handler(issueBookingGuard_createServerFn_handler, async () => {
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const { issueGuardToken } = await import("./request-guard.server-BukS48V5.mjs");
	return { guard: await issueGuardToken(await getSql()) };
});
var submitBooking_createServerFn_handler = createServerRpc({
	id: "3aa72774d0dade40d40b42cf79c1379f971d11dc8b2a96279201df0463e423ba",
	name: "submitBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => submitBooking.__executeServer(opts));
var submitBooking = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Richiesta");
	return {
		...incomingBooking(body),
		pageOrigin: text(body.pageOrigin, 300),
		guard: text(body.guard, 200),
		companyWebsite: text(body.companyWebsite, 200)
	};
}).handler(submitBooking_createServerFn_handler, async ({ data }) => {
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const { assertNewRequest } = await import("./request-guard.server-BukS48V5.mjs");
	const sql = await getSql();
	await assertNewRequest(sql, {
		guard: data.guard,
		honeypot: data.companyWebsite,
		email: data.customer.email
	});
	const id = crypto.randomUUID();
	const code = makeBookingCode();
	const created = (/* @__PURE__ */ new Date()).toISOString();
	const editToken = crypto.randomUUID().replace(/-/g, "");
	await sql`
      insert into bookings (id, code, created_at, status, payment_method, payment_link, trip, customer, quote, edit_token, revised)
      values (
        ${id},
        ${code},
        ${created},
        'pending',
        ${data.paymentMethod},
        '',
        ${JSON.stringify(data.trip)}::jsonb,
        ${JSON.stringify(data.customer)}::jsonb,
        ${JSON.stringify(data.quote)}::jsonb,
        ${editToken},
        false
      )
    `;
	const booking = {
		id,
		code,
		createdAt: created,
		status: "pending",
		paymentMethod: data.paymentMethod,
		paymentLink: "",
		trip: data.trip,
		customer: data.customer,
		quote: data.quote,
		revised: false
	};
	const links = await bookingLinks(editToken, data.pageOrigin);
	const mailed = await sendRequestMails(sql, booking, links, "nuova");
	return {
		...booking,
		...links,
		mailed
	};
});
var createStaffQuote_createServerFn_handler = createServerRpc({
	id: "ff6e45f76f0e6bac0260d4a5c4a8a00d14b7a69a0e8dccb2a57e5cd3fc7ad194",
	name: "createStaffQuote",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => createStaffQuote.__executeServer(opts));
var createStaffQuote = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Preventivo");
	const pin = cleanPin(body.pin);
	const staffEmail = cleanEmail(body.staffEmail);
	const vehicle = body.vehicle === "van" ? "van" : "car";
	const passengers = Math.min(16, Math.max(0, Number(body.passengers) || 0));
	const luggage = Math.min(60, Math.max(0, Number(body.luggage) || 0));
	const fleet = passengers > 8 ? fleetForPassengers(passengers, luggage) : void 0;
	const total = Number(body.total);
	const amount = Number.isFinite(total) && total > 0 ? Math.round(total * 100) / 100 : 0;
	const paymentRaw = text(body.paymentMethod, 20);
	const paymentMethod = METHODS.has(paymentRaw) ? paymentRaw : "bonifico";
	const oversizedNote = text(body.oversizedNote, 400);
	const originLat = Number(body.originLat);
	const originLon = Number(body.originLon);
	const destinationLat = Number(body.destinationLat);
	const destinationLon = Number(body.destinationLon);
	const lines = (Array.isArray(body.lines) ? body.lines : []).slice(0, 24).map((line) => {
		if (!line || typeof line !== "object") return null;
		const row = line;
		const label = text(row.label, 80);
		const lineAmount = Number(row.amount);
		if (!label || !Number.isFinite(lineAmount)) return null;
		return {
			label,
			amount: Math.round(lineAmount * 100) / 100
		};
	}).filter((line) => Boolean(line));
	const lineSum = Math.round(lines.reduce((sum, line) => sum + line.amount, 0) * 100) / 100;
	const quoteLines = lines.length > 0 && Math.abs(lineSum - amount) < .05 ? lines : amount > 0 ? [{
		label: "Totale",
		amount
	}] : [];
	return {
		pin,
		staffEmail,
		paymentMethod,
		trip: {
			origin: {
				label: text(body.origin, 240) || "—",
				lat: Number.isFinite(originLat) ? originLat : 0,
				lon: Number.isFinite(originLon) ? originLon : 0
			},
			destination: {
				label: text(body.destination, 240) || "—",
				lat: Number.isFinite(destinationLat) ? destinationLat : 0,
				lon: Number.isFinite(destinationLon) ? destinationLon : 0
			},
			stops: [],
			roundTrip: Boolean(body.roundTrip),
			date: text(body.date, 10),
			time: text(body.time, 5),
			landingDate: "",
			landingTime: "",
			returnDate: text(body.returnDate, 10),
			returnTime: text(body.returnTime, 5),
			passengers: passengers || 1,
			luggage,
			oversized: luggage > 10 || Boolean(body.oversized),
			oversizedNote,
			vehicle: fleet && fleet.vans > 0 ? "van" : vehicle,
			fleet,
			childSeats: 0,
			boosters: 0,
			meetGreet: false,
			pet: false,
			waitMinutes: Math.min(720, Math.max(0, Number(body.waitMinutes) || 0)),
			vehicleStay: Boolean(body.roundTrip) && Boolean(body.vehicleStay),
			flight: text(body.flight, 40)
		},
		customer: {
			firstName: text(body.firstName, 80),
			lastName: text(body.lastName, 80),
			phone: text(body.phone, 30),
			email: text(body.email, 120),
			notes: text(body.notes, 500)
		},
		quote: {
			lines: quoteLines,
			total: amount,
			km: Number(body.km) || 0,
			minutes: Number(body.minutes) || 0,
			estimated: Boolean(body.estimated),
			night: false,
			holiday: null,
			vehicle,
			sameDayChoice: null,
			appliedWait: Math.min(720, Math.max(0, Number(body.waitMinutes) || 0)),
			discountCode: null,
			approachKm: Math.max(0, Number(body.approachKm) || 0) || void 0,
			approachAmount: Math.max(0, Number(body.approachAmount) || 0) || void 0,
			remote: body.remote === true || void 0
		}
	};
}).handler(createStaffQuote_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	const id = crypto.randomUUID();
	const code = makeBookingCode();
	const created = (/* @__PURE__ */ new Date()).toISOString();
	const editToken = crypto.randomUUID().replace(/-/g, "");
	await sql`
      insert into bookings (id, code, created_at, status, payment_method, payment_link, trip, customer, quote, edit_token, revised)
      values (
        ${id},
        ${code},
        ${created},
        'pending',
        ${data.paymentMethod},
        '',
        ${JSON.stringify(data.trip)}::jsonb,
        ${JSON.stringify(data.customer)}::jsonb,
        ${JSON.stringify(data.quote)}::jsonb,
        ${editToken},
        false
      )
    `;
	return {
		id,
		code,
		createdAt: created,
		status: "pending",
		paymentMethod: data.paymentMethod,
		paymentLink: "",
		trip: data.trip,
		customer: data.customer,
		quote: data.quote
	};
});
var listStaffBookings_createServerFn_handler = createServerRpc({
	id: "459433a724391978d5a0f2337182ea026820547b35c7a63403cf385b1fb8072f",
	name: "listStaffBookings",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => listStaffBookings.__executeServer(opts));
var listStaffBookings = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(listStaffBookings_createServerFn_handler, async ({ data }) => {
	return (await (await requirePin(data.staffEmail, data.pin))`
      select id, code, created_at::text, status, payment_method, payment_link, trip, customer, quote, revised
      from bookings
      order by created_at desc
    `).map(rowToBooking);
});
var confirmStaffBooking_createServerFn_handler = createServerRpc({
	id: "a10e4e6321007488edcbb57c9da8d8a724ccf4daff2878e97a2e40622dad8580",
	name: "confirmStaffBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => confirmStaffBooking.__executeServer(opts));
var confirmStaffBooking = createServerFn({ method: "POST" }).validator((input) => {
	const auth = cleanAuth(input);
	const id = text(input?.id, 80);
	const paymentMethod = input?.paymentMethod;
	if (!id || !METHODS.has(paymentMethod)) throw new Error("Richiesta non valida.");
	const paymentLink = text(input?.paymentLink, 500);
	if (paymentMethod !== "bonifico" && !/^https?:\/\/\S+$/i.test(paymentLink)) throw new Error("Incolla il link di pagamento, completo di https://");
	return {
		...auth,
		id,
		paymentMethod,
		paymentLink: paymentMethod === "bonifico" ? "" : paymentLink
	};
}).handler(confirmStaffBooking_createServerFn_handler, async ({ data }) => {
	if (!(await (await requirePin(data.staffEmail, data.pin))`
      update bookings
      set status = 'confirmed', payment_method = ${data.paymentMethod}, payment_link = ${data.paymentLink}, revised = false
      where id = ${data.id}
      returning id
    `)[0]) throw new Error("Richiesta non trovata.");
	return { ok: true };
});
var updateStaffBooking_createServerFn_handler = createServerRpc({
	id: "e10bf332ab9e05afb2224606bcb14a603d9a00d250016d96e01210c9998c8a53",
	name: "updateStaffBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => updateStaffBooking.__executeServer(opts));
var updateStaffBooking = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Richiesta");
	const id = text(body.id, 80);
	if (!id) throw new Error("Richiesta non valida.");
	return {
		...cleanAuth({
			staffEmail: typeof body.staffEmail === "string" ? body.staffEmail : "",
			pin: typeof body.pin === "string" ? body.pin : ""
		}),
		id,
		pageOrigin: text(body.pageOrigin, 300),
		paymentLink: text(body.paymentLink, 500),
		notify: body.notify !== false,
		...incomingBooking(body)
	};
}).handler(updateStaffBooking_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	const current = (await sql`
      select edit_token, status, code, created_at::text, revised
      from bookings
      where id = ${data.id}
    `)[0];
	if (!current?.edit_token) throw new Error("Richiesta non trovata.");
	const quote = data.quote;
	await sql`
      update bookings
      set payment_method = ${data.paymentMethod},
          payment_link = ${data.paymentLink},
          trip = ${JSON.stringify(data.trip)}::jsonb,
          customer = ${JSON.stringify(data.customer)}::jsonb,
          quote = ${JSON.stringify(quote)}::jsonb
      where id = ${data.id}
    `;
	const booking = {
		id: data.id,
		code: current.code,
		createdAt: String(current.created_at),
		status: current.status === "confirmed" ? "confirmed" : "pending",
		paymentMethod: data.paymentMethod,
		paymentLink: data.paymentLink,
		trip: data.trip,
		customer: data.customer,
		quote,
		revised: Boolean(current.revised)
	};
	const links = await bookingLinks(current.edit_token, data.pageOrigin);
	if (!data.notify) return {
		booking,
		mailed: false,
		notice: ""
	};
	const { deliverMail, staffChangeMail } = await import("./mail.server-CrvJru6j.mjs");
	const message = staffChangeMail(booking, links.viewUrl);
	let mailed = false;
	try {
		mailed = await deliverMail({
			sql,
			to: booking.customer.email,
			...message
		});
	} catch {
		mailed = false;
	}
	return {
		booking,
		mailed,
		notice: message.text
	};
});
var removeStaffBooking_createServerFn_handler = createServerRpc({
	id: "95f897fedf5cd2c05c54e57d7d7fbe96e0fad401b44ddec824fa29b1dc2dd342",
	name: "removeStaffBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => removeStaffBooking.__executeServer(opts));
var removeStaffBooking = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	id: text(input?.id, 80)
})).handler(removeStaffBooking_createServerFn_handler, async ({ data }) => {
	await (await requirePin(data.staffEmail, data.pin))`delete from bookings where id = ${data.id}`;
	return { ok: true };
});
function cleanToken(value) {
	const token = typeof value === "string" ? value.trim() : "";
	if (!/^[a-z0-9]{20,80}$/i.test(token)) throw new Error("Link non valido.");
	return token;
}
async function bookingLinks(token, preferred) {
	const { requestOrigin } = await import("./mail.server-CrvJru6j.mjs");
	const origin = await requestOrigin(preferred);
	const path = `/r/${token}`;
	const viewUrl = origin ? `${origin}${path}` : path;
	return {
		viewUrl,
		editUrl: `${viewUrl}?modifica=1`
	};
}
async function sendRequestMails(sql, booking, links, kind) {
	const { customerMail, deliverMail, loadAlerts, notifyOwnerFallback, ownerMail } = await import("./mail.server-CrvJru6j.mjs");
	let mailed = false;
	try {
		const message = customerMail(booking, links.viewUrl, links.editUrl);
		mailed = await deliverMail({
			sql,
			to: booking.customer.email,
			...message
		});
	} catch {
		mailed = false;
	}
	try {
		const alerts = await loadAlerts(sql);
		const message = ownerMail(booking, links.viewUrl, kind);
		if (!await deliverMail({
			sql,
			to: alerts.notify_email,
			...message
		})) await notifyOwnerFallback(alerts.notify_email, message.subject, message.text);
	} catch {}
	return mailed;
}
async function bookingByToken(token) {
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const sql = await getSql();
	const row = (await sql`
    select id, code, created_at::text, status, payment_method, payment_link, trip, customer, quote, revised
    from bookings
    where edit_token = ${token}
  `)[0];
	if (!row) throw new Error("Richiesta non trovata.");
	return {
		sql,
		booking: rowToBooking(row)
	};
}
var getPublicBooking_createServerFn_handler = createServerRpc({
	id: "93daf7c3486c958b5779896d044cb4cd74105b048a40b1bed21d80879c1cefaa",
	name: "getPublicBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => getPublicBooking.__executeServer(opts));
var getPublicBooking = createServerFn({ method: "GET" }).validator((input) => ({ token: cleanToken(input?.token) })).handler(getPublicBooking_createServerFn_handler, async ({ data }) => {
	const { booking } = await bookingByToken(data.token);
	return booking;
});
var updatePublicBooking_createServerFn_handler = createServerRpc({
	id: "d6f6b40a657aeacc45185755fcc1fbff306515dae51d7c292d5fec4f1483d9ab",
	name: "updatePublicBooking",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => updatePublicBooking.__executeServer(opts));
var updatePublicBooking = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Richiesta");
	return {
		token: cleanToken(body.token),
		...incomingBooking(body),
		pageOrigin: text(body.pageOrigin, 300)
	};
}).handler(updatePublicBooking_createServerFn_handler, async ({ data }) => {
	const { sql, booking: current } = await bookingByToken(data.token);
	const { customerCanEdit } = await import("./bookings-Bp6VBimL.mjs").then((n) => n.d).then((n) => n.L);
	const { assertPublicEdit } = await import("./request-guard.server-BukS48V5.mjs");
	if (!customerCanEdit(current.trip.date, current.trip.time)) throw new Error("La modifica è possibile solo fino a 48 ore prima del viaggio.");
	await assertPublicEdit(sql, {
		token: data.token,
		email: data.customer.email,
		previousEmail: current.customer.email
	});
	await sql`
      update bookings
      set status = 'pending',
          revised = true,
          payment_method = ${data.paymentMethod},
          trip = ${JSON.stringify(data.trip)}::jsonb,
          customer = ${JSON.stringify(data.customer)}::jsonb,
          quote = ${JSON.stringify(data.quote)}::jsonb
      where edit_token = ${data.token}
    `;
	const booking = {
		...current,
		status: "pending",
		revised: true,
		paymentMethod: data.paymentMethod,
		trip: data.trip,
		customer: data.customer,
		quote: data.quote
	};
	await sendRequestMails(sql, booking, await bookingLinks(data.token, data.pageOrigin), "modificata");
	return booking;
});
var alertSettings_createServerFn_handler = createServerRpc({
	id: "27bcd301ee7d4e1fd965f0cb9f0a36b4b36d57337c3a47f30d503cf8a2cb7459",
	name: "alertSettings",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => alertSettings.__executeServer(opts));
var alertSettings = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(alertSettings_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	const { loadAlerts } = await import("./mail.server-CrvJru6j.mjs");
	const alerts = await loadAlerts(sql);
	return {
		notifyEmail: alerts.notify_email,
		mailReady: alerts.smtp_pass.trim().length > 8
	};
});
var saveAlertSettings_createServerFn_handler = createServerRpc({
	id: "4990ca0a545394391ae9f3e29bc5e0f646b9fa6edd451d2f7b684a095358aa7b",
	name: "saveAlertSettings",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => saveAlertSettings.__executeServer(opts));
var saveAlertSettings = createServerFn({ method: "POST" }).validator((input) => {
	const auth = cleanAuth(input);
	const notifyEmail = text(input?.notifyEmail, 120);
	if (!notifyEmail.includes("@")) throw new Error("Email non valida.");
	return {
		...auth,
		notifyEmail,
		smtpPass: text(input?.smtpPass, 80)
	};
}).handler(saveAlertSettings_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	if (data.smtpPass) {
		const { sealSecret } = await import("./mail.server-CrvJru6j.mjs");
		const stored = sealSecret(data.smtpPass);
		await sql`
        update staff_alerts
        set notify_email = ${data.notifyEmail}, smtp_user = ${data.notifyEmail}, smtp_pass = ${stored}
        where id = 1
      `;
	} else await sql`update staff_alerts set notify_email = ${data.notifyEmail} where id = 1`;
	const { loadAlerts } = await import("./mail.server-CrvJru6j.mjs");
	return {
		ok: true,
		mailReady: (await loadAlerts(sql)).smtp_pass.trim().length > 8
	};
});
function discountVehicle(value) {
	return value === "car" || value === "van" ? value : "all";
}
function flag(value) {
	return value === true || value === "t" || value === "true" || value === "1";
}
function amount(value) {
	const next = Number(value);
	if (!Number.isFinite(next)) return 0;
	return Math.min(100, Math.max(0, Math.round(next * 100) / 100));
}
function fare(value) {
	const next = Number(value);
	if (!Number.isFinite(next) || next < 0) return 0;
	return Math.round(next * 100) / 100;
}
function toDiscount(row) {
	return {
		code: String(row.code).trim().toUpperCase(),
		active: flag(row.active),
		totalPercent: amount(row.total_percent),
		ridePercent: amount(row.ride_percent),
		minFare: fare(row.min_fare),
		nightPercent: amount(row.night_percent),
		holidayPercent: amount(row.holiday_percent),
		waitPercent: amount(row.wait_percent),
		meetGreetFree: flag(row.meet_greet_free),
		maxAmount: fare(row.max_discount ?? 0),
		vehicle: discountVehicle(row.vehicle)
	};
}
function cleanCode(value) {
	const code = text(value, 20).toUpperCase().replace(/[^A-Z0-9]/g, "");
	if (code.length < 3) throw new Error("Il codice deve avere almeno 3 lettere o numeri.");
	return code;
}
function cleanDiscount(input) {
	return {
		staffEmail: cleanEmail(input.staffEmail),
		pin: cleanPin(input.pin),
		previousCode: text(input.previousCode, 20).toUpperCase(),
		code: cleanCode(input.code),
		active: input.active !== false,
		totalPercent: amount(input.totalPercent ?? 0),
		ridePercent: amount(input.ridePercent ?? 0),
		minFare: fare(input.minFare ?? 0),
		nightPercent: amount(input.nightPercent ?? 0),
		holidayPercent: amount(input.holidayPercent ?? 0),
		waitPercent: amount(input.waitPercent ?? 0),
		meetGreetFree: input.meetGreetFree === true,
		maxAmount: fare(input.maxAmount ?? 0),
		vehicle: discountVehicle(input.vehicle)
	};
}
var listDiscountCodes_createServerFn_handler = createServerRpc({
	id: "38d7f33137b7b3cd1bb0db602801b541d67a8233eb09a93fc2427d19023dfb38",
	name: "listDiscountCodes",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => listDiscountCodes.__executeServer(opts));
var listDiscountCodes = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(listDiscountCodes_createServerFn_handler, async ({ data }) => {
	return (await (await requirePin(data.staffEmail, data.pin))`select * from discount_codes order by code`).map(toDiscount);
});
var lookupDiscount_createServerFn_handler = createServerRpc({
	id: "378bdac6cbcd111a192c6c5c04065c12fe8e4835fa0ac084bf70e35c878632b5",
	name: "lookupDiscount",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => lookupDiscount.__executeServer(opts));
var lookupDiscount = createServerFn({ method: "POST" }).validator((input) => text(input?.code, 20).toUpperCase().replace(/[^A-Z0-9]/g, "")).handler(lookupDiscount_createServerFn_handler, async ({ data }) => {
	if (data.length < 3) return null;
	const { getSql } = await import("./db-Bi3n4nny.mjs");
	const rows = await (await getSql())`select * from discount_codes where code = ${data} and active = true`;
	return rows[0] ? toDiscount(rows[0]) : null;
});
var saveDiscountCode_createServerFn_handler = createServerRpc({
	id: "9bba615b101547e58df0ffad2f501a28444bdb2dc2e0bd3b05d136b67689af24",
	name: "saveDiscountCode",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => saveDiscountCode.__executeServer(opts));
var saveDiscountCode = createServerFn({ method: "POST" }).validator((input) => cleanDiscount(input ?? {})).handler(saveDiscountCode_createServerFn_handler, async ({ data }) => {
	const sql = await requirePin(data.staffEmail, data.pin);
	if (data.previousCode && data.previousCode !== data.code) await sql`delete from discount_codes where code = ${data.previousCode}`;
	await sql`
      insert into discount_codes (
        code, active, total_percent, ride_percent, min_fare, night_percent, holiday_percent, wait_percent, meet_greet_free, max_discount, vehicle
      ) values (
        ${data.code}, ${data.active}, ${data.totalPercent}, ${data.ridePercent}, ${data.minFare},
        ${data.nightPercent}, ${data.holidayPercent}, ${data.waitPercent}, ${data.meetGreetFree}, ${data.maxAmount}, ${data.vehicle}
      )
      on conflict (code) do update set
        active = excluded.active,
        total_percent = excluded.total_percent,
        ride_percent = excluded.ride_percent,
        min_fare = excluded.min_fare,
        night_percent = excluded.night_percent,
        holiday_percent = excluded.holiday_percent,
        wait_percent = excluded.wait_percent,
        meet_greet_free = excluded.meet_greet_free,
        max_discount = excluded.max_discount,
        vehicle = excluded.vehicle
    `;
	return {
		ok: true,
		code: data.code
	};
});
var removeDiscountCode_createServerFn_handler = createServerRpc({
	id: "6a74171c006baa75fb07923defdc88aa18639073d0c42c590f867402b345b606",
	name: "removeDiscountCode",
	filename: "src/lib/bookings.functions.ts"
}, (opts) => removeDiscountCode.__executeServer(opts));
var removeDiscountCode = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	code: cleanCode(input?.code)
})).handler(removeDiscountCode_createServerFn_handler, async ({ data }) => {
	await (await requirePin(data.staffEmail, data.pin))`delete from discount_codes where code = ${data.code}`;
	return { ok: true };
});
//#endregion
export { alertSettings_createServerFn_handler, changeStaffPin_createServerFn_handler, claimStaff_createServerFn_handler, confirmStaffBooking_createServerFn_handler, createStaffQuote_createServerFn_handler, getPublicBooking_createServerFn_handler, issueBookingGuard_createServerFn_handler, listDiscountCodes_createServerFn_handler, listStaffBookings_createServerFn_handler, listStaffLogins_createServerFn_handler, lookupDiscount_createServerFn_handler, removeDiscountCode_createServerFn_handler, removeStaffBooking_createServerFn_handler, removeStaffLogin_createServerFn_handler, saveAlertSettings_createServerFn_handler, saveDiscountCode_createServerFn_handler, saveStaffLogin_createServerFn_handler, staffStatus_createServerFn_handler, submitBooking_createServerFn_handler, updatePublicBooking_createServerFn_handler, updateStaffBooking_createServerFn_handler };
