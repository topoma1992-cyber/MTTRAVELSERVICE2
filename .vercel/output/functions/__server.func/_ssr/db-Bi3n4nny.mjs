//#region node_modules/.nitro/vite/services/ssr/assets/db-Bi3n4nny.js
var _0002_bookings_default = "create table if not exists staff_lock (\n  id int primary key,\n  pin_hash text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists bookings (\n  id text primary key,\n  code text not null,\n  created_at timestamptz not null default now(),\n  status text not null default 'pending',\n  payment_method text not null,\n  payment_link text not null default '',\n  trip jsonb not null,\n  customer jsonb not null,\n  quote jsonb not null\n);\n\ncreate index if not exists bookings_created_at_idx on bookings (created_at desc);\n";
var _0003_booking_links_default = "alter table bookings add column if not exists edit_token text;\nalter table bookings add column if not exists revised boolean not null default false;\n\nupdate bookings\nset edit_token = substr(md5(id || random()::text), 1, 24)\nwhere edit_token is null or edit_token = '';\n\ncreate unique index if not exists bookings_edit_token_idx on bookings (edit_token);\n\ncreate table if not exists staff_alerts (\n  id int primary key,\n  notify_email text not null default 'info@mttravelservice.com',\n  smtp_user text not null default 'info@mttravelservice.com',\n  smtp_pass text not null default ''\n);\n\ninsert into staff_alerts (id) values (1) on conflict (id) do nothing;\n";
var _0004_company_email_default = "update staff_alerts\nset notify_email = 'info@mttravelservice.com',\n    smtp_user = 'info@mttravelservice.com',\n    smtp_pass = ''\nwhere notify_email = 'toponoleggio@gmail.com'\n   or smtp_user = 'toponoleggio@gmail.com';\n";
var _0005_discount_codes_default = "create table if not exists discount_codes (\n  code text primary key,\n  active boolean not null default true,\n  total_percent numeric not null default 0,\n  ride_percent numeric not null default 0,\n  min_fare numeric not null default 0,\n  night_percent numeric not null default 0,\n  holiday_percent numeric not null default 0,\n  wait_percent numeric not null default 0,\n  meet_greet_free boolean not null default false\n);\n\ninsert into discount_codes (\n  code, active, total_percent, ride_percent, min_fare, night_percent, holiday_percent, wait_percent, meet_greet_free\n) values\n  ('RICCIO5', true, 5, 0, 0, 0, 0, 0, false),\n  ('RICCIO10', true, 10, 0, 0, 0, 0, 0, false),\n  ('RICCIO15', true, 15, 0, 0, 0, 0, 0, false),\n  ('RICCIO20', true, 20, 0, 0, 0, 0, 0, false),\n  ('CONVENZIONE20', true, 0, 20, 60, 5, 5, 5, true)\non conflict (code) do nothing;\n";
var _0006_discount_cap_default = "alter table discount_codes add column if not exists max_discount numeric not null default 0;\n";
var _0007_staff_login_default = "alter table staff_lock add column if not exists failed_attempts integer not null default 0;\nalter table staff_lock add column if not exists recovery_hash text;\nalter table staff_lock add column if not exists recovery_expires timestamptz;\n";
var _0008_staff_logins_default = "create table if not exists staff_logins (\n  email text primary key,\n  pin_hash text not null,\n  owner boolean not null default false\n);\n\ninsert into staff_logins (email, pin_hash, owner)\nselect 'info@mttravelservice.com', pin_hash, true\nfrom staff_lock\nwhere id = 1\non conflict (email) do nothing;\n\nupdate staff_lock\nset failed_attempts = 0, recovery_hash = null, recovery_expires = null\nwhere id = 1;\n";
var _0009_discount_vehicle_default = "alter table discount_codes add column if not exists vehicle text not null default 'all';\n";
var _0010_request_guard_default = "create table if not exists app_secrets (\n  name text primary key,\n  value text not null\n);\n\ncreate table if not exists request_hits (\n  id bigserial primary key,\n  bucket text not null,\n  created_at timestamptz not null default now()\n);\n\ncreate index if not exists request_hits_bucket_idx on request_hits (bucket, created_at desc);\n";
var _0011_discount_seed_default = "insert into discount_codes (\n  code, active, total_percent, ride_percent, min_fare, night_percent, holiday_percent, wait_percent, meet_greet_free, max_discount, vehicle\n) values\n  ('RICCIO5', true, 5, 0, 0, 0, 0, 0, false, 0, 'all'),\n  ('RICCIO10', true, 10, 0, 0, 0, 0, 0, false, 0, 'all'),\n  ('RICCIO15', true, 15, 0, 0, 0, 0, 0, false, 0, 'all'),\n  ('RICCIO20', true, 20, 0, 0, 0, 0, 0, false, 0, 'all'),\n  ('CONVENZIONE20', true, 0, 20, 60, 5, 5, 5, true, 0, 'all')\non conflict (code) do nothing;\n";
var _0012_staff_attempts_default = "create table if not exists staff_attempts (\n  email text primary key,\n  failed int not null default 0,\n  locked_until timestamptz,\n  updated_at timestamptz not null default now()\n);\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({
			"/migrations/0002_bookings.sql": _0002_bookings_default,
			"/migrations/0003_booking_links.sql": _0003_booking_links_default,
			"/migrations/0004_company_email.sql": _0004_company_email_default,
			"/migrations/0005_discount_codes.sql": _0005_discount_codes_default,
			"/migrations/0006_discount_cap.sql": _0006_discount_cap_default,
			"/migrations/0007_staff_login.sql": _0007_staff_login_default,
			"/migrations/0008_staff_logins.sql": _0008_staff_logins_default,
			"/migrations/0009_discount_vehicle.sql": _0009_discount_vehicle_default,
			"/migrations/0010_request_guard.sql": _0010_request_guard_default,
			"/migrations/0011_discount_seed.sql": _0011_discount_seed_default,
			"/migrations/0012_staff_attempts.sql": _0012_staff_attempts_default
		});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
//#endregion
export { getSql };
