import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";

const fmt = (n) => `Rs ${Number(n || 0).toLocaleString("en-PK")}`;
const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const updateStatus = async (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    if (supabase) await supabase.from("orders").update({ status }).eq("id", id);
  };

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="font-display text-2xl">Orders</h1>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-navy/20 px-3 py-2 text-sm bg-white"
        >
          <option value="all">All Statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-sm text-charcoal/50">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-charcoal/50">No orders match this filter.</p>
      ) : (
        <div className="bg-white border border-navy/10 divide-y divide-navy/5">
          {filtered.map((o) => (
            <div key={o.id} className="p-5">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-charcoal font-medium">{o.customer_name} · {o.phone}</p>
                  <p className="text-charcoal/50 text-xs mt-0.5">
                    {o.address}, {o.city} · {new Date(o.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg">{fmt(o.total)}</span>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                    className="border border-navy/20 px-2 py-1.5 text-xs bg-white"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setExpanded(expanded === o.id ? null : o.id)}
                    className="text-xs text-gold-dark underline underline-offset-4"
                  >
                    {expanded === o.id ? "Hide" : "Details"}
                  </button>
                </div>
              </div>

              {expanded === o.id && (
                <div className="mt-4 pt-4 border-t border-navy/5 text-sm space-y-2">
                  {o.email && <p><span className="text-charcoal/50">Email:</span> {o.email}</p>}
                  {o.notes && <p><span className="text-charcoal/50">Notes:</span> {o.notes}</p>}
                  <div>
                    <p className="text-charcoal/50 mb-1">Items:</p>
                    <ul className="space-y-1 pl-4 list-disc">
                      {(o.items || []).map((it, idx) => (
                        <li key={idx}>
                          {it.name} — Qty {it.qty} — {fmt(it.price * it.qty)}
                          {it.variant && Object.keys(it.variant).length > 0 && (
                            <span className="text-charcoal/40"> ({Object.values(it.variant).join(" / ")})</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
