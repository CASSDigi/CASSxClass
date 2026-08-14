// Supabase Edge Function: notify-new-order
// Triggered by a Database Webhook on orders (INSERT). Sends a web push
// notification to every subscribed device so you get a phone alert
// the moment a customer places a COD order.
//
// Deploy with:
//   supabase functions deploy notify-new-order
//   supabase secrets set VAPID_PUBLIC_KEY=... VAPID_PRIVATE_KEY=... VAPID_SUBJECT=mailto:cass41000@gmail.com
//
// Then create the webhook: Supabase Dashboard > Database > Webhooks >
// Create a new webhook > table "orders" > Insert > HTTP Request >
// point it at this function's URL, with the anon/service key as a header.

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "https://esm.sh/web-push@3.6.7";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const vapidPublic = Deno.env.get("VAPID_PUBLIC_KEY");
const vapidPrivate = Deno.env.get("VAPID_PRIVATE_KEY");
const vapidSubject = Deno.env.get("VAPID_SUBJECT") ?? "mailto:cass41000@gmail.com";

webpush.setVapidDetails(vapidSubject, vapidPublic, vapidPrivate);

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const order = payload.record ?? payload.new ?? payload;

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: subs, error } = await supabase.from("push_subscriptions").select("*");
    if (error) throw error;

    const notification = JSON.stringify({
      title: "New CASSxClass order",
      body: `${order.customer_name} — Rs ${order.total} (${order.city})`,
      url: "/admin/orders",
    });

    const results = await Promise.allSettled(
      (subs ?? []).map((sub) =>
        webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          notification
        )
      )
    );

    return new Response(JSON.stringify({ sent: results.length }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
