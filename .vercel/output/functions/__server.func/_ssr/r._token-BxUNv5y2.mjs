import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as tripFleet, F as priceMarked, M as paymentLabel, P as peopleLabel, R as serviceInBologna, a as REMOTE_NOTICE, b as fleetForPassengers, f as buildQuote, h as customerPrice, j as normalizeDiscount, m as customerCanEdit, o as VEHICLES, w as formatWhen, x as fleetLabel } from "./bookings-Bp6VBimL.mjs";
import { n as Route } from "./router-Bc2zQ2ac.mjs";
import { T as updatePublicBooking, c as farFromBase, l as getPublicBooking, m as lookupDiscount, n as PlaceInput, y as routeTrip } from "./bookings.functions-DHeNUO1W.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/r._token-BxUNv5y2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base";
function CustomerRequest({ token }) {
	const [booking, setBooking] = (0, import_react.useState)(null);
	const [missing, setMissing] = (0, import_react.useState)(false);
	const [editing, setEditing] = (0, import_react.useState)(false);
	const [origin, setOrigin] = (0, import_react.useState)(null);
	const [destination, setDestination] = (0, import_react.useState)(null);
	const [date, setDate] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("");
	const [returnDate, setReturnDate] = (0, import_react.useState)("");
	const [returnTime, setReturnTime] = (0, import_react.useState)("");
	const [passengers, setPassengers] = (0, import_react.useState)("1");
	const [luggage, setLuggage] = (0, import_react.useState)("0");
	const [firstName, setFirstName] = (0, import_react.useState)("");
	const [lastName, setLastName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [notes, setNotes] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [saved, setSaved] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let alive = true;
		const openEdit = new URLSearchParams(window.location.search).get("modifica") === "1";
		getPublicBooking({ data: { token } }).then((row) => {
			if (!alive) return;
			setBooking(row);
			fill(row);
			if (openEdit && customerCanEdit(row.trip.date, row.trip.time)) setEditing(true);
		}).catch(() => {
			if (alive) setMissing(true);
		});
		return () => {
			alive = false;
		};
	}, [token]);
	function fill(row) {
		setOrigin(row.trip.origin);
		setDestination(row.trip.destination);
		setDate(row.trip.date);
		setTime(row.trip.time);
		setReturnDate(row.trip.returnDate);
		setReturnTime(row.trip.returnTime);
		setPassengers(String(row.trip.passengers));
		setLuggage(String(row.trip.luggage));
		setFirstName(row.customer.firstName);
		setLastName(row.customer.lastName);
		setPhone(row.customer.phone);
		setEmail(row.customer.email);
		setNotes(row.customer.notes);
	}
	async function save() {
		if (!booking || !origin || !destination) {
			setError("Servono partenza e arrivo.");
			return;
		}
		if (!customerCanEdit(booking.trip.date, booking.trip.time)) {
			setEditing(false);
			setError("La modifica è possibile solo fino a 48 ore prima del viaggio.");
			return;
		}
		setBusy(true);
		setError("");
		try {
			const people = Math.min(16, Math.max(1, Number(passengers) || 1));
			const bags = Math.max(0, Number(luggage) || 0);
			const fleet = people > 8 ? fleetForPassengers(people, bags) : void 0;
			const forced = fleet ? "van" : people > VEHICLES.car.passengers || bags > VEHICLES.car.bagsIncluded ? "van" : booking.trip.vehicle;
			const back = booking.trip.roundTrip ? [destination, origin] : null;
			const [route, remote] = await Promise.all([routeTrip([
				origin,
				...booking.trip.stops,
				destination
			], back, new AbortController().signal), farFromBase(origin, destination)]);
			const code = booking.quote.discountCode ?? "";
			const found = code ? normalizeDiscount(await lookupDiscount({ data: { code } }).catch(() => null)) : null;
			const quote = buildQuote({
				vehicle: forced,
				km: route.km,
				minutes: route.minutes,
				outboundKm: route.outboundKm,
				outboundMinutes: route.outboundMinutes,
				estimated: route.estimated,
				roundTrip: booking.trip.roundTrip,
				date,
				time,
				returnDate,
				returnTime,
				luggage: bags,
				childSeats: 0,
				boosters: 0,
				meetGreet: booking.trip.meetGreet,
				pet: false,
				waitMinutes: booking.trip.waitMinutes,
				stopCount: booking.trip.stops.length,
				discountCode: booking.paymentMethod === "rate" ? "" : found?.code ?? "",
				discountRules: booking.paymentMethod === "rate" || !found ? [] : [found],
				passengers: people,
				approachKm: booking.quote.approachKm ?? 0,
				remote,
				includeSlow: Boolean(booking.quote.includeSlow) || booking.quote.lines.some((line) => line.kind === "slow"),
				bologna: serviceInBologna([
					origin,
					destination,
					...booking.trip.stops
				]),
				vehicleStay: Boolean(booking.trip.roundTrip && booking.trip.vehicleStay)
			});
			const next = await updatePublicBooking({ data: {
				token,
				pageOrigin: window.location.origin,
				paymentMethod: booking.paymentMethod,
				quote,
				customer: {
					firstName,
					lastName,
					phone,
					email,
					notes
				},
				trip: {
					...booking.trip,
					origin,
					destination,
					date,
					time,
					returnDate,
					returnTime,
					passengers: people,
					luggage: bags,
					vehicle: forced,
					fleet,
					childSeats: 0,
					boosters: 0,
					pet: false
				}
			} });
			setBooking(next);
			setEditing(false);
			setSaved(true);
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Modifica non salvata.");
		} finally {
			setBusy(false);
		}
	}
	if (missing) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-center text-2xl",
			children: "Richiesta non trovata"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted",
			children: "Il link non è più valido."
		})]
	});
	if (!booking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted",
			children: "Carico la richiesta…"
		})
	});
	const canEdit = customerCanEdit(booking.trip.date, booking.trip.time);
	const confirmed = booking.status === "confirmed" && !saved;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: booking.code
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-center text-2xl",
				children: "La tua richiesta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: confirmed ? "Confermata da MT TRAVEL SERVICE." : "In attesa di conferma. Non paghi ora."
			}),
			saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm font-medium text-primary",
				children: "Modifica salvata. La richiesta è di nuovo da confermare."
			}) : null,
			editing && canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
						label: "Partenza",
						place: origin,
						onPlace: setOrigin,
						presets: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
						label: "Arrivo",
						place: destination,
						onPlace: setDestination,
						presets: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Data", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: date,
							onChange: (event) => setDate(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Ora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: time,
							onChange: (event) => setTime(event.target.value),
							className: field
						})]
					}),
					booking.trip.roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Data ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: returnDate,
							onChange: (event) => setReturnDate(event.target.value),
							className: field
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Ora ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: returnTime,
							onChange: (event) => setReturnTime(event.target.value),
							className: field
						})]
					})] }) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Passeggeri", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: passengers,
							inputMode: "numeric",
							onChange: (event) => setPassengers(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Bagagli standard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: luggage,
							inputMode: "numeric",
							onChange: (event) => setLuggage(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: firstName,
							onChange: (event) => setFirstName(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Cognome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: lastName,
							onChange: (event) => setLastName(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Telefono", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (event) => setEmail(event.target.value),
							className: field
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: notes,
							rows: 3,
							onChange: (event) => setNotes(event.target.value),
							className: "min-h-24 w-full rounded-md border border-border bg-bg px-3 py-3 text-base"
						})]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium text-primary",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							disabled: busy,
							onClick: () => void save(),
							className: "inline-flex h-12 items-center rounded-md bg-primary px-4 font-medium text-primary-fg disabled:opacity-50",
							children: busy ? "Salvo…" : "Salva modifica"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEditing(false),
							className: "inline-flex h-12 items-center rounded-md border border-border px-4",
							children: "Annulla"
						})]
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "mt-6 rounded-lg border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: booking.trip.origin.label }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-muted",
						children: ["verso ", booking.trip.destination.label]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3",
						children: formatWhen(booking.trip.date, booking.trip.time)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							fleetLabel(tripFleet(booking.trip)),
							" · ",
							peopleLabel(booking.trip.passengers),
							" · ",
							paymentLabel(booking.paymentMethod)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-center text-2xl font-semibold tabular-nums",
						children: customerPrice(booking.quote.total, priceMarked(booking.quote))
					}),
					booking.quote.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: REMOTE_NOTICE
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3",
						children: [
							booking.customer.firstName,
							" ",
							booking.customer.lastName
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							booking.customer.phone,
							" · ",
							booking.customer.email
						]
					}),
					canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setEditing(true),
						className: "mt-5 inline-flex h-12 items-center rounded-md bg-primary px-4 font-medium text-primary-fg",
						children: "Modifica"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: "La modifica online è possibile solo fino a 48 ore prima del viaggio. Dopo, chiama o scrivi a MT TRAVEL SERVICE."
					})
				]
			})
		]
	});
}
function RequestRoute() {
	const { token } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerRequest, { token });
}
//#endregion
export { RequestRoute as component };
