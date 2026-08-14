# CASSxClass — E-commerce Site

React + Vite + Tailwind CSS storefront for CASSxClass, deployed for free on GitHub +
Cloudflare Pages, with Supabase as the free-tier backend for orders (and products, once
you migrate off placeholders).

Checkout is **cash on delivery only**. WhatsApp is a floating support button, not an order
channel — orders go through the checkout form and (optionally) into Supabase.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

## 2. Push to GitHub

```bash
git init
git add .
git commit -m "Initial CASSxClass storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/cassxclass.git
git push -u origin main
```

(Create the empty repo on GitHub first, don't initialize it with a README there.)

## 3. Deploy on Cloudflare Pages (free)

1. Go to the Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**.
2. Select your `cassxclass` GitHub repo.
3. Build settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Under **Environment Variables**, add (once you've set up Supabase — see below):
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Save and Deploy**. Every push to `main` auto-redeploys.

The `public/_redirects` file is already included so React Router's client-side routes
(like `/product/w-01`) work correctly on refresh and direct links — this is required for
any SPA on Cloudflare Pages.

You'll get a free `*.pages.dev` URL immediately, and can attach `cassxclass.shop` as a
custom domain for free under the Pages project's **Custom domains** tab (just point your
domain's nameservers or a CNAME to Cloudflare).

## 4. Set up Supabase (free tier)

1. Create a free project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** → paste the contents of `supabase-schema.sql` in this repo → Run.
   This creates `orders` (and `products`, for when you're ready to move off placeholders)
   with row-level security: anyone can submit an order, nobody can read/edit orders except
   you from the Supabase dashboard.
3. Go to **Project Settings → API** → copy the **Project URL** and **anon public key**.
4. Locally: copy `.env.example` to `.env` and paste those two values in.
5. On Cloudflare Pages: add the same two values under **Settings → Environment Variables**
   for both Production and Preview, then redeploy.

Until you connect Supabase, the site still works fully — orders are just confirmed to the
customer without being saved to a database, so make sure Supabase is connected before
going live.

## 5. Replace the logo / favicon

Your logo files are already in `public/assets/`:
- `logo-wordmark.jpg` — the horizontal "CASSxClass" wordmark
- `logo-mark-navy.jpg` — the navy "CASSxC" lockup
- `favicon-16.png` through `favicon-512.png` + `favicon.ico` — generated from your
  monogram, already wired up in `index.html`

To swap the header logo for a transparent PNG version later, replace the text lockup in
`src/components/Header.jsx` with an `<img>` tag pointing at your new file in
`public/assets/`.

## 6. Update contact info / socials

Edit `src/lib/siteConfig.js` — Gmail, WhatsApp number, and social links are all defined
in one place and used across the header, footer, contact page, and floating WhatsApp
button.

## 7. Replace placeholder products

Real product data lives in `src/data/products.js`. Once Supabase's `products` table has
real rows, swap the static import for a `supabase.from("products").select()` call inside
`Shop.jsx` and `Product.jsx` — the data shape already matches the SQL schema.

## 8. Set up the Admin Panel

Your site now has a full admin panel at `/admin` — dashboard stats, order management
(view + update status), product management (add/edit/delete, no code required), site
settings, and phone push notifications for new orders.

### 8a. Create your admin login

In Supabase: **Authentication → Users → Add user**. Use your real email and a strong
password — this is the only account that can log into `/admin`. (Skip "send invite
email" if it's not configured; just set the password directly.)

### 8b. Run the admin database schema

If you haven't already run `supabase-schema.sql`, do that first. Then run
**`supabase-schema-admin.sql`** in the Supabase SQL Editor too (safe to re-run — it
uses `if not exists` / `on conflict` guards). This adds:
- `push_subscriptions` — tracks devices that opted into notifications
- `settings` — editable contact info / social links
- Row-level security so only your logged-in admin account can read/update orders or
  add/edit/delete products, while customers can still submit orders and browse products
- Seeds the `products` table with your current placeholder catalog, so the admin
  panel has real rows to show and edit right away

### 8c. Turn on phone notifications for new orders

This uses free Web Push (not WhatsApp or Telegram) — works like a native app
notification once enabled, no third-party service needed.

1. **Add the VAPID public key** as a Cloudflare Pages environment variable:
   - `VITE_VAPID_PUBLIC_KEY` = `BImje6Rf3WJw8MqcQgELRFxKfuQwoCFm_qZuEHascVpO3v3EYIj-3TYIPKduvSpNnqODIH0xm4iFs-8iyPI6jyw`
   - Redeploy after adding it.
2. **Deploy the notification function.** Install the Supabase CLI, then from the
   project root:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase functions deploy notify-new-order
   npx supabase secrets set \
     VAPID_PUBLIC_KEY=BImje6Rf3WJw8MqcQgELRFxKfuQwoCFm_qZuEHascVpO3v3EYIj-3TYIPKduvSpNnqODIH0xm4iFs-8iyPI6jyw \
     VAPID_PRIVATE_KEY=mX9tGaPIWE130h0Ph_d7I54Zh1_m9AoHrNjbSxAoDRo \
     VAPID_SUBJECT=mailto:cass41000@gmail.com
   ```
   ⚠️ Keep the private key secret — don't commit it to GitHub. It's only used in
   this `secrets set` command and stored securely by Supabase.
3. **Connect the webhook.** In Supabase: **Database → Webhooks → Create a new
   webhook** → table `orders` → event `Insert` → HTTP Request → URL is your deployed
   function's URL (shown after step 2, looks like
   `https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-new-order`) → add header
   `Authorization: Bearer YOUR_SERVICE_ROLE_KEY` (from Project Settings → API).
4. **Enable it on your phone.** Log into `/admin/login` on your phone's browser, go to
   **Notifications**, tap **Enable Notifications on This Device**. On iPhone: first add
   the admin page to your Home Screen (Share → Add to Home Screen) and open it from
   there before enabling — iOS only allows push notifications from installed
   home-screen apps, not regular Safari tabs.

### 8d. Add your real products

Go to `/admin/products` and add each item — ID, name, category, price, image URLs,
description. This writes directly to Supabase, so once you add real products there,
update `Shop.jsx` and `Product.jsx` to read from Supabase instead of the static
`src/data/products.js` file (ask me to wire this up whenever you're ready).

## 9. Project structure

```
src/
  components/   Header, Footer, ProductCard, CartDrawer, WhatsAppButton
  pages/        Home, Shop, Product, Checkout, About, Contact, Legal, NotFound
  pages/admin/  AdminLogin, AdminLayout, AdminDashboard, AdminOrders,
                AdminProducts, AdminNotifications, AdminSettings
  context/      CartContext, AdminAuthContext
  lib/          supabase.js, siteConfig.js, push.js (web push helpers)
  data/         products.js (placeholder catalog + categories)
  styles/       index.css (Tailwind + design tokens)
public/
  assets/       logo files, favicon set
  sw.js         service worker for push notifications
  _redirects    Cloudflare Pages SPA routing fix
supabase/
  functions/notify-new-order/   Edge Function that sends push alerts on new orders
supabase-schema.sql   run once (or re-run after updates) in Supabase SQL Editor
```
