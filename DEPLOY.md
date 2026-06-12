# Frontdesk AI — publish it live

This is a complete, real Next.js SaaS: signup/login, a dashboard to build AI
assistants, a Claude-powered chat that captures leads, an embeddable widget,
and Stripe subscriptions. Below is everything needed to take it live. Budget
about 60–90 minutes the first time. All services have free tiers to start.

You'll create accounts on four services and paste their keys into one place
(Vercel). I can't do this part for you — the keys are secret and tied to your
identity — but every step is copy-paste.

---

## 0. What you need
- A GitHub account (free) — to hold the code.
- Node.js 18+ if you want to run it locally first (optional).

## 1. Supabase — database + login  (free)
1. Go to supabase.com → New project. Pick a name and a strong DB password.
2. Left sidebar → **SQL Editor** → New query. Open `supabase/schema.sql` from
   this project, paste the whole thing, click **Run**.
3. Left sidebar → **Authentication → Providers → Email**: for the fastest start,
   turn **OFF** "Confirm email" (you can re-enable later). Save.
4. Left sidebar → **Project Settings → API**. Copy three values:
   - Project URL  → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY`  (keep this secret)

## 2. Anthropic — the AI  (pay-as-you-go, a few dollars to start)
1. Go to console.anthropic.com → API Keys → Create key.
2. Copy it → `ANTHROPIC_API_KEY`. Add a small amount of credit under Billing.

## 3. Push the code to GitHub
1. Create an empty repo on github.com (e.g. `frontdesk-ai`).
2. In this project folder, run:
   ```
   git init
   git add .
   git commit -m "Frontdesk AI"
   git branch -M main
   git remote add origin https://github.com/YOU/frontdesk-ai.git
   git push -u origin main
   ```

## 4. Vercel — host it  (free)
1. Go to vercel.com → Add New → Project → import your GitHub repo.
2. Before deploying, open **Environment Variables** and add every line from
   `.env.example` with your real values. Set `NEXT_PUBLIC_SITE_URL` to your
   Vercel URL for now (you can update it after the first deploy shows you the URL).
   You can leave the three `STRIPE_*` blank for now and add them in step 5.
3. Click **Deploy**. When it finishes you get a live URL like
   `https://frontdesk-ai.vercel.app`.
4. Go back to Environment Variables, set `NEXT_PUBLIC_SITE_URL` to that exact URL,
   and redeploy (Deployments → ⋯ → Redeploy).

**Try it now:** visit your URL → Sign up → Dashboard → New assistant → fill in a
business → copy the embed snippet → click "Open live test page". Chat to it and
leave a fake email; the lead appears in your dashboard. That's the whole loop, live.

## 5. Stripe — take payments  (only when you have a buyer)
1. Go to dashboard.stripe.com. Create three **recurring** Products/Prices:
   Starter $99/mo, Pro $149/mo, Agency $199/mo. Copy each price ID (`price_...`).
2. Developers → API keys → copy the **Secret key** → `STRIPE_SECRET_KEY`.
3. Developers → Webhooks → Add endpoint:
   - URL: `https://YOURDOMAIN/api/webhook`
   - Events: `checkout.session.completed`, `customer.subscription.deleted`
   - Copy the **Signing secret** → `STRIPE_WEBHOOK_SECRET`.
4. Put the price IDs into `STRIPE_PRICE_STARTER/PRO/AGENCY`.
5. Add all five Stripe vars in Vercel → redeploy.
   (Note: the pricing buttons currently route new users through signup. To start
   a checkout, call `POST /api/checkout` with `{ "plan": "pro" }` from a signed-in
   page — wire a "Subscribe" button on the dashboard when you're ready.)

## 6. Custom domain (optional)
Vercel → Project → Domains → add yours, follow the DNS instructions, then update
`NEXT_PUBLIC_SITE_URL` to the new domain and redeploy.

---

## Embedding on a client's website
Give each client the snippet from their assistant's dashboard:
```
<script src="https://YOURDOMAIN/embed.js" data-bot="THE_BOT_ID" data-api="https://YOURDOMAIN"></script>
```
They paste it before `</body>`. A chat bubble appears; their leads flow to your dashboard.

## Honest notes
- This is a working starter, not a finished company. It hasn't been load-tested
  and has no usage limits/metering yet — add those before scaling.
- Plan gating (e.g. blocking a 4th bot on Starter) isn't enforced yet; the
  `subscriptions` table records who paid, so the check is easy to add.
- First deploy almost always surfaces one small env-var or config issue. That's
  normal — send me the exact error and we'll fix it fast. Unlike a black-box
  builder, you own every line here.
```
