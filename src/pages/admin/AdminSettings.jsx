import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase.js";
import { SITE } from "../../lib/siteConfig.js";

export default function AdminSettings() {
  const [form, setForm] = useState({
    gmail: SITE.gmail,
    whatsapp: SITE.whatsapp,
    whatsapp_display: SITE.whatsappDisplay,
    instagram: SITE.socials.instagram,
    tiktok: SITE.socials.tiktok,
    facebook: SITE.socials.facebook,
    pinterest: SITE.socials.pinterest,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    (async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase.from("settings").select("*").eq("id", 1).single();
      if (data) setForm((f) => ({ ...f, ...data }));
      setLoading(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);
    if (supabase) {
      await supabase.from("settings").update(form).eq("id", 1);
    }
    setSaving(false);
    setSaved(true);
  };

  if (loading) return <p className="text-sm text-charcoal/50">Loading…</p>;

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl mb-6">Settings</h1>
      <form onSubmit={handleSubmit} className="bg-white border border-navy/10 p-6 space-y-5">
        <Field label="Gmail" value={form.gmail} onChange={(v) => setForm((f) => ({ ...f, gmail: v }))} />
        <Field label="WhatsApp Number (digits only, e.g. 923479119430)" value={form.whatsapp} onChange={(v) => setForm((f) => ({ ...f, whatsapp: v }))} />
        <Field label="WhatsApp Display Text" value={form.whatsapp_display} onChange={(v) => setForm((f) => ({ ...f, whatsapp_display: v }))} />
        <Field label="Instagram URL" value={form.instagram} onChange={(v) => setForm((f) => ({ ...f, instagram: v }))} />
        <Field label="TikTok URL" value={form.tiktok} onChange={(v) => setForm((f) => ({ ...f, tiktok: v }))} />
        <Field label="Facebook URL" value={form.facebook} onChange={(v) => setForm((f) => ({ ...f, facebook: v }))} />
        <Field label="Pinterest URL" value={form.pinterest} onChange={(v) => setForm((f) => ({ ...f, pinterest: v }))} />
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Saving…" : "Save Settings"}
        </button>
        {saved && <p className="text-xs text-gold-dark">Saved.</p>}
      </form>
      <p className="text-xs text-charcoal/40 mt-4">
        Note: the storefront currently reads contact info from <code>src/lib/siteConfig.js</code>.
        Ask me to wire the header, footer, and contact page to read from this settings table
        instead, so changes here reflect live without a redeploy.
      </p>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="eyebrow text-charcoal/50 block mb-2">{label}</label>
      <input
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-navy/20 px-3 py-2.5 text-sm"
      />
    </div>
  );
}
