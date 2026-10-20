import { x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as COMPANY } from "./router-Bc2zQ2ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/privacy-B8O7QZKN.js
var import_jsx_runtime = require_jsx_runtime();
function PrivacyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-2xl px-4 py-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: "Informativa"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-center text-2xl",
				children: "Privacy"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 text-sm leading-relaxed",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Titolare del trattamento: ",
						COMPANY.owner,
						", P.IVA ",
						COMPANY.vat,
						", ",
						COMPANY.brand,
						", noleggio con conducente,",
						" ",
						COMPANY.place,
						". Email ",
						COMPANY.email,
						"."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Per la richiesta di transfer raccogliamo nome, cognome, telefono, email, note e i dati del viaggio (indirizzi, data, ora, passeggeri, bagagli). Servono solo a preparare il preventivo, confermare la corsa e ricontattarti." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "La base è la tua richiesta di un servizio, prima del contratto, e il consenso che dai inviando il modulo. I dati non vengono venduti. Restano per il tempo del servizio e per gli obblighi di legge, poi si cancellano." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Puoi chiedere accesso, correzione o cancellazione scrivendo a ",
						COMPANY.email,
						". Puoi anche proporre reclamo al Garante per la protezione dei dati personali."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "underline underline-offset-2",
						children: "Torna alla prenotazione"
					}) })
				]
			})
		]
	});
}
//#endregion
export { PrivacyPage as component };
