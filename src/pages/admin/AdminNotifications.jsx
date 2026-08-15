import React, { useEffect, useState } from "react";
import { getPushSubscription, isPushSupported, subscribeToPush, unsubscribeFromPush } from "../../lib/push.js";

export default function AdminNotifications() {
  const [supported, setSupported] = useState(true);
  const [subscribed, setSubscribed] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const ok = await isPushSupported();
      setSupported(ok);
      if (ok) {
        const sub = await getPushSubscription();
        setSubscribed(!!sub);
      }
      setLoading(false);
    })();
  }, []);

  const handleSubscribe = async () => {
    setStatus("");
    try {
      await subscribeToPush();
      setSubscribed(true);
      setStatus("Notifications enabled on this device.");
    } catch (err) {
      setStatus(err.message);
    }
  };

  const handleUnsubscribe = async () => {
    await unsubscribeFromPush();
    setSubscribed(false);
    setStatus("Notifications turned off for this device.");
  };

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl mb-6">Notifications</h1>

      <div className="bg-white border border-navy/10 p-6">
        <p className="text-sm text-charcoal/70 leading-relaxed mb-5">
          Turn on notifications to get a push alert on this device the moment a new order
          comes in. On Android, this works directly in Chrome. On iPhone, add this admin
          page to your Home Screen first (Share → Add to Home Screen), then enable
          notifications from there.
        </p>

        {loading ? (
          <p className="text-sm text-charcoal/50">Checking device support…</p>
        ) : !supported ? (
          <p className="text-sm text-red-600">
            This browser doesn't support push notifications. Try Chrome on Android, or add
            this page to your iPhone Home Screen first.
          </p>
        ) : subscribed ? (
          <div className="space-y-3">
            <p className="text-sm text-gold-dark font-label uppercase tracking-wide">
              ✓ Notifications are on for this device
            </p>
            <button onClick={handleUnsubscribe} className="btn-outline">
              Turn Off
            </button>
          </div>
        ) : (
          <button onClick={handleSubscribe} className="btn-primary">
            Enable Notifications on This Device
          </button>
        )}

        {status && <p className="text-xs text-charcoal/50 mt-4">{status}</p>}
      </div>

      <div className="mt-6 bg-navy/[0.03] p-5 text-xs text-charcoal/60 leading-relaxed">
        <p className="font-label uppercase tracking-wide text-charcoal/40 mb-2">One-time setup required</p>
        <p>
          This needs a Supabase Edge Function deployed once (included as
          <code className="mx-1 px-1 bg-navy/5">supabase/functions/notify-new-order</code>
          in your project) plus a Database Webhook connecting it to new orders, and a
          <code className="mx-1 px-1 bg-navy/5">VITE_VAPID_PUBLIC_KEY</code>
          environment variable in Cloudflare Pages. See the README for exact commands.
        </p>
      </div>
    </div>
  );
}
