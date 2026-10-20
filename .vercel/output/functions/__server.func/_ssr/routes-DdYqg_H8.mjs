import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as tripFleet, C as formatDuration, D as kmLabel, F as priceMarked, H as validPhone, I as priceSplit, O as legMeasure, P as peopleLabel, R as serviceInBologna, T as gapWaitMinutes, U as waitBlockLabel, V as validEmail, W as whatsappHref, _ as discountSummary, b as fleetForPassengers, c as bagsLabel, f as buildQuote, g as discountFits, h as customerPrice, j as normalizeDiscount, k as mailHref, l as billedWaitMinutes, m as customerCanEdit, n as DEFAULT_DISCOUNTS, o as VEHICLES, r as EXTRA_PRICES, s as addClock, u as bookingMessage, v as euro, w as formatWhen, x as fleetLabel, y as findDiscount, z as toISODate } from "./bookings-Bp6VBimL.mjs";
import { a as Minus, d as Check, f as Car, i as Plane, m as BusFront, n as Trash2, o as MessageCircle, r as Plus, s as Mail, u as Copy } from "../_libs/lucide-react.mjs";
import { a as useI18n } from "./router-Bc2zQ2ac.mjs";
import { c as farFromBase, m as lookupDiscount, n as PlaceInput, u as issueBookingGuard, v as reversePlace, w as submitBooking, y as routeTrip } from "./bookings.functions-DHeNUO1W.mjs";
import { a as RequestActions, r as PaymentChoice, t as MapHost } from "./request-actions-DxBl7T6o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DdYqg_H8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PriceSummary({ total, passengers, marked = false }) {
	const split = priceSplit(total, passengers);
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "price-hero text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: t("per")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-3xl font-semibold tabular-nums",
				children: customerPrice(split.perPassenger, marked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t("total")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xl font-semibold tabular-nums",
				children: customerPrice(total, marked)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm",
				children: [
					t("rates"),
					" ",
					euro(split.installment)
				]
			})
		]
	});
}
function QuoteDetails({ quote, passengers, routing, paymentMethod, onPayment, paymentError, paymentName }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-lg border border-border bg-surface p-4 sm:p-5",
		"aria-live": "polite",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: t("quote")
				}), routing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: t("updating")
				}) : null]
			}),
			quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceSummary, {
						total: quote.total,
						passengers,
						marked: priceMarked(quote)
					})
				}),
				quote.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: t("remoteNotice")
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentChoice, {
						value: paymentMethod,
						onChange: onPayment,
						name: paymentName,
						error: paymentError
					})
				}),
				quote.legs && quote.legs.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid gap-1 text-sm text-muted",
					children: quote.legs.map((leg) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						leg.label,
						": ",
						legMeasure(leg.km, leg.minutes, quote.estimated)
					] }, leg.label))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted",
					children: [
						kmLabel(quote.km),
						" · ",
						formatDuration(quote.minutes),
						quote.estimated ? " · stima" : "",
						quote.sameDayChoice === "wait" ? " · stesso giorno: attesa sul posto, senza doppio chilometraggio" : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
					className: "mt-4 grid gap-2 border-t border-border pt-4",
					children: quote.lines.filter((line) => line.kind !== "slow").map((line) => {
						const standout = line.kind === "holiday" || line.kind === "night" || line.kind === "wait";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-baseline justify-between gap-3 text-sm ${standout ? "font-medium text-fg" : ""}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: standout ? "" : "text-muted",
								children: line.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: euro(line.amount)
							})]
						}, line.label);
					})
				}),
				quote.lines.some((line) => line.kind === "holiday") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm",
					children: "C'è il supplemento festivo del 20% sulla percorrenza, domenica e giorni festivi."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-sm text-muted",
					children: quote.estimated ? "Distanza stimata, non sul percorso stradale. Il prezzo può cambiare in conferma." : "Distanza sul percorso stradale. Pedaggi autostradali inclusi nella tariffa."
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: t("pickRoute")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentChoice, {
					value: paymentMethod,
					onChange: onPayment,
					name: paymentName,
					error: paymentError
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: t("tariffNote")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: t("payRule")
			})
		]
	});
}
function focusInvalid() {
	window.requestAnimationFrame(() => {
		[...document.querySelectorAll("[data-invalid='true']")].find((node) => node instanceof HTMLElement && node.getClientRects().length > 0)?.scrollIntoView({
			behavior: "smooth",
			block: "center"
		});
	});
}
var control = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base text-fg";
function Qty({ label, value, min, max, onDelta }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `Diminuisci ${label}`,
				disabled: value <= min,
				onClick: () => onDelta(-1),
				className: "grid size-11 place-items-center rounded-md border border-border bg-bg disabled:opacity-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {
					className: "size-4",
					"aria-hidden": "true"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "w-8 text-center text-lg tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": `Aumenta ${label}`,
				disabled: value >= max,
				onClick: () => onDelta(1),
				className: "grid size-11 place-items-center rounded-md border border-border bg-bg disabled:opacity-40",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
					className: "size-4",
					"aria-hidden": "true"
				})
			})
		]
	});
}
function clampCount(value, min, max) {
	return Math.min(max, Math.max(min, value));
}
function tomorrowDefaults() {
	const now = /* @__PURE__ */ new Date();
	const today = toISODate(now);
	const next = new Date(now);
	next.setDate(next.getDate() + 1);
	return {
		today,
		date: toISODate(next),
		time: "09:00",
		returnTime: "18:00"
	};
}
function BookingPage() {
	const { t } = useI18n();
	const [sending, setSending] = (0, import_react.useState)(false);
	const [sendError, setSendError] = (0, import_react.useState)("");
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	const [mapTarget, setMapTarget] = (0, import_react.useState)(null);
	const [origin, setOrigin] = (0, import_react.useState)(null);
	const [destination, setDestination] = (0, import_react.useState)(null);
	const [originDirty, setOriginDirty] = (0, import_react.useState)(false);
	const [destinationDirty, setDestinationDirty] = (0, import_react.useState)(false);
	const [stops, setStops] = (0, import_react.useState)([]);
	const [roundTrip, setRoundTrip] = (0, import_react.useState)(false);
	const [vehicleStay, setVehicleStay] = (0, import_react.useState)(false);
	const [date, setDate] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("");
	const [returnDate, setReturnDate] = (0, import_react.useState)("");
	const [returnTime, setReturnTime] = (0, import_react.useState)("");
	const [today, setToday] = (0, import_react.useState)("");
	const [passengers, setPassengers] = (0, import_react.useState)(1);
	const [luggage, setLuggage] = (0, import_react.useState)(1);
	const [oversized, setOversized] = (0, import_react.useState)(false);
	const [oversizedNote, setOversizedNote] = (0, import_react.useState)("");
	const [vehicle, setVehicle] = (0, import_react.useState)("car");
	const [meetGreet, setMeetGreet] = (0, import_react.useState)(false);
	const [waitMinutes, setWaitMinutes] = (0, import_react.useState)(0);
	const [waitManual, setWaitManual] = (0, import_react.useState)(false);
	const [discountCode, setDiscountCode] = (0, import_react.useState)("");
	const [discountCatalog, setDiscountCatalog] = (0, import_react.useState)(DEFAULT_DISCOUNTS);
	const [flight, setFlight] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("");
	const scalapay = paymentMethod === "rate";
	const discountRule = scalapay ? null : findDiscount(discountCode, discountCatalog);
	const [privacy, setPrivacy] = (0, import_react.useState)(false);
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [guard, setGuard] = (0, import_react.useState)("");
	const [companyWebsite, setCompanyWebsite] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	const [route, setRoute] = (0, import_react.useState)(null);
	const [routing, setRouting] = (0, import_react.useState)(false);
	const [remote, setRemote] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(null);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const onOriginDirty = (0, import_react.useCallback)((dirty) => setOriginDirty(dirty), []);
	const onDestinationDirty = (0, import_react.useCallback)((dirty) => setDestinationDirty(dirty), []);
	(0, import_react.useEffect)(() => {
		const next = tomorrowDefaults();
		setToday(next.today);
		setDate(next.date);
		setTime(next.time);
		setReturnDate(next.date);
		setReturnTime(next.returnTime);
	}, []);
	(0, import_react.useEffect)(() => {
		if (passengers > VEHICLES.car.passengers && vehicle === "car") setVehicle("van");
	}, [passengers, vehicle]);
	(0, import_react.useEffect)(() => {
		if (luggage > VEHICLES.van.bagsMax) setLuggage(VEHICLES.van.bagsMax);
	}, [luggage]);
	(0, import_react.useEffect)(() => {
		const car = VEHICLES.car;
		if ((luggage > car.bagsIncluded || passengers > car.passengers) && vehicle === "car") setVehicle("van");
	}, [
		luggage,
		passengers,
		vehicle
	]);
	const resolvedStops = (0, import_react.useMemo)(() => stops.map((stop) => stop.place).filter((place) => Boolean(place)), [stops]);
	const routeKey = (0, import_react.useMemo)(() => {
		if (!origin || !destination) return "";
		return `${[
			origin,
			...resolvedStops,
			destination
		].map((place) => `${place.lat},${place.lon}`).join(";")}|${roundTrip ? "r" : "o"}`;
	}, [
		origin,
		destination,
		resolvedStops,
		roundTrip
	]);
	(0, import_react.useEffect)(() => {
		if (!origin || !destination || !routeKey) {
			setRoute(null);
			setRouting(false);
			return;
		}
		const controller = new AbortController();
		setRouting(true);
		const going = [
			origin,
			...resolvedStops,
			destination
		];
		routeTrip(going, roundTrip ? [destination, origin] : null, controller.signal).then((next) => {
			if (!controller.signal.aborted) setRoute(next);
		}).catch((reason) => {
			if (reason instanceof DOMException && reason.name === "AbortError") return;
			if (!controller.signal.aborted) setRoute(null);
		}).finally(() => {
			if (!controller.signal.aborted) setRouting(false);
		});
		return () => controller.abort();
	}, [
		routeKey,
		origin,
		destination,
		resolvedStops,
		roundTrip
	]);
	(0, import_react.useEffect)(() => {
		if (!origin || !destination) {
			setRemote(false);
			return;
		}
		const controller = new AbortController();
		farFromBase(origin, destination, controller.signal).then((next) => {
			if (!controller.signal.aborted) setRemote(next);
		}).catch((reason) => {
			if (reason instanceof DOMException && reason.name === "AbortError") return;
			if (!controller.signal.aborted) setRemote(false);
		});
		return () => controller.abort();
	}, [origin, destination]);
	const serviceDate = date;
	const serviceTime = time;
	const quote = (0, import_react.useMemo)(() => {
		if (!route) return null;
		return buildQuote({
			vehicle,
			km: roundTrip ? route.km : route.outboundKm || route.km,
			minutes: roundTrip ? route.minutes : route.outboundMinutes || route.minutes,
			outboundKm: route.outboundKm || route.km,
			outboundMinutes: route.outboundMinutes || route.minutes,
			estimated: route.estimated,
			roundTrip,
			date: serviceDate,
			time: serviceTime,
			returnDate,
			returnTime,
			luggage,
			childSeats: 0,
			boosters: 0,
			meetGreet,
			pet: false,
			waitMinutes,
			waitManual,
			vehicleStay: roundTrip && vehicleStay,
			stopCount: resolvedStops.length,
			discountCode: scalapay ? "" : discountCode,
			discountRules: discountCatalog,
			passengers,
			remote,
			bologna: serviceInBologna([
				origin,
				destination,
				...resolvedStops
			])
		});
	}, [
		route,
		vehicle,
		roundTrip,
		serviceDate,
		serviceTime,
		returnDate,
		returnTime,
		luggage,
		meetGreet,
		waitMinutes,
		waitManual,
		vehicleStay,
		discountCode,
		discountCatalog,
		scalapay,
		resolvedStops.length,
		passengers,
		remote
	]);
	const selectedWait = vehicleStay ? waitMinutes : !roundTrip || waitManual ? waitMinutes : quote?.sameDayChoice === "wait" ? quote.appliedWait : 0;
	(0, import_react.useEffect)(() => {
		let alive = true;
		issueBookingGuard().then((row) => {
			if (alive) setGuard(row.guard);
		}).catch(() => {
			if (alive) setGuard("");
		});
		return () => {
			alive = false;
		};
	}, [formKey]);
	(0, import_react.useEffect)(() => {
		const code = discountCode.trim().toUpperCase();
		if (code.length < 3) return;
		let alive = true;
		lookupDiscount({ data: { code } }).then((found) => {
			const rule = normalizeDiscount(found);
			if (!alive || !rule) return;
			setDiscountCatalog((current) => {
				return [...current.filter((item) => item.code !== rule.code), rule];
			});
		}).catch(() => void 0);
		return () => {
			alive = false;
		};
	}, [discountCode]);
	(0, import_react.useEffect)(() => {
		if (!waitManual || quote?.sameDayChoice !== "wait" || !roundTrip || !route) return;
		if (!serviceDate || !serviceTime || !returnDate || !returnTime || serviceDate !== returnDate) return;
		const gap = gapWaitMinutes(serviceDate, serviceTime, route.outboundMinutes, returnDate, returnTime);
		if (waitMinutes <= gap + 1) return;
		const next = addClock(serviceDate, serviceTime, Math.round(route.outboundMinutes) + waitMinutes);
		if (next.date === returnDate && next.time === returnTime) return;
		setReturnDate(next.date);
		setReturnTime(next.time);
	}, [
		waitManual,
		waitMinutes,
		quote,
		roundTrip,
		route,
		serviceDate,
		serviceTime,
		returnDate,
		returnTime
	]);
	const mapData = (0, import_react.useMemo)(() => {
		const pins = [];
		if (origin) pins.push({
			...origin,
			kind: "a"
		});
		for (const stop of resolvedStops) pins.push({
			...stop,
			kind: "s"
		});
		if (destination) pins.push({
			...destination,
			kind: "b"
		});
		return {
			pins,
			line: route?.line ?? []
		};
	}, [
		origin,
		destination,
		resolvedStops,
		route
	]);
	function validate() {
		const next = {};
		const convenzione = discountRule?.code === "CONVENZIONE20";
		if (!origin) next.origin = originDirty ? "Seleziona un risultato dall'elenco." : "Indica la partenza.";
		if (!destination) next.destination = destinationDirty ? "Seleziona un risultato dall'elenco." : "Indica l'arrivo.";
		if (origin && destination && origin.lat === destination.lat && origin.lon === destination.lon) next.destination = "L'arrivo coincide con la partenza.";
		if (stops.some((stop) => stop.dirty && !stop.place)) next.stops = "Seleziona ogni fermata dall'elenco, oppure rimuovila.";
		if (!route) next.route = "Attendi il calcolo del percorso prima di inviare.";
		if (convenzione) {
			if (discountCode.trim() && !scalapay && !discountRule) next.discount = "Codice sconto non valido.";
			return next;
		}
		if (!date) next.date = "Indica la data.";
		if (!time) next.time = "Indica l'orario.";
		if (date && time) {
			const when = /* @__PURE__ */ new Date(`${date}T${time}`);
			if (Number.isNaN(when.getTime())) next.date = "Data non valida.";
			else if (when.getTime() < Date.now() - 3e5) next.date = "Scegli un orario da adesso in poi.";
		}
		if (meetGreet && flight.trim().length < 2) next.flight = "Indica il numero del volo.";
		if (roundTrip) {
			if (!returnDate || !returnTime) next.returnDate = "Indica data e ora del ritorno.";
			else if (date && time) {
				const outbound = (/* @__PURE__ */ new Date(`${serviceDate}T${serviceTime}`)).getTime();
				if ((/* @__PURE__ */ new Date(`${returnDate}T${returnTime}`)).getTime() <= outbound) next.returnDate = "Il ritorno deve essere dopo l'andata.";
			}
		}
		if (passengers > 16) next.vehicle = "Massimo 16 passeggeri.";
		else if (passengers <= 8 && (passengers > VEHICLES[vehicle].passengers || luggage > VEHICLES[vehicle].bagsMax)) next.vehicle = "Questo veicolo non basta per passeggeri o bagagli.";
		if ((luggage > 10 || oversized) && oversizedNote.trim().length < 3) next.oversized = "Descrivi i bagagli fuori misura.";
		if (firstName.trim().length < 2) next.firstName = "Scrivi il nome.";
		if (lastName.trim().length < 2) next.lastName = "Scrivi il cognome.";
		if (discountCode.trim() && !scalapay && !discountRule) next.discount = "Codice sconto non valido.";
		if (!validPhone(phone)) next.phone = "Inserisci un telefono valido, anche con prefisso.";
		if (!validEmail(email)) next.email = "Inserisci una email valida.";
		if (!paymentMethod) next.payment = "Scegli come vuoi pagare.";
		if (!privacy && discountRule?.code !== "CONVENZIONE20") next.privacy = t("privacyNeed");
		if (!terms && discountRule?.code !== "CONVENZIONE20") next.terms = t("termsNeed");
		return next;
	}
	async function onSubmit(event) {
		event.preventDefault();
		if (!origin || !destination || !quote || !route) {
			const next = validate();
			setErrors(next);
			focusInvalid();
			return;
		}
		const next = validate();
		setErrors(next);
		if (Object.keys(next).length > 0) {
			focusInvalid();
			return;
		}
		if (!paymentMethod && discountRule?.code !== "CONVENZIONE20") return;
		setSending(true);
		setSendError("");
		try {
			const booking = await submitBooking({ data: {
				trip: {
					origin,
					destination,
					stops: resolvedStops,
					roundTrip,
					vehicleStay: roundTrip && vehicleStay,
					date,
					time,
					landingDate: meetGreet ? date : "",
					landingTime: meetGreet ? time : "",
					returnDate: roundTrip ? returnDate : "",
					returnTime: roundTrip ? returnTime : "",
					passengers,
					luggage,
					oversized: luggage > 10 || oversized,
					oversizedNote: luggage > 10 || oversized ? oversizedNote.trim() : "",
					vehicle: passengers > 8 ? "van" : vehicle,
					fleet: passengers > 8 ? fleetForPassengers(passengers, luggage) : void 0,
					childSeats: 0,
					boosters: 0,
					meetGreet,
					pet: false,
					waitMinutes: selectedWait,
					flight: flight.trim()
				},
				customer: {
					firstName: firstName.trim(),
					lastName: lastName.trim(),
					phone: phone.trim(),
					email: email.trim(),
					notes: notes.trim()
				},
				paymentMethod: paymentMethod || "",
				quote,
				pageOrigin: window.location.origin,
				guard,
				companyWebsite
			} });
			setSent(booking);
			setCopied(false);
			window.scrollTo({
				top: 0,
				behavior: "smooth"
			});
		} catch (error) {
			setSendError(error instanceof Error ? error.message : "Invio non riuscito. Riprova.");
		} finally {
			setSending(false);
		}
	}
	function reset() {
		const next = tomorrowDefaults();
		setSent(null);
		setOrigin(null);
		setDestination(null);
		setStops([]);
		setRoundTrip(false);
		setDate(next.date);
		setTime(next.time);
		setReturnDate(next.date);
		setReturnTime(next.returnTime);
		setToday(next.today);
		setPassengers(1);
		setLuggage(1);
		setOversized(false);
		setOversizedNote("");
		setVehicle("car");
		setMeetGreet(false);
		setWaitMinutes(0);
		setFlight("");
		setDiscountCode("");
		setNotes("");
		setFirstName("");
		setLastName("");
		setPhone("");
		setEmail("");
		setPaymentMethod("");
		setPrivacy(false);
		setErrors({});
		setRoute(null);
		setFormKey((value) => value + 1);
		setCopied(false);
	}
	async function pickFromMap(lat, lon) {
		const target = mapTarget ?? (!origin ? "origin" : !destination ? "destination" : "destination");
		const rough = {
			label: `${lat.toFixed(5)}, ${lon.toFixed(5)}`,
			lat,
			lon
		};
		setMapTarget(null);
		if (target === "origin") setOrigin(rough);
		else if (target === "destination") setDestination(rough);
		else if (target.startsWith("stop:")) {
			const id = target.slice(5);
			setStops((rows) => rows.map((row) => row.id === id ? {
				...row,
				place: rough,
				dirty: false
			} : row));
		}
		const found = await reversePlace(lat, lon);
		if (target === "origin") setOrigin(found);
		else if (target === "destination") setDestination(found);
		else if (target.startsWith("stop:")) {
			const id = target.slice(5);
			setStops((rows) => rows.map((row) => row.id === id ? {
				...row,
				place: found,
				dirty: false
			} : row));
		}
	}
	async function copyMessage(booking) {
		const text = bookingMessage(booking);
		try {
			await navigator.clipboard.writeText(text);
			setCopied(true);
		} catch {
			setCopied(false);
		}
	}
	VEHICLES[vehicle];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto grid w-full max-w-6xl gap-6 px-4 py-6 lg:grid-cols-5 lg:py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "quote-rail order-1 flex min-w-0 flex-col gap-3 lg:sticky lg:top-20 lg:order-2 lg:col-span-2 lg:self-start lg:overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative order-1 h-64 shrink-0 overflow-hidden rounded-lg border border-border lg:h-72",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapHost, {
						data: mapData,
						picking: Boolean(mapTarget),
						scrollSignal: mapTarget ?? "",
						onPick: (lat, lon) => void pickFromMap(lat, lon)
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-2 price-hero lg:hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-sm text-muted",
							children: "A passeggero"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-center text-2xl font-semibold tabular-nums",
							children: quote ? customerPrice(priceSplit(quote.total, passengers).perPassenger, priceMarked(quote)) : "—"
						}),
						quote ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-center text-sm text-muted",
							children: ["Totale ", customerPrice(quote.total, priceMarked(quote))]
						}) : null,
						quote?.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-center text-sm text-muted",
							children: t("remoteNotice")
						}) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "order-3 hidden lg:order-2 lg:block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDetails, {
						quote,
						passengers,
						routing,
						paymentMethod,
						onPayment: setPaymentMethod,
						paymentError: errors.payment,
						paymentName: "payment-desk"
					}), sent ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						form: "booking-form",
						disabled: routing || sending,
						className: "mt-3 inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg disabled:opacity-50",
						children: sending ? t("sending") : routing ? t("routing") : t("send")
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "order-2 min-w-0 lg:order-1 lg:col-span-3",
			children: sent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confirmation, {
				booking: sent,
				copied,
				onCopy: () => void copyMessage(sent),
				onReset: reset
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: t("kicker")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mx-auto mt-1 max-w-md text-2xl",
						children: t("title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted",
						children: t("lead")
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				id: "booking-form",
				className: "mt-6 grid gap-4",
				onSubmit,
				noValidate: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-surface p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-center text-lg",
							children: t("trip")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
									label: t("from"),
									place: origin,
									onPlace: setOrigin,
									onIncomplete: onOriginDirty,
									error: errors.origin,
									presets: true,
									locate: true,
									mapActive: mapTarget === "origin",
									onMapRequest: () => setMapTarget((current) => current === "origin" ? null : "origin")
								}, `${formKey}-origin`),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
									label: t("to"),
									place: destination,
									onPlace: setDestination,
									onIncomplete: onDestinationDirty,
									error: errors.destination,
									presets: true,
									mapActive: mapTarget === "destination",
									onMapRequest: () => setMapTarget((current) => current === "destination" ? null : "destination")
								}, `${formKey}-destination`),
								stops.map((stop, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-2",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "min-w-0 flex-1",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
												label: `Fermata ${index + 1}`,
												place: stop.place,
												onPlace: (place) => setStops((rows) => rows.map((row) => row.id === stop.id ? {
													...row,
													place
												} : row)),
												onIncomplete: (dirty) => setStops((rows) => rows.map((row) => row.id === stop.id ? {
													...row,
													dirty
												} : row)),
												placeholder: "Sosta intermedia",
												mapActive: mapTarget === `stop:${stop.id}`,
												onMapRequest: () => setMapTarget((current) => current === `stop:${stop.id}` ? null : `stop:${stop.id}`)
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											"aria-label": `Rimuovi fermata ${index + 1}`,
											onClick: () => setStops((rows) => rows.filter((row) => row.id !== stop.id)),
											className: "mt-7 grid size-11 shrink-0 place-items-center rounded-md border border-border",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, {
												className: "size-4",
												"aria-hidden": "true"
											})
										})]
									})
								}, stop.id)),
								errors.stops ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-primary",
									"data-invalid": "true",
									children: errors.stops
								}) : null,
								stops.length < 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setStops((rows) => [...rows, {
										id: crypto.randomUUID(),
										place: null,
										dirty: false
									}]),
									className: "inline-flex min-h-11 items-center gap-2 self-start text-sm text-primary",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {
											className: "size-4",
											"aria-hidden": "true"
										}),
										"Aggiungi una fermata",
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [
												"+ ",
												euro(EXTRA_PRICES.stop),
												", più i chilometri"
											]
										})
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-3 rounded-md border border-border bg-bg px-3 py-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: t("round")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: t("roundHint")
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										role: "switch",
										"aria-checked": roundTrip,
										onClick: () => setRoundTrip((value) => {
											if (value) {
												setVehicleStay(false);
												if (!waitManual) setWaitMinutes(0);
											}
											if (!value) setWaitManual(false);
											return !value;
										}),
										className: `relative h-7 w-12 rounded-full ${roundTrip ? "bg-primary" : "bg-surface-2"}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `absolute top-1 size-5 rounded-full bg-fg ${roundTrip ? "left-6" : "left-1"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "sr-only",
											children: "Andata e ritorno"
										})]
									})]
								}),
								roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-start gap-3 rounded-md border border-border bg-bg px-3 py-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "checkbox",
										className: "mt-1",
										checked: vehicleStay,
										onChange: (event) => setVehicleStay(event.target.checked)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block font-medium",
										children: t("stay")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mt-1 block text-sm text-muted",
										children: t("stayHint")
									})] })]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-2",
										"data-invalid": errors.date ? "true" : void 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: t("date")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "date",
											required: true,
											min: today || void 0,
											value: date,
											onChange: (event) => setDate(event.target.value),
											className: control
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-2",
										"data-invalid": errors.time ? "true" : void 0,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: meetGreet ? t("landing") : t("time")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "time",
											required: true,
											value: time,
											onChange: (event) => setTime(event.target.value),
											className: control
										})]
									})]
								}),
								errors.date || errors.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-primary",
									children: errors.date || errors.time
								}) : null,
								roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									"data-invalid": errors.returnDate ? "true" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: t("returnDate")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "date",
												min: date || today || void 0,
												value: returnDate,
												onChange: (event) => setReturnDate(event.target.value),
												className: control
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm font-medium",
												children: t("returnTime")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "time",
												value: returnTime,
												onChange: (event) => setReturnTime(event.target.value),
												className: control
											})]
										}),
										errors.returnDate ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-primary sm:col-span-2",
											children: errors.returnDate
										}) : null
									]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2",
									"data-invalid": errors.flight ? "true" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: meetGreet ? t("flight") : t("flightOptional")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: flight,
											maxLength: 40,
											placeholder: meetGreet ? t("flightPh") : t("flightOptPh"),
											onChange: (event) => setFlight(event.target.value),
											className: control
										}),
										errors.flight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-primary",
											children: errors.flight
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: t("wait")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: String(selectedWait),
											onChange: (event) => {
												setWaitManual(true);
												setWaitMinutes(Number(event.target.value));
											},
											className: control,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "0",
													children: t("waitNone")
												}),
												selectedWait > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
													value: String(selectedWait),
													children: ["Attesa prevista · ", waitBlockLabel(billedWaitMinutes(selectedWait) || selectedWait)]
												}) : null,
												[
													30,
													60,
													90,
													120,
													180,
													240,
													300,
													360,
													480
												].filter((minutes) => minutes !== selectedWait).map((minutes) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: minutes,
													children: minutes < 60 ? `${minutes} min · a pagamento` : minutes % 60 === 0 ? `${minutes / 60 === 1 ? "1 ora" : `${minutes / 60} ore`} · a pagamento` : `${Math.floor(minutes / 60) === 1 ? "1 ora" : `${Math.floor(minutes / 60)} ore`} e ${minutes % 60} min · a pagamento`
												}, minutes))
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: meetGreet ? t("waitMeet") : t("waitNormal")
										})
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-surface p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-center text-lg",
							children: t("vehicle")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-4 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: t("passengers")
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qty, {
											label: "passeggeri",
											value: passengers,
											min: 1,
											max: 16,
											onDelta: (delta) => setPassengers((current) => clampCount(current + delta, 1, 16))
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between gap-3",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium",
												children: t("bags")
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Qty, {
												label: t("bags"),
												value: luggage,
												min: 0,
												max: VEHICLES.van.bagsMax,
												onDelta: (delta) => setLuggage((current) => clampCount(current + delta, 0, VEHICLES.van.bagsMax))
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: t("bagsVan")
										})]
									})]
								}),
								passengers > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: t("over8")
								}) : passengers > VEHICLES.car.passengers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: t("over3")
								}) : null,
								luggage > VEHICLES.car.bagsIncluded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: t("over4")
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2",
									"data-invalid": errors.oversized ? "true" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "flex min-h-12 items-center gap-3 text-sm font-medium",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: luggage > 10 || oversized,
												disabled: luggage > 10,
												onChange: (event) => setOversized(event.target.checked)
											}), t("oversized")]
										}),
										luggage > 10 || oversized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: oversizedNote,
											required: luggage > 10,
											maxLength: 400,
											rows: 3,
											placeholder: t("oversizedPh"),
											onChange: (event) => setOversizedNote(event.target.value),
											className: "min-h-24 w-full rounded-md border border-border bg-bg px-3 py-3 text-base text-fg placeholder:text-muted"
										}) : null,
										luggage > 10 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted",
											children: t("oversizedNeed")
										}) : null,
										errors.oversized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-primary",
											children: errors.oversized
										}) : null
									]
								}),
								passengers > 8 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "rounded-md border border-border bg-bg px-3 py-3 text-sm",
									children: [fleetLabel(fleetForPassengers(passengers, luggage)), ". Il prezzo è la somma dei mezzi, calcolati uno per uno."]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-3 sm:grid-cols-2",
									role: "radiogroup",
									"aria-label": "Veicolo",
									"data-invalid": errors.vehicle ? "true" : void 0,
									children: Object.values(VEHICLES).map((option) => {
										const selected = vehicle === option.id;
										const blocked = passengers > option.passengers || luggage > option.bagsMax;
										const Icon = option.id === "car" ? Car : BusFront;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											role: "radio",
											"aria-checked": selected,
											disabled: blocked,
											onClick: () => setVehicle(option.id),
											className: `rounded-xl border p-4 text-left transition disabled:opacity-40 ${selected ? "border-primary bg-surface-2" : "border-border bg-bg"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: option.id === "car" ? "/brand/auto.png" : "/brand/van.png",
													alt: "",
													className: "fleet-shot"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-3 flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: "inline-flex items-center gap-2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
															className: "size-5 text-primary",
															"aria-hidden": "true"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-lg font-semibold",
															children: option.name
														})]
													}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
														className: "size-4 text-primary",
														"aria-hidden": "true"
													}) : null]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-1 block text-sm text-muted",
													children: [
														option.detail,
														" · max ",
														option.passengers,
														" passeggeri"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-2 block text-sm tabular-nums",
													children: [
														euro(option.perKm),
														" / km · minimo ",
														euro(option.minimum),
														" · attesa ",
														euro(option.waitPerMin * 60),
														"/h"
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "mt-1 block text-sm text-muted",
													children: [
														option.bagsIncluded,
														" ",
														t("bags").toLowerCase(),
														" ",
														t("included")
													]
												})
											]
										}, option.id);
									})
								}),
								errors.vehicle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium text-primary",
									children: errors.vehicle
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toggle, {
									pressed: meetGreet,
									onClick: () => setMeetGreet((value) => !value),
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plane, {
										className: "size-4",
										"aria-hidden": "true"
									}),
									label: "Meet & greet",
									hint: t("meetHint"),
									price: euro(EXTRA_PRICES.meetGreet)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: t("rules")
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-lg border border-border bg-surface p-4 sm:p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-center text-lg",
							children: t("who")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("name"),
									error: errors.firstName,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: firstName,
										autoComplete: "given-name",
										onChange: (event) => setFirstName(event.target.value),
										className: control
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: t("surname"),
									error: errors.lastName,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: lastName,
										autoComplete: "family-name",
										onChange: (event) => setLastName(event.target.value),
										className: control
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Telefono",
									error: errors.phone,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "tel",
										inputMode: "tel",
										autoComplete: "tel",
										placeholder: "+39",
										value: phone,
										onChange: (event) => setPhone(event.target.value),
										className: control
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
									label: "Email",
									error: errors.email,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										inputMode: "email",
										autoComplete: "email",
										value: email,
										onChange: (event) => setEmail(event.target.value),
										className: control
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2 sm:col-span-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: t("notes")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										value: notes,
										maxLength: 500,
										rows: 3,
										placeholder: t("notesPh"),
										onChange: (event) => setNotes(event.target.value),
										className: "min-h-28 w-full rounded-md border border-border bg-bg px-3 py-3 text-base text-fg placeholder:text-muted"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-2 sm:col-span-2",
									"data-invalid": errors.discount ? "true" : void 0,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-medium",
											children: t("discount")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: discountCode,
											maxLength: 20,
											autoCapitalize: "characters",
											placeholder: t("discountPh"),
											disabled: scalapay,
											onChange: (event) => setDiscountCode(event.target.value),
											className: control
										}),
										scalapay ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: "Con Scalapay i codici sconto non si applicano."
										}) : null,
										errors.discount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm font-medium text-primary",
											children: errors.discount
										}) : null,
										discountRule ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-sm text-muted",
											children: [discountSummary(discountRule), discountFits(discountRule, passengers > 8 ? fleetForPassengers(passengers, luggage) : {
												cars: vehicle === "car" ? 1 : 0,
												vans: vehicle === "van" ? 1 : 0
											}) ? "" : " Non si applica a questo veicolo."]
										}) : null
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuoteDetails, {
							quote,
							passengers,
							routing,
							paymentMethod,
							onPayment: setPaymentMethod,
							paymentError: errors.payment,
							paymentName: "payment-mobile"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm",
						"data-invalid": errors.privacy ? "true" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5",
							checked: privacy,
							onChange: (event) => setPrivacy(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t("privacyConsent"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/privacy",
								className: "underline underline-offset-2",
								children: t("privacy")
							})
						] })]
					}),
					errors.privacy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: errors.privacy
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm",
						"data-invalid": errors.terms ? "true" : void 0,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1 size-5",
							checked: terms,
							onChange: (event) => setTerms(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							t("termsConsent"),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://www.mttravelservice.com/termini-e-condizioni",
								target: "_blank",
								rel: "noreferrer",
								className: "underline underline-offset-2",
								children: t("terms")
							})
						] })]
					}),
					errors.terms ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: errors.terms
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -left-[9999px] h-px w-px overflow-hidden",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							tabIndex: -1,
							autoComplete: "off",
							name: "mt_leave_blank",
							value: companyWebsite,
							onChange: (event) => setCompanyWebsite(event.target.value)
						})
					}),
					errors.route ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						"data-invalid": "true",
						children: errors.route
					}) : null,
					sendError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: sendError
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "submit",
						disabled: routing || sending,
						className: "inline-flex h-12 w-full items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg disabled:opacity-50 lg:hidden",
						children: sending ? t("sending") : routing ? t("routing") : t("send")
					})
				]
			})] })
		})]
	});
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-2",
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium",
				children: label
			}),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null
		]
	});
}
function Toggle({ pressed, onClick, icon, label, hint, price }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-pressed": pressed,
		onClick,
		className: `flex min-h-14 w-full items-center gap-3 rounded-md border px-3 py-3 text-left ${pressed ? "border-primary bg-surface-2" : "border-border bg-bg"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "min-w-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block",
					children: label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "block text-sm text-muted",
					children: hint
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "tabular-nums text-sm",
				children: price
			})
		]
	});
}
function appLink(url) {
	if (typeof window === "undefined") return url;
	try {
		const next = new URL(url, window.location.origin);
		const host = next.hostname.toLowerCase();
		if (host === "vercel.app" || host.endsWith(".vercel.app") || host.endsWith(".vercel.com")) return `${window.location.origin}${next.pathname}${next.search}`;
		return next.toString();
	} catch {
		return url;
	}
}
function Confirmation({ booking, copied, onCopy, onReset }) {
	const { t } = useI18n();
	const text = bookingMessage(booking);
	const { trip, customer, quote } = booking;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-lg border border-border bg-surface p-4 sm:p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: t("ready")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-center text-2xl",
				children: booking.code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-muted",
				children: [
					customer.firstName,
					" ",
					customer.lastName,
					" · ",
					formatWhen(trip.date, trip.time)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-2 border-t border-dashed border-border pt-5 text-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Da "
					}), trip.origin.label] }),
					trip.stops.map((stop) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Fermata "
					}), stop.label] }, `${stop.lat}-${stop.label}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "A "
					}), trip.destination.label] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						fleetLabel(tripFleet(trip)),
						" · ",
						peopleLabel(trip.passengers),
						" · ",
						bagsLabel(trip.luggage),
						" standard",
						trip.roundTrip ? " · A/R" : ""
					] }),
					trip.oversizedNote?.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Fuori misura "
					}), trip.oversizedNote] }) : null,
					trip.landingTime ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted",
						children: "Atterraggio "
					}), formatWhen(trip.landingDate || trip.date, trip.landingTime)] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "pt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceSummary, {
							total: quote.total,
							passengers: trip.passengers,
							marked: priceMarked(quote)
						})
					}),
					quote.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: t("remoteNotice")
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: booking.mailed ? `Conferma inviata a ${customer.email}. Dal link puoi rivedere la richiesta o modificarla.` : `Richiesta registrata. Conserva il link: da lì la rivedi o la modifichi. La mail automatica parte quando in Gestione è attiva la posta.`
			}),
			booking.viewUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: appLink(booking.viewUrl),
					className: "inline-flex h-12 items-center rounded-md border border-border px-4 font-medium",
					children: "Vedi la richiesta"
				}), customerCanEdit(trip.date, trip.time) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: appLink(booking.editUrl || booking.viewUrl),
					className: "inline-flex h-12 items-center rounded-md bg-primary px-4 font-medium text-primary-fg",
					children: "Modifica"
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: whatsappHref(text),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary px-4 font-medium text-primary-fg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {
							className: "size-4",
							"aria-hidden": "true"
						}), "WhatsApp"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: mailHref(booking, text),
						className: "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-4 font-medium",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {
							className: "size-4",
							"aria-hidden": "true"
						}), "Email"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onCopy,
						className: "inline-flex h-12 items-center justify-center gap-2 rounded-md border border-border px-4 font-medium",
						children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
							className: "size-4",
							"aria-hidden": "true"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
							className: "size-4",
							"aria-hidden": "true"
						}), copied ? "Copiato" : "Copia testo"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onReset,
						className: "inline-flex h-12 items-center justify-center rounded-md border border-border px-4 font-medium",
						children: "Nuova richiesta"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestActions, { booking })
				]
			})
		]
	});
}
var SplitComponent = BookingPage;
//#endregion
export { SplitComponent as component };
