// Premium placeholder catalog — replace with real Supabase data later.
// Images use Unsplash source placeholders tagged by product type; swap with real product photography.

export const CATEGORIES = [
  {
    slug: "watches",
    name: "Watches",
    blurb: "Timepieces built on precision and restraint.",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80",
  },
  {
    slug: "wallets",
    name: "Wallets",
    blurb: "Full-grain leather, hand-finished edges.",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80",
  },
  {
    slug: "handbags",
    name: "Handbags",
    blurb: "Structured silhouettes for everyday carry.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80",
  },
  {
    slug: "perfumes",
    name: "Perfumes",
    blurb: "Signature scents, layered and long-lasting.",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80",
  },
];

export const PRODUCTS = [
  {
    id: "w-01",
    name: "Meridian Chronograph",
    category: "watches",
    price: 18500,
    compareAt: 24000,
    description:
      "A stainless steel chronograph with a sunburst navy dial and sapphire crystal. Water resistant to 100m, finished with a brushed link bracelet.",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1200&q=80",
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80",
    ],
    variants: { strap: ["Steel", "Leather"] },
    badge: "Bestseller",
  },
  {
    id: "w-02",
    name: "Heritage Automatic",
    category: "watches",
    price: 26900,
    description:
      "Self-winding automatic movement visible through an exhibition caseback. Champagne dial with applied gold-tone indices.",
    images: [
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80",
      "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=1200&q=80",
    ],
    variants: { strap: ["Leather", "Mesh"] },
  },
  {
    id: "w-03",
    name: "Vantage Field Watch",
    category: "watches",
    price: 14200,
    description:
      "Matte navy dial, luminous hands, and a rugged canvas strap built for daily wear without losing its dress-watch manners.",
    images: ["https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1200&q=80"],
    variants: { strap: ["Canvas", "Steel"] },
  },
  {
    id: "b-01",
    name: "Cardinal Bifold",
    category: "wallets",
    price: 6800,
    description:
      "Full-grain leather bifold with six card slots and a hidden note pocket. Ages into a deeper patina with use.",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80"],
    variants: { color: ["Espresso", "Black", "Cognac"] },
    badge: "New",
  },
  {
    id: "b-02",
    name: "Aster Cardholder",
    category: "wallets",
    price: 4200,
    description: "Slim, minimal, and pocket-friendly — four slots and a central pull-tab for quick access.",
    images: ["https://images.unsplash.com/photo-1627123424574-724758594e93?w=1200&q=80"],
    variants: { color: ["Black", "Tan"] },
  },
  {
    id: "h-01",
    name: "Adorn Structured Tote",
    category: "handbags",
    price: 22400,
    description:
      "A structured silhouette in pebbled leather with brass hardware and a detachable crossbody strap.",
    images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=80"],
    variants: { color: ["Navy", "Black", "Ivory"] },
    badge: "Bestseller",
  },
  {
    id: "h-02",
    name: "Reverie Clutch",
    category: "handbags",
    price: 11900,
    description: "Evening clutch in satin leather with a slim gold-tone chain that tucks away when not needed.",
    images: ["https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=1200&q=80"],
    variants: { color: ["Gold", "Black"] },
  },
  {
    id: "p-01",
    name: "Noir Absolu",
    category: "perfumes",
    price: 9800,
    description: "A dark, woody-amber signature scent — bergamot opening, oud and vetiver base. 100ml EDP.",
    images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=1200&q=80"],
    variants: { size: ["50ml", "100ml"] },
    badge: "New",
  },
  {
    id: "p-02",
    name: "Ivory Musk",
    category: "perfumes",
    price: 8600,
    description: "Soft white musk layered with jasmine and sandalwood. Long-lasting, understated projection.",
    images: ["https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1200&q=80"],
    variants: { size: ["50ml", "100ml"] },
  },
];

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);
export const getProductsByCategory = (slug) => PRODUCTS.filter((p) => p.category === slug);
export const getRelatedProducts = (product, limit = 4) =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
