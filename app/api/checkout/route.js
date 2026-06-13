import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const runtime = "nodejs";

const PRICE = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  agency: process.env.STRIPE_PRICE_AGENCY,
};

export async function POST(req) {
  try {
    const { plan } = await req.json();
    const price = PRICE[plan];
    if (!price) return Response.json({ error: "Unknown plan" }, { status: 400 });

    const store = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      { cookies: { getAll: () => store.getAll(), setAll: () => {} } }
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const site = process.env.NEXT_PUBLIC_SITE_URL;

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      customer_email: user.email,
      client_reference_id: user.id,
      metadata: { user_id: user.id, plan },
      discounts: process.env.STRIPE_COUPON ? [{ coupon: process.env.STRIPE_COUPON }] : [],
      success_url: `${site}/dashboard?paid=1`,
      cancel_url: `${site}/?canceled=1`,
    });

    return Response.json({ url: session.url });
  } catch (e) {
    return Response.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
