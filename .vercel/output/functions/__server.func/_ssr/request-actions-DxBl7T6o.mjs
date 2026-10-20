import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as formatDuration, D as kmLabel, E as googleCalendarHref, F as priceMarked, I as priceSplit, M as paymentLabel, N as paymentNotice, O as legMeasure, P as peopleLabel, S as fleetText, U as waitBlockLabel, a as REMOTE_NOTICE, c as bagsLabel, h as customerPrice, i as PAYMENT_METHODS, l as billedWaitMinutes, v as euro, w as formatWhen } from "./bookings-Bp6VBimL.mjs";
import { l as FileDown, p as CalendarPlus } from "../_libs/lucide-react.mjs";
import { a as useI18n, i as VAT_ZERO_NOTE, r as COMPANY } from "./router-Bc2zQ2ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/request-actions-DxBl7T6o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MapHost({ data, picking = false, onPick, scrollSignal = "" }) {
	const { t } = useI18n();
	const frame = (0, import_react.useRef)(null);
	const host = (0, import_react.useRef)(null);
	const dataRef = (0, import_react.useRef)(data);
	const pickRef = (0, import_react.useRef)(onPick);
	const apiRef = (0, import_react.useRef)(null);
	const [booted, setBooted] = (0, import_react.useState)(false);
	const [gpsBusy, setGpsBusy] = (0, import_react.useState)(false);
	const [gpsError, setGpsError] = (0, import_react.useState)("");
	dataRef.current = data;
	pickRef.current = onPick;
	(0, import_react.useEffect)(() => {
		let dead = false;
		let api = null;
		import("./leaflet-map-VnsTNkKu.mjs").then((mod) => {
			if (dead || !host.current) return;
			api = mod.mountMap(host.current);
			apiRef.current = api;
			api.setPick((lat, lon) => pickRef.current?.(lat, lon));
			api.update(dataRef.current);
			setBooted(true);
		});
		return () => {
			dead = true;
			api?.destroy();
			apiRef.current = null;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!booted) return;
		apiRef.current?.update(data);
	}, [booted, data]);
	(0, import_react.useEffect)(() => {
		if (!scrollSignal) return;
		frame.current?.scrollIntoView({
			behavior: "auto",
			block: "nearest"
		});
	}, [scrollSignal]);
	async function centerGps() {
		if (!navigator.geolocation) {
			setGpsError(t("geoOff"));
			return;
		}
		setGpsBusy(true);
		setGpsError("");
		try {
			const pos = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 8e3,
					maximumAge: 6e4
				});
			});
			apiRef.current?.centerOn(pos.coords.latitude, pos.coords.longitude);
		} catch {
			setGpsError(t("geoFail"));
		} finally {
			setGpsBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: frame,
		className: `relative h-full min-h-64 w-full scroll-mt-20 ${picking ? "map-picking" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: host,
				className: "h-full w-full"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void centerGps(),
				disabled: gpsBusy,
				className: "absolute left-3 top-3 z-[1000] inline-flex h-10 items-center rounded-md bg-surface px-3 text-sm font-medium text-fg shadow-md disabled:opacity-60",
				children: gpsBusy ? t("locating") : t("mapGps")
			}),
			gpsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "absolute left-3 top-14 z-[1000] max-w-[14rem] rounded-md bg-surface px-3 py-2 text-sm text-primary",
				children: gpsError
			}) : null
		]
	});
}
var PAY_KEYS = {
	bonifico: "payBank",
	link: "payLink",
	satispay: "paySatispay",
	rate: "payRate"
};
function PaymentBadge({ method }) {
	if (method === "link") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pay-link inline-flex h-7 items-center rounded px-2 text-xs font-extrabold tracking-wide",
		children: "LINK"
	});
	if (method === "bonifico") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pay-bank inline-flex h-7 items-center rounded px-2 text-xs font-extrabold tracking-wide",
		children: "BONIFICO"
	});
	if (method === "satispay") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "pay-satispay inline-flex h-7 items-center rounded px-2 text-xs font-extrabold tracking-tight",
		children: "satispay"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex h-7 items-center rounded border border-border bg-surface px-2 text-xs font-extrabold tracking-wide",
		children: "SCALAPAY"
	});
}
function PaymentChoice({ value, onChange, name, error }) {
	const { t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: "grid gap-2",
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
				className: "text-sm font-medium",
				children: t("pay")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-extrabold leading-snug text-fg",
				children: t("payNow")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-base leading-snug text-fg",
				children: t("payLater")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 grid gap-2",
				children: PAYMENT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: `flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 ${value === method.id ? "border-primary bg-surface-2" : "border-border bg-bg"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name,
							checked: value === method.id,
							onChange: () => onChange(method.id)
						}), t(PAY_KEYS[method.id])]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentBadge, { method: method.id })]
				}, method.id))
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null
		]
	});
}
function bufferToBinary(buffer) {
	const bytes = new Uint8Array(buffer);
	let binary = "";
	const chunk = 32768;
	for (let index = 0; index < bytes.length; index += chunk) binary += String.fromCharCode(...bytes.subarray(index, index + chunk));
	return binary;
}
async function logoDataUrl() {
	const response = await fetch("/brand/logo-mark.jpg");
	if (!response.ok) throw new Error("logo");
	const blob = await response.blob();
	const bitmap = await createImageBitmap(blob);
	const canvas = document.createElement("canvas");
	canvas.width = bitmap.width;
	canvas.height = bitmap.height;
	const context = canvas.getContext("2d");
	if (!context) throw new Error("canvas");
	context.drawImage(bitmap, 0, 0);
	return canvas.toDataURL("image/png");
}
async function openDoc(title) {
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const doc = new jsPDF({
		unit: "mm",
		format: "a4"
	});
	const regular = await fetch("/fonts/LiberationSans-Regular.ttf").then((response) => response.arrayBuffer());
	const bold = await fetch("/fonts/LiberationSans-Bold.ttf").then((response) => response.arrayBuffer());
	doc.addFileToVFS("LiberationSans-Regular.ttf", bufferToBinary(regular));
	doc.addFileToVFS("LiberationSans-Bold.ttf", bufferToBinary(bold));
	doc.addFont("LiberationSans-Regular.ttf", "LibSans", "normal");
	doc.addFont("LiberationSans-Bold.ttf", "LibSans", "bold");
	doc.setFont("LibSans", "normal");
	try {
		doc.addImage(await logoDataUrl(), "PNG", 14, 12, 28, 28);
	} catch {}
	doc.setFont("LibSans", "bold");
	doc.setFontSize(16);
	doc.text(COMPANY.brand, 46, 20);
	doc.setFont("LibSans", "normal");
	doc.setFontSize(10);
	doc.text(`NOLEGGIO CON CONDUCENTE · ${COMPANY.place}`, 46, 27);
	doc.text(COMPANY.site, 46, 33);
	doc.text(`${COMPANY.owner} · P.IVA ${COMPANY.vat}`, 46, 39);
	doc.setFont("LibSans", "bold");
	doc.setFontSize(18);
	doc.text(title, 14, 54);
	return {
		doc,
		y: 64
	};
}
function writeRows(doc, rows, startY) {
	let y = startY;
	doc.setFontSize(11);
	for (const [label, value] of rows) {
		const lines = doc.splitTextToSize(value, 125);
		if (y > 270) {
			doc.addPage();
			y = 18;
		}
		doc.setFont("LibSans", "bold");
		doc.text(label, 14, y);
		doc.setFont("LibSans", "normal");
		doc.text(lines, 52, y);
		y += Math.max(6, lines.length * 5);
	}
	return y;
}
function tripRows(booking) {
	const { trip, customer, quote } = booking;
	const rows = [
		["Cliente", `${customer.firstName} ${customer.lastName}`],
		["Telefono", customer.phone],
		["Email", customer.email],
		["Veicolo", fleetText(trip)],
		["Passeggeri", peopleLabel(trip.passengers)],
		["Bagagli standard", bagsLabel(trip.luggage)],
		["Partenza", trip.origin.label],
		...trip.stops.map((stop, index) => [`Fermata ${index + 1}`, stop.label]),
		["Arrivo", trip.destination.label],
		["Data", formatWhen(trip.date, trip.time)],
		["Ritorno", trip.roundTrip ? formatWhen(trip.returnDate, trip.returnTime) : "Solo andata"]
	];
	if (trip.roundTrip && trip.vehicleStay) rows.push(["Veicolo a disposizione", "Sì, per tutta l'attesa scelta"]);
	if (quote.legs && quote.legs.length > 1) for (const leg of quote.legs) rows.push([leg.label, legMeasure(leg.km, leg.minutes, quote.estimated)]);
	else {
		rows.push(["Distanza", `${kmLabel(quote.km)}${quote.estimated ? " (stima)" : ""}`]);
		rows.push(["Durata", formatDuration(quote.minutes)]);
	}
	if (trip.meetGreet && trip.landingTime) {
		rows.push(["Volo", trip.flight.trim() || "—"]);
		rows.push(["Atterraggio previsto", formatWhen(trip.landingDate || trip.date, trip.landingTime)]);
		rows.push(["Meet & greet", `Cartello nominativo. Attesa gratuita: 1 ora dall'atterraggio previsto.`]);
	} else if (trip.flight.trim()) rows.push(["Volo o treno", trip.flight.trim()]);
	if (trip.oversizedNote?.trim()) rows.push(["Fuori misura", trip.oversizedNote.trim()]);
	if (trip.waitMinutes > 0) {
		const billed = billedWaitMinutes(trip.waitMinutes);
		rows.push(["Attesa extra", billed > 0 ? `${waitBlockLabel(billed)} a pagamento` : trip.meetGreet ? "Inclusa nell'ora gratuita dall'atterraggio previsto" : "Entro 15 min, inclusa"]);
	}
	return rows;
}
function writeVat(doc, startY, total, vat) {
	let y = startY;
	doc.setFont("LibSans", "normal");
	doc.setFontSize(10);
	if (vat === "ten") {
		const taxable = Math.round(total / 1.1 * 100) / 100;
		const tax = Math.round((total - taxable) * 100) / 100;
		doc.text(`Imponibile ${euro(taxable)}`, 14, y);
		y += 5;
		doc.text(`IVA 10% ${euro(tax)}`, 14, y);
		y += 5;
		doc.text("Il totale indicato è già comprensivo di IVA al 10%.", 14, y);
		y += 6;
	} else {
		const lines = doc.splitTextToSize(VAT_ZERO_NOTE, 180);
		doc.text(lines, 14, y);
		y += lines.length * 4 + 2;
	}
	return y;
}
async function downloadBookingPdf(booking, vat) {
	const { doc, y: start } = await openDoc(`Richiesta ${booking.code}`);
	const { trip, customer, quote } = booking;
	let y = writeRows(doc, tripRows(booking), start);
	const split = priceSplit(quote.total, trip.passengers);
	y += 3;
	doc.setFont("LibSans", "bold");
	doc.setFontSize(14);
	doc.text("A passeggero", 14, y);
	doc.text(customerPrice(split.perPassenger, priceMarked(quote)), 196, y, { align: "right" });
	y += 8;
	doc.setFontSize(12);
	doc.text("Totale", 14, y);
	doc.text(customerPrice(quote.total, priceMarked(quote)), 196, y, { align: "right" });
	y += 7;
	doc.setFont("LibSans", "normal");
	doc.setFontSize(11);
	doc.text("Metodo di pagamento", 14, y);
	doc.text(paymentLabel(booking.paymentMethod), 196, y, { align: "right" });
	y += 7;
	if (quote.remote) {
		doc.setFont("LibSans", "normal");
		doc.setFontSize(10);
		const notice = doc.splitTextToSize(REMOTE_NOTICE, 180);
		doc.text(notice, 14, y);
		y += notice.length * 4 + 2;
	}
	doc.setFont("LibSans", "normal");
	doc.setFontSize(11);
	if (booking.paymentMethod === "rate") {
		doc.text(`4 rate Scalapay da ${euro(split.installment)}`, 14, y);
		y += 8;
	} else y += 2;
	for (const line of quote.lines.filter((item) => item.kind !== "slow")) {
		if (y > 275) {
			doc.addPage();
			y = 18;
		}
		doc.text(line.label, 14, y);
		doc.text(euro(line.amount), 196, y, { align: "right" });
		y += 6;
	}
	if (customer.notes.trim()) {
		y += 3;
		doc.setFont("LibSans", "bold");
		doc.text("Note", 14, y);
		y += 6;
		doc.setFont("LibSans", "normal");
		const notes = doc.splitTextToSize(customer.notes.trim(), 180);
		doc.text(notes, 14, y);
		y += notes.length * 5 + 2;
	}
	y += 4;
	y = writeVat(doc, y, quote.total, vat);
	doc.setFontSize(10);
	const legal = doc.splitTextToSize("Acqua fresca inclusa. A bordo è vietato mangiare e fumare. Preventivo indicativo, da confermare da MT Travel. " + paymentNotice(trip.date, trip.time), 180);
	doc.text(legal, 14, Math.min(y, 280));
	doc.save(`MT-Travel-${booking.code}.pdf`);
}
async function downloadDriverPdf(booking, amount, vat) {
	const { doc, y: start } = await openDoc("ASSEGNAZIONE VIAGGIO");
	const { customer } = booking;
	let y = writeRows(doc, tripRows(booking), start);
	y += 4;
	doc.setFont("LibSans", "bold");
	doc.setFontSize(14);
	doc.text("Compenso autista", 14, y);
	doc.text(euro(amount), 196, y, { align: "right" });
	y = writeVat(doc, y + 8, amount, vat);
	if (customer.notes.trim()) {
		y += 8;
		doc.setFont("LibSans", "bold");
		doc.text("Note", 14, y);
		y += 6;
		doc.setFont("LibSans", "normal");
		doc.text(doc.splitTextToSize(customer.notes.trim(), 180), 14, y);
	}
	doc.save(`MT-Travel-viaggio-${booking.code}.pdf`);
}
function PdfExport({ label, onExport }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [vat, setVat] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			onClick: () => {
				setError("");
				setOpen(true);
			},
			className: "inline-flex h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileDown, {
				className: "size-4",
				"aria-hidden": "true"
			}), label]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VatFields, {
			vat,
			busy,
			error,
			onVat: setVat,
			onCancel: () => setOpen(false),
			onConfirm: () => {
				if (!vat) {
					setError("Scegli il regime IVA del PDF.");
					return;
				}
				setError("");
				setBusy(true);
				onExport(vat).then(() => setOpen(false)).catch(() => setError("Non riesco a creare il PDF. Riprova.")).finally(() => setBusy(false));
			}
		}) : null]
	});
}
function VatFields({ vat, busy, error, onVat, onCancel, onConfirm }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-2 rounded-md border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Regime IVA da scrivere nel PDF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Il totale per il cliente non cambia. Serve solo sul documento."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "radio",
					className: "mt-1",
					checked: vat === "zero",
					onChange: () => onVat("zero")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IVA 0%. Operazione senza applicazione dell'IVA ai sensi dell'art. 1, commi da 54 a 89, L. 190/2014 come modificato dalla L. 208/2015 e L. 145/2018." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "radio",
					className: "mt-1",
					checked: vat === "ten",
					onChange: () => onVat("ten")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IVA 10% già inclusa nel totale indicato." })]
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
					onClick: onConfirm,
					className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50",
					children: busy ? "PDF…" : "Genera PDF"
				}), onCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onCancel,
					className: "inline-flex h-11 items-center px-3 text-sm text-muted",
					children: "Annulla"
				}) : null]
			})
		]
	});
}
function RequestActions({ booking }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfExport, {
		label: "Scarica PDF",
		onExport: (vat) => downloadBookingPdf(booking, vat)
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
		href: googleCalendarHref(booking),
		target: "_blank",
		rel: "noreferrer",
		className: "inline-flex h-11 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarPlus, {
			className: "size-4",
			"aria-hidden": "true"
		}), "Google Calendar"]
	})] });
}
//#endregion
export { RequestActions as a, PdfExport as i, PaymentBadge as n, downloadBookingPdf as o, PaymentChoice as r, downloadDriverPdf as s, MapHost as t };
