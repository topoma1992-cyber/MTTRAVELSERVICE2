import { o as __toESM } from "../_runtime.mjs";
import { J as require_react, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as fleetForPassengers } from "./bookings-Bp6VBimL.mjs";
import { i as getServerFnById, n as createServerFn, r as TSS_SERVER_FUNCTION } from "./ssr.mjs";
import { c as LocateFixed } from "../_libs/lucide-react.mjs";
import { a as useI18n } from "./router-Bc2zQ2ac.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.functions-DHeNUO1W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAP_CENTER = {
	lat: 44.15,
	lon: 12.28
};
var PRESETS = [
	{
		chip: "Gambettola",
		place: {
			label: "Gambettola",
			lat: 44.1167,
			lon: 12.3336
		}
	},
	{
		chip: "Forlì",
		place: {
			label: "Forlì, centro",
			lat: 44.2227,
			lon: 12.0407
		}
	},
	{
		chip: "Cesena",
		place: {
			label: "Cesena, centro",
			lat: 44.1396,
			lon: 12.2433
		}
	},
	{
		chip: "Cesenatico",
		place: {
			label: "Cesenatico",
			lat: 44.199,
			lon: 12.395
		}
	},
	{
		chip: "Rimini",
		place: {
			label: "Rimini, centro",
			lat: 44.0678,
			lon: 12.5695
		}
	},
	{
		chip: "Aeroporto BLQ",
		place: {
			label: "Aeroporto di Bologna (BLQ)",
			lat: 44.5354,
			lon: 11.2887
		}
	},
	{
		chip: "Aeroporto RMI",
		place: {
			label: "Aeroporto di Rimini (RMI)",
			lat: 44.0203,
			lon: 12.6117
		}
	},
	{
		chip: "Stazione Forlì",
		place: {
			label: "Stazione FS Forlì",
			lat: 44.2242,
			lon: 12.0547
		}
	},
	{
		chip: "Bologna",
		place: {
			label: "Bologna, centro",
			lat: 44.4949,
			lon: 11.3426
		}
	},
	{
		chip: "San Marino",
		place: {
			label: "Città di San Marino",
			lat: 43.9356,
			lon: 12.4473
		}
	}
];
function toPlace(feature) {
	const coords = feature.geometry?.coordinates;
	const props = feature.properties;
	if (!coords || !props) return null;
	const [lon, lat] = coords;
	if (typeof lat !== "number" || typeof lon !== "number") return null;
	const street = [props.street, props.housenumber].filter(Boolean).join(" ");
	const name = props.name && props.name !== props.street ? props.name : "";
	const locality = props.city || props.town || props.village || props.district || "";
	const head = [name, street].filter(Boolean).join(", ") || locality || props.county || "Luogo";
	const tail = [locality, props.state ?? ""].filter((part) => part.length > 0 && !head.includes(part));
	return {
		label: [head, ...[...new Set(tail)]].join(" · "),
		lat,
		lon
	};
}
var SEARCH_STOP = /* @__PURE__ */ new Set([
	"via",
	"viale",
	"piazza",
	"corso",
	"largo",
	"piazzale",
	"strada",
	"di",
	"del",
	"della",
	"dei",
	"delle",
	"il",
	"la",
	"le",
	"in",
	"al"
]);
function expandQuery(query) {
	return query.replace(/\bp\.zza\b/gi, "piazza").replace(/\bp\.le\b/gi, "piazzale").replace(/\bv\.le\b/gi, "viale").replace(/\bc\.so\b/gi, "corso").replace(/\bloc\.\b/gi, "località").replace(/\bv\.(?=\s)/gi, "via ");
}
function fold(value) {
	return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "");
}
function queryTokens(query) {
	return fold(query).split(/[^a-z0-9]+/).filter((token) => token.length > 1 && !SEARCH_STOP.has(token));
}
function wordHit(text, token) {
	return fold(text).split(/[^a-z0-9]+/).filter(Boolean).some((word) => word === token || token.length >= 4 && word.startsWith(token) && word.length <= token.length + 1);
}
function rankHit(hit, query) {
	const tokens = queryTokens(query).filter((token) => !/^\d+$/.test(token));
	const number = query.match(/\b(\d+[a-z]?)\b/i)?.[1]?.toLowerCase() ?? "";
	let score = 0;
	let streetHits = 0;
	let nameHits = 0;
	for (const token of tokens) if (wordHit(hit.name, token)) {
		score += 16;
		nameHits += 1;
	} else if (wordHit(hit.street, token)) {
		score += 14;
		streetHits += 1;
	} else if (wordHit(hit.city, token)) score += 8;
	else if (wordHit(hit.label, token)) score += 4;
	else return {
		score: -1,
		streetHits: 0,
		exactHouse: false
	};
	const house = fold(hit.house);
	const exactHouse = Boolean(number) && house === number;
	if (number && exactHouse) score += 40;
	else if (number && house && house !== number) score -= 30;
	const foldedQuery = fold(query).replace(/[^a-z0-9]+/g, " ").trim();
	const foldedName = fold(hit.name);
	if (foldedName && foldedQuery.length >= 3 && (foldedName === foldedQuery || foldedName.startsWith(foldedQuery))) score += 24;
	return {
		score,
		streetHits: streetHits + nameHits,
		exactHouse
	};
}
function fromNominatim(hit) {
	const lat = Number(hit.lat);
	const lon = Number(hit.lon);
	if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;
	const address = hit.address ?? {};
	const city = address.city || address.town || address.village || address.hamlet || address.municipality || "";
	const house = address.house_number || "";
	const streetName = address.road || (hit.name && !/^parco\b/i.test(hit.name) ? hit.name : "") || "";
	const line = [address.road, house].filter(Boolean).join(" ");
	const name = hit.name && !/^parco\b/i.test(hit.name) ? hit.name : "";
	const head = name && line && name !== line ? `${name}, ${line}` : line || name || city || hit.display_name?.split(",")[0] || "Luogo";
	return {
		label: city && !head.toLowerCase().includes(city.toLowerCase()) ? `${head}, ${city}` : head,
		lat,
		lon,
		city,
		street: streetName,
		house,
		name
	};
}
async function nominatimSearch(query, signal, options) {
	const url = new URL("https://nominatim.openstreetmap.org/search");
	url.searchParams.set("q", query);
	url.searchParams.set("format", "jsonv2");
	url.searchParams.set("addressdetails", "1");
	url.searchParams.set("accept-language", "it");
	url.searchParams.set("countrycodes", "it");
	url.searchParams.set("layer", options?.layer ?? "address");
	url.searchParams.set("limit", String(options?.limit ?? 8));
	if (options?.viewbox) {
		url.searchParams.set("viewbox", options.viewbox);
		if (options.bounded) url.searchParams.set("bounded", "1");
	}
	const res = await fetch(url, {
		signal,
		headers: { "Accept-Language": "it" }
	});
	if (!res.ok) throw new Error("nominatim");
	return (await res.json()).map(fromNominatim).filter((place) => Boolean(place));
}
function knownPlaces(query) {
	const compact = fold(query).replace(/[^a-z0-9]+/g, "");
	if (![
		"mttravel",
		"mttravelservice",
		"mttransport",
		"mariotopo"
	].some((alias) => compact.includes(alias))) return [];
	return [{
		label: "MT TRAVEL SERVICE, Via Grazia Deledda 12, Gambettola",
		lat: 44.11676,
		lon: 12.34566,
		city: "Gambettola",
		street: "Via Grazia Deledda",
		house: "12",
		name: "MT TRAVEL SERVICE"
	}];
}
async function esriCandidates(query, signal) {
	const url = new URL("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates");
	url.searchParams.set("f", "json");
	url.searchParams.set("singleLine", query);
	url.searchParams.set("countryCode", "ITA");
	url.searchParams.set("langCode", "IT");
	url.searchParams.set("maxLocations", "8");
	url.searchParams.set("outFields", "PlaceName,Place_addr,City,StAddr,Addr_type");
	url.searchParams.set("location", `${MAP_CENTER.lon},${MAP_CENTER.lat}`);
	url.searchParams.set("searchExtent", "6.6,36.6,18.8,47.1");
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error("esri");
	const data = await res.json();
	const places = [];
	for (const candidate of data.candidates ?? []) {
		const lat = candidate.location?.y;
		const lon = candidate.location?.x;
		if (typeof lat !== "number" || typeof lon !== "number") continue;
		const attrs = candidate.attributes ?? {};
		const city = attrs.City || "";
		const street = attrs.StAddr || "";
		const house = street.match(/\b(\d+[a-zA-Z]?)\b/)?.[1] ?? "";
		const name = attrs.Addr_type === "POI" || attrs.Addr_type === "Locality" || attrs.PlaceName ? attrs.PlaceName || "" : "";
		const addr = (attrs.Place_addr || street || "").replace(/,?\s*ITA$/, "");
		const head = name && addr && !addr.toLowerCase().includes(name.toLowerCase()) ? `${name}, ${addr}` : addr || name;
		places.push({
			label: head.replace(/,?\s*ITA$/, ""),
			lat,
			lon,
			city,
			street,
			house,
			name
		});
	}
	return places;
}
async function photonSearch(query, signal, lat, lon) {
	const url = new URL("https://photon.komoot.io/api/");
	url.searchParams.set("q", query);
	url.searchParams.set("limit", "6");
	url.searchParams.set("lang", "it");
	url.searchParams.set("bbox", "6.6,36.6,18.8,47.1");
	if (lat !== void 0 && lon !== void 0) {
		url.searchParams.set("lat", String(lat));
		url.searchParams.set("lon", String(lon));
	}
	const res = await fetch(url, { signal });
	if (!res.ok) throw new Error("photon");
	const data = await res.json();
	const places = [];
	for (const feature of data.features ?? []) {
		const place = toPlace(feature);
		if (!place) continue;
		const props = feature.properties;
		const city = props?.city || props?.town || props?.village || "";
		const name = props?.name || "";
		const street = props?.street || "";
		const house = props?.housenumber || "";
		if (/^parco\b/i.test(name) && !/^parco\b/i.test(query)) continue;
		const label = house && street && !place.label.includes(house) ? place.label.replace(street, `${street} ${house}`) : place.label;
		places.push({
			...place,
			label,
			city,
			street,
			house,
			name
		});
	}
	return places;
}
function collect(hits, query) {
	const seen = /* @__PURE__ */ new Set();
	const ranked = [];
	for (const hit of hits) {
		const key = `${hit.lat.toFixed(4)}|${fold(hit.name)}|${fold(hit.house)}|${fold(hit.street)}`;
		if (seen.has(key)) continue;
		seen.add(key);
		const { score, streetHits, exactHouse } = rankHit(hit, query);
		if (score < 8) continue;
		ranked.push({
			place: {
				label: hit.label,
				lat: hit.lat,
				lon: hit.lon,
				house: hit.house || void 0,
				houseSource: hit.house ? "auto" : "missing"
			},
			score,
			streetHits,
			exactHouse
		});
	}
	ranked.sort((a, b) => Number(b.exactHouse) - Number(a.exactHouse) || b.score - a.score);
	return ranked;
}
var searchCache = /* @__PURE__ */ new Map();
function capped(work, ms, fallback, signal) {
	return new Promise((resolve) => {
		const timer = setTimeout(() => resolve(fallback), ms);
		const stop = (value) => {
			clearTimeout(timer);
			signal.removeEventListener("abort", onAbort);
			resolve(value);
		};
		const onAbort = () => stop(fallback);
		signal.addEventListener("abort", onAbort, { once: true });
		work.then((value) => stop(value), () => stop(fallback));
	});
}
function publish(ranked, streetLike) {
	const exact = streetLike ? ranked.filter((item) => item.exactHouse) : [];
	return (exact.length > 0 ? exact : ranked).slice(0, 8).map((item) => item.place);
}
async function searchPlaces(query, signal) {
	const text = expandQuery(query).replace(/\s+/g, " ").trim();
	const cacheKey = fold(text);
	const cached = searchCache.get(cacheKey);
	if (cached) return cached;
	const streetLike = /^(via|viale|piazza|piazzale|corso|largo|strada|vicolo|contrada|località)\b/i.test(text);
	const remember = (list) => {
		if (list.length === 0) return list;
		searchCache.set(cacheKey, list);
		if (searchCache.size > 80) searchCache.delete(searchCache.keys().next().value ?? cacheKey);
		return list;
	};
	const [esri, photon] = await Promise.all([capped(esriCandidates(text, signal), 900, [], signal), capped(photonSearch(text, signal, MAP_CENTER.lat, MAP_CENTER.lon), 900, [], signal)]);
	if (signal.aborted) return [];
	const quick = publish(collect([
		...knownPlaces(text),
		...esri,
		...photon
	], text), streetLike);
	if (quick.length > 0) return remember(quick);
	const extra = await capped(nominatimSearch(text, signal, {
		layer: "address,poi,railway",
		limit: 5
	}), 900, [], signal);
	if (signal.aborted) return [];
	const list = publish(collect([
		...knownPlaces(text),
		...esri,
		...photon,
		...extra
	], text), streetLike);
	if (list.length === 0 && esri.length === 0 && photon.length === 0 && extra.length === 0) throw new Error("geocode");
	return remember(list);
}
async function reversePlace(lat, lon) {
	try {
		const url = new URL("https://nominatim.openstreetmap.org/reverse");
		url.searchParams.set("lat", String(lat));
		url.searchParams.set("lon", String(lon));
		url.searchParams.set("format", "jsonv2");
		url.searchParams.set("addressdetails", "1");
		url.searchParams.set("accept-language", "it");
		const res = await fetch(url, { headers: { "Accept-Language": "it" } });
		if (res.ok) {
			const place = fromNominatim(await res.json());
			if (place) return {
				label: place.label,
				lat,
				lon
			};
		}
	} catch {}
	const url = `https://photon.komoot.io/reverse?lat=${lat}&lon=${lon}`;
	try {
		const res = await fetch(url);
		if (!res.ok) throw new Error("reverse");
		const data = await res.json();
		const place = data.features?.[0] ? toPlace(data.features[0]) : null;
		if (place) return {
			...place,
			lat,
			lon
		};
	} catch {}
	return {
		label: `${lat.toFixed(5)}, ${lon.toFixed(5)}`,
		lat,
		lon
	};
}
function haversineKm(a, b) {
	const R = 6371;
	const dLat = (b.lat - a.lat) * Math.PI / 180;
	const dLon = (b.lon - a.lon) * Math.PI / 180;
	const lat1 = a.lat * Math.PI / 180;
	const lat2 = b.lat * Math.PI / 180;
	const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
	return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}
