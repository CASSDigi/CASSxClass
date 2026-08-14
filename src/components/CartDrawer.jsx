import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

const fmt = (n) => `Rs ${n.toLocaleString("en-PK")}`;

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQty, totalPrice } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 bg-charcoal/50 z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-ivory z-50 shadow-2xl
        transition-transform duration-500 ease-out flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-navy/10">
          <h2 className="font-display text-lg">Your Bag ({items.length})</h2>
          <button onClick={() => setIsOpen(false)} aria-label="Close cart" className="p-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3">
              <p className="text-charcoal/60 text-sm">Your bag is empty.</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="text-gold-dark text-sm font-label uppercase tracking-wide underline underline-offset-4"
              >
                Continue shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex gap-4">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm text-charcoal">{item.name}</h3>
                    {Object.entries(item.variant || {}).length > 0 && (
                      <p className="text-xs text-charcoal/50 mt-0.5">
                        {Object.entries(item.variant).map(([k, v]) => `${v}`).join(" / ")}
                      </p>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center border border-navy/15">
                        <button
                          className="w-7 h-7 text-sm"
                          onClick={() => updateQty(item.id, item.variant, item.qty - 1)}
                        >
                          −
                        </button>
                        <span className="w-7 text-center text-sm">{item.qty}</span>
                        <button
                          className="w-7 h-7 text-sm"
                          onClick={() => updateQty(item.id, item.variant, item.qty + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="text-xs text-charcoal/40 hover:text-charcoal underline underline-offset-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <span className="text-sm text-charcoal/80 flex-shrink-0">{fmt(item.price * item.qty)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-navy/10 px-6 py-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-charcoal/60">Subtotal</span>
              <span className="font-display text-lg">{fmt(totalPrice)}</span>
            </div>
            <p className="text-xs text-charcoal/50">Cash on delivery. Shipping calculated at checkout.</p>
            <Link
              to="/checkout"
              onClick={() => setIsOpen(false)}
              className="btn-primary w-full"
            >
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
