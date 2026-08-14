import React from "react";
import { Link } from "react-router-dom";

const fmt = (n) => `Rs ${n.toLocaleString("en-PK")}`;

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block card-hover">
      <div className="relative aspect-[4/5] overflow-hidden bg-navy/5">
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-navy text-ivory text-[10px] font-label tracking-wide uppercase px-2.5 py-1">
            {product.badge}
          </span>
        )}
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[15px] text-charcoal group-hover:text-gold-dark transition-colors">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <span className="text-sm text-charcoal/80">{fmt(product.price)}</span>
            {product.compareAt && (
              <span className="text-xs text-charcoal/40 line-through">{fmt(product.compareAt)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
