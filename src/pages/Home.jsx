import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.badge).slice(0, 4);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-navy text-ivory overflow-hidden">
        <div className="container-x min-h-[86vh] flex flex-col justify-center py-24 relative z-10">
          <span className="eyebrow text-gold mb-5">Premium Essentials</span>
          <h1 className="font-display text-[13vw] sm:text-6xl md:text-7xl leading-[0.98] max-w-3xl">
            Details define
            <br />
            <span className="italic text-gold">you.</span>
          </h1>
          <p className="mt-6 max-w-md text-ivory/70 text-base leading-relaxed">
            Watches, wallets, handbags, and perfumes built for people who notice what
            others overlook. Discover the CASSxClass edit.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/shop" className="btn-gold">
              Shop the Edit
            </Link>
            <Link to="/shop?category=watches" className="btn-outline !border-ivory/30 !text-ivory hover:!bg-ivory hover:!text-navy">
              Explore Watches
            </Link>
          </div>
        </div>
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1600&q=60')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/20" />
      </section>

      {/* Categories */}
      <section className="container-x py-20 md:py-28">
        <div className="x-divider mb-3 max-w-[200px] mx-auto">
          <span className="x-mark">x</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-12">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} to={`/shop?category=${cat.slug}`} className="group relative block">
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-navy/40 group-hover:bg-navy/55 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h3 className="font-display text-xl md:text-2xl text-ivory">{cat.name}</h3>
                  <p className="text-ivory/70 text-xs mt-2 hidden md:block">{cat.blurb}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-navy/[0.03] py-20 md:py-28">
        <div className="container-x">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="eyebrow text-gold-dark">Curated</span>
              <h2 className="font-display text-3xl md:text-4xl mt-2">Featured Pieces</h2>
            </div>
            <Link to="/shop" className="hidden sm:block text-sm font-label uppercase tracking-wide text-navy hover:text-gold-dark underline underline-offset-4">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand story */}
      <section className="container-x py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="eyebrow text-gold-dark">Our Story</span>
          <h2 className="font-display text-3xl md:text-4xl mt-3 leading-tight">
            Built for people who care about the small things.
          </h2>
          <p className="mt-6 text-charcoal/70 leading-relaxed">
            CASSxClass started with a simple belief — that the details you choose say more
            than the things you own. Every piece in our edit is selected for its craft, not
            its logo. From the stitch on a wallet to the weight of a watch clasp, we obsess
            over what most people never notice, so you can feel it anyway.
          </p>
          <Link to="/about" className="inline-block mt-6 text-sm font-label uppercase tracking-wide text-navy underline underline-offset-4">
            Read Our Story
          </Link>
        </div>
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=1200&q=80"
            alt="CASSxClass craftsmanship"
            className="w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Trust indicators */}
      <section className="bg-navy text-ivory py-16">
        <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Nationwide Delivery", sub: "Cash on delivery available" },
            { label: "Quality Checked", sub: "Every piece inspected" },
            { label: "Easy Returns", sub: "7-day return window" },
            { label: "Real Support", sub: "WhatsApp us anytime" },
          ].map((t) => (
            <div key={t.label}>
              <p className="font-display text-lg text-gold">{t.label}</p>
              <p className="text-xs text-ivory/60 mt-1">{t.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="container-x py-20 md:py-28 text-center">
        <span className="eyebrow text-gold-dark">Stay in the Know</span>
        <h2 className="font-display text-3xl md:text-4xl mt-3">Join the CASSxClass List</h2>
        <p className="text-charcoal/60 mt-3 max-w-md mx-auto text-sm">
          New arrivals, early access, and the occasional edit — no spam, ever.
        </p>
        {subscribed ? (
          <p className="mt-8 text-gold-dark font-label uppercase tracking-wide text-sm">
            You're on the list — thank you.
          </p>
        ) : (
          <form onSubmit={handleSubscribe} className="mt-8 flex max-w-md mx-auto gap-0">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-navy/20 px-4 py-3.5 text-sm focus:outline-none focus:border-gold"
            />
            <button type="submit" className="btn-primary !px-6">
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
