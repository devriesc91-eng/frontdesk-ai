import { redirect } from "next/navigation";
import Stripe from "stripe";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const PRICE = {
  starter: process.env.STRIPE_PRICE_STARTER,
  pro: process.env.STRIPE_PRICE_PRO,
  agency: process.env.STRIPE_PRICE_AGENCY,
};

export default async function Subscribe({ searchParams }) {
  const plan = searchParams?.plan || "pro";
  const price = PRICE[plan] || PRICE.pro;

  const store = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    { cookies: { getAll: () => store.getAll(), setAll: () => {} } }
  );
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signup?plan=" + plan);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const site = process.env.NEXT_PUBLIC_SITE_URL;
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price, quantity: 1 }],
    customer_email: user.email,
    client_reference_id: user.id,
    metadata: { user_id: user.id, plan },
    allow_promotion_codes: true,
    success_url: `${site}/dashboard?paid=1`,
    cancel_url: `${site}/?canceled=1`,
  });

  redirect(session.url);
}
