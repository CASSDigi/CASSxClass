import React from "react";
import { SITE } from "../lib/siteConfig.js";

function LegalLayout({ title, children }) {
  return (
    <div className="container-x py-16 md:py-24 max-w-3xl mx-auto">
      <span className="eyebrow text-gold-dark">Policy</span>
      <h1 className="font-display text-4xl mt-3 mb-10">{title}</h1>
      <div className="prose-legal space-y-6 text-sm text-charcoal/70 leading-relaxed">{children}</div>
    </div>
  );
}

export function ShippingReturns() {
  return (
    <LegalLayout title="Shipping & Returns">
      <section>
        <h2 className="font-display text-xl text-charcoal mb-2">Shipping</h2>
        <p>
          We currently ship nationwide across Pakistan via cash on delivery. Orders are
          processed within 2–4 business days and typically arrive within 3–7 business days,
          depending on your city. A flat shipping fee of Rs 250 applies to all orders.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-charcoal mb-2">Returns</h2>
        <p>
          If something isn't right, contact us on WhatsApp within 7 days of delivery. Items
          must be unused, in original packaging, with tags attached. Once approved, we'll
          arrange a pickup or return address.
        </p>
      </section>
      <section>
        <h2 className="font-display text-xl text-charcoal mb-2">Exchanges</h2>
        <p>
          Need a different size or variant? Message us on WhatsApp and we'll coordinate an
          exchange, subject to stock availability.
        </p>
      </section>
    </LegalLayout>
  );
}

export function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy">
      <p>
        CASSxClass collects the information you provide at checkout — name, phone number,
        address, and email — solely to process and deliver your order. We do not sell your
        data to third parties.
      </p>
      <p>
        Order details may be stored in our database (Supabase) to manage fulfillment and
        provide customer support. You can request deletion of your data at any time by
        emailing {SITE.gmail}.
      </p>
      <p>
        We use cookies only for basic site functionality, such as remembering your shopping
        bag between visits.
      </p>
    </LegalLayout>
  );
}

export function Terms() {
  return (
    <LegalLayout title="Terms of Service">
      <p>
        By placing an order with CASSxClass, you agree to provide accurate delivery
        information and to be available to receive your cash-on-delivery order.
      </p>
      <p>
        Prices are listed in PKR and may change without notice. Product images are
        representative; minor variations in color or finish may occur.
      </p>
      <p>
        We reserve the right to cancel orders that appear fraudulent or cannot be verified
        by phone or WhatsApp.
      </p>
    </LegalLayout>
  );
}
