import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/notifications", label: "Notifications" },
  { to: "/admin/settings", label: "Settings" },
];

export default function AdminLayout() {
  const { session, loading, signOut } = useAdminAuth();

  if (loading) {
    return <div className="min-h-screen bg-navy flex items-center justify-center text-ivory/50 text-sm">Loading…</div>;
  }
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="min-h-screen bg-ivory flex flex-col md:flex-row">
      <aside className="md:w-56 bg-navy text-ivory flex-shrink-0 md:min-h-screen">
        <div className="px-6 py-6 border-b border-ivory/10">
          <span className="font-display text-lg">
            CASS<span className="text-gold italic">x</span>Class
          </span>
          <p className="text-ivory/40 text-[10px] font-label tracking-widest2 uppercase mt-1">Admin</p>
        </div>
        <nav className="flex md:flex-col overflow-x-auto md:overflow-visible px-3 py-3 gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `px-3 py-2.5 text-sm rounded-sm whitespace-nowrap transition-colors ${
                  isActive ? "bg-gold text-navy font-medium" : "text-ivory/70 hover:bg-ivory/10"
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-3 pb-4 mt-auto">
          <button
            onClick={signOut}
            className="w-full text-left px-3 py-2.5 text-sm text-ivory/50 hover:text-ivory hover:bg-ivory/10 rounded-sm"
          >
            Sign Out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
}
