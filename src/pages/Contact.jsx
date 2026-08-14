import React, { useState } from "react";
import { SITE, waLink } from "../lib/siteConfig.js";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const mailtoHref = `mailto:${SITE.gmail}?subject=${encodeURIComponent(
    `Message from ${form.name || "a customer"}`
  )}&body=${encodeURIComponent(form.message)}`;

  return (
    <div className="container-x py-16 md:py-24">
      <div className="text-center mb-14">
        <span className="eyebrow text-gold-dark">Get in Touch</span>
        <h1 className="font-display text-4xl mt-3">Contact Us</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-14 max-w-4xl mx-auto">
        <div className="space-y-8">
          <ContactRow
            title="Email"
            value={SITE.gmail}
            href={`mailto:${SITE.gmail}`}
          />
          <ContactRow
            title="WhatsApp"
            value={`${SITE.whatsappDisplay} — support only`}
            href={waLink()}
            external
          />
          <div>
            <h3 className="eyebrow text-charcoal/50 mb-2">Hours</h3>
            <p className="text-sm text-charcoal/70">Mon–Sat, 10am–8pm (PKT)</p>
          </div>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-5"
        >
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Message</label>
            <textarea
              rows={4}
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <a href={mailtoHref} className="btn-primary w-full block text-center">
            Send via Email
          </a>
        </form>
      </div>
    </div>
  );
}

function ContactRow({ title, value, href, external }) {
  return (
    <div>
      <h3 className="eyebrow text-charcoal/50 mb-2">{title}</h3>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="text-charcoal hover:text-gold-dark transition-colors text-sm"
      >
        {value}
      </a>
    </div>
  );
}
