create table if not exists staff_attempts (
  email text primary key,
  failed int not null default 0,
  locked_until timestamptz,
  updated_at timestamptz not null default now()
);
