import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products.js";
import ProductCard from "../components/ProductCard.jsx";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(30000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [activeCategory]);

  const setCategory = (slug) => {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  };

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => p.price <= maxPrice);
    if (activeCategory !== "all") list = list.filter((p) => p.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [activeCategory, search, sort, maxPrice]);

  const currentCategoryName =
    CATEGORIES.find((c) => c.slug === activeCategory)?.name || "All Products";

  return (
    <div className="container-x py-10 md:py-16">
      <div className="mb-10">
        <span className="eyebrow text-gold-dark">Shop</span>
        <h1 className="font-display text-3xl md:text-4xl mt-2">{currentCategoryName}</h1>
      </div>

      <div className="flex items-center justify-between mb-6 md:hidden">
        <button
          onClick={() => setMobileFiltersOpen((v) => !v)}
          className="text-sm font-label uppercase tracking-wide border border-navy/20 px-4 py-2"
        >
          Filters {mobileFiltersOpen ? "▲" : "▼"}
        </button>
        <span className="text-xs text-charcoal/50">{filtered.length} items</span>
      </div>

      <div className="grid md:grid-cols-[220px_1fr] gap-10">
        {/* Sidebar */}
        <aside className={`space-y-8 ${mobileFiltersOpen ? "block" : "hidden"} md:block`}>
          <div>
            <h3 className="eyebrow text-charcoal/50 mb-3">Category</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setCategory("all")}
                  className={`hover:text-gold-dark transition-colors ${activeCategory === "all" ? "text-gold-dark font-medium" : "text-charcoal/70"}`}
                >
                  All Products
                </button>
              </li>
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <button
                    onClick={() => setCategory(c.slug)}
                    className={`hover:text-gold-dark transition-colors ${activeCategory === c.slug ? "text-gold-dark font-medium" : "text-charcoal/70"}`}
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-charcoal/50 mb-3">Search</h3>
            <input
              type="text"
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>

          <div>
            <h3 className="eyebrow text-charcoal/50 mb-3">Max Price: Rs {maxPrice.toLocaleString()}</h3>
            <input
              type="range"
              min="2000"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>

          <div>
            <h3 className="eyebrow text-charcoal/50 mb-3">Sort By</h3>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold bg-white"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </aside>

        {/* Grid */}
        <div>
          {filtered.length === 0 ? (
            <p className="text-charcoal/50 text-sm py-20 text-center">
              No products match your filters. Try widening your search.
            </p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
