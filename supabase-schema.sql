-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)

create table if not exists products (
  id text primary key,
  name text not null,
  category text not null,
  price numeric not null,
  compare_at numeric,
  description text,
  images text[] not null default '{}',
  variants jsonb default '{}',
  badge text,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  email text,
  address text not null,
  city text not null,
  notes text,
  items jsonb not null,
  subtotal numeric not null,
  shipping numeric not null,
  total numeric not null,
  payment_method text default 'cod',
  status text default 'pending',
  created_at timestamptz default now()
);

-- Row Level Security: allow public inserts for orders (checkout form),
-- but block public reads/updates/deletes. Manage orders from the
-- Supabase dashboard using your own account, which bypasses RLS.
alter table orders enable row level security;

create policy "Public can insert orders"
  on orders for insert
  to anon
  with check (true);

-- Products: allow public read access, no public write access.
alter table products enable row level security;

create policy "Public can read products"
  on products for select
  to anon
  using (true);
