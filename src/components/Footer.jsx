import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../lib/siteConfig.js";

export default function Footer() {
  return (
    <footer className="bg-navy-deep text-ivory/80 mt-24">
      <div className="container-x py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <span className="font-display text-xl text-ivory">
            CASS<span className="text-gold italic">x</span>Class
          </span>
          <p className="mt-4 text-sm leading-relaxed text-ivory/60 max-w-xs">
            Details define you. Premium watches, wallets, handbags, and perfumes for those who
            notice what others overlook.
          </p>
        </div>

        <div>
          <h4 className="eyebrow text-ivory/50 mb-4">Shop</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/shop?category=watches" className="hover:text-gold transition-colors">Watches</Link></li>
            <li><Link to="/shop?category=wallets" className="hover:text-gold transition-colors">Wallets</Link></li>
            <li><Link to="/shop?category=handbags" className="hover:text-gold transition-colors">Handbags</Link></li>
            <li><Link to="/shop?category=perfumes" className="hover:text-gold transition-colors">Perfumes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-ivory/50 mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/shipping-returns" className="hover:text-gold transition-colors">Shipping &amp; Returns</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-gold transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold transition-colors">Terms of Service</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow text-ivory/50 mb-4">Get in Touch</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <a href={`mailto:${SITE.gmail}`} className="hover:text-gold transition-colors">
                {SITE.gmail}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="hover:text-gold transition-colors"
              >
                {SITE.whatsappDisplay} (WhatsApp)
              </a>
            </li>
          </ul>
          <div className="flex gap-4 mt-5">
            {Object.entries(SITE.socials).map(([key, url]) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noreferrer"
                aria-label={key}
                className="text-ivory/50 hover:text-gold transition-colors text-xs font-label uppercase tracking-wide"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-x py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} CASSxClass. All rights reserved.</p>
          <p className="font-label tracking-widest2 uppercase text-[10px]">Details Define You</p>
        </div>
      </div>
    </footer>
  );
}
