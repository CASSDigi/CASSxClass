import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { isSupabaseConfigured } from "../../lib/supabase.js";

export default function AdminLogin() {
  const { session, signIn } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn(email, password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Could not sign in. Check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-display text-2xl text-ivory">
            CASS<span className="text-gold italic">x</span>Class
          </span>
          <p className="eyebrow text-gold mt-2">Admin</p>
        </div>

        {!isSupabaseConfigured && (
          <p className="bg-red-900/30 text-red-200 text-xs px-4 py-3 mb-5">
            Supabase isn't connected yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY as
            environment variables, then redeploy, before you can log in.
          </p>
        )}

        <form onSubmit={handleSubmit} className="bg-ivory p-8 space-y-5">
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="eyebrow text-charcoal/50 block mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-navy/20 px-3 py-2.5 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-ivory/40 text-xs text-center mt-6">
          No account yet? Create one from your Supabase project → Authentication → Users → Add user.
        </p>
      </div>
    </div>
  );
}
