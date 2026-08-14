-- Run this AFTER supabase-schema.sql in the Supabase SQL Editor.
-- Adds: site settings table, push notification subscriptions, and
-- admin read/write policies for orders + products.

-- Site settings (editable from /admin/settings instead of code)
create table if not exists settings (
  id int primary key default 1,
  gmail text,
  whatsapp text,
  whatsapp_display text,
  instagram text,
  tiktok text,
  facebook text,
  pinterest text,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);
insert into settings (id) values (1) on conflict (id) do nothing;

alter table settings enable row level security;
create policy "Public can read settings" on settings for select to anon using (true);
create policy "Admins can update settings" on settings for update to authenticated using (true);

-- Push notification subscriptions (one per device you approve notifications on)
create table if not exists push_subscriptions (
  id uuid primary key default gen_random_uuid(),
  endpoint text not null unique,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);
alter table push_subscriptions enable row level security;
create policy "Admins manage push subscriptions" on push_subscriptions for all to authenticated using (true);

-- Admins (logged-in users) can fully manage orders and products.
create policy "Admins can read orders" on orders for select to authenticated using (true);
create policy "Admins can update orders" on orders for update to authenticated using (true);
create policy "Admins can delete orders" on orders for delete to authenticated using (true);

create policy "Admins can insert products" on products for insert to authenticated with check (true);
create policy "Admins can update products" on products for update to authenticated using (true);
create policy "Admins can delete products" on products for delete to authenticated using (true);

-- Seed the products table from your current placeholder catalog so the
-- admin panel and storefront both read from the same source.
insert into products (id, name, category, price, compare_at, description, images, variants, badge) values
('w-01','Meridian Chronograph','watches',18500,24000,'A stainless steel chronograph with a sunburst navy dial and sapphire crystal. Water resistant to 100m, finished with a brushed link bracelet.',
  array['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80','https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80'],
  '{"strap":["Steel","Leather"]}','Bestseller'),
('w-02','Heritage Automatic','watches',26900,null,'Self-winding automatic movement visible through an exhibition caseback. Champagne dial with applied gold-tone indices.',
  array['https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80','https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1200&q=80'],
  '{"strap":["Leather","Mesh"]}',null),
('w-03','Vantage Field Watch','watches',14200,null,'Matte navy dial, luminous hands, and a rugged canvas strap built for daily wear without losing its dress-watch manners.',
  array['https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80'],
  '{"strap":["Canvas","Steel"]}',null),
('b-01','Cardinal Bifold','wallets',6800,null,'Full-grain leather bifold with six card slots and a hidden note pocket. Ages into a deeper patina with use.',
  array['https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80'],
  '{"color":["Espresso","Black","Cognac"]}','New'),
('b-02','Aster Cardholder','wallets',4200,null,'Slim, minimal, and pocket-friendly — four slots and a central pull-tab for quick access.',
  array['https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80'],
  '{"color":["Black","Tan"]}',null),
('h-01','Adorn Structured Tote','handbags',22400,null,'A structured silhouette in pebbled leather with brass hardware and a detachable crossbody strap.',
  array['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80'],
  '{"color":["Navy","Black","Ivory"]}','Bestseller'),
('h-02','Reverie Clutch','handbags',11900,null,'Evening clutch in satin leather with a slim gold-tone chain that tucks away when not needed.',
  array['https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1200&q=80'],
  '{"color":["Gold","Black"]}',null),
('p-01','Noir Absolu','perfumes',9800,null,'A dark, woody-amber signature scent — bergamot opening, oud and vetiver base. 100ml EDP.',
  array['https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80'],
  '{"size":["50ml","100ml"]}','New'),
('p-02','Ivory Musk','perfumes',8600,null,'Soft white musk layered with jasmine and sandalwood. Long-lasting, understated projection.',
  array['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80'],
  '{"size":["50ml","100ml"]}',null)
on conflict (id) do nothing;
