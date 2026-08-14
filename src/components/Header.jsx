import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/products.js";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = ({ isActive }) =>
    `font-label text-[13px] tracking-wide uppercase transition-colors ${
      isActive ? "text-gold" : "text-ivory/85 hover:text-gold"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-navy/95 backdrop-blur-sm shadow-lg shadow-navy/10" : "bg-navy"
      }`}
    >
      <div className="container-x flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
          <span className="font-display text-xl md:text-2xl text-ivory tracking-wide">
            CASS<span className="text-gold italic">x</span>Class
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          <NavLink to="/" className={navLink} end>
            Home
          </NavLink>
          <NavLink to="/shop" className={navLink}>
            Shop
          </NavLink>
          {CATEGORIES.slice(0, 3).map((c) => (
            <NavLink key={c.slug} to={`/shop?category=${c.slug}`} className={navLink}>
              {c.name}
            </NavLink>
          ))}
          <NavLink to="/about" className={navLink}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLink}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-4">
          <button
            aria-label="Open cart"
            onClick={() => setIsOpen(true)}
            className="relative text-ivory hover:text-gold transition-colors p-2 -mr-2"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6h15l-1.5 9h-12z" />
              <path d="M6 6L5 3H2" />
              <circle cx="9" cy="20" r="1" />
              <circle cx="17" cy="20" r="1" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gold text-navy text-[10px] font-bold w-4.5 h-4.5 min-w-[18px] min-h-[18px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
          <button
            aria-label="Toggle menu"
            className="md:hidden text-ivory p-2 -mr-2"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-navy-deep border-t border-ivory/10 px-5 py-6 flex flex-col gap-5">
          {[
            { to: "/", label: "Home" },
            { to: "/shop", label: "Shop" },
            ...CATEGORIES.map((c) => ({ to: `/shop?category=${c.slug}`, label: c.name })),
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item) => (
            <NavLink
              key={item.to + item.label}
              to={item.to}
              className={navLink}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
