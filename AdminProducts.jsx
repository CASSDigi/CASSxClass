import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { CATEGORIES } from "../../data/products.js";

const fmt = (n) => `Rs ${Number(n || 0).toLocaleString("en-PK")}`;
const emptyForm = {
  id: "",
  name: "",
  category: CATEGORIES[0].slug,
  price: "",
  compare_at: "",
  description: "",
  images: "",
  badge: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("name");
    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const startEdit = (p) => {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      compare_at: p.compare_at || "",
      description: p.description || "",
      images: (p.images || []).join(", "),
      badge: p.badge || "",
    });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!supabase) return;
    setSaving(true);

    const record = {
      id: form.id.trim(),
      name: form.name.trim(),
      category: form.category,
      price: Number(form.price),
      compare_at: form.compare_at ? Number(form.compare_at) : null,
      description: form.description.trim(),
      images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
      badge: form.badge.trim() || null,
    };

    const { error } = await supabase.from("products").upsert(record);
    setSaving(false);
    if (!error) {
      resetForm();
      load();
    } else {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product? This can't be undone.")) return;
    if (supabase) await supabase.from("products").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Products</h1>

      <form onSubmit={handleSubmit} className="bg-white border border-navy/10 p-5 mb-8 space-y-4">
        <h2 className="font-display text-lg">{editingId ? `Editing: ${editingId}` : "Add New Product"}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Product ID (unique, e.g. w-04)" value={form.id} disabled={!!editingId}
            onChange={(v) => setForm((f) => ({ ...f, id: v }))} required />
          <Field label="Name" value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm bg-white"
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
          </div>
          <Field label="Badge (optional, e.g. New)" value={form.badge} onChange={(v) => setForm((f) => ({ ...f, badge: v }))} />
          <Field label="Price (Rs)" type="number" value={form.price} onChange={(v) => setForm((f) => ({ ...f, price: v }))} required />
          <Field label="Compare-at Price (optional)" type="number" value={form.compare_at} onChange={(v) => setForm((f) => ({ ...f, compare_at: v }))} />
        </div>
        <div>
          <label className="eyebrow text-charcoal/50 block mb-2">Image URLs (comma-separated)</label>
          <input
            value={form.images}
            onChange={(e) => setForm((f) => ({ ...f, images: e.target.value }))}
            placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
            className="w-full border border-navy/20 px-3 py-2.5 text-sm"
          />
        </div>
        <div>
          <label className="eyebrow text-charcoal/50 block mb-2">Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="w-full border border-navy/20 px-3 py-2.5 text-sm"
          />
        </div>
        <div className="flex gap-3">
          <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
            {saving ? "Saving…" : editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={resetForm} className="btn-outline">
              Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="text-sm text-charcoal/50">Loading…</p>
      ) : (
        <div className="bg-white border border-navy/10 divide-y divide-navy/5">
          {products.map((p) => (
            <div key={p.id} className="p-4 flex items-center gap-4">
              {p.images?.[0] && <img src={p.images[0]} alt="" className="w-14 h-14 object-cover flex-shrink-0" />}
              <div className="flex-1 min-w-0">
                <p className="text-charcoal font-medium">{p.name}</p>
                <p className="text-charcoal/40 text-xs capitalize">{p.category} · {fmt(p.price)} · ID: {p.id}</p>
              </div>
              <button onClick={() => startEdit(p)} className="text-xs text-gold-dark underline underline-offset-4">
                Edit
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-xs text-red-600 underline underline-offset-4">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required = false, disabled = false }) {
  return (
    <div>
      <label className="eyebrow text-charcoal/50 block mb-2">{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-navy/20 px-3 py-2.5 text-sm disabled:bg-navy/5 disabled:text-charcoal/40"
      />
    </div>
  );
}
