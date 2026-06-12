import Stripe from "stripe";
import { supabaseAdmin } from "../../../lib/supabase";

export const runtime = "nodejs";

export async function POST(req) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    return new Response(`Webhook error: ${e.message}`, { status: 400 });
  }

  const db = supabaseAdmin();

  if (event.type === "checkout.session.completed") {
    const s = event.data.object;
    await db.from("subscriptions").upsert({
      owner: s.metadata?.user_id || s.client_reference_id,
      plan: s.metadata?.plan || "pro",
      status: "active",
      stripe_customer: s.customer,
      updated_at: new Date().toISOString(),
    });
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    await db.from("subscriptions").update({ status: "canceled", updated_at: new Date().toISOString() })
      .eq("stripe_customer", sub.customer);
  }

  return new Response("ok", { status: 200 });
}
