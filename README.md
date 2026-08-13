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

## 8. Project structure

```
src/
  components/   Header, Footer, ProductCard, CartDrawer, WhatsAppButton
  pages/        Home, Shop, Product, Checkout, About, Contact, Legal, NotFound
  context/      CartContext (localStorage-persisted cart)
  lib/          supabase.js, siteConfig.js
  data/         products.js (placeholder catalog + categories)
  styles/       index.css (Tailwind + design tokens)
public/
  assets/       logo files, favicon set
  _redirects    Cloudflare Pages SPA routing fix
supabase-schema.sql   run once in Supabase SQL Editor
```
