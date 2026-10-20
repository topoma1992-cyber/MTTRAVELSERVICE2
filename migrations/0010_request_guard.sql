create table if not exists app_secrets (
  name text primary key,
  value text not null
);

create table if not exists request_hits (
  id bigserial primary key,
  bucket text not null,
  created_at timestamptz not null default now()
);

create index if not exists request_hits_bucket_idx on request_hits (bucket, created_at desc);
