import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { supabase, isSupabaseConfigured } from "../lib/supabase.js";
import { SITE, waLink } from "../lib/siteConfig.js";

const fmt = (n) => `Rs ${n.toLocaleString("en-PK")}`;
const SHIPPING_FLAT = 250;

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    notes: "",
  });
  const [placing, setPlacing] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [error, setError] = useState("");

  const total = totalPrice + (items.length ? SHIPPING_FLAT : 0);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!items.length) return;
    setPlacing(true);
    setError("");

    const order = {
      customer_name: form.name,
      phone: form.phone,
      email: form.email || null,
      address: form.address,
      city: form.city,
      notes: form.notes || null,
      items,
      subtotal: totalPrice,
      shipping: SHIPPING_FLAT,
      total,
      payment_method: "cod",
      status: "pending",
      created_at: new Date().toISOString(),
    };

    try {
      if (isSupabaseConfigured) {
        const { error: dbError } = await supabase.from("orders").insert(order);
        if (dbError) throw dbError;
      }
      setPlaced(true);
      clearCart();
    } catch (err) {
      console.error(err);
      setError(
        "We couldn't save your order automatically. Please confirm it with us on WhatsApp so we don't miss it."
      );
      setPlaced(true);
      clearCart();
    } finally {
      setPlacing(false);
    }
  };

  if (placed) {
    return (
      <div className="container-x py-24 md:py-32 text-center max-w-lg mx-auto">
        <span className="x-mark text-3xl">x</span>
        <h1 className="font-display text-3xl mt-4">Order Received</h1>
        <p className="text-charcoal/60 mt-4 text-sm leading-relaxed">
          Thank you, {form.name || "there"}. We've received your cash-on-delivery order and
          will confirm it shortly. Save time by confirming directly on WhatsApp.
        </p>
        {error && <p className="text-sm text-red-600 mt-4">{error}</p>}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={waLink(
              `Hi CASSxClass, I just placed a COD order (${form.name}, ${form.city}) — confirming here.`
            )}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            Confirm on WhatsApp
          </a>
          <Link to="/shop" className="btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="container-x py-24 text-center">
        <p className="text-charcoal/60">Your bag is empty.</p>
        <Link to="/shop" className="text-gold-dark underline underline-offset-4 mt-3 inline-block">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-16">
      <h1 className="font-display text-3xl md:text-4xl mb-10">Checkout</h1>
      <div className="grid md:grid-cols-[1.2fr_1fr] gap-12">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
            <Field label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
          </div>
          <Field label="Email (optional)" name="email" type="email" value={form.email} onChange={handleChange} />
          <Field label="Delivery Address" name="address" value={form.address} onChange={handleChange} required />
          <Field label="City" name="city" value={form.city} onChange={handleChange} required />
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Order Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              rows={3}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div className="bg-navy/[0.04] px-5 py-4 text-sm text-charcoal/70">
            Payment method: <strong className="text-charcoal">Cash on Delivery</strong>. Pay when your
            order arrives. WhatsApp ({SITE.whatsappDisplay}) is for support only — orders are placed
            through this form.
          </div>

          <button type="submit" disabled={placing} className="btn-primary w-full disabled:opacity-60">
            {placing ? "Placing Order…" : `Place Order — ${fmt(total)}`}
          </button>
        </form>

        <div className="bg-navy/[0.03] p-6 h-fit">
          <h2 className="font-display text-lg mb-5">Order Summary</h2>
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex gap-3 text-sm">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-charcoal">{item.name}</p>
                  <p className="text-charcoal/50 text-xs">Qty {item.qty}</p>
                </div>
                <span className="text-charcoal/80">{fmt(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-navy/10 mt-5 pt-5 space-y-2 text-sm">
            <div className="flex justify-between text-charcoal/60">
              <span>Subtotal</span>
              <span>{fmt(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-charcoal/60">
              <span>Shipping</span>
              <span>{fmt(SHIPPING_FLAT)}</span>
            </div>
            <div className="flex justify-between font-display text-lg pt-2">
              <span>Total</span>
              <span>{fmt(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <div>
      <label className="eyebrow text-charcoal/50 block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
      />
    </div>
  );
}