function estimate(points) {
	let km = 0;
	for (let i = 1; i < points.length; i += 1) km += haversineKm(points[i - 1], points[i]);
	km *= 1.32;
	const minutes = km / 55 * 60;
	return {
		km,
		minutes,
		outboundKm: km,
		outboundMinutes: minutes,
		line: points.map((point) => [point.lat, point.lon]),
		estimated: true
	};
}
async function fetchRoute(points, signal) {
	if (points.length < 2) return {
		km: 0,
		minutes: 0,
		outboundKm: 0,
		outboundMinutes: 0,
		line: [],
		estimated: false
	};
	try {
		const path = points.map((point) => `${point.lon},${point.lat}`).join(";");
		const res = await fetch(`https://router.project-osrm.org/route/v1/driving/${path}?overview=full&geometries=geojson`, { signal });
		if (!res.ok) throw new Error("osrm");
		const route = (await res.json()).routes?.[0];
		const coords = route?.geometry?.coordinates;
		if (!route || !coords?.length) throw new Error("empty");
		return {
			km: route.distance / 1e3,
			minutes: route.duration / 60,
			outboundKm: route.distance / 1e3,
			outboundMinutes: route.duration / 60,
			line: coords.map(([lon, lat]) => [lat, lon]),
			estimated: false
		};
	} catch (error) {
		if (error instanceof DOMException && error.name === "AbortError") throw error;
		if (signal.aborted) throw error;
		return estimate(points);
	}
}
async function routeTrip(going, back, signal) {
	const outbound = await fetchRoute(going, signal);
	if (!back) return outbound;
	const inbound = await fetchRoute(back, signal);
	return {
		km: outbound.km + inbound.km,
		minutes: outbound.minutes + inbound.minutes,
		outboundKm: outbound.km,
		outboundMinutes: outbound.minutes,
		line: [...outbound.line, ...inbound.line],
		estimated: outbound.estimated || inbound.estimated
	};
}
var BASE_POINT = {
	lat: 44.11676,
	lon: 12.34566
};
var baseKmCache = /* @__PURE__ */ new Map();
async function kmFromBase(point, signal) {
	const key = `${point.lat.toFixed(3)},${point.lon.toFixed(3)}`;
	const hit = baseKmCache.get(key);
	if (hit !== void 0) return hit;
	const route = await fetchRoute([BASE_POINT, point], signal ?? new AbortController().signal);
	const km = Math.round(route.km * 10) / 10;
	baseKmCache.set(key, km);
	return km;
}
/** Vero solo se partenza e arrivo sono entrambi oltre 20 km dalla sede. */
async function farFromBase(origin, destination, signal) {
	if (!origin.lat || !origin.lon || !destination.lat || !destination.lon) return false;
	const [fromStart, fromEnd] = await Promise.all([kmFromBase(origin, signal), kmFromBase(destination, signal)]);
	return fromStart > 20 && fromEnd > 20;
}
var control = "h-12 w-full rounded-md border bg-bg px-3 text-base text-fg placeholder:text-muted";
function PlaceInput({ label, place, onPlace, onIncomplete, error, presets = false, locate = false, mapActive = false, onMapRequest, placeholder }) {
	const { t } = useI18n();
	const placePlaceholder = placeholder ?? t("placePh");
	const listId = (0, import_react.useId)();
	const wrapRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)(place?.label ?? "");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [searchError, setSearchError] = (0, import_react.useState)("");
	const [searched, setSearched] = (0, import_react.useState)(false);
	const [locating, setLocating] = (0, import_react.useState)(false);
	const [locError, setLocError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (place) setQuery(place.label);
	}, [place]);
	const dirty = query.trim().length > 0 && (!place || query !== place.label);
	const dirtyRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (dirtyRef.current === dirty) return;
		dirtyRef.current = dirty;
		onIncomplete?.(dirty);
	}, [dirty, onIncomplete]);
	(0, import_react.useEffect)(() => {
		if (query.trim().length < 3 || place && query === place.label) {
			setSuggestions([]);
			setLoading(false);
			setSearched(false);
			return;
		}
		const controller = new AbortController();
		const timer = window.setTimeout(() => {
			setLoading(true);
			setSearchError("");
			searchPlaces(query.trim(), controller.signal).then((found) => {
				setSuggestions(found);
				setOpen(true);
			}).catch((reason) => {
				if (reason instanceof DOMException && reason.name === "AbortError") return;
				setSuggestions([]);
				setSearchError(t("searchOff"));
			}).finally(() => {
				if (!controller.signal.aborted) {
					setLoading(false);
					setSearched(true);
				}
			});
		}, 120);
		return () => {
			window.clearTimeout(timer);
			controller.abort();
		};
	}, [query, place]);
	(0, import_react.useEffect)(() => {
		function onDoc(event) {
			if (!wrapRef.current?.contains(event.target)) setOpen(false);
		}
		document.addEventListener("mousedown", onDoc);
		return () => document.removeEventListener("mousedown", onDoc);
	}, []);
	function applyHouse(value) {
		if (!place) return;
		const house = value.replace(/[^\dA-Za-z/]/g, "").slice(0, 8);
		const base = place.baseLabel ?? place.label;
		const comma = base.indexOf(",");
		const head = (comma === -1 ? base : base.slice(0, comma)).trim();
		const tail = comma === -1 ? "" : base.slice(comma + 1).trim();
		const line = house ? `${head} ${house}` : head;
		onPlace({
			...place,
			house,
			houseSource: "manual",
			baseLabel: base,
			label: tail ? `${line}, ${tail}` : line
		});
	}
	function pick(next) {
		onPlace(next);
		setQuery(next.label);
		setOpen(false);
		setSuggestions([]);
		setLocError("");
	}
	async function locateMe() {
		if (!navigator.geolocation) {
			setLocError(t("geoOff"));
			return;
		}
		setLocating(true);
		setLocError("");
		try {
			const pos = await new Promise((resolve, reject) => {
				navigator.geolocation.getCurrentPosition(resolve, reject, {
					enableHighAccuracy: true,
					timeout: 8e3,
					maximumAge: 6e4
				});
			});
			pick(await reversePlace(pos.coords.latitude, pos.coords.longitude));
		} catch {
			setLocError(t("geoFail"));
		} finally {
			setLocating(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapRef,
		className: "grid gap-2",
		"data-invalid": error ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "text-sm font-medium",
						htmlFor: listId,
						children: label
					}),
					onMapRequest ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: onMapRequest,
						className: `inline-flex min-h-11 items-center text-sm ${mapActive ? "font-semibold text-primary" : "text-primary"}`,
						children: mapActive ? t("onMapOn") : t("onMap")
					}) : null,
					locate ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => void locateMe(),
						disabled: locating,
						className: "inline-flex min-h-11 items-center gap-2 text-sm text-primary disabled:opacity-60",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, {
							className: "size-4",
							"aria-hidden": "true"
						}), locating ? t("locating") : t("here")]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					id: listId,
					value: query,
					placeholder: placePlaceholder,
					autoComplete: "off",
					role: "combobox",
					"aria-expanded": open,
					"aria-invalid": error ? true : void 0,
					className: `${control} ${error ? "border-primary" : "border-border"}`,
					onChange: (event) => {
						const next = event.target.value;
						setQuery(next);
						setOpen(true);
						if (place && next !== place.label) onPlace(null);
					},
					onFocus: () => {
						if (suggestions.length > 0) setOpen(true);
					},
					onKeyDown: (event) => {
						if (event.key === "Enter") {
							event.preventDefault();
							if (open && suggestions[0]) pick(suggestions[0]);
						}
						if (event.key === "Escape") setOpen(false);
					}
				}), open && (loading || suggestions.length > 0 || searchError || searched && dirty) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "absolute z-30 mt-1 max-h-64 w-full overflow-auto rounded-md border border-border bg-surface shadow-lg",
					children: [
						loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-3 py-3 text-sm text-muted",
							children: t("searching")
						}) : null,
						searchError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-3 py-3 text-sm text-muted",
							children: searchError
						}) : null,
						!loading && searched && !searchError && suggestions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-3 py-3 text-sm text-muted",
							children: t("searchEmpty")
						}) : null,
						suggestions.map((suggestion) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "w-full px-3 py-3 text-left text-sm hover:bg-surface-2",
							onClick: () => pick(suggestion),
							children: suggestion.label
						}) }, `${suggestion.label}-${suggestion.lat}`))
					]
				}) : null]
			}),
			presets ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex max-w-full gap-2 overflow-x-auto pb-1",
				children: PRESETS.map((preset) => {
					const selected = place?.label === preset.place.label;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => pick(preset.place),
						className: `shrink-0 rounded-full border px-3 py-2 text-sm ${selected ? "border-primary bg-primary text-primary-fg" : "border-border text-fg"}`,
						children: preset.chip
					}, preset.chip);
				})
			}) : null,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium text-primary",
				children: error
			}) : null,
			place && (place.houseSource === "missing" || place.houseSource === "manual") ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "grid gap-1 text-sm",
				children: [t("houseNumber"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: place.house ?? "",
					inputMode: "text",
					autoComplete: "off",
					placeholder: t("housePh"),
					className: `${control} border-border`,
					onChange: (event) => applyHouse(event.target.value)
				})]
			}) : null,
			locError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: locError
			}) : null
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
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
var staffStatus = createServerFn({ method: "GET" }).handler(createSsrRpc("833917ebe57cb0ed8f580890cdd04741469fb29d93924f049abddabfe5dc28ef"));
var claimStaff = createServerFn({ method: "POST" }).validator((input) => ({
	pin: cleanNewPin(input?.pin),
	setupCode: typeof input?.setupCode === "string" ? input.setupCode : ""
})).handler(createSsrRpc("0bfb5b46d38b23d0eb3d86201c468e7af6390b8632380f6ff216ba1d741c7544"));
var listStaffLogins = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(createSsrRpc("2c0a5774eec160fdd3ae5c8073a02030164f0e066fc91801302a5f6fc89f5c7f"));
var saveStaffLogin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	loginEmail: cleanEmail(input?.loginEmail),
	loginPin: cleanNewPin(input?.loginPin)
})).handler(createSsrRpc("1e1eb478daded784155386434259b93f5129aa9ca679c4ab2779ba2afa29e4c4"));
var changeStaffPin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	nextPin: cleanNewPin(input?.nextPin)
})).handler(createSsrRpc("dbbd0d471f5c70d5f5a4c9fc65df6a039312e41d42861e42dd2f6b3badcc77de"));
var removeStaffLogin = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	loginEmail: cleanEmail(input?.loginEmail)
})).handler(createSsrRpc("68695b95de0baedb3aa3744cf38f5ad438ef3c869457f94c81565127fd7bc051"));
var issueBookingGuard = createServerFn({ method: "GET" }).handler(createSsrRpc("e918094caa2b266e9f79749e1a7a6abb38e8f4d3b96496e95349258dbf4b9cf5"));
var submitBooking = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Richiesta");
	return {
		...incomingBooking(body),
		pageOrigin: text(body.pageOrigin, 300),
		guard: text(body.guard, 200),
		companyWebsite: text(body.companyWebsite, 200)
	};
}).handler(createSsrRpc("3aa72774d0dade40d40b42cf79c1379f971d11dc8b2a96279201df0463e423ba"));
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
}).handler(createSsrRpc("ff6e45f76f0e6bac0260d4a5c4a8a00d14b7a69a0e8dccb2a57e5cd3fc7ad194"));
var listStaffBookings = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(createSsrRpc("459433a724391978d5a0f2337182ea026820547b35c7a63403cf385b1fb8072f"));
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
}).handler(createSsrRpc("a10e4e6321007488edcbb57c9da8d8a724ccf4daff2878e97a2e40622dad8580"));
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
}).handler(createSsrRpc("e10bf332ab9e05afb2224606bcb14a603d9a00d250016d96e01210c9998c8a53"));
var removeStaffBooking = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	id: text(input?.id, 80)
})).handler(createSsrRpc("95f897fedf5cd2c05c54e57d7d7fbe96e0fad401b44ddec824fa29b1dc2dd342"));
function cleanToken(value) {
	const token = typeof value === "string" ? value.trim() : "";
	if (!/^[a-z0-9]{20,80}$/i.test(token)) throw new Error("Link non valido.");
	return token;
}
var getPublicBooking = createServerFn({ method: "GET" }).validator((input) => ({ token: cleanToken(input?.token) })).handler(createSsrRpc("93daf7c3486c958b5779896d044cb4cd74105b048a40b1bed21d80879c1cefaa"));
var updatePublicBooking = createServerFn({ method: "POST" }).validator((input) => {
	const body = asRecord(input, "Richiesta");
	return {
		token: cleanToken(body.token),
		...incomingBooking(body),
		pageOrigin: text(body.pageOrigin, 300)
	};
}).handler(createSsrRpc("d6f6b40a657aeacc45185755fcc1fbff306515dae51d7c292d5fec4f1483d9ab"));
var alertSettings = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(createSsrRpc("27bcd301ee7d4e1fd965f0cb9f0a36b4b36d57337c3a47f30d503cf8a2cb7459"));
var saveAlertSettings = createServerFn({ method: "POST" }).validator((input) => {
	const auth = cleanAuth(input);
	const notifyEmail = text(input?.notifyEmail, 120);
	if (!notifyEmail.includes("@")) throw new Error("Email non valida.");
	return {
		...auth,
		notifyEmail,
		smtpPass: text(input?.smtpPass, 80)
	};
}).handler(createSsrRpc("4990ca0a545394391ae9f3e29bc5e0f646b9fa6edd451d2f7b684a095358aa7b"));
function discountVehicle(value) {
	return value === "car" || value === "van" ? value : "all";
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
var listDiscountCodes = createServerFn({ method: "POST" }).validator((input) => cleanAuth(input)).handler(createSsrRpc("38d7f33137b7b3cd1bb0db602801b541d67a8233eb09a93fc2427d19023dfb38"));
var lookupDiscount = createServerFn({ method: "POST" }).validator((input) => text(input?.code, 20).toUpperCase().replace(/[^A-Z0-9]/g, "")).handler(createSsrRpc("378bdac6cbcd111a192c6c5c04065c12fe8e4835fa0ac084bf70e35c878632b5"));
var saveDiscountCode = createServerFn({ method: "POST" }).validator((input) => cleanDiscount(input ?? {})).handler(createSsrRpc("9bba615b101547e58df0ffad2f501a28444bdb2dc2e0bd3b05d136b67689af24"));
var removeDiscountCode = createServerFn({ method: "POST" }).validator((input) => ({
	...cleanAuth(input),
	code: cleanCode(input?.code)
})).handler(createSsrRpc("6a74171c006baa75fb07923defdc88aa18639073d0c42c590f867402b345b606"));
//#endregion
export { staffStatus as C, updateStaffBooking as E, saveStaffLogin as S, updatePublicBooking as T, removeStaffLogin as _, claimStaff as a, saveAlertSettings as b, farFromBase as c, listDiscountCodes as d, listStaffBookings as f, removeStaffBooking as g, removeDiscountCode as h, changeStaffPin as i, getPublicBooking as l, lookupDiscount as m, PlaceInput as n, confirmStaffBooking as o, listStaffLogins as p, alertSettings as r, createStaffQuote as s, MAP_CENTER as t, issueBookingGuard as u, reversePlace as v, submitBooking as w, saveDiscountCode as x, routeTrip as y };
