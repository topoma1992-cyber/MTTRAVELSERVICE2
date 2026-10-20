import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as makeBookingCode, B as tripFleet, C as formatDuration, D as kmLabel, G as whatsappTo, L as rejectionMessage, M as paymentLabel, O as legMeasure, P as peopleLabel, R as serviceInBologna, W as whatsappHref, _ as discountSummary, b as fleetForPassengers, f as buildQuote, i as PAYMENT_METHODS, k as mailHref, o as VEHICLES, p as confirmationMessage, u as bookingMessage, v as euro, w as formatWhen, x as fleetLabel } from "./bookings-Bp6VBimL.mjs";
import { h as Bell } from "../_libs/lucide-react.mjs";
import { C as staffStatus, E as updateStaffBooking, S as saveStaffLogin, _ as removeStaffLogin, a as claimStaff, b as saveAlertSettings, c as farFromBase, d as listDiscountCodes, f as listStaffBookings, g as removeStaffBooking, h as removeDiscountCode, i as changeStaffPin, n as PlaceInput, o as confirmStaffBooking, p as listStaffLogins, r as alertSettings, s as createStaffQuote, v as reversePlace, x as saveDiscountCode, y as routeTrip } from "./bookings.functions-DHeNUO1W.mjs";
import { a as RequestActions, i as PdfExport, n as PaymentBadge, o as downloadBookingPdf, s as downloadDriverPdf, t as MapHost } from "./request-actions-DxBl7T6o.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/richieste-CHgoAQ_b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var field$4 = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base";
function AlertSettings({ staffEmail, pin }) {
	const [email, setEmail] = (0, import_react.useState)("info@mttravelservice.com");
	const [pass, setPass] = (0, import_react.useState)("");
	const [ready, setReady] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		alertSettings({ data: {
			staffEmail,
			pin
		} }).then((row) => {
			setEmail(row.notifyEmail);
			setReady(row.mailReady);
		}).catch(() => setNote("Avvisi non disponibili."));
	}, [staffEmail, pin]);
	async function save() {
		setNote("");
		try {
			const row = await saveAlertSettings({ data: {
				staffEmail,
				pin,
				notifyEmail: email,
				smtpPass: pass
			} });
			setReady(row.mailReady || ready);
			setPass("");
			setNote(row.mailReady || ready && !pass ? "Salvato. Le mail partono da sole." : "Salvato. Senza password delle app la mail al cliente non parte ancora.");
		} catch (reason) {
			setNote(reason instanceof Error ? reason.message : "Non salvato.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-lg border border-border bg-surface p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg",
				children: "Avvisi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setOpen((value) => !value),
				className: "inline-flex h-10 items-center rounded-md border border-border px-3 text-sm font-medium",
				children: open ? "Chiudi" : "Apri"
			})]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Ogni nuova richiesta, e ogni modifica del cliente, ti arriva su questa email. Con la password delle app di Gmail parte anche la mail al cliente, con il link per vedere e modificare."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 grid gap-1 text-sm",
				children: ["La tua email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: email,
					onChange: (event) => setEmail(event.target.value),
					className: field$4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "mt-3 grid gap-1 text-sm",
				children: ["Password delle app Gmail", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "password",
					value: pass,
					autoComplete: "new-password",
					placeholder: ready ? "Già attiva, lasciala vuota per non cambiarla" : "Incolla la password delle app",
					onChange: (event) => setPass(event.target.value),
					className: field$4
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: ["Su Google: Sicurezza, poi Password per le app. Non è la password normale di Gmail.", ready ? " La posta verso i clienti è attiva." : " Senza questa password il cliente vede comunque il link a fine richiesta."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => void save(),
				className: "mt-3 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg",
				children: "Salva avvisi"
			}),
			note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm",
				children: note
			}) : null
		] }) : null]
	});
}
var field$3 = "h-11 w-full rounded-md border border-border bg-bg px-3 text-base";
var empty$1 = {
	code: "",
	active: true,
	totalPercent: 0,
	ridePercent: 0,
	minFare: 0,
	nightPercent: 0,
	holidayPercent: 0,
	waitPercent: 0,
	meetGreetFree: false,
	maxAmount: 0,
	vehicle: "all"
};
function num(value) {
	const next = Number(value.replace(",", "."));
	return Number.isFinite(next) ? next : 0;
}
function DiscountCodes({ staffEmail, pin }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [note, setNote] = (0, import_react.useState)("");
	const [draftKey, setDraftKey] = (0, import_react.useState)(0);
	async function load() {
		const list = await listDiscountCodes({ data: {
			staffEmail,
			pin
		} });
		setRows(list);
	}
	(0, import_react.useEffect)(() => {
		if (!open) return;
		load().catch(() => setNote("Codici non disponibili."));
	}, [
		open,
		staffEmail,
		pin
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Codici sconto"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen((value) => !value),
					className: "inline-flex h-10 items-center rounded-md border border-border px-3 text-sm font-medium",
					children: open ? "Chiudi" : "Apri"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Ogni codice si modifica da solo. I clienti vedono lo sconto solo se il codice è attivo."
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4",
				children: [
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: note
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscountForm, {
						initial: { ...empty$1 },
						submitLabel: "Crea codice",
						onSave: async (rule) => {
							await saveDiscountCode({ data: {
								staffEmail,
								pin,
								...rule,
								previousCode: ""
							} });
							await load();
							setDraftKey((value) => value + 1);
							setNote("Codice creato.");
						}
					}, draftKey),
					rows.map((rule) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscountForm, {
						initial: rule,
						submitLabel: "Salva",
						onSave: async (next) => {
							await saveDiscountCode({ data: {
								staffEmail,
								pin,
								...next,
								previousCode: rule.code
							} });
							await load();
							setNote(`${next.code} salvato.`);
						},
						onRemove: async () => {
							await removeDiscountCode({ data: {
								staffEmail,
								pin,
								code: rule.code
							} });
							await load();
							setNote(`${rule.code} eliminato.`);
						}
					}, rule.code))
				]
			}) : null
		]
	});
}
function DiscountForm({ initial, submitLabel, onSave, onRemove }) {
	const [rule, setRule] = (0, import_react.useState)(initial);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [confirmDelete, setConfirmDelete] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setRule(initial);
	}, [
		initial.code,
		initial.totalPercent,
		initial.ridePercent,
		initial.minFare,
		initial.nightPercent,
		initial.holidayPercent,
		initial.waitPercent,
		initial.meetGreetFree,
		initial.active,
		initial.maxAmount,
		initial.vehicle
	]);
	function set(key, value) {
		setRule((current) => ({
			...current,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "grid gap-3 rounded-md border border-border p-3",
		onSubmit: (event) => {
			event.preventDefault();
			setBusy(true);
			setError("");
			onSave({
				...rule,
				code: rule.code.trim().toUpperCase()
			}).catch((reason) => setError(reason instanceof Error ? reason.message : "Non salvato.")).finally(() => setBusy(false));
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid min-w-40 flex-1 gap-1 text-sm",
						children: ["Codice", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: rule.code,
							maxLength: 20,
							onChange: (event) => set("code", event.target.value.toUpperCase()),
							className: field$3
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: rule.active,
							onChange: (event) => set("active", event.target.checked)
						}), "Attivo"]
					}),
					onRemove ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => {
							if (!confirmDelete) {
								setConfirmDelete(true);
								return;
							}
							setBusy(true);
							setError("");
							onRemove().catch((reason) => {
								setError(reason instanceof Error ? reason.message : "Non eliminato.");
								setBusy(false);
								setConfirmDelete(false);
							});
						},
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
						children: confirmDelete ? "Conferma eliminazione" : "Elimina"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: discountSummary(rule) || "Nessuno sconto impostato."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto sul totale %",
						value: rule.totalPercent,
						onChange: (value) => set("totalPercent", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto massimo €",
						value: rule.maxAmount,
						onChange: (value) => set("maxAmount", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto sulla tratta %",
						value: rule.ridePercent,
						onChange: (value) => set("ridePercent", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Solo se la tratta supera €",
						value: rule.minFare,
						onChange: (value) => set("minFare", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto notturno %",
						value: rule.nightPercent,
						onChange: (value) => set("nightPercent", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto festivo %",
						value: rule.holidayPercent,
						onChange: (value) => set("holidayPercent", value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumberField, {
						label: "Sconto attesa %",
						value: rule.waitPercent,
						onChange: (value) => set("waitPercent", value)
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: ["Vale per", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: rule.vehicle,
					onChange: (event) => set("vehicle", event.target.value === "car" || event.target.value === "van" ? event.target.value : "all"),
					className: field$3,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "all",
							children: "Auto e van"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "car",
							children: "Solo auto"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "van",
							children: "Solo van"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: rule.meetGreetFree,
					onChange: (event) => set("meetGreetFree", event.target.checked)
				}), "Meet & greet gratuito"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Se compili tratta, notturno, festivo, attesa o meet & greet, valgono quelle voci. Lo sconto sul totale si usa solo da solo. Sconto massimo 0 = nessun tetto. Esempio: 20% su 1.000 € fa 200 €; con massimo 100 € lo sconto si ferma a 100 €."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "submit",
					disabled: busy,
					className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg",
					children: busy ? "Salvo…" : submitLabel
				})
			})
		]
	});
}
function NumberField({ label, value, onChange }) {
	const [text, setText] = (0, import_react.useState)(value > 0 ? String(value).replace(".", ",") : "");
	const sent = (0, import_react.useRef)(value);
	(0, import_react.useEffect)(() => {
		if (sent.current === value) return;
		sent.current = value;
		setText(value > 0 ? String(value).replace(".", ",") : "");
	}, [value]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "grid gap-1 text-sm",
		children: [label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
			type: "text",
			inputMode: "decimal",
			value: text,
			placeholder: "0",
			onChange: (event) => {
				const raw = event.target.value.replace(/[^\d.,]/g, "").replace(/^0+(?=\d)/, "");
				const next = raw === "" || raw === "," || raw === "." ? 0 : num(raw);
				sent.current = next;
				setText(raw);
				onChange(next);
			},
			className: field$3
		})]
	});
}
var field$2 = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base";
function OwnerClaim({ onSubmit }) {
	const [pin, setPin] = (0, import_react.useState)("");
	const [again, setAgain] = (0, import_react.useState)("");
	const [setupCode, setSetupCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-8 grid max-w-md gap-3 rounded-lg border border-border bg-surface p-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (pin.trim().length < 8) {
				setError("Il codice deve avere almeno 8 caratteri.");
				return;
			}
			if (pin !== again) {
				setError("I due codici non coincidono.");
				return;
			}
			if (!setupCode.trim()) {
				setError("Serve il codice di attivazione.");
				return;
			}
			setBusy(true);
			setError("");
			onSubmit(pin.trim(), setupCode).catch((reason) => {
				setError(reason instanceof Error ? reason.message : "Non riuscito.");
				setBusy(false);
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Crea il codice"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Il codice vale per info@mttravelservice.com. È l'unico accesso finché non ne aggiungi altri."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				autoComplete: "new-password",
				value: pin,
				onChange: (event) => setPin(event.target.value),
				placeholder: "Codice",
				className: field$2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				autoComplete: "new-password",
				value: again,
				onChange: (event) => setAgain(event.target.value),
				placeholder: "Ripeti il codice",
				className: field$2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				autoComplete: "off",
				value: setupCode,
				onChange: (event) => setSetupCode(event.target.value),
				placeholder: "Codice di attivazione",
				className: field$2
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: busy,
				className: "inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg disabled:opacity-50",
				children: busy ? "Attendi…" : "Crea codice"
			})
		]
	});
}
function StaffAccess({ staffEmail, pin, onPinChanged }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [rows, setRows] = (0, import_react.useState)([]);
	const [email, setEmail] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [again, setAgain] = (0, import_react.useState)("");
	const [nextPin, setNextPin] = (0, import_react.useState)("");
	const [nextAgain, setNextAgain] = (0, import_react.useState)("");
	const [note, setNote] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const ownerHere = rows.some((row) => row.owner && row.email === staffEmail);
	async function load() {
		const list = await listStaffLogins({ data: {
			staffEmail,
			pin
		} });
		setRows(list);
	}
	(0, import_react.useEffect)(() => {
		if (!open) return;
		load().catch(() => setNote("Accessi non disponibili."));
	}, [
		open,
		staffEmail,
		pin
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Accessi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen((value) => !value),
					className: "inline-flex h-10 items-center rounded-md border border-border px-3 text-sm font-medium",
					children: open ? "Chiudi" : "Apri"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "info@mttravelservice.com entra con il codice che hai già. Qui aggiungi altre mail, ognuna con il suo codice."
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2",
						children: rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [row.email, row.owner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: " · principale"
							}) : null] }), row.owner ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-muted",
								onClick: () => {
									setBusy(true);
									setNote("");
									removeStaffLogin({ data: {
										staffEmail,
										pin,
										loginEmail: row.email
									} }).then(() => load()).then(() => setNote("Mail tolta.")).catch((reason) => setNote(reason instanceof Error ? reason.message : "Non tolta.")).finally(() => setBusy(false));
								},
								children: "Rimuovi"
							})]
						}, row.email))
					}),
					ownerHere ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (event) => {
							event.preventDefault();
							if (nextPin.trim().length < 8) {
								setNote("Il codice deve avere almeno 8 caratteri.");
								return;
							}
							if (nextPin !== nextAgain) {
								setNote("I due codici non coincidono.");
								return;
							}
							setBusy(true);
							setNote("");
							changeStaffPin({ data: {
								staffEmail,
								pin,
								nextPin: nextPin.trim()
							} }).then(() => {
								onPinChanged?.(nextPin.trim());
								setNextPin("");
								setNextAgain("");
								setNote("Codice del titolare aggiornato.");
							}).catch((reason) => setNote(reason instanceof Error ? reason.message : "Codice non aggiornato.")).finally(() => setBusy(false));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: nextPin,
								onChange: (event) => setNextPin(event.target.value),
								placeholder: "Nuovo codice del titolare",
								autoComplete: "new-password",
								className: field$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: nextAgain,
								onChange: (event) => setNextAgain(event.target.value),
								placeholder: "Ripeti il nuovo codice",
								autoComplete: "new-password",
								className: field$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "inline-flex h-12 items-center justify-center rounded-md border border-border px-5 font-medium disabled:opacity-50",
								children: "Cambia il mio codice"
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (event) => {
							event.preventDefault();
							if (code.trim().length < 8) {
								setNote("Il codice deve avere almeno 8 caratteri.");
								return;
							}
							if (code !== again) {
								setNote("I due codici non coincidono.");
								return;
							}
							setBusy(true);
							setNote("");
							saveStaffLogin({ data: {
								staffEmail,
								pin,
								loginEmail: email,
								loginPin: code.trim()
							} }).then(() => load()).then(() => {
								setEmail("");
								setCode("");
								setAgain("");
								setNote("Mail autorizzata.");
							}).catch((reason) => setNote(reason instanceof Error ? reason.message : "Non salvata.")).finally(() => setBusy(false));
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "email",
								value: email,
								onChange: (event) => setEmail(event.target.value),
								placeholder: "Nuova mail",
								autoComplete: "off",
								className: field$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: code,
								onChange: (event) => setCode(event.target.value),
								placeholder: "Codice",
								autoComplete: "new-password",
								className: field$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: again,
								onChange: (event) => setAgain(event.target.value),
								placeholder: "Ripeti il codice",
								autoComplete: "new-password",
								className: field$2
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								disabled: busy,
								className: "inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg disabled:opacity-50",
								children: "Autorizza mail"
							})
						]
					}),
					note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-primary",
						children: note
					}) : null
				]
			}) : null
		]
	});
}
var field$1 = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base";
function money(value) {
	const amount = Number(value.replace(",", "."));
	return Number.isFinite(amount) ? Math.round(amount * 100) / 100 : 0;
}
function moneyInput$1(amount) {
	return amount.toFixed(2).replace(".", ",");
}
function quoteWithTotal(quote, total) {
	const kept = quote.lines.filter((line) => line.label !== "Rettifica");
	const sum = Math.round(kept.reduce((totalAmount, line) => totalAmount + line.amount, 0) * 100) / 100;
	const delta = Math.round((total - sum) * 100) / 100;
	return {
		...quote,
		total,
		lines: Math.abs(delta) < .01 ? kept : [...kept, {
			label: "Rettifica",
			amount: delta,
			kind: "extra"
		}]
	};
}
function StaffEdit({ booking, staffEmail, pin, onClose, onSaved }) {
	const trip = booking.trip;
	const [origin, setOrigin] = (0, import_react.useState)(trip.origin);
	const [destination, setDestination] = (0, import_react.useState)(trip.destination);
	const [stops, setStops] = (0, import_react.useState)(trip.stops);
	const [roundTrip, setRoundTrip] = (0, import_react.useState)(trip.roundTrip);
	const [vehicleStay, setVehicleStay] = (0, import_react.useState)(Boolean(trip.vehicleStay));
	const [date, setDate] = (0, import_react.useState)(trip.date);
	const [time, setTime] = (0, import_react.useState)(trip.time);
	const [returnDate, setReturnDate] = (0, import_react.useState)(trip.returnDate);
	const [returnTime, setReturnTime] = (0, import_react.useState)(trip.returnTime);
	const [passengers, setPassengers] = (0, import_react.useState)(String(trip.passengers));
	const [luggage, setLuggage] = (0, import_react.useState)(String(trip.luggage));
	const [vehicle, setVehicle] = (0, import_react.useState)(trip.vehicle);
	const [flight, setFlight] = (0, import_react.useState)(trip.flight);
	const [meetGreet, setMeetGreet] = (0, import_react.useState)(trip.meetGreet);
	const [waitMinutes, setWaitMinutes] = (0, import_react.useState)(String(trip.waitMinutes));
	const [oversizedNote, setOversizedNote] = (0, import_react.useState)(trip.oversizedNote);
	const [firstName, setFirstName] = (0, import_react.useState)(booking.customer.firstName);
	const [lastName, setLastName] = (0, import_react.useState)(booking.customer.lastName);
	const [phone, setPhone] = (0, import_react.useState)(booking.customer.phone);
	const [email, setEmail] = (0, import_react.useState)(booking.customer.email);
	const [notes, setNotes] = (0, import_react.useState)(booking.customer.notes);
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)(booking.paymentMethod || "bonifico");
	const [paymentLink, setPaymentLink] = (0, import_react.useState)(booking.paymentLink);
	const [total, setTotal] = (0, import_react.useState)(moneyInput$1(booking.quote.total));
	const [manualTotal, setManualTotal] = (0, import_react.useState)(true);
	const [route, setRoute] = (0, import_react.useState)(null);
	const [routing, setRouting] = (0, import_react.useState)(false);
	const [approachKm, setApproachKm] = (0, import_react.useState)(booking.quote.approachKm ? String(booking.quote.approachKm).replace(".", ",") : "");
	const [remote, setRemote] = (0, import_react.useState)(Boolean(booking.quote.remote));
	const [includeSlow, setIncludeSlow] = (0, import_react.useState)(Boolean(booking.quote.includeSlow) || booking.quote.lines.some((line) => line.kind === "slow"));
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const opened = (0, import_react.useRef)(true);
	const resolvedStops = (0, import_react.useMemo)(() => stops.filter((stop) => stop.label.trim().length >= 2 && Number.isFinite(stop.lat) && stop.lat !== 0), [stops]);
	const stopKey = resolvedStops.map((stop) => `${stop.lat},${stop.lon}`).join(";");
	(0, import_react.useEffect)(() => {
		if (!origin || !destination) {
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
		}).finally(() => {
			if (!controller.signal.aborted) setRouting(false);
		});
		return () => controller.abort();
	}, [
		origin,
		destination,
		stopKey,
		roundTrip,
		resolvedStops
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
		});
		return () => controller.abort();
	}, [origin, destination]);
	(0, import_react.useEffect)(() => {
		if (opened.current) {
			opened.current = false;
			return;
		}
		setManualTotal(false);
	}, [
		origin,
		destination,
		stopKey,
		roundTrip,
		date,
		time,
		returnDate,
		returnTime,
		luggage,
		passengers,
		vehicle,
		waitMinutes,
		vehicleStay,
		paymentMethod,
		meetGreet,
		approachKm,
		includeSlow
	]);
	const priced = (0, import_react.useMemo)(() => {
		if (!route) return null;
		const people = Math.min(16, Math.max(1, Number(passengers) || 1));
		const bags = Math.max(0, Number(luggage) || 0);
		const chosen = people > 8 ? "van" : people > VEHICLES.car.passengers || bags > VEHICLES.car.bagsIncluded ? "van" : vehicle;
		return buildQuote({
			vehicle: chosen,
			km: route.km,
			minutes: route.minutes,
			outboundKm: route.outboundKm,
			outboundMinutes: route.outboundMinutes,
			estimated: route.estimated,
			roundTrip,
			vehicleStay: roundTrip && vehicleStay,
			date,
			time,
			returnDate,
			returnTime,
			luggage: bags,
			childSeats: 0,
			boosters: 0,
			meetGreet,
			pet: false,
			waitMinutes: Math.max(0, Number(waitMinutes) || 0),
			stopCount: resolvedStops.length,
			discountCode: paymentMethod === "rate" ? "" : booking.quote.discountCode ?? "",
			waitManual: true,
			passengers: people,
			approachKm: Math.max(0, Number(approachKm.replace(",", ".")) || 0),
			remote,
			includeSlow,
			bologna: serviceInBologna([
				origin,
				destination,
				...resolvedStops
			])
		});
	}, [
		route,
		passengers,
		luggage,
		vehicle,
		roundTrip,
		vehicleStay,
		date,
		time,
		returnDate,
		returnTime,
		meetGreet,
		waitMinutes,
		paymentMethod,
		resolvedStops.length,
		booking.quote.discountCode,
		approachKm,
		remote,
		includeSlow
	]);
	(0, import_react.useEffect)(() => {
		if (!priced || manualTotal) return;
		setTotal(moneyInput$1(priced.total));
		if (priced.vehicle !== vehicle) setVehicle(priced.vehicle);
	}, [
		priced,
		manualTotal,
		vehicle
	]);
	async function save(notify) {
		if (!origin || !destination) {
			setError("Servono partenza e arrivo.");
			return;
		}
		const nextTotal = money(total);
		if (nextTotal <= 0) {
			setError("Il totale deve essere maggiore di zero.");
			return;
		}
		setBusy(true);
		setError("");
		try {
			const people = Math.min(16, Math.max(1, Number(passengers) || 1));
			const bags = Math.max(0, Number(luggage) || 0);
			const fleet = people > 8 ? fleetForPassengers(people, bags) : void 0;
			const chosen = fleet ? "van" : people > VEHICLES.car.passengers || bags > VEHICLES.car.bagsIncluded ? "van" : vehicle;
			const quote = priced ? Math.abs(priced.total - nextTotal) < .05 ? priced : quoteWithTotal(priced, nextTotal) : quoteWithTotal({
				...booking.quote,
				vehicle: chosen
			}, nextTotal);
			const saved = await updateStaffBooking({ data: {
				staffEmail,
				pin,
				id: booking.id,
				notify,
				pageOrigin: window.location.origin,
				paymentMethod,
				paymentLink,
				trip: {
					origin,
					destination,
					stops: resolvedStops,
					roundTrip,
					vehicleStay: roundTrip && vehicleStay,
					date,
					time,
					landingDate: meetGreet ? date : trip.landingDate,
					landingTime: meetGreet ? time : trip.landingTime,
					returnDate,
					returnTime,
					passengers: people,
					luggage: bags,
					oversized: bags > 10 || oversizedNote.trim().length > 0,
					oversizedNote,
					vehicle: chosen,
					fleet,
					childSeats: 0,
					boosters: 0,
					meetGreet,
					pet: false,
					waitMinutes: Math.max(0, Number(waitMinutes) || 0),
					flight
				},
				customer: {
					firstName,
					lastName,
					phone,
					email,
					notes
				},
				quote
			} });
			onSaved(saved.booking);
			setResult({
				mailed: saved.mailed,
				notice: saved.notice,
				silent: !notify
			});
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Non riesco a salvare.");
		} finally {
			setBusy(false);
		}
	}
	if (result) {
		const customer = {
			...booking.customer,
			firstName,
			lastName,
			phone,
			email
		};
		const preview = {
			...booking,
			customer
		};
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-3 rounded-md border border-border bg-bg p-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: result.silent ? "Preventivo salvato. Il cliente non è stato avvisato." : result.mailed ? `Mail inviata a ${email}.` : "Modifica salvata. La mail automatica non è partita."
				}),
				!result.silent && !result.mailed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Invia tu il riepilogo al cliente. In Gestione → Avvisi serve la password dell'app di info@mttravelservice.com."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [!result.silent ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: whatsappTo(phone, result.notice),
						target: "_blank",
						rel: "noreferrer",
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm",
						children: "WhatsApp"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: mailHref(preview, result.notice, `Preventivo aggiornato ${booking.code}`),
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm",
						children: "Email"
					})] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Chiudi"
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3 rounded-md border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: ["Modifica preventivo ", booking.code]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
				label: "Partenza",
				place: origin,
				onPlace: setOrigin
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
				label: "Arrivo",
				place: destination,
				onPlace: setDestination
			}),
			stops.map((stop, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
					label: `Fermata ${index + 1}`,
					place: stop,
					onPlace: (place) => setStops((current) => current.map((item, itemIndex) => itemIndex === index ? place ?? item : item))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "text-left text-sm text-muted",
					onClick: () => setStops((current) => current.filter((_, itemIndex) => itemIndex !== index)),
					children: "Rimuovi fermata"
				})]
			}, `${stop.label}-${index}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-left text-sm",
				onClick: () => setStops((current) => [...current, {
					label: "",
					lat: 0,
					lon: 0
				}]),
				children: "Aggiungi fermata · + 25 €, più i chilometri"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Data", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: date,
							onChange: (event) => setDate(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Ora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: time,
							onChange: (event) => setTime(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Data ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: returnDate,
							onChange: (event) => setReturnDate(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Ora ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "time",
							value: returnTime,
							onChange: (event) => setReturnTime(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-12 items-center gap-2 text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: roundTrip,
							onChange: (event) => {
								setRoundTrip(event.target.checked);
								if (!event.target.checked) setVehicleStay(false);
							}
						}), "Andata e ritorno"]
					}),
					roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1",
							checked: vehicleStay,
							onChange: (event) => setVehicleStay(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Veicolo a disposizione in attesa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-1 block text-muted",
							children: "Un solo transfer andata e ritorno, più tutte le ore di attesa indicate."
						})] })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Passeggeri, max 16", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: passengers,
							onChange: (event) => setPassengers(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Bagagli", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: luggage,
							onChange: (event) => setLuggage(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Veicolo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: vehicle,
							onChange: (event) => setVehicle(event.target.value === "van" ? "van" : "car"),
							className: field$1,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "car",
								children: "Auto"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "van",
								children: "Van"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Attesa, minuti", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							inputMode: "numeric",
							value: waitMinutes,
							onChange: (event) => setWaitMinutes(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: [
							"Km aggiuntivi dalla sede",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: approachKm,
								onChange: (event) => setApproachKm(event.target.value),
								className: field$1,
								placeholder: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "Solo qui, a mano. 0,50 €/km, già nel totale. Il cliente vede il prezzo con un asterisco e non questi chilometri."
							})
						]
					}),
					priced?.slow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-2 text-sm sm:col-span-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "mt-1",
							checked: includeSlow,
							onChange: (event) => setIncludeSlow(event.target.checked)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							"Percorrenza lenta rilevata: ",
							priced.slow.label,
							". ",
							euro(priced.slow.amount),
							".",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-muted",
								children: "Non è nel preventivo del cliente finché non la spunti."
							})
						] })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Volo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: flight,
							onChange: (event) => setFlight(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-12 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: meetGreet,
							onChange: (event) => setMeetGreet(event.target.checked)
						}), "Meet & greet"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: ["Bagagli fuori misura", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: oversizedNote,
							rows: 2,
							onChange: (event) => setOversizedNote(event.target.value),
							className: "min-h-20 w-full rounded-md border border-border bg-surface px-3 py-3 text-base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: firstName,
							onChange: (event) => setFirstName(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Cognome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: lastName,
							onChange: (event) => setLastName(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Telefono", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: email,
							onChange: (event) => setEmail(event.target.value),
							className: field$1
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							value: notes,
							rows: 2,
							onChange: (event) => setNotes(event.target.value),
							className: "min-h-20 w-full rounded-md border border-border bg-surface px-3 py-3 text-base"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: [
							"Totale €",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								inputMode: "decimal",
								value: total,
								onChange: (event) => {
									setManualTotal(true);
									setTotal(event.target.value);
								},
								className: field$1
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: routing ? "Ricalcolo il percorso…" : priced?.legs && priced.legs.length > 1 ? priced.legs.map((leg) => `${leg.label} ${legMeasure(leg.km, leg.minutes, priced.estimated)}`).join(" · ") : priced ? `${kmLabel(priced.km)} · ${formatDuration(priced.minutes)}${priced.estimated ? " · stima" : ""}` : "In attesa del percorso"
							})
						]
					}),
					priced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: [
							priced.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex justify-between gap-3 text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: euro(line.amount) })]
							}, line.label)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
								children: [
									"Prezzo calcolato ",
									euro(priced.total),
									priced.fleet ? ` · ${fleetLabel(priced.fleet)}` : ""
								]
							}),
							priced.approachAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-muted",
								children: [
									"Km sede nel totale: ",
									euro(priced.approachAmount),
									". Al cliente il prezzo ha un asterisco, senza il dettaglio."
								]
							}) : null,
							priced.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted",
								children: "Partenza e arrivo sono oltre 20 km dalla sede: il cliente vede l'asterisco e l'avviso sul vettore vicino."
							}) : null,
							manualTotal && Math.abs(priced.total - money(total)) >= .05 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-left text-sm",
								onClick: () => {
									setManualTotal(false);
									setTotal(moneyInput$1(priced.total));
								},
								children: "Usa il prezzo calcolato"
							}) : null
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: ["Pagamento", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: paymentMethod,
							onChange: (event) => setPaymentMethod(event.target.value),
							className: field$1,
							children: PAYMENT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: method.id,
								children: method.label
							}, method.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm sm:col-span-2",
						children: ["Link di pagamento", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: paymentLink,
							onChange: (event) => setPaymentLink(event.target.value),
							className: field$1
						})]
					})
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void save(true),
						className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50",
						children: busy ? "Salvo…" : "Salva e avvisa il cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => void save(false),
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium disabled:opacity-50",
						children: "Salva senza avvisare"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Chiudi"
					})
				]
			})
		]
	});
}
var field = "h-12 w-full rounded-md border border-border bg-bg px-3 text-base";
function chosenVehicle(values) {
	const people = Number(values.passengers) || 1;
	const bags = Number(values.luggage) || 0;
	if (people > VEHICLES.car.passengers || bags > VEHICLES.car.bagsIncluded) return "van";
	if (values.vehicle === "van" || values.vehicle === "car") return values.vehicle;
	return "car";
}
function moneyInput(amount) {
	return amount.toFixed(2).replace(".", ",");
}
function parseMoney(value) {
	const amount = Number(value.replace(",", "."));
	return Number.isFinite(amount) && amount > 0 ? Math.round(amount * 100) / 100 : 0;
}
function draftBooking(values, origin, destination, priced) {
	const vehicle = chosenVehicle(values);
	const total = parseMoney(values.total);
	const method = values.paymentMethod || "bonifico";
	const same = priced && Math.abs(priced.total - total) < .05;
	return {
		id: "bozza",
		code: values.code || makeBookingCode(),
		createdAt: (/* @__PURE__ */ new Date()).toISOString(),
		status: "pending",
		paymentMethod: method,
		paymentLink: "",
		trip: {
			origin: origin ?? {
				label: "—",
				lat: 0,
				lon: 0
			},
			destination: destination ?? {
				label: "—",
				lat: 0,
				lon: 0
			},
			stops: [],
			roundTrip: values.roundTrip,
			date: values.date,
			time: values.time,
			landingDate: "",
			landingTime: "",
			returnDate: values.returnDate,
			returnTime: values.returnTime,
			passengers: Math.max(1, Number(values.passengers) || 1),
			luggage: Math.max(0, Number(values.luggage) || 0),
			oversized: Number(values.luggage) > 10 || values.oversizedNote.trim().length > 0,
			oversizedNote: values.oversizedNote.trim(),
			vehicle,
			childSeats: 0,
			boosters: 0,
			meetGreet: false,
			pet: false,
			waitMinutes: Math.max(0, Number(values.waitMinutes) || 0),
			vehicleStay: values.roundTrip && values.vehicleStay,
			flight: values.flight.trim()
		},
		customer: {
			firstName: values.firstName.trim(),
			lastName: values.lastName.trim(),
			phone: values.phone.trim(),
			email: values.email.trim(),
			notes: values.notes.trim()
		},
		quote: same ? priced : {
			lines: total > 0 ? [{
				label: "Totale",
				amount: total
			}] : [],
			total,
			km: priced?.km ?? 0,
			minutes: priced?.minutes ?? 0,
			estimated: priced?.estimated ?? true,
			night: false,
			holiday: null,
			vehicle,
			sameDayChoice: null,
			appliedWait: 0,
			discountCode: null
		}
	};
}
var empty = {
	code: "",
	origin: "",
	destination: "",
	date: "",
	time: "",
	returnDate: "",
	returnTime: "",
	roundTrip: false,
	vehicleStay: false,
	passengers: "",
	luggage: "",
	oversizedNote: "",
	vehicle: "",
	flight: "",
	firstName: "",
	lastName: "",
	phone: "",
	email: "",
	notes: "",
	total: "",
	paymentMethod: "",
	waitMinutes: ""
};
function StaffQuote({ staffEmail, pin, onSaved }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [values, setValues] = (0, import_react.useState)(empty);
	const [originPlace, setOriginPlace] = (0, import_react.useState)(null);
	const [destinationPlace, setDestinationPlace] = (0, import_react.useState)(null);
	const [route, setRoute] = (0, import_react.useState)(null);
	const [priced, setPriced] = (0, import_react.useState)(null);
	const [routing, setRouting] = (0, import_react.useState)(false);
	const [approachKm, setApproachKm] = (0, import_react.useState)("");
	const [remote, setRemote] = (0, import_react.useState)(false);
	const [manual, setManual] = (0, import_react.useState)(false);
	const [mapTarget, setMapTarget] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [formKey, setFormKey] = (0, import_react.useState)(0);
	const luggage = Number(values.luggage) || 0;
	const vehicle = chosenVehicle(values);
	(0, import_react.useEffect)(() => {
		if (!originPlace || !destinationPlace) {
			setRoute(null);
			setRouting(false);
			return;
		}
		const controller = new AbortController();
		setRouting(true);
		const back = values.roundTrip ? [destinationPlace, originPlace] : null;
		routeTrip([originPlace, destinationPlace], back, controller.signal).then((next) => {
			if (!controller.signal.aborted) setRoute(next);
		}).catch((reason) => {
			if (reason instanceof DOMException && reason.name === "AbortError") return;
			if (!controller.signal.aborted) setRoute(null);
		}).finally(() => {
			if (!controller.signal.aborted) setRouting(false);
		});
		return () => controller.abort();
	}, [
		originPlace,
		destinationPlace,
		values.roundTrip
	]);
	(0, import_react.useEffect)(() => {
		if (!originPlace || !destinationPlace) {
			setRemote(false);
			return;
		}
		const controller = new AbortController();
		farFromBase(originPlace, destinationPlace, controller.signal).then((next) => {
			if (!controller.signal.aborted) setRemote(next);
		}).catch((reason) => {
			if (reason instanceof DOMException && reason.name === "AbortError") return;
		});
		return () => controller.abort();
	}, [originPlace, destinationPlace]);
	(0, import_react.useEffect)(() => {
		setManual(false);
	}, [
		originPlace,
		destinationPlace,
		values.roundTrip,
		values.date,
		values.time,
		values.returnDate,
		values.returnTime,
		values.luggage,
		values.passengers,
		values.vehicle,
		values.waitMinutes,
		values.vehicleStay,
		approachKm
	]);
	(0, import_react.useEffect)(() => {
		if (!route) {
			setPriced(null);
			return;
		}
		const next = buildQuote({
			vehicle,
			km: route.km,
			minutes: route.minutes,
			outboundKm: route.outboundKm,
			outboundMinutes: route.outboundMinutes,
			estimated: route.estimated,
			roundTrip: values.roundTrip,
			date: values.date,
			time: values.time,
			returnDate: values.returnDate,
			returnTime: values.returnTime,
			vehicleStay: values.roundTrip && values.vehicleStay,
			luggage,
			childSeats: 0,
			boosters: 0,
			meetGreet: false,
			pet: false,
			waitMinutes: Math.max(0, Number(values.waitMinutes) || 0),
			waitManual: true,
			stopCount: 0,
			discountCode: "",
			passengers: Math.min(16, Math.max(1, Number(values.passengers) || 1)),
			approachKm: Math.max(0, Number(approachKm.replace(",", ".")) || 0),
			remote,
			bologna: serviceInBologna([originPlace, destinationPlace])
		});
		setPriced(next);
		if (!manual) setValues((current) => ({
			...current,
			total: moneyInput(next.total)
		}));
	}, [
		route,
		vehicle,
		luggage,
		manual,
		values.roundTrip,
		values.date,
		values.time,
		values.returnDate,
		values.returnTime,
		values.waitMinutes,
		values.vehicleStay,
		approachKm,
		remote
	]);
	function set(key, value) {
		setValues((current) => ({
			...current,
			[key]: value
		}));
	}
	async function save() {
		setError("");
		setBusy(true);
		try {
			onSaved(await createStaffQuote({ data: {
				staffEmail,
				pin,
				origin: originPlace?.label ?? "",
				destination: destinationPlace?.label ?? "",
				originLat: originPlace?.lat ?? 0,
				originLon: originPlace?.lon ?? 0,
				destinationLat: destinationPlace?.lat ?? 0,
				destinationLon: destinationPlace?.lon ?? 0,
				date: values.date,
				time: values.time,
				returnDate: values.returnDate,
				returnTime: values.returnTime,
				roundTrip: values.roundTrip,
				vehicleStay: values.roundTrip && values.vehicleStay,
				passengers: Number(values.passengers) || 0,
				luggage,
				oversizedNote: values.oversizedNote,
				vehicle,
				flight: values.flight,
				firstName: values.firstName,
				lastName: values.lastName,
				phone: values.phone,
				email: values.email,
				notes: values.notes,
				total: parseMoney(values.total),
				waitMinutes: Math.max(0, Number(values.waitMinutes) || 0),
				km: priced?.km ?? 0,
				minutes: priced?.minutes ?? 0,
				estimated: priced?.estimated ?? false,
				approachKm: priced?.approachKm ?? 0,
				approachAmount: priced?.approachAmount ?? 0,
				remote: priced?.remote ?? false,
				lines: priced && Math.abs(priced.total - parseMoney(values.total)) < .05 ? priced.lines : parseMoney(values.total) > 0 ? [{
					label: "Totale",
					amount: parseMoney(values.total)
				}] : [],
				paymentMethod: values.paymentMethod
			} }));
			setValues(empty);
			setOriginPlace(null);
			setDestinationPlace(null);
			setPriced(null);
			setApproachKm("");
			setRemote(false);
			setManual(false);
			setFormKey((current) => current + 1);
			setMapTarget(null);
			setOpen(false);
		} catch {
			setError("Non riesco a salvare il preventivo. Riprova.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-6 rounded-lg border border-border bg-surface p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg",
					children: "Nuovo preventivo"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen((value) => !value),
					className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg",
					children: open ? "Chiudi" : "Crea"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Partenza e arrivo calcolano il prezzo. La cifra resta modificabile, nessun campo è obbligatorio."
			}),
			open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative h-56 overflow-hidden rounded-lg border border-border sm:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapHost, {
									data: {
										pins: [...originPlace ? [{
											...originPlace,
											kind: "a"
										}] : [], ...destinationPlace ? [{
											...destinationPlace,
											kind: "b"
										}] : []],
										line: route?.line ?? []
									},
									picking: Boolean(mapTarget),
									scrollSignal: mapTarget ?? "",
									onPick: (lat, lon) => {
										const target = mapTarget ?? (!originPlace ? "origin" : "destination");
										setMapTarget(null);
										const rough = {
											label: `${lat.toFixed(5)}, ${lon.toFixed(5)}`,
											lat,
											lon
										};
										if (target === "origin") setOriginPlace(rough);
										else setDestinationPlace(rough);
										reversePlace(lat, lon).then((found) => {
											if (target === "origin") setOriginPlace(found);
											else setDestinationPlace(found);
										});
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
								label: "Partenza",
								place: originPlace,
								onPlace: setOriginPlace,
								presets: true,
								mapActive: mapTarget === "origin",
								onMapRequest: () => setMapTarget((current) => current === "origin" ? null : "origin")
							}, `${formKey}-from`),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceInput, {
								label: "Arrivo",
								place: destinationPlace,
								onPlace: setDestinationPlace,
								presets: true,
								mapActive: mapTarget === "destination",
								onMapRequest: () => setMapTarget((current) => current === "destination" ? null : "destination")
							}, `${formKey}-to`),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Data", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: values.date,
									onChange: (event) => set("date", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Ora", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: values.time,
									onChange: (event) => set("time", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex min-h-12 items-center gap-2 text-sm sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: values.roundTrip,
									onChange: (event) => {
										const checked = event.target.checked;
										set("roundTrip", checked);
										if (!checked) set("vehicleStay", false);
									}
								}), "Andata e ritorno"]
							}),
							values.roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-start gap-2 text-sm sm:col-span-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									className: "mt-1",
									checked: values.vehicleStay,
									onChange: (event) => set("vehicleStay", event.target.checked)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Veicolo a disposizione in attesa", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-muted",
									children: "Un solo transfer andata e ritorno, più tutte le ore di attesa indicate sotto."
								})] })]
							}) : null,
							values.roundTrip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Data ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "date",
									value: values.returnDate,
									onChange: (event) => set("returnDate", event.target.value),
									className: field
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Ora ritorno", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "time",
									value: values.returnTime,
									onChange: (event) => set("returnTime", event.target.value),
									className: field
								})]
							})] }) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Attesa, minuti", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									value: values.waitMinutes,
									placeholder: "0",
									onChange: (event) => set("waitMinutes", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Passeggeri", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									value: values.passengers,
									onChange: (event) => set("passengers", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Bagagli standard", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									inputMode: "numeric",
									value: values.luggage,
									onChange: (event) => set("luggage", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Veicolo", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: values.vehicle,
									onChange: (event) => set("vehicle", event.target.value),
									className: field,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "",
											children: "Non indicato"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "car",
											children: VEHICLES.car.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "van",
											children: VEHICLES.van.name
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Volo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: values.flight,
									onChange: (event) => set("flight", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm sm:col-span-2",
								children: ["Bagagli fuori misura / altro", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: values.oversizedNote,
									rows: 2,
									onChange: (event) => set("oversizedNote", event.target.value),
									className: "min-h-20 w-full rounded-md border border-border bg-bg px-3 py-3 text-base"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Nome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: values.firstName,
									onChange: (event) => set("firstName", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Cognome", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: values.lastName,
									onChange: (event) => set("lastName", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Telefono", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: values.phone,
									onChange: (event) => set("phone", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: values.email,
									onChange: (event) => set("email", event.target.value),
									className: field
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm sm:col-span-2",
								children: [
									"Km aggiuntivi dalla sede",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										inputMode: "decimal",
										value: approachKm,
										placeholder: "0",
										onChange: (event) => setApproachKm(event.target.value),
										className: field
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: "Solo a mano. 0,50 €/km nel totale. Il cliente vede l'asterisco, non questi km."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm sm:col-span-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium",
										children: "Prezzo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										inputMode: "decimal",
										value: values.total,
										placeholder: routing ? "Calcolo…" : "Si compila dal percorso",
										onChange: (event) => {
											setManual(true);
											set("total", event.target.value);
										},
										className: `${field} font-display text-2xl`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: routing ? "Calcolo il percorso…" : priced ? priced.legs && priced.legs.length > 1 ? `${priced.legs.map((leg) => `${leg.label} ${legMeasure(leg.km, leg.minutes, priced.estimated)}`).join(" · ")}. Puoi cambiare la cifra.` : `${kmLabel(priced.km)} · ${formatDuration(priced.minutes)}${priced.estimated ? " · stima" : ""} · ${priced.fleet ? fleetLabel(priced.fleet) : VEHICLES[vehicle].name}. Puoi cambiare la cifra.` : "Scegli partenza e arrivo: il prezzo compare qui e puoi modificarlo."
									}),
									priced ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "grid gap-1",
										children: [
											priced.approachAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "text-sm text-muted",
												children: [
													"Km sede nel totale: ",
													euro(priced.approachAmount),
													". Al cliente solo l'asterisco."
												]
											}) : null,
											priced.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted",
												children: "Partenza e arrivo oltre 20 km dalla sede: il cliente vede l'asterisco e l'avviso sul vettore vicino."
											}) : null,
											priced.lines.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "flex justify-between gap-3 text-sm text-muted",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "tabular-nums",
													children: euro(line.amount)
												})]
											}, line.label)),
											manual ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												type: "button",
												onClick: () => {
													setManual(false);
													set("total", moneyInput(priced.total));
												},
												className: "mt-1 self-start text-sm text-primary",
												children: ["Rimetti ", euro(priced.total)]
											}) : null
										]
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm",
								children: ["Pagamento", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: values.paymentMethod,
									onChange: (event) => set("paymentMethod", event.target.value),
									className: field,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Non indicato"
									}), PAYMENT_METHODS.map((method) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: method.id,
										children: method.label
									}, method.id))]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm sm:col-span-2",
								children: ["Note", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									value: values.notes,
									rows: 2,
									onChange: (event) => set("notes", event.target.value),
									className: "min-h-20 w-full rounded-md border border-border bg-bg px-3 py-3 text-base"
								})]
							})
						]
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
							className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50",
							children: busy ? "Salvo…" : "Salva in richieste"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PdfExport, {
							label: "PDF cliente",
							onExport: (vat) => downloadBookingPdf(draftBooking(values, originPlace, destinationPlace, priced), vat)
						})]
					})
				]
			}) : null
		]
	});
}
var SESSION_KEY = "mt-travel-staff";
var LEGACY_PIN_KEY = "mt-travel-staff-pin";
var OWNER_EMAIL = "info@mttravelservice.com";
function readSession() {
	try {
		const raw = localStorage.getItem(SESSION_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			if (parsed.staffEmail && parsed.pin) return {
				staffEmail: parsed.staffEmail,
				pin: parsed.pin
			};
		}
	} catch {}
	const pin = localStorage.getItem(LEGACY_PIN_KEY);
	if (pin) return {
		staffEmail: OWNER_EMAIL,
		pin
	};
	return null;
}
function RichiestePage() {
	const [phase, setPhase] = (0, import_react.useState)("loading");
	const [staffEmail, setStaffEmail] = (0, import_react.useState)("");
	const [pin, setPin] = (0, import_react.useState)("");
	const [bookings, setBookings] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const [confirmId, setConfirmId] = (0, import_react.useState)(null);
	const [driverId, setDriverId] = (0, import_react.useState)(null);
	const [rejectId, setRejectId] = (0, import_react.useState)(null);
	const [editId, setEditId] = (0, import_react.useState)(null);
	const [moreId, setMoreId] = (0, import_react.useState)(null);
	async function openWith(nextEmail, nextPin) {
		const rows = await listStaffBookings({ data: {
			staffEmail: nextEmail,
			pin: nextPin
		} });
		setStaffEmail(nextEmail);
		setPin(nextPin);
		setBookings(rows);
		setPhase("ready");
		localStorage.setItem(SESSION_KEY, JSON.stringify({
			staffEmail: nextEmail,
			pin: nextPin
		}));
		localStorage.removeItem(LEGACY_PIN_KEY);
	}
	(0, import_react.useEffect)(() => {
		let alive = true;
		staffStatus().then((status) => {
			if (!alive) return;
			if (!status.claimed) {
				setPhase("setup");
				return;
			}
			const saved = readSession();
			if (!saved) {
				setPhase("locked");
				return;
			}
			return openWith(saved.staffEmail, saved.pin).catch(() => {
				localStorage.removeItem(SESSION_KEY);
				localStorage.removeItem(LEGACY_PIN_KEY);
				if (alive) setPhase("locked");
			});
		}).catch(() => {
			if (alive) {
				setError("Archivio non disponibile. Riprova.");
				setPhase("locked");
			}
		});
		return () => {
			alive = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 py-6 lg:py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-primary",
					children: "Solo per te"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 text-center text-2xl",
					children: "Richieste"
				})] }), phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoticeBell, { bookings }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-muted",
				children: "I clienti vedono solo la prenotazione. Qui arrivano le richieste, dopo l'accesso."
			}),
			phase === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-muted",
				children: "Carico…"
			}) : null,
			phase === "setup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwnerClaim, { onSubmit: async (next, setupCode) => {
				await claimStaff({ data: {
					pin: next,
					setupCode
				} });
				await openWith(OWNER_EMAIL, next);
			} }) : null,
			phase === "locked" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {
				hint: error || "Entra con una mail autorizzata e il suo codice. info@mttravelservice.com usa il codice che hai già.",
				onSubmit: openWith
			}) : null,
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffAccess, {
				staffEmail,
				pin,
				onPinChanged: (next) => {
					setPin(next);
					localStorage.setItem(SESSION_KEY, JSON.stringify({
						staffEmail,
						pin: next
					}));
				}
			}) : null,
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertSettings, {
				staffEmail,
				pin
			}) : null,
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DiscountCodes, {
				staffEmail,
				pin
			}) : null,
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffQuote, {
				staffEmail,
				pin,
				onSaved: (booking) => setBookings((current) => [booking, ...current])
			}) : null,
			phase === "ready" && bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-lg border border-border bg-surface p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Nessuna richiesta per ora." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-4 inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg",
					children: "Apri la prenotazione"
				})]
			}) : null,
			phase === "ready" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-6 grid gap-3",
				children: bookings.map((booking) => {
					const text = bookingMessage(booking);
					const removing = pendingId === booking.id;
					const confirmed = booking.status === "confirmed";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						id: `richiesta-${booking.id}`,
						className: "scroll-mt-6 rounded-lg border border-border bg-surface p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xl font-semibold",
									children: booking.code
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: `text-sm ${confirmed ? "text-fg" : "text-primary"}`,
									children: confirmed ? "Confermata" : booking.revised ? "Modificata · da riconfermare" : "Da confermare"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted",
								children: formatWhen(booking.trip.date, booking.trip.time)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3",
								children: [
									booking.trip.origin.label,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: " → "
									}),
									booking.trip.destination.label
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									fleetLabel(tripFleet(booking.trip)),
									" · ",
									peopleLabel(booking.trip.passengers),
									booking.trip.roundTrip ? " · A/R" : "",
									" · ",
									paymentLabel(booking.paymentMethod)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Totale"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-2xl font-semibold tabular-nums",
										children: euro(booking.quote.total)
									}),
									booking.quote.approachKm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted",
										children: [
											"Km sede inseriti: ",
											booking.quote.approachKm,
											". Il cliente vede solo l'asterisco."
										]
									}) : null,
									booking.quote.remote ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: "Partenza e arrivo oltre 20 km dalla sede: il cliente vede l'asterisco e l'avviso sul vettore vicino."
									}) : null
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3",
								children: [
									booking.customer.firstName,
									" ",
									booking.customer.lastName
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-primary",
										href: `tel:${booking.customer.phone.replace(/\s/g, "")}`,
										children: booking.customer.phone
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted",
										children: " · "
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "text-primary",
										href: `mailto:${booking.customer.email}`,
										children: booking.customer.email
									})
								]
							}),
							editId === booking.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffEdit, {
								booking,
								pin,
								staffEmail,
								onClose: () => setEditId(null),
								onSaved: (next) => setBookings((current) => current.map((item) => item.id === next.id ? next : item))
							}) : null,
							confirmId === booking.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmPanel, {
								booking,
								onClose: () => setConfirmId(null),
								onConfirm: async (patch) => {
									await confirmStaffBooking({ data: {
										staffEmail,
										pin,
										id: booking.id,
										...patch
									} });
									setBookings((current) => current.map((item) => item.id === booking.id ? {
										...item,
										status: "confirmed",
										paymentMethod: patch.paymentMethod,
										paymentLink: patch.paymentLink
									} : item));
								}
							}) : null,
							driverId === booking.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DriverPanel, {
								booking,
								onClose: () => setDriverId(null)
							}) : null,
							rejectId === booking.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RejectPanel, {
								booking,
								onClose: () => setRejectId(null)
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setConfirmId(booking.id),
										className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg",
										children: confirmed ? "Riapri conferma" : "Accetta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setRejectId(booking.id),
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
										children: "Rifiuta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMoreId((current) => current === booking.id ? null : booking.id),
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
										children: moreId === booking.id ? "Chiudi" : "Altro"
									})
								]
							}),
							moreId === booking.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setEditId(booking.id),
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
										children: "Modifica"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setDriverId(booking.id),
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
										children: "Altro autista"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: whatsappHref(text),
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
										children: "WhatsApp richiesta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequestActions, { booking }),
									removing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => {
											removeStaffBooking({ data: {
												staffEmail,
												pin,
												id: booking.id
											} }).then(() => {
												setBookings((current) => current.filter((item) => item.id !== booking.id));
												setPendingId(null);
											});
										},
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm",
										children: "Elimina"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPendingId(null),
										className: "inline-flex h-11 items-center px-3 text-sm text-muted",
										children: "Annulla"
									})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setPendingId(booking.id),
										className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm",
										children: "Rimuovi"
									})
								]
							}) : null
						]
					}, booking.id);
				})
			}) : null
		]
	});
}
function NoticeBell({ bookings }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const items = bookings.filter((booking) => booking.status !== "confirmed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			"aria-expanded": open,
			"aria-label": "Richieste da vedere",
			onClick: () => setOpen((value) => !value),
			className: "relative inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-surface",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "h-5 w-5" }), items.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-medium text-primary-fg",
				children: items.length
			}) : null]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute right-0 z-20 mt-2 w-80 rounded-lg border border-border bg-surface p-2 shadow-lg",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-3 text-sm text-muted",
				children: "Nessuna richiesta nuova o modifica da accettare."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: items.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "w-full rounded-md px-2 py-2 text-left hover:bg-bg",
				onClick: () => {
					setOpen(false);
					document.getElementById(`richiesta-${booking.id}`)?.scrollIntoView({
						behavior: "smooth",
						block: "start"
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: booking.code
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						booking.revised ? "Modifica da accettare" : "Nuova richiesta",
						" · ",
						booking.customer.firstName,
						" ",
						booking.customer.lastName
					]
				})]
			}) }, booking.id)) })
		}) : null]
	});
}
function LoginForm({ hint, onSubmit }) {
	const [email, setEmail] = (0, import_react.useState)(OWNER_EMAIL);
	const [pin, setPin] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-8 grid max-w-md gap-3 rounded-lg border border-border bg-surface p-4",
		onSubmit: (event) => {
			event.preventDefault();
			if (!email.includes("@") || pin.trim().length < 4) {
				setError("Servono mail e codice, almeno 4 caratteri.");
				return;
			}
			setBusy(true);
			setError("");
			onSubmit(email.trim().toLowerCase(), pin.trim()).catch((reason) => {
				setError(reason instanceof Error ? reason.message : "Accesso non riuscito.");
				setBusy(false);
			});
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-medium",
				children: "Entra in gestione"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "email",
				autoComplete: "username",
				value: email,
				onChange: (event) => setEmail(event.target.value),
				placeholder: "Mail",
				className: "h-12 rounded-md border border-border bg-bg px-3 text-base"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "password",
				autoComplete: "current-password",
				value: pin,
				onChange: (event) => setPin(event.target.value),
				placeholder: "Codice",
				className: "h-12 rounded-md border border-border bg-bg px-3 text-base"
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "submit",
				disabled: busy,
				className: "inline-flex h-12 items-center justify-center rounded-md bg-primary px-5 font-medium text-primary-fg disabled:opacity-50",
				children: busy ? "Attendi…" : "Apri"
			})
		]
	});
}
function DriverPanel({ booking, onClose }) {
	const reduced = Math.round(booking.quote.total * .8 * 100) / 100;
	const [mode, setMode] = (0, import_react.useState)("cut");
	const [custom, setCustom] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [vat, setVat] = (0, import_react.useState)("");
	const amount = mode === "cut" ? reduced : Number(custom.replace(",", "."));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3 rounded-md border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Assegnazione viaggio"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"Totale cliente ",
					euro(booking.quote.total),
					". Scegli il compenso da scrivere nel PDF."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: `driver-${booking.id}`,
								checked: mode === "cut",
								onChange: () => setMode("cut")
							}),
							"20% in meno · ",
							euro(reduced)
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: `driver-${booking.id}`,
							checked: mode === "custom",
							onChange: () => setMode("custom")
						}), "Altra cifra"]
					}),
					mode === "custom" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						inputMode: "decimal",
						value: custom,
						placeholder: "Es. 80",
						onChange: (event) => setCustom(event.target.value),
						className: "h-12 rounded-md border border-border bg-surface px-3 text-base"
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Regime IVA da scrivere nel PDF. Il compenso non cambia."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "radio",
					className: "mt-1",
					checked: vat === "zero",
					onChange: () => setVat("zero")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IVA 0%. Operazione senza applicazione dell'IVA ai sensi dell'art. 1, commi da 54 a 89, L. 190/2014 come modificato dalla L. 208/2015 e L. 145/2018." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-start gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "radio",
					className: "mt-1",
					checked: vat === "ten",
					onChange: () => setVat("ten")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "IVA 10% già inclusa nella cifra indicata." })]
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
					onClick: () => {
						if (!Number.isFinite(amount) || amount <= 0) {
							setError("Inserisci una cifra valida.");
							return;
						}
						if (!vat) {
							setError("Scegli il regime IVA del PDF.");
							return;
						}
						setError("");
						setBusy(true);
						downloadDriverPdf(booking, amount, vat).catch(() => setError("Non riesco a creare il PDF. Riprova.")).finally(() => setBusy(false));
					},
					className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50",
					children: busy ? "PDF…" : "Genera PDF"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onClose,
					className: "inline-flex h-11 items-center px-3 text-sm text-muted",
					children: "Chiudi"
				})]
			})
		]
	});
}
function RejectPanel({ booking, onClose }) {
	const [kind, setKind] = (0, import_react.useState)("");
	const [base, setBase] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const reason = kind === "distance" ? {
		kind,
		base
	} : kind === "unavailable" ? { kind } : null;
	const draft = reason && (kind !== "distance" || base.trim().length > 1) ? rejectionMessage(booking, reason) : "";
	function send(channel) {
		if (!kind) {
			setError("Scegli il motivo.");
			return;
		}
		if (kind === "distance" && base.trim().length < 2) {
			setError("Scrivi la sede.");
			return;
		}
		const text = rejectionMessage(booking, kind === "distance" ? {
			kind,
			base
		} : { kind: "unavailable" });
		const href = channel === "whatsapp" ? whatsappTo(booking.customer.phone, text) : mailHref(booking, text, `Transfer ${booking.code}`);
		window.open(href, "_blank", "noopener,noreferrer");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3 rounded-md border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Rifiuta la richiesta"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: `no-${booking.id}`,
							checked: kind === "distance",
							onChange: () => setKind("distance")
						}), "Troppo distante dalla sede"]
					}),
					kind === "distance" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: base,
						placeholder: "Sede, es. Gambettola",
						onChange: (event) => setBase(event.target.value),
						className: "h-12 rounded-md border border-border bg-surface px-3 text-base"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: `no-${booking.id}`,
							checked: kind === "unavailable",
							onChange: () => setKind("unavailable")
						}), "Nessuna disponibilità dei mezzi"]
					})
				]
			}),
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "max-h-64 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-surface p-3 text-sm",
				children: draft
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => send("whatsapp"),
						className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg",
						children: "WhatsApp al cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => send("mail"),
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium",
						children: "Email al cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Chiudi"
					})
				]
			})
		]
	});
}
function ConfirmPanel({ booking, onClose, onConfirm }) {
	const [method, setMethod] = (0, import_react.useState)(booking.paymentMethod ?? "");
	const [link, setLink] = (0, import_react.useState)(booking.paymentLink ?? "");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const needsLink = method !== "" && method !== "bonifico";
	const draft = method ? confirmationMessage({
		...booking,
		paymentMethod: method,
		paymentLink: link
	}, link) : "";
	function send(channel) {
		if (!method) {
			setError("Scegli il metodo di pagamento.");
			return;
		}
		if (needsLink && !/^https?:\/\/\S+$/i.test(link.trim())) {
			setError("Incolla il link di pagamento, completo di https://");
			return;
		}
		setError("");
		setBusy(true);
		const patch = {
			paymentMethod: method,
			paymentLink: needsLink ? link.trim() : ""
		};
		onConfirm(patch).then(() => {
			const saved = {
				...booking,
				...patch,
				status: "confirmed"
			};
			const text = confirmationMessage(saved);
			const href = channel === "whatsapp" ? whatsappTo(booking.customer.phone, text) : mailHref(saved, text, `Conferma transfer ${booking.code}`);
			window.open(href, "_blank", "noopener,noreferrer");
		}).catch((reason) => {
			setError(reason instanceof Error ? reason.message : "Conferma non riuscita.");
		}).finally(() => setBusy(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 grid gap-3 rounded-md border border-border bg-bg p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm font-medium",
				children: ["Conferma per ", booking.customer.firstName]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				role: "radiogroup",
				"aria-label": "Metodo di pagamento",
				children: PAYMENT_METHODS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: `flex min-h-12 items-center justify-between gap-3 rounded-md border px-3 text-sm ${method === item.id ? "border-primary bg-surface-2" : "border-border"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: `pay-${booking.id}`,
							checked: method === item.id,
							onChange: () => setMethod(item.id)
						}), item.label]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentBadge, { method: item.id })]
				}, item.id))
			}),
			needsLink ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-sm font-medium",
					children: "Link di pagamento"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: link,
					inputMode: "url",
					placeholder: "https://",
					onChange: (event) => setLink(event.target.value),
					className: "h-12 w-full rounded-md border border-border bg-surface px-3 text-base"
				})]
			}) : null,
			method === "bonifico" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Nel messaggio vanno IBAN, intestazione Mario Topo e la causale con data e nome del passeggero."
			}) : null,
			draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "max-h-64 overflow-auto whitespace-pre-wrap rounded-md border border-border bg-surface p-3 text-sm",
				children: draft
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => send("whatsapp"),
						className: "inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg disabled:opacity-50",
						children: "WhatsApp al cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						disabled: busy,
						onClick: () => send("mail"),
						className: "inline-flex h-11 items-center rounded-md border border-border px-4 text-sm font-medium disabled:opacity-50",
						children: "Email al cliente"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onClose,
						className: "inline-flex h-11 items-center px-3 text-sm text-muted",
						children: "Chiudi"
					})
				]
			})
		]
	});
}
//#endregion
export { RichiestePage as component };
