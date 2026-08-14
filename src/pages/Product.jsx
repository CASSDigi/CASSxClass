import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, getRelatedProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

const fmt = (n) => `Rs ${n.toLocaleString("en-PK")}`;

export default function Product() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState({});
  const [qty, setQty] = useState(1);
  const [lightbox, setLightbox] = useState(false);
  const [tab, setTab] = useState("description");

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (product) {
      const initial = {};
      Object.entries(product.variants || {}).forEach(([k, v]) => (initial[k] = v[0]));
      setSelectedVariant(initial);
      setActiveImage(0);
      setQty(1);
    }
  }, [id]);

  const related = useMemo(() => (product ? getRelatedProducts(product) : []), [product]);

  if (!product) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-charcoal/60">Product not found.</p>
        <Link to="/shop" className="text-gold-dark underline underline-offset-4 mt-3 inline-block">
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 md:py-16">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16">
        {/* Gallery */}
        <div>
          <div
            className="aspect-square overflow-hidden bg-navy/5 cursor-zoom-in"
            onClick={() => setLightbox(true)}
          >
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 overflow-hidden border ${
                    i === activeImage ? "border-gold" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          {product.badge && (
            <span className="inline-block bg-navy text-ivory text-[10px] font-label tracking-wide uppercase px-2.5 py-1 mb-3">
              {product.badge}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-xl text-charcoal/90">{fmt(product.price)}</span>
            {product.compareAt && (
              <span className="text-sm text-charcoal/40 line-through">{fmt(product.compareAt)}</span>
            )}
          </div>

          <p className="mt-6 text-charcoal/70 leading-relaxed text-sm">{product.description}</p>

          {Object.entries(product.variants || {}).map(([key, options]) => (
            <div key={key} className="mt-6">
              <h3 className="eyebrow text-charcoal/50 mb-2 capitalize">{key}</h3>
              <div className="flex flex-wrap gap-2">
                {options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setSelectedVariant((v) => ({ ...v, [key]: opt }))}
                    className={`px-4 py-2 text-sm border transition-colors ${
                      selectedVariant[key] === opt
                        ? "border-navy bg-navy text-ivory"
                        : "border-navy/20 text-charcoal/70 hover:border-navy/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-navy/20">
              <button className="w-10 h-11 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button className="w-10 h-11 text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <button
              onClick={() => addItem(product, selectedVariant, qty)}
              className="btn-primary flex-1"
            >
              Add to Bag
            </button>
          </div>
          <button
            onClick={() => {
              addItem(product, selectedVariant, qty);
              navigate("/checkout");
            }}
            className="btn-outline w-full mt-3"
          >
            Buy Now
          </button>

          <div className="mt-10 border-t border-navy/10 pt-6">
            <div className="flex gap-6 text-sm font-label uppercase tracking-wide">
              {["description", "shipping"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`pb-2 border-b-2 transition-colors ${
                    tab === t ? "border-gold text-navy" : "border-transparent text-charcoal/40"
                  }`}
                >
                  {t === "description" ? "Details" : "Shipping"}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm text-charcoal/65 leading-relaxed">
              {tab === "description" ? (
                <ul className="space-y-1.5 list-disc list-inside">
                  <li>Premium materials, hand-finished construction</li>
                  <li>Ships in branded CASSxClass packaging</li>
                  <li>7-day return window from delivery date</li>
                </ul>
              ) : (
                <p>
                  Cash on delivery available nationwide. Orders typically ship within 2–4
                  business days, with delivery in 3–7 business days depending on your city.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-24">
          <h2 className="font-display text-2xl md:text-3xl mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {lightbox && (
        <div
          className="fixed inset-0 bg-charcoal/90 z-[60] flex items-center justify-center p-6"
          onClick={() => setLightbox(false)}
        >
          <img
            src={product.images[activeImage]}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </div>
  );
}
