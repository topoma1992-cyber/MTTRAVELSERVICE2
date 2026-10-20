import { r as __exportAll } from "../_runtime.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { J as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings-Bp6VBimL.js
var bookings_Bp6VBimL_exports = /* @__PURE__ */ __exportAll({
	A: () => addClock,
	B: () => paymentNotice,
	C: () => gapWaitMinutes,
	D: () => tripFleet,
	E: () => serviceInBologna,
	F: () => formatDuration,
	G: () => validPhone,
	H: () => priceMarked,
	I: () => formatWhen,
	L: () => format_exports,
	M: () => customerCanEdit,
	N: () => customerPrice,
	O: () => waitBlockLabel,
	P: () => euro,
	R: () => kmLabel,
	S: () => fleetText,
	T: () => priceSplit,
	U: () => toISODate,
	V: () => peopleLabel,
	W: () => validEmail,
	_: () => discountFits,
	a: () => googleCalendarHref,
	b: () => fleetForPassengers,
	c: () => paymentLabel,
	d: () => whatsappTo,
	f: () => DEFAULT_DISCOUNTS,
	g: () => buildQuote,
	h: () => billedWaitMinutes,
	i: () => confirmationMessage,
	j: () => bagsLabel,
	k: () => REMOTE_NOTICE,
	l: () => rejectionMessage,
	m: () => VEHICLES,
	n: () => PAYMENT_METHODS,
	o: () => mailHref,
	p: () => EXTRA_PRICES,
	r: () => bookingMessage,
	s: () => makeBookingCode,
	t: () => BANK,
	u: () => whatsappHref,
	v: () => discountSummary,
	w: () => normalizeDiscount,
	x: () => fleetLabel,
	y: () => findDiscount,
	z: () => legMeasure
});
require_react();
var format_exports = /* @__PURE__ */ __exportAll$1({
	REMOTE_NOTICE: () => REMOTE_NOTICE,
	addClock: () => addClock,
	bagsLabel: () => bagsLabel,
	customerCanEdit: () => customerCanEdit,
	customerPrice: () => customerPrice,
	euro: () => euro,
	formatDuration: () => formatDuration,
	formatWhen: () => formatWhen,
	kmLabel: () => kmLabel,
	legMeasure: () => legMeasure,
	paymentDueLine: () => paymentDueLine,
	paymentNotice: () => paymentNotice,
	peopleLabel: () => peopleLabel,
	priceMarked: () => priceMarked,
	toISODate: () => toISODate,
	tripStartMs: () => tripStartMs,
	validEmail: () => validEmail,
	validPhone: () => validPhone
});
function toISODate(d) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function euro(amount) {
	return new Intl.NumberFormat("it-IT", {
		style: "currency",
		currency: "EUR"
	}).format(amount);
}
function customerPrice(amount, marked = false) {
	return `${euro(amount)}${marked ? "*" : ""}`;
}
function priceMarked(quote) {
	return (quote?.approachAmount ?? 0) > 0 || (quote?.approachKm ?? 0) > 0 || quote?.remote === true;
}
var REMOTE_NOTICE = "Il transfer è distante dalla nostra sede. MT TRAVEL SERVICE si impegna a trovare un vettore NCC vicino a voi per garantirvi la tariffa mostrata.";
function kmLabel(km) {
	return `${new Intl.NumberFormat("it-IT", {
		minimumFractionDigits: 1,
		maximumFractionDigits: 1
	}).format(km)} km`;
}
function formatDuration(minutes) {
	const total = Math.max(1, Math.round(minutes));
	const hours = Math.floor(total / 60);
	const rest = total % 60;
	if (hours === 0) return `${total} min`;
	if (rest === 0) return `${hours} h`;
	return `${hours} h ${rest} min`;
}
function legMeasure(km, minutes, estimated = false) {
	return `${kmLabel(km)} · ${formatDuration(minutes)}${estimated ? " (stima)" : ""}`;
}
function tripStartMs(date, time) {
	const [y, m, d] = date.split("-").map(Number);
	const [hh, mm] = (time || "00:00").split(":").map(Number);
	if (!y || !m || !d) return NaN;
	const utcGuess = new Date(Date.UTC(y, m - 1, d, hh || 0, mm || 0, 0));
	const zoned = new Date(utcGuess.toLocaleString("en-US", { timeZone: "Europe/Rome" }));
	return utcGuess.getTime() + (utcGuess.getTime() - zoned.getTime());
}
function customerCanEdit(date, time, now = Date.now()) {
	const start = tripStartMs(date, time);
	if (!Number.isFinite(start)) return false;
	return now <= start - 1728e5;
}
function formatWhen(date, time) {
	if (!date) return time;
	const [y, m, d] = date.split("-").map(Number);
	const dt = new Date(y || 1970, (m || 1) - 1, d || 1);
	const label = new Intl.DateTimeFormat("it-IT", {
		weekday: "long",
		day: "numeric",
		month: "long"
	}).format(dt);
	const pretty = label.charAt(0).toUpperCase() + label.slice(1);
	return time ? `${pretty} · ${time}` : pretty;
}
function validPhone(value) {
	const trimmed = value.trim();
	if (!/^[+0-9\s()./-]+$/.test(trimmed)) return false;
	const digits = trimmed.replace(/\D/g, "");
	return digits.length >= 8 && digits.length <= 15;
}
function peopleLabel(count) {
	return `${count} ${count === 1 ? "passeggero" : "passeggeri"}`;
}
function bagsLabel(count) {
	return `${count} ${count === 1 ? "bagaglio" : "bagagli"}`;
}
function validEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function addClock(date, time, minutes) {
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = (time || "00:00").split(":").map(Number);
	const dt = new Date(year || 1970, (month || 1) - 1, day || 1, hour || 0, (minute || 0) + minutes);
	const hh = String(dt.getHours()).padStart(2, "0");
	const mm = String(dt.getMinutes()).padStart(2, "0");
	return {
		date: toISODate(dt),
		time: `${hh}:${mm}`
	};
}
function paymentDueLine(date, time, now = /* @__PURE__ */ new Date()) {
	if (!date || !time) return "Il pagamento va effettuato almeno 48 ore prima del viaggio.";
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = time.split(":").map(Number);
	const start = new Date(year || 1970, (month || 1) - 1, day || 1, hour || 0, minute || 0);
	if (start.getTime() - now.getTime() < 1728e5) return "Il pagamento va effettuato subito, insieme a questa conferma.";
	const due = /* @__PURE__ */ new Date(start.getTime() - 1728e5);
	const hh = String(due.getHours()).padStart(2, "0");
	const mm = String(due.getMinutes()).padStart(2, "0");
	return `Il pagamento va effettuato entro ${formatWhen(toISODate(due), `${hh}:${mm}`)}.`;
}
function paymentNotice(date, time, now = /* @__PURE__ */ new Date()) {
	const line = "Paghi con link, bonifico istantaneo, Satispay o 4 rate Scalapay almeno 48 ore prima del viaggio, oppure subito alla conferma se mancano meno di 48 ore.";
	if (!date || !time) return line;
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = time.split(":").map(Number);
	const start = new Date(year || 1970, (month || 1) - 1, day || 1, hour || 0, minute || 0);
	if (Number.isNaN(start.getTime())) return line;
	if (start.getTime() - now.getTime() < 1728e5) return "Mancano meno di 48 ore: paghi subito alla conferma, con link, bonifico istantaneo, Satispay o 4 rate Scalapay.";
	return line;
}
var VEHICLES = {
	car: {
		id: "car",
		name: "Auto",
		detail: "Omoda 9",
		passengers: 4,
		bagsIncluded: 4,
		bagsMax: 4,
		perKm: 2.2,
		minimum: 45,
		waitPerMin: 50 / 60
	},
	van: {
		id: "van",
		name: "Van",
		detail: "Mercedes Classe V",
		passengers: 8,
		bagsIncluded: 8,
		bagsMax: 30,
		perKm: 2.4,
		minimum: 50,
		waitPerMin: 1
	}
};
var EXTRA_PRICES = {
	meetGreet: 15,
	stop: 25
};
/** Fuori sede: non è una voce in preventivo, entra nel totale. */
var APPROACH_PER_KM = .5;
/** 1–4 auto, 5–8 van, 9–11 auto+van, 12–16 due van. */
function fleetForPassengers(passengers, luggage = 0) {
	const people = Math.min(16, Math.max(1, Math.round(passengers) || 1));
	if (people <= VEHICLES.car.passengers && luggage <= VEHICLES.car.bagsIncluded) return {
		cars: 1,
		vans: 0
	};
	if (people <= 8) return {
		cars: 0,
		vans: 1
	};
	if (people <= 11) return {
		cars: 1,
		vans: 1
	};
	return {
		cars: 0,
		vans: 2
	};
}
function fleetLabel(fleet) {
	if (fleet.cars > 0 && fleet.vans > 0) return fleet.vans > 1 ? `${fleet.cars} auto + ${fleet.vans} van` : "Auto + Van";
	if (fleet.vans > 1) return `${fleet.vans} van`;
	if (fleet.vans === 1) return "Van";
	return "Auto";
}
function tripFleet(trip) {
	if (trip.fleet && trip.fleet.cars + trip.fleet.vans > 0) return trip.fleet;
	if (trip.passengers > 8) return fleetForPassengers(trip.passengers, trip.luggage);
	if (trip.vehicle === "van" || trip.passengers > VEHICLES.car.passengers || trip.luggage > VEHICLES.car.bagsIncluded) return {
		cars: 0,
		vans: 1
	};
	return {
		cars: 1,
		vans: 0
	};
}
function fleetText(trip) {
	const fleet = tripFleet(trip);
	if (fleet.cars + fleet.vans > 1) return fleetLabel(fleet);
	if (fleet.vans === 1) return `${VEHICLES.van.name} · ${VEHICLES.van.detail}`;
	return `${VEHICLES.car.name} · ${VEHICLES.car.detail}`;
}
var HOLIDAYS = {
	"2026-01-01": "Capodanno",
	"2026-01-06": "Epifania",
	"2026-04-05": "Pasqua",
	"2026-04-06": "Lunedì dell'Angelo",
	"2026-04-25": "Liberazione",
	"2026-05-01": "Festa del Lavoro",
	"2026-06-02": "Festa della Repubblica",
	"2026-08-15": "Ferragosto",
	"2026-11-01": "Ognissanti",
	"2026-12-08": "Immacolata",
	"2026-12-25": "Natale",
	"2026-12-26": "Santo Stefano",
	"2027-01-01": "Capodanno",
	"2027-01-06": "Epifania",
	"2027-03-28": "Pasqua",
	"2027-03-29": "Lunedì dell'Angelo",
	"2027-04-25": "Liberazione",
	"2027-05-01": "Festa del Lavoro",
	"2027-06-02": "Festa della Repubblica",
	"2027-08-15": "Ferragosto",
	"2027-11-01": "Ognissanti",
	"2027-12-08": "Immacolata",
	"2027-12-25": "Natale",
	"2027-12-26": "Santo Stefano"
};
var DEFAULT_DISCOUNTS = [];
function normalizeDiscount(value) {
	if (!value || typeof value !== "object") return null;
	const row = value;
	const code = String(row.code ?? "").trim().toUpperCase();
	if (!code) return null;
	const num = (key, alt) => {
		const next = Number(row[key] ?? row[alt]);
		return Number.isFinite(next) ? next : 0;
	};
	const activeRaw = row.active;
	if (!(activeRaw !== false && activeRaw !== "f" && activeRaw !== "false" && activeRaw !== 0 && activeRaw !== "0")) return null;
	const meet = row.meetGreetFree ?? row.meet_greet_free;
	return {
		code,
		active: true,
		totalPercent: num("totalPercent", "total_percent"),
		ridePercent: num("ridePercent", "ride_percent"),
		minFare: num("minFare", "min_fare"),
		nightPercent: num("nightPercent", "night_percent"),
		holidayPercent: num("holidayPercent", "holiday_percent"),
		waitPercent: num("waitPercent", "wait_percent"),
		meetGreetFree: meet === true || meet === "t" || meet === "true",
		maxAmount: Math.max(0, num("maxAmount", "max_discount")),
		vehicle: row.vehicle === "car" || row.vehicle === "van" ? row.vehicle : "all"
	};
}
function findDiscount(code, rules = DEFAULT_DISCOUNTS) {
	const key = code.trim().toUpperCase();
	if (!key) return null;
	for (const rule of rules) {
		const normalized = normalizeDiscount(rule);
		if (normalized?.code === key) return normalized;
	}
	return null;
}
function discountSummary(rule) {
	if (!(rule.ridePercent > 0 || rule.nightPercent > 0 || rule.holidayPercent > 0 || rule.waitPercent > 0 || rule.meetGreetFree) && rule.totalPercent > 0) {
		const cap = rule.maxAmount > 0 ? `, massimo ${euroLabel(rule.maxAmount)}` : "";
		const where = rule.vehicle === "car" ? " Solo auto." : rule.vehicle === "van" ? " Solo van." : "";
		return `Sconto ${rule.totalPercent}% sul totale${cap}.${where}`;
	}
	const parts = [];
	if (rule.ridePercent > 0) parts.push(rule.minFare > 0 ? `${rule.ridePercent}% sulla tratta oltre ${euroLabel(rule.minFare)}` : `${rule.ridePercent}% sulla tratta`);
	if (rule.nightPercent > 0) parts.push(`notturno -${rule.nightPercent}%`);
	if (rule.holidayPercent > 0) parts.push(`festivo -${rule.holidayPercent}%`);
	if (rule.meetGreetFree) parts.push("meet & greet gratuito");
	if (rule.waitPercent > 0) parts.push(`attesa -${rule.waitPercent}%`);
	if (rule.maxAmount > 0) parts.push(`massimo ${euroLabel(rule.maxAmount)}`);
	if (rule.vehicle === "car") parts.push("solo auto");
	if (rule.vehicle === "van") parts.push("solo van");
	return parts.join(" · ");
}
function discountFits(rule, fleet) {
	if (rule.vehicle === "car") return fleet.cars > 0;
	if (rule.vehicle === "van") return fleet.vans > 0;
	return true;
}
function euroLabel(amount) {
	return `${amount} €`;
}
function applyDiscount(lines, rule) {
	const code = rule.code.toUpperCase();
	const start = lines.length;
	const totalPercent = Number(rule.totalPercent) || 0;
	const ridePercent = Number(rule.ridePercent) || 0;
	const nightPercent = Number(rule.nightPercent) || 0;
	const holidayPercent = Number(rule.holidayPercent) || 0;
	const waitPercent = Number(rule.waitPercent) || 0;
	const minFare = Number(rule.minFare) || 0;
	const base = lines.slice();
	if (totalPercent > 0) {
		const off = money(money(base.reduce((sum, line) => sum + line.amount, 0)) * totalPercent / 100);
		if (off > 0) lines.push({
			label: `Sconto ${code} · ${totalPercent}%`,
			amount: -off,
			kind: "discount"
		});
	} else {
		const ride = money(base.filter((line) => line.kind === "ride").reduce((sum, line) => sum + line.amount, 0));
		if (ridePercent > 0 && ride > minFare) {
			const off = money(ride * ridePercent / 100);
			if (off > 0) lines.push({
				label: `Sconto ${code} · tratta ${ridePercent}%`,
				amount: -off,
				kind: "discount"
			});
		}
		for (const line of base) {
			if (line.kind === "night" && nightPercent > 0) {
				const off = money(line.amount * nightPercent / 100);
				if (off > 0) lines.push({
					label: `Sconto ${code} · notturno ${nightPercent}%`,
					amount: -off,
					kind: "discount"
				});
			}
			if (line.kind === "holiday" && holidayPercent > 0) {
				const off = money(line.amount * holidayPercent / 100);
				if (off > 0) lines.push({
					label: `Sconto ${code} · festivo ${holidayPercent}%`,
					amount: -off,
					kind: "discount"
				});
			}
			if ((line.kind === "wait" || line.kind === "slow") && waitPercent > 0) {
				const off = money(line.amount * waitPercent / 100);
				if (off > 0) lines.push({
					label: `Sconto ${code} · attesa ${waitPercent}%`,
					amount: -off,
					kind: "discount"
				});
			}
			if (line.kind === "meet" && rule.meetGreetFree && line.amount > 0) lines.push({
				label: `Sconto ${code} · meet & greet gratuito`,
				amount: -line.amount,
				kind: "discount"
			});
		}
	}
	const max = Number(rule.maxAmount) || 0;
	if (max <= 0 || lines.length === start) return;
	if (money(lines.slice(start).reduce((sum, line) => sum + Math.abs(line.amount), 0)) <= max) return;
	lines.splice(start);
	lines.push({
		label: `Sconto ${code} · massimo ${euroLabel(max)}`,
		amount: -max,
		kind: "discount"
	});
}
function money(n) {
	return Math.round(n * 100) / 100;
}
function priceSplit(total, passengers) {
	const perPassenger = money(total / Math.max(1, passengers || 1));
	const installmentTotal = money(total * 1);
	return {
		perPassenger,
		installment: money(installmentTotal / 4),
		installmentTotal
	};
}
/** 100 km in condizioni normali stanno tra 1 ora e 1 ora e mezza. Oltre, il tempo in più è attesa. */
function slowExtraMinutes(km, minutes) {
	if (km <= 0 || minutes <= 0) return 0;
	const standard = km / 100 * 90;
	return Math.max(0, Math.round(minutes - standard));
}
function at(date, time) {
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = time.split(":").map(Number);
	return new Date(year || 1970, (month || 1) - 1, day || 1, hour || 0, minute || 0).getTime();
}
function gapWaitMinutes(departDate, departTime, travelMinutes, returnDate, returnTime) {
	if (!departDate || !departTime || !returnDate || !returnTime) return 0;
	const back = at(returnDate, returnTime);
	const arrival = at(departDate, departTime) + travelMinutes * 60 * 1e3;
	if (back <= arrival) return 0;
	return Math.round((back - arrival) / 6e4);
}
function billedWaitMinutes(minutes) {
	if (minutes <= 15) return 0;
	return Math.ceil(minutes / 30) * 30;
}
/** Il tempo oltre lo standard non ha i 15 minuti gratuiti: si paga dal primo scatto di 30. */
function billedSlowMinutes(minutes) {
	if (minutes <= 0) return 0;
	return Math.ceil(minutes / 30) * 30;
}
function waitBlockLabel(minutes) {
	if (minutes <= 0) return "nessuna";
	if (minutes % 60 === 0) {
		const hours = minutes / 60;
		return hours === 1 ? "1 ora" : `${hours} ore`;
	}
	const hours = Math.floor(minutes / 60);
	const rest = minutes % 60;
	if (hours === 0) return `${minutes} min`;
	return `${hours} h ${rest} min`;
}
function isNightTime(time) {
	if (!time || !time.includes(":")) return false;
	const [h, m] = time.split(":").map(Number);
	if (Number.isNaN(h)) return false;
	const mins = h * 60 + (m || 0);
	return mins >= 1320 || mins < 360;
}
/** Comune di Bologna, contorno stretto: i comuni vicini restano fuori. */
var BOLOGNA_RING = [
	[44.56, 11.3],
	[44.552, 11.365],
	[44.538, 11.41],
	[44.518, 11.432],
	[44.49, 11.415],
	[44.468, 11.398],
	[44.45, 11.378],
	[44.428, 11.345],
	[44.436, 11.3],
	[44.458, 11.282],
	[44.488, 11.276],
	[44.518, 11.246],
	[44.546, 11.268]
];
function inBologna(lat, lon) {
	let inside = false;
	for (let i = 0, j = BOLOGNA_RING.length - 1; i < BOLOGNA_RING.length; j = i++) {
		const [yi, xi] = BOLOGNA_RING[i];
		const [yj, xj] = BOLOGNA_RING[j];
		if (xi === xj) continue;
		if (xi > lon !== xj > lon && lat < (yj - yi) * (lon - xi) / (xj - xi) + yi) inside = !inside;
	}
	return inside;
}
/** Vero solo se partenza, arrivo e soste sono tutti nel comune. */
function serviceInBologna(points) {
	const places = points.filter((point) => Boolean(point && Number.isFinite(point.lat) && Number.isFinite(point.lon)));
	return places.length >= 2 && places.every((point) => inBologna(point.lat, point.lon));
}
function holidayOn(date) {
	if (!date) return null;
	if (HOLIDAYS[date]) return HOLIDAYS[date];
	const [year, month, day] = date.split("-").map(Number);
	if (!year || !month || !day) return null;
	if (new Date(year, month - 1, day).getDay() === 0) return "Domenica";
	return null;
}
function buildQuote(input) {
	if (!input.fleetPart && (input.passengers ?? 0) > 8) return combineFleet(input);
	const vehicle = VEHICLES[input.vehicle];
	const floor = vehicle.minimum;
	const cityFare = input.bologna ? input.vehicle === "van" ? 65 : 60 : 0;
	const lines = [];
	const outboundKm = input.outboundKm > 0 ? input.outboundKm : input.km;
	const outboundMinutes = input.outboundMinutes > 0 ? input.outboundMinutes : input.minutes;
	const backKm = Math.max(0, input.km - outboundKm);
	const backMinutes = Math.max(0, input.minutes - outboundMinutes);
	const returnKm = input.roundTrip ? backKm > .5 ? backKm : outboundKm : 0;
	const returnMinutes = input.roundTrip ? backMinutes > .5 ? backMinutes : outboundMinutes : 0;
	const differentDay = input.roundTrip && Boolean(input.date) && Boolean(input.returnDate) && input.date !== input.returnDate;
	const sameDay = input.roundTrip && !differentDay && Boolean(input.date) && Boolean(input.returnTime) && Boolean(input.time);
	const priceLeg = (km) => {
		if (cityFare) return cityFare;
		const raw = money(km * vehicle.perKm);
		return raw < floor ? floor : raw;
	};
	const slowBilled = (km, minutes) => billedSlowMinutes(slowExtraMinutes(km, minutes));
	let billedKm = input.roundTrip ? outboundKm + returnKm : outboundKm;
	let ride = input.roundTrip ? money(priceLeg(outboundKm) + priceLeg(returnKm)) : cityFare || money(billedKm * vehicle.perKm);
	let rideLabel = input.roundTrip ? "Percorrenza andata e ritorno" : "Percorrenza";
	let waitSource = input.waitMinutes;
	let sameDayChoice = null;
	let goRide = input.roundTrip ? priceLeg(outboundKm) : ride;
	let backRide = input.roundTrip ? priceLeg(returnKm) : 0;
	let separateLegs = input.roundTrip;
	const disposal = Boolean(input.roundTrip && input.vehicleStay);
	if (disposal) {
		const roundKm = outboundKm + returnKm;
		billedKm = roundKm;
		ride = priceLeg(roundKm);
		goRide = ride;
		backRide = 0;
		rideLabel = "Transfer andata e ritorno";
		waitSource = Math.max(0, input.waitMinutes);
		sameDayChoice = null;
		separateLegs = false;
	} else if (sameDay) {
		const gap = gapWaitMinutes(input.date, input.time, outboundMinutes, input.returnDate, input.returnTime);
		const declined = input.waitManual && input.waitMinutes <= 0;
		const stay = declined ? 0 : input.waitManual && input.waitMinutes > gap ? input.waitMinutes : gap;
		if (!declined && stay > 0) {
			const oneWayRide = cityFare || money(outboundKm * vehicle.perKm);
			const oneWayWait = billedWaitMinutes(stay);
			if ((oneWayRide < floor ? floor : oneWayRide) + money(oneWayWait * vehicle.waitPerMin) <= priceLeg(outboundKm) + priceLeg(returnKm)) {
				billedKm = outboundKm;
				ride = oneWayRide;
				goRide = oneWayRide;
				backRide = 0;
				rideLabel = "Percorrenza andata";
				waitSource = stay;
				sameDayChoice = "wait";
				separateLegs = false;
			} else {
				sameDayChoice = "round";
				waitSource = 0;
			}
		} else {
			sameDayChoice = "round";
			waitSource = 0;
		}
	}
	const outboundSlowBilled = slowBilled(outboundKm, outboundMinutes);
	const returnSlowBilled = separateLegs || disposal ? slowBilled(returnKm, returnMinutes) : 0;
	const billedSlow = outboundSlowBilled + returnSlowBilled;
	if (separateLegs) {
		lines.push({
			label: "Transfer andata",
			amount: goRide,
			kind: "ride"
		});
		lines.push({
			label: "Transfer ritorno",
			amount: backRide,
			kind: "ride"
		});
	} else if (ride < floor) {
		ride = floor;
		lines.push({
			label: "Tariffa minima",
			amount: floor,
			kind: "ride"
		});
	} else lines.push({
		label: rideLabel,
		amount: ride,
		kind: "ride"
	});
	const outboundNight = isNightTime(input.time);
	const returnNight = input.roundTrip && isNightTime(input.returnTime);
	const night = outboundNight || returnNight;
	const holiday = holidayOn(input.date) ?? (input.roundTrip ? holidayOn(input.returnDate) : null);
	if (separateLegs) {
		let nightAmount = 0;
		let holidayAmount = 0;
		let holidayName = null;
		let nightHoliday = null;
		const addLeg = (amount, time, date) => {
			const day = holidayOn(date);
			if (isNightTime(time)) {
				nightAmount += amount * .2;
				if (day) nightHoliday = nightHoliday ?? day;
			} else if (day) {
				holidayAmount += amount * .2;
				holidayName = holidayName ?? day;
			}
		};
		addLeg(goRide, input.time, input.date);
		addLeg(backRide, input.returnTime, input.returnDate);
		if (nightAmount > 0) lines.push({
			label: nightHoliday ? `Supplemento notturno 22–06 · ${nightHoliday}` : "Supplemento notturno 22–06",
			amount: money(nightAmount),
			kind: "night"
		});
		if (holidayAmount > 0) lines.push({
			label: `Supplemento festivo 20% · ${holidayName}`,
			amount: money(holidayAmount),
			kind: "holiday"
		});
	} else if (night || holiday) {
		const pct = .2;
		const label = night ? holiday ? `Supplemento notturno 22–06 · ${holiday}` : "Supplemento notturno 22–06" : `Supplemento festivo 20% · ${holiday}`;
		lines.push({
			label,
			amount: money(ride * pct),
			kind: night ? "night" : "holiday"
		});
	}
	const slowText = (minutes) => `Tempo oltre lo standard · ${waitBlockLabel(minutes)}`;
	const slowParts = [];
	if (separateLegs) {
		if (outboundSlowBilled > 0) slowParts.push(`andata ${waitBlockLabel(outboundSlowBilled)}`);
		if (returnSlowBilled > 0) slowParts.push(`ritorno ${waitBlockLabel(returnSlowBilled)}`);
	}
	const slowAmount = money((separateLegs || disposal ? outboundSlowBilled + returnSlowBilled : billedSlow) * vehicle.waitPerMin);
	const slow = slowAmount > 0 ? {
		minutes: separateLegs || disposal ? outboundSlowBilled + returnSlowBilled : billedSlow,
		amount: slowAmount,
		label: slowParts.length > 0 ? `Percorrenza lenta · ${slowParts.join(", ")}` : slowText(billedSlow)
	} : void 0;
	if (input.includeSlow && slow) {
		const addRide = (label, amount) => {
			const line = label ? lines.find((item) => item.kind === "ride" && item.label === label) : lines.find((item) => item.kind === "ride");
			if (line && amount > 0) line.amount = money(line.amount + amount);
		};
		if (separateLegs) {
			addRide("Transfer andata", money(outboundSlowBilled * vehicle.waitPerMin));
			addRide("Transfer ritorno", money(returnSlowBilled * vehicle.waitPerMin));
		} else addRide(void 0, slow.amount);
	}
	const billedWait = billedWaitMinutes(waitSource);
	if (billedWait > 0) lines.push({
		label: disposal ? `Attesa a disposizione · ${waitBlockLabel(billedWait)}` : sameDayChoice === "wait" ? `Attesa tra andata e ritorno · ${waitBlockLabel(billedWait)}` : `Attesa · ${waitBlockLabel(billedWait)}`,
		amount: money(billedWait * vehicle.waitPerMin),
		kind: "wait"
	});
	if (input.stopCount > 0) lines.push({
		label: input.stopCount === 1 ? "Sosta intermedia" : `Soste intermedie · ${input.stopCount}`,
		amount: input.stopCount * EXTRA_PRICES.stop,
		kind: "extra"
	});
	if (input.meetGreet) lines.push({
		label: "Meet & greet",
		amount: EXTRA_PRICES.meetGreet,
		kind: "meet"
	});
	const code = input.discountCode.trim().toUpperCase();
	const rule = code ? findDiscount(code, input.discountRules ?? DEFAULT_DISCOUNTS) : null;
	let discountCode = null;
	const quotedFleet = {
		cars: input.vehicle === "car" ? 1 : 0,
		vans: input.vehicle === "van" ? 1 : 0
	};
	if (rule && discountFits(rule, quotedFleet)) {
		applyDiscount(lines, rule);
		discountCode = code;
	}
	let approachAmount = 0;
	if (!input.fleetPart && (input.approachKm ?? 0) > 0) {
		approachAmount = money((input.approachKm ?? 0) * APPROACH_PER_KM);
		const rideLine = lines.find((line) => line.kind === "ride");
		if (rideLine && approachAmount > 0) rideLine.amount = money(rideLine.amount + approachAmount);
	}
	const total = money(Math.max(0, lines.reduce((sum, line) => sum + line.amount, 0)));
	const legs = separateLegs ? [{
		label: "Transfer andata",
		km: outboundKm,
		minutes: outboundMinutes,
		amount: lines.find((line) => line.label === "Transfer andata")?.amount ?? goRide
	}, {
		label: "Transfer ritorno",
		km: returnKm,
		minutes: returnMinutes,
		amount: lines.find((line) => line.label === "Transfer ritorno")?.amount ?? backRide
	}] : void 0;
	return {
		lines,
		total,
		km: sameDayChoice === "wait" ? billedKm : input.roundTrip ? outboundKm + returnKm : outboundKm,
		minutes: sameDayChoice === "wait" ? outboundMinutes : input.roundTrip ? outboundMinutes + returnMinutes : outboundMinutes,
		estimated: input.estimated,
		night,
		holiday: separateLegs ? holidayOn(input.date) ?? holidayOn(input.returnDate) : holiday,
		vehicle: input.vehicle,
		sameDayChoice,
		appliedWait: disposal || sameDayChoice === "wait" ? waitSource : 0,
		discountCode,
		approachAmount,
		approachKm: (input.approachKm ?? 0) > 0 ? input.approachKm : void 0,
		remote: input.remote || void 0,
		slow,
		includeSlow: input.includeSlow && slow ? true : void 0,
		legs
	};
}
function combineFleet(input) {
	const fleet = fleetForPassengers(input.passengers ?? 9, input.luggage);
	const units = [...Array.from({ length: fleet.cars }, () => "car"), ...Array.from({ length: fleet.vans }, () => "van")];
	const parts = units.map((vehicle, index) => buildQuote({
		...input,
		vehicle,
		passengers: 0,
		fleetPart: true,
		approachKm: 0,
		discountCode: "",
		luggage: 0,
		stopCount: index === 0 ? input.stopCount : 0,
		childSeats: index === 0 ? input.childSeats : 0,
		boosters: index === 0 ? input.boosters : 0,
		meetGreet: index === 0 ? input.meetGreet : false,
		pet: index === 0 ? input.pet : false
	}));
	const lines = [];
	for (const part of parts) for (const line of part.lines) {
		const found = lines.find((item) => item.label === line.label && item.kind === line.kind);
		if (found) found.amount = money(found.amount + line.amount);
		else lines.push({ ...line });
	}
	const code = input.discountCode.trim().toUpperCase();
	const rule = code ? findDiscount(code, input.discountRules ?? DEFAULT_DISCOUNTS) : null;
	let discountCode = null;
	if (rule && (rule.vehicle === "car" || rule.vehicle === "van")) {
		if (discountFits(rule, fleet)) {
			const scoped = [];
			parts.forEach((part, index) => {
				if (units[index] !== rule.vehicle) return;
				for (const line of part.lines) {
					const found = scoped.find((item) => item.label === line.label && item.kind === line.kind);
					if (found) found.amount = money(found.amount + line.amount);
					else scoped.push({ ...line });
				}
			});
			const before = scoped.length;
			applyDiscount(scoped, rule);
			for (const line of scoped.slice(before)) lines.push({ ...line });
			discountCode = code;
		}
	} else if (rule) {
		applyDiscount(lines, rule);
		discountCode = code;
	}
	const approachAmount = money((input.approachKm ?? 0) * APPROACH_PER_KM * (fleet.cars + fleet.vans));
	if (approachAmount > 0) {
		const rideLine = lines.find((line) => line.kind === "ride");
		if (rideLine) rideLine.amount = money(rideLine.amount + approachAmount);
	}
	const base = parts[0];
	const slowAmount = money(parts.reduce((sum, part) => sum + (part.slow?.amount ?? 0), 0));
	const slow = slowAmount > 0 ? {
		minutes: base.slow?.minutes ?? 0,
		amount: slowAmount,
		label: base.slow?.label ?? "Percorrenza lenta"
	} : void 0;
	const legs = base.legs?.map((leg) => {
		const line = lines.find((item) => item.label === leg.label);
		return line ? {
			...leg,
			amount: line.amount
		} : leg;
	});
	return {
		...base,
		lines,
		total: money(Math.max(0, lines.reduce((sum, line) => sum + line.amount, 0))),
		vehicle: fleet.vans > 0 ? "van" : "car",
		night: parts.some((part) => part.night),
		holiday: parts.find((part) => part.holiday)?.holiday ?? null,
		discountCode,
		approachAmount,
		approachKm: (input.approachKm ?? 0) > 0 ? input.approachKm : void 0,
		remote: input.remote || void 0,
		slow,
		includeSlow: input.includeSlow && slow ? true : void 0,
		fleet,
		legs
	};
}
var PAYMENT_METHODS = [
	{
		id: "bonifico",
		label: "Bonifico istantaneo"
	},
	{
		id: "link",
		label: "Link di pagamento"
	},
	{
		id: "satispay",
		label: "Satispay"
	},
	{
		id: "rate",
		label: "4 rate Scalapay"
	}
];
var BANK = {
	iban: "IT30F0200809500000421149653",
	holder: "Mario Topo"
};
create()(persist((set) => ({
	bookings: [],
	addBooking: (booking) => set((state) => ({ bookings: [booking, ...state.bookings] })),
	removeBooking: (id) => set((state) => ({ bookings: state.bookings.filter((booking) => booking.id !== id) })),
	confirmBooking: (id, patch) => set((state) => ({ bookings: state.bookings.map((booking) => booking.id === id ? {
		...booking,
		status: "confirmed",
		paymentMethod: patch.paymentMethod,
		paymentLink: patch.paymentLink.trim()
	} : booking) }))
}), {
	name: "mt-travel-bookings-v1",
	skipHydration: true
}));
var CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeBookingCode() {
	const bytes = crypto.getRandomValues(/* @__PURE__ */ new Uint8Array(4));
	let code = "";
	for (const byte of bytes) code += CODE_ALPHABET[byte % 32];
	return `MT-${code}`;
}
function bookingMessage(booking) {
	const { trip, customer, quote } = booking;
	const lines = [
		"Richiesta NCC · MT Travel Service",
		`Codice: ${booking.code}`,
		"",
		`Cliente: ${customer.firstName} ${customer.lastName}`,
		`Telefono: ${customer.phone}`,
		`Email: ${customer.email}`,
		"",
		`${fleetLabel(tripFleet(trip))} · ${peopleLabel(trip.passengers)} · ${bagsLabel(trip.luggage)} standard`,
		`Partenza: ${trip.origin.label}`,
		...trip.stops.map((stop, index) => `Fermata ${index + 1}: ${stop.label}`),
		`Arrivo: ${trip.destination.label}`,
		`Data: ${formatWhen(trip.date, trip.time)}`,
		trip.roundTrip ? `Ritorno: ${formatWhen(trip.returnDate, trip.returnTime)}` : "Solo andata"
	];
	if (trip.oversizedNote?.trim()) lines.push(`Bagagli fuori misura: ${trip.oversizedNote.trim()}`);
	if (trip.meetGreet && trip.landingTime) {
		lines.push(`Volo: ${trip.flight.trim() || "—"}`);
		lines.push(`Atterraggio previsto: ${formatWhen(trip.landingDate || trip.date, trip.landingTime)}`);
		lines.push(`Attesa gratuita in aeroporto con cartello nominativo: 1 ora dall'atterraggio previsto.`);
	} else if (trip.flight.trim()) lines.push(`Volo o treno: ${trip.flight.trim()}`);
	if (trip.waitMinutes > 0) {
		const billed = billedWaitMinutes(trip.waitMinutes);
		lines.push(billed > 0 ? `Attesa: ${waitBlockLabel(billed)} a pagamento${trip.meetGreet ? " (oltre l'ora gratuita dall'atterraggio previsto)" : " (oltre 15 min, a scatti di 30)"}` : trip.meetGreet ? "Attesa extra: inclusa nell'ora gratuita dall'atterraggio previsto" : "Attesa: entro 15 min, inclusa");
	}
	const split = priceSplit(quote.total, trip.passengers);
	lines.push("");
	if (quote.legs && quote.legs.length > 1) for (const leg of quote.legs) lines.push(`${leg.label}: ${legMeasure(leg.km, leg.minutes, quote.estimated)}`);
	else {
		lines.push(`Distanza: ${kmLabel(quote.km)}${quote.estimated ? " (stima)" : ""}`);
		lines.push(`Durata: ${formatDuration(quote.minutes)}`);
	}
	lines.push(`A passeggero: ${euro(split.perPassenger)}`, `Totale: ${customerPrice(quote.total, priceMarked(quote))}`, `4 rate Scalapay da ${euro(split.installment)}`, ...quote.lines.filter((line) => line.kind !== "slow").map((line) => `· ${line.label}: ${euro(line.amount)}`));
	if (customer.notes.trim()) lines.push("", `Note: ${customer.notes.trim()}`);
	lines.push("", `Pagamento scelto: ${paymentLabel(booking.paymentMethod)}`);
	if (quote.remote) lines.push("", REMOTE_NOTICE);
	lines.push("", "Acqua inclusa. Vietato mangiare e fumare a bordo.");
	lines.push("", paymentNotice(trip.date, trip.time));
	lines.push("", "Preventivo indicativo, da confermare da MT Travel.");
	return lines.join("\n");
}
function paymentLabel(method) {
	return PAYMENT_METHODS.find((item) => item.id === method)?.label ?? "Da scegliere";
}
function transferCausale(booking) {
	const [year, month, day] = booking.trip.date.split("-");
	return `pagamento transfer ${day && month && year ? `${day}/${month}/${year}` : booking.trip.date} ${booking.customer.firstName} ${booking.customer.lastName}`.trim();
}
function confirmationMessage(booking, paymentLink = booking.paymentLink ?? "") {
	const { trip, customer, quote } = booking;
	const split = priceSplit(quote.total, trip.passengers);
	const method = booking.paymentMethod;
	const lines = [
		`Buongiorno ${customer.firstName},`,
		"",
		`il transfer ${booking.code} è confermato.`,
		"",
		`${fleetLabel(tripFleet(trip))} · ${peopleLabel(trip.passengers)}`,
		`Partenza: ${trip.origin.label}`,
		`Arrivo: ${trip.destination.label}`,
		`Data: ${formatWhen(trip.date, trip.time)}`,
		trip.roundTrip ? `Ritorno: ${formatWhen(trip.returnDate, trip.returnTime)}` : "Solo andata",
		""
	];
	if (quote.legs && quote.legs.length > 1) {
		for (const leg of quote.legs) lines.push(`${leg.label}: ${legMeasure(leg.km, leg.minutes, quote.estimated)}`);
		lines.push("");
	}
	if (trip.meetGreet && trip.landingTime) {
		lines.push(`Attesa gratuita in aeroporto con cartello nominativo: 1 ora dall'orario di atterraggio previsto del volo (${formatWhen(trip.landingDate || trip.date, trip.landingTime)}).`);
		lines.push("");
	}
	if (method === "rate") {
		lines.push(`Totale: ${customerPrice(quote.total, priceMarked(quote))}`);
		lines.push(`4 rate Scalapay da ${euro(split.installment)}`);
	} else lines.push(`Totale: ${customerPrice(quote.total, priceMarked(quote))}`);
	if (quote.remote) lines.push("", REMOTE_NOTICE);
	lines.push("");
	if (method === "bonifico") {
		lines.push("Pagamento con bonifico.");
		lines.push(`IBAN: ${BANK.iban}`);
		lines.push(`Intestato a ${BANK.holder}`);
		lines.push(`Causale: ${transferCausale(booking)}`);
	} else {
		lines.push(`Pagamento: ${paymentLabel(method)}.`);
		lines.push(`Link: ${paymentLink.trim()}`);
	}
	lines.push("", paymentDueLine(trip.date, trip.time));
	lines.push("", "Acqua inclusa.");
	lines.push("", "MT TRAVEL SERVICE");
	lines.push("Noleggio con conducente");
	return lines.join("\n");
}
function rejectionMessage(booking, reason) {
	const { trip, customer } = booking;
	const lines = [
		`Buongiorno ${customer.firstName},`,
		"",
		`non possiamo confermare il transfer ${booking.code}.`
	];
	if (reason.kind === "distance") lines.push(`La tratta è troppo distante dalla nostra sede di ${reason.base.trim()}.`);
	else lines.push(`Non abbiamo disponibilità dei mezzi per la data selezionata (${formatWhen(trip.date, trip.time)}).`);
	lines.push("", "MT TRAVEL SERVICE", "Noleggio con conducente");
	return lines.join("\n");
}
function whatsappHref(text) {
	return `https://wa.me/?text=${encodeURIComponent(text)}`;
}
function whatsappTo(phone, text) {
	let digits = phone.replace(/\D/g, "");
	if (digits.startsWith("00")) digits = digits.slice(2);
	if (digits.length === 10 && digits.startsWith("3")) digits = `39${digits}`;
	return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
function mailHref(booking, text, subject = `Richiesta NCC ${booking.code}`) {
	return `mailto:${encodeURIComponent(booking.customer.email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
}
function calendarStamp(date) {
	const pad = (value) => String(value).padStart(2, "0");
	return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`;
}
function atLocal(date, time, extraMinutes = 0) {
	const [year, month, day] = date.split("-").map(Number);
	const [hour, minute] = (time || "00:00").split(":").map(Number);
	return new Date(year, (month || 1) - 1, day || 1, hour || 0, (minute || 0) + extraMinutes);
}
function googleCalendarHref(booking) {
	const { trip, quote } = booking;
	const start = atLocal(trip.date, trip.time);
	const end = quote.legs && quote.legs.length > 1 ? atLocal(trip.date, trip.time, Math.max(quote.legs[0]?.minutes ?? 45, 45)) : trip.roundTrip && trip.returnDate && trip.returnTime ? atLocal(trip.returnDate, trip.returnTime, Math.max(quote.minutes, 45)) : atLocal(trip.date, trip.time, Math.max(quote.minutes, 45));
	return `https://calendar.google.com/calendar/render?${new URLSearchParams({
		action: "TEMPLATE",
		text: `Transfer NCC ${booking.code} · MT Travel`,
		dates: `${calendarStamp(start)}/${calendarStamp(end)}`,
		details: bookingMessage(booking),
		location: trip.origin.label
	}).toString()}`;
}
//#endregion
export { makeBookingCode as A, tripFleet as B, formatDuration as C, kmLabel as D, googleCalendarHref as E, priceMarked as F, whatsappTo as G, validPhone as H, priceSplit as I, rejectionMessage as L, paymentLabel as M, paymentNotice as N, legMeasure as O, peopleLabel as P, serviceInBologna as R, fleetText as S, gapWaitMinutes as T, waitBlockLabel as U, validEmail as V, whatsappHref as W, discountSummary as _, REMOTE_NOTICE as a, fleetForPassengers as b, bagsLabel as c, bookings_Bp6VBimL_exports as d, buildQuote as f, discountFits as g, customerPrice as h, PAYMENT_METHODS as i, normalizeDiscount as j, mailHref as k, billedWaitMinutes as l, customerCanEdit as m, DEFAULT_DISCOUNTS as n, VEHICLES as o, confirmationMessage as p, EXTRA_PRICES as r, addClock as s, BANK as t, bookingMessage as u, euro as v, formatWhen as w, fleetLabel as x, findDiscount as y, toISODate as z };
