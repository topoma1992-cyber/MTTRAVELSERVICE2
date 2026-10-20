import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { J as require_react, _ as createFileRoute, b as useRouter, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRoute, x as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as TriangleAlert } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Bc2zQ2ac.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FALLBACK_MESSAGE = "An unexpected error occurred. Try reloading the page.";
function errorMessage(error) {
	if (error instanceof Error && error.message) return error.message;
	if (typeof error === "string" && error) return error;
	return FALLBACK_MESSAGE;
}
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: errorMessage(error)
			})
		]
	});
}
var copy = {
	it: {
		language: "Lingua",
		tagline: "NOLEGGIO CON CONDUCENTE",
		footer: "Noleggio con conducente",
		manage: "Gestione",
		kicker: "App prenotazione transfer NCC",
		title: "Il tuo transfer, a portata di tocco.",
		lead: "Percorso, orario ed extra: il preventivo si calcola da solo. Invii la richiesta e paghi solo dopo la conferma.",
		trip: "Il viaggio",
		from: "Partenza",
		to: "Arrivo",
		stop: "Fermata",
		removeStop: "Rimuovi fermata",
		stopPlaceholder: "Sosta intermedia",
		addStop: "Aggiungi una fermata",
		round: "Andata e ritorno",
		roundHint: "Il ritorno è calcolato senza le fermate.",
		stay: "Veicolo a disposizione in attesa",
		stayHint: "Un solo transfer andata e ritorno, più tutte le ore di attesa che scegli.",
		date: "Data",
		time: "Ora",
		landing: "Orario di atterraggio previsto",
		pickup: "Con il cartello nominativo l'attesa in aeroporto è gratuita per 1 ora dall'atterraggio previsto. Ritrovo alle",
		nextDay: ", il giorno dopo",
		returnDate: "Data ritorno",
		returnTime: "Ora ritorno",
		flight: "Numero volo",
		flightOptional: "Volo o treno",
		flightPh: "Es. AZ 1234",
		flightOptPh: "Numero, facoltativo",
		wait: "Attesa prevista",
		waitNone: "Nessuna attesa",
		wait15: "Fino a 15 min · inclusi",
		waitPay: "a pagamento",
		waitMeet: "Solo con meet & greet: 1 ora gratuita dall'atterraggio previsto. Dopo, si paga a scatti di 30 minuti, 50 €/h in auto e 60 €/h in van.",
		waitNormal: "Senza meet & greet: 15 minuti inclusi. Se l'attesa dura di più, si paga tutto il tempo, anche i primi 15 minuti, a scatti di 30 minuti: 50 €/h in auto e 60 €/h in van. L'auto resta sul posto solo per l'attesa che indichi.",
		vehicle: "Veicolo ed extra",
		passengers: "Passeggeri",
		bags: "Bagagli standard",
		bagsVan: "Oltre 4, solo il van. Oltre 10, la descrizione dei bagagli fuori misura è obbligatoria.",
		over3: "Oltre 4 passeggeri si prenota il van.",
		over8: "Da 9 a 11 passeggeri: un'auto e un van. Da 12 a 16: due van. Massimo 16.",
		over4: "Oltre 4 bagagli standard si prenota solo il van.",
		included: "inclusi",
		oversized: "Bagagli fuori misura / altro",
		oversizedPh: "Es. valigie più grandi del bagaglio a mano, passeggino, sci",
		oversizedNeed: "Oltre 10 bagagli standard, descrivi qui gli altri.",
		meetHint: "1 ora gratuita dall'atterraggio previsto, con cartello. Non vale la franchigia di 15 minuti.",
		rules: "Acqua fresca inclusa. A bordo non si mangia e non si fuma.",
		who: "Chi viaggia",
		name: "Nome",
		surname: "Cognome",
		notes: "Note",
		notesPh: "Orario volo, indicazioni per il ritiro",
		discount: "Codice sconto, facoltativo",
		discountPh: "Se ne hai uno",
		discountOk: "applicato al totale.",
		send: "Invia richiesta",
		sending: "Invio…",
		routing: "Calcolo percorso…",
		quote: "Preventivo",
		pickRoute: "Scegli partenza e arrivo: il prezzo si aggiorna da solo.",
		updating: "Aggiorno…",
		per: "A passeggero",
		total: "Totale",
		rates: "4 rate Scalapay da",
		ratesTotal: "Totale a rate",
		ratesMore: "",
		pay: "Pagamento",
		payNow: "Non paghi ora.",
		payLater: "MT TRAVEL SERVICE risponde con la conferma del preventivo e le istruzioni per pagare con il metodo che hai scelto.",
		payBank: "Bonifico istantaneo",
		payLink: "Link di pagamento",
		paySatispay: "Satispay",
		payRate: "4 rate Scalapay",
		payRule: "Paghi con link, bonifico istantaneo, Satispay o 4 rate Scalapay almeno 48 ore prima del viaggio, oppure subito alla conferma se mancano meno di 48 ore.",
		tariffNote: "Tariffa indicativa, senza diritto di partenza. Minimo 45 € in auto e 50 € in van. L'attesa si paga solo oltre la franchigia: 15 minuti al ritiro, oppure 1 ora dall'atterraggio se scegli il meet & greet. Poi 50 €/h in auto e 60 €/h in van, a scatti di 30 minuti. Acqua inclusa. A bordo non si mangia e non si fuma.",
		remoteNotice: "Il transfer è distante dalla nostra sede. MT TRAVEL SERVICE si impegna a trovare un vettore NCC vicino a voi per garantirvi la tariffa mostrata.",
		privacy: "Privacy",
		privacyConsent: "Ho letto l'informativa privacy e acconsento al trattamento di nome, telefono, email e note per questa richiesta.",
		privacyNeed: "Serve il consenso al trattamento dei dati.",
		terms: "Termini e condizioni",
		termsConsent: "Ho preso visione e accetto i termini e condizioni.",
		termsNeed: "Serve l'accettazione dei termini e condizioni.",
		here: "Qui",
		locating: "Posizione…",
		searching: "Cerco…",
		placePh: "Via, città o luogo",
		searchOff: "Ricerca indirizzi non disponibile. Usa una tappa rapida o la mappa.",
		searchEmpty: "Nessun indirizzo. Tocca Sulla mappa e scegli il punto.",
		houseNumber: "Numero civico",
		housePh: "Se non è uscito in elenco",
		onMap: "Sulla mappa",
		onMapOn: "Tocca la mappa",
		mapGps: "La mia posizione",
		geoOff: "Questo browser non legge la posizione.",
		geoFail: "Posizione non disponibile. Scrivi l'indirizzo.",
		ready: "Richiesta pronta",
		sent: "La richiesta è arrivata a MT Travel. Ti contattiamo per confermare il transfer.",
		copy: "Copia testo",
		copied: "Copiato",
		another: "Nuova richiesta",
		whatsapp: "WhatsApp",
		email: "Email"
	},
	en: {
		language: "Language",
		tagline: "CHAUFFEUR SERVICE",
		footer: "Chauffeur service",
		manage: "Staff",
		kicker: "NCC transfer booking app",
		title: "Your transfer, one tap away.",
		lead: "Route, time and extras: the quote calculates itself. You send the request and pay only after confirmation.",
		trip: "The trip",
		from: "Pickup",
		to: "Drop-off",
		stop: "Stop",
		removeStop: "Remove stop",
		stopPlaceholder: "Intermediate stop",
		addStop: "Add a stop",
		round: "Round trip",
		roundHint: "The return is calculated without the stops.",
		stay: "Vehicle stays and waits",
		stayHint: "One round-trip transfer, plus every waiting hour you select.",
		date: "Date",
		time: "Time",
		landing: "Scheduled landing time",
		pickup: "With a name board the airport wait is free for 1 hour from the scheduled landing. Meeting at",
		nextDay: ", the next day",
		returnDate: "Return date",
		returnTime: "Return time",
		flight: "Flight number",
		flightOptional: "Flight or train",
		flightPh: "E.g. AZ 1234",
		flightOptPh: "Number, optional",
		wait: "Expected wait",
		waitNone: "No wait",
		wait15: "Up to 15 min · included",
		waitPay: "charged",
		waitMeet: "Meet & greet only: 1 hour free from the scheduled landing. After that, 30-minute blocks at 50 €/h by car and 60 €/h by van.",
		waitNormal: "Without meet & greet: 15 minutes are included. If the wait is longer, the whole time is charged, including the first 15 minutes, in 30-minute blocks: 50 €/h by car and 60 €/h by van. The car stays only for the wait you set.",
		vehicle: "Vehicle and extras",
		passengers: "Passengers",
		bags: "Standard luggage",
		bagsVan: "More than 4 bags: van only. Above 10, the oversized luggage note is required.",
		over3: "More than 4 passengers: van only.",
		over8: "9 to 11 passengers: one car and one van. 12 to 16: two vans. Maximum 16.",
		over4: "More than 4 standard bags: van only.",
		included: "included",
		extraBags: "above the included ones",
		each: "each",
		oversized: "Oversized / other luggage",
		oversizedPh: "E.g. bags larger than carry-on, a stroller, skis",
		oversizedNeed: "More than 10 standard bags: describe the rest here.",
		seat: "Child seat",
		booster: "Booster",
		pet: "Pet in the car",
		petHint: "In a carrier",
		meetHint: "1 hour free from the scheduled landing, with a name board. The 15-minute allowance does not apply.",
		rules: "Still water included. No eating or smoking on board.",
		who: "Who is travelling",
		name: "First name",
		surname: "Last name",
		notes: "Notes",
		notesPh: "Flight time, pickup details",
		discount: "Discount code, optional",
		discountPh: "If you have one",
		discountOk: "applied to the total.",
		send: "Send request",
		sending: "Sending…",
		routing: "Calculating route…",
		quote: "Quote",
		pickRoute: "Choose pickup and drop-off: the price updates on its own.",
		updating: "Updating…",
		per: "Per passenger",
		total: "Total",
		rates: "4 Scalapay instalments of",
		ratesTotal: "Instalment total",
		ratesMore: "",
		pay: "Payment",
		payNow: "You do not pay now.",
		payLater: "MT TRAVEL SERVICE replies with the quote confirmation and the instructions to pay with the method you chose.",
		payBank: "Instant bank transfer",
		payLink: "Payment link",
		paySatispay: "Satispay",
		payRate: "4 Scalapay instalments",
		payRule: "You pay by link, instant transfer, Satispay or 4 Scalapay instalments at least 48 hours before the trip, or immediately with the confirmation if it is sooner.",
		tariffNote: "Guide price, with no call-out fee. Minimum 45 € by car and 50 € by van. Waiting is charged only after the allowance: 15 minutes at pickup, or 1 hour from landing if you choose meet & greet. Then 50 €/h by car and 60 €/h by van, in 30-minute blocks. Water included. No eating or smoking on board.",
		remoteNotice: "This transfer is far from our base. MT TRAVEL SERVICE will find a nearby chauffeur so you keep the price shown.",
		privacy: "Privacy",
		privacyConsent: "I have read the privacy notice and I agree to the use of my name, phone, email and notes for this request.",
		privacyNeed: "Consent to use your details is required.",
		terms: "Terms and conditions",
		termsConsent: "I have read and accept the terms and conditions.",
		termsNeed: "You need to accept the terms and conditions.",
		here: "Here",
		locating: "Location…",
		searching: "Searching…",
		placePh: "Street, city or place",
		searchOff: "Address search is unavailable. Use a quick stop or the map.",
		searchEmpty: "No address found. Tap On the map and choose the point.",
		houseNumber: "House number",
		housePh: "If it was not in the list",
		onMap: "On the map",
		onMapOn: "Tap the map",
		mapGps: "My location",
		geoOff: "This browser cannot read your location.",
		geoFail: "Location unavailable. Type the address.",
		ready: "Request ready",
		sent: "The request has reached MT Travel. We will contact you to confirm the transfer.",
		copy: "Copy text",
		copied: "Copied",
		another: "New request",
		whatsapp: "WhatsApp",
		email: "Email"
	}
};
var LanguageContext = (0, import_react.createContext)(null);
function LanguageProvider({ children }) {
	const [lang, setLangState] = (0, import_react.useState)("it");
	(0, import_react.useEffect)(() => {
		const saved = localStorage.getItem("mt-travel-lang");
		if (saved === "en" || saved === "it") setLangState(saved);
	}, []);
	(0, import_react.useEffect)(() => {
		document.documentElement.lang = lang;
		localStorage.setItem("mt-travel-lang", lang);
	}, [lang]);
	const value = {
		lang,
		setLang: setLangState,
		t: (key) => copy[lang][key]
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageContext.Provider, {
		value,
		children
	});
}
function useI18n() {
	const value = (0, import_react.useContext)(LanguageContext);
	if (!value) throw new Error("LanguageProvider missing");
	return value;
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var CONNECTOR_TOKEN_READY_EVENT = "grok:connector-token-ready";
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
var ConnectorTokenReadySchema = EnvelopeSchema.extend({ type: literal("connector-token-ready") });
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Origin of the Grok embedder framing this page, or null when the page runs
* top-level (download/export, local `npm run dev`, deployed sites) or under a
* non-Grok parent. Client-only; null during SSR.
*/
function resolveCurrentEmbedderOrigin() {
	if (typeof window === "undefined") return null;
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	return resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	const parentOrigin = resolveCurrentEmbedderOrigin();
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onHello = (data) => {
		if (!HelloSchema.safeParse(data).success) return;
		announce();
	};
	const onNavigate = (data) => {
		const parsed = NavigateSchema.safeParse(data);
		if (!parsed.success) return;
		navigate(parsed.data.path);
		queueMicrotask(reportLocation);
	};
	const onHistory = (data) => {
		const parsed = HistorySchema.safeParse(data);
		if (!parsed.success) return;
		if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
		window.history.go(parsed.data.delta);
	};
	const onConnectorTokenReady = (data) => {
		if (!ConnectorTokenReadySchema.safeParse(data).success) return;
		window.dispatchEvent(new Event(CONNECTOR_TOKEN_READY_EVENT));
	};
	const hostMessageHandlers = /* @__PURE__ */ new Map([
		["hello", onHello],
		["navigate", onNavigate],
		["history", onHistory],
		["connector-token-ready", onConnectorTokenReady]
	]);
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		hostMessageHandlers.get(envelope.data.type)?.(event.data);
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var COMPANY = {
	brand: "MT TRAVEL SERVICE",
	owner: "Topo Mario",
	vat: "IT04594530406",
	place: "Gambettola (FC)",
	email: "info@mttravelservice.com",
	site: "www.mttravelservice.com"
};
var VAT_ZERO_NOTE = "IVA 0%. Operazione senza applicazione dell'IVA ai sensi dell'art. 1, commi da 54 a 89, L. 190/2014 come modificato dalla L. 208/2015 e L. 145/2018.";
function BootSplash() {
	const [phase, setPhase] = (0, import_react.useState)("in");
	(0, import_react.useEffect)(() => {
		const backup = window.setTimeout(() => setPhase("gone"), 4200);
		return () => window.clearTimeout(backup);
	}, []);
	function finish() {
		setPhase((current) => current === "gone" ? current : "out");
		window.setTimeout(() => setPhase("gone"), 200);
	}
	if (phase === "gone") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `boot-splash${phase === "out" ? " boot-splash-out" : ""}`,
		role: "status",
		"aria-label": "Caricamento",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "boot-copy",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-title",
				children: "MT TRAVEL SERVICE APP"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "boot-sub",
				children: "la tua corsa in un tocco."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "boot-film",
			src: "/brand/boot.mp4",
			autoPlay: true,
			muted: true,
			playsInline: true,
			preload: "auto",
			onEnded: finish
		})]
	});
}
function Shell({ children }) {
	const { lang, setLang, t } = useI18n();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BootSplash, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-40 border-b border-border/80 bg-bg/80 backdrop-blur-xl",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "flex min-w-0 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/brand/logo-mark.jpg",
							alt: "",
							className: "h-14 w-14 shrink-0 rounded-2xl bg-fg object-contain shadow-[0_8px_24px_rgb(0_0_0/0.35)] ring-1 ring-primary/40"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 leading-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-semibold",
								children: "MT TRAVEL SERVICE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-muted",
								children: t("tagline")
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex shrink-0 rounded-full border border-border bg-surface p-1",
						role: "group",
						"aria-label": t("language"),
						children: ["it", "en"].map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": lang === code,
							onClick: () => setLang(code),
							className: `inline-flex h-10 min-w-11 items-center justify-center rounded-full px-3 text-sm font-extrabold ${lang === code ? "bg-primary text-primary-fg" : "text-fg"}`,
							children: code.toUpperCase()
						}, code))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mx-auto grid w-full max-w-6xl gap-2 px-4 py-8 text-sm text-muted sm:flex sm:items-end sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					COMPANY.brand,
					" · ",
					t("footer"),
					" · ",
					COMPANY.place,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mt-1 block",
						children: [
							COMPANY.owner,
							" · P.IVA ",
							COMPANY.vat
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "flex gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/privacy",
						className: "underline-offset-2 hover:underline",
						children: t("privacy")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/richieste",
						className: "underline-offset-2 hover:underline",
						children: t("manage")
					})]
				})]
			})
		]
	});
}
var styles_default = "/assets/styles-Cp6PrUF_.css";
var APP_NAME = "MT Travel";
var Route$4 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Prenotazione transfer NCC. Auto fino a 4, van fino a 8, fino a 16 passeggeri con più mezzi. Preventivo sul percorso."
			},
			{
				name: "theme-color",
				content: "#0c100e"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "it",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LanguageProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	})
});
var $$splitComponentImporter$3 = () => import("./routes-DdYqg_H8.mjs");
var Route$3 = createFileRoute("/")({
	head: () => ({ meta: [{ title: "Prenota · MT Travel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./privacy-B8O7QZKN.mjs");
var Route$2 = createFileRoute("/privacy")({
	head: () => ({ meta: [{ title: "Privacy · MT Travel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./richieste-CHgoAQ_b.mjs");
var Route$1 = createFileRoute("/richieste")({
	head: () => ({ meta: [{ title: "Gestione · MT Travel" }] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./r._token-BxUNv5y2.mjs");
var Route = createFileRoute("/r/$token")({
	head: () => ({ meta: [{ title: "La tua richiesta · MT Travel" }] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$3.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$4
	}),
	PrivacyRoute: Route$2.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => Route$4
	}),
	RichiesteRoute: Route$1.update({
		id: "/richieste",
		path: "/richieste",
		getParentRoute: () => Route$4
	}),
	RTokenRoute: Route.update({
		id: "/r/$token",
		path: "/r/$token",
		getParentRoute: () => Route$4
	})
};
var routeTree = Route$4._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { useI18n as a, VAT_ZERO_NOTE as i, Route as n, COMPANY as r, router_exports as t };
