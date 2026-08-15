import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase.js";

const fmt = (n) => `Rs ${Number(n || 0).toLocaleString("en-PK")}`;

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalOrders: 0, pending: 0, revenue: 0, recent: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data: orders } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      const list = orders || [];
      setStats({
        totalOrders: list.length,
        pending: list.filter((o) => o.status === "pending").length,
        revenue: list.reduce((sum, o) => sum + Number(o.total || 0), 0),
        recent: list.slice(0, 5),
      });
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Pending Orders" value={stats.pending} />
        <StatCard label="Total Revenue" value={fmt(stats.revenue)} />
      </div>

      <div className="bg-white border border-navy/10">
        <div className="flex items-center justify-between px-5 py-4 border-b border-navy/10">
          <h2 className="font-display text-lg">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs font-label uppercase tracking-wide text-gold-dark underline underline-offset-4">
            View All
          </Link>
        </div>
        {loading ? (
          <p className="px-5 py-8 text-sm text-charcoal/50">Loading…</p>
        ) : stats.recent.length === 0 ? (
          <p className="px-5 py-8 text-sm text-charcoal/50">No orders yet.</p>
        ) : (
          <ul className="divide-y divide-navy/5">
            {stats.recent.map((o) => (
              <li key={o.id} className="px-5 py-4 flex items-center justify-between text-sm">
                <div>
                  <p className="text-charcoal">{o.customer_name}</p>
                  <p className="text-charcoal/40 text-xs">{o.city} · {new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-charcoal">{fmt(o.total)}</p>
                  <span className="text-[10px] uppercase tracking-wide text-gold-dark">{o.status}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-navy/10 p-5">
      <p className="text-charcoal/50 text-xs font-label uppercase tracking-wide mb-2">{label}</p>
      <p className="font-display text-2xl">{value}</p>
    </div>
  );
}
