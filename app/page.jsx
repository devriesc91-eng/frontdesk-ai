import Link from "next/link";

const PLANS = [
  { key: "starter", name: "Starter", price: 99, feats: ["1 AI assistant", "500 chats / mo", "Lead inbox + email alerts"], hot: false },
  { key: "pro", name: "Pro", price: 149, feats: ["3 AI assistants", "Unlimited chats", "Calendar booking", "Remove branding"], hot: true },
  { key: "agency", name: "Agency", price: 199, feats: ["Unlimited assistants", "Client sub-accounts", "White-label", "Priority support"], hot: false },
];

export default function Home() {
  return (
    <div className="wrap">
      <header className="nav">
        <div className="brand"><i /> Frontdesk<b>AI</b></div>
        <div className="row">
          <Link href="/login" className="btn btn-ghost">Sign in</Link>
          <Link href="/signup" className="btn btn-solid">Start free</Link>
        </div>
      </header>

      <section style={{ padding: "56px 0 64px" }}>
        <p className="eyebrow">The front desk that never clocks out</p>
        <h1>Your missed enquiries are<br /><span className="mark">someone else&apos;s customers.</span></h1>
        <p className="sub">Frontdesk AI answers every website visitor instantly — day or night — books appointments,
          and hands you the lead while it&apos;s still warm.</p>
        <div className="row" style={{ marginTop: 28 }}>
          <Link href="/signup" className="btn btn-solid">Build your assistant</Link>
          <Link href="#pricing" className="btn btn-line">See pricing</Link>
        </div>
      </section>

      <section style={{ padding: "30px 0" }}>
        <h2>Live in an afternoon</h2>
        <div className="grid cols-3">
          {[
            ["01", "Feed it your business", "Paste your hours, services and FAQs. It learns your business in minutes."],
            ["02", "Drop in one line of code", "Add the chat bubble to your site with a single snippet."],
            ["03", "Wake up to booked leads", "It answers 24/7. Every lead lands in your inbox with name, contact and intent."],
          ].map(([n, t, d]) => (
            <div key={n} className="card">
              <div className="eyebrow">{n}</div>
              <h3 style={{ fontFamily: "Bricolage Grotesque", margin: "4px 0 8px" }}>{t}</h3>
              <p className="muted" style={{ margin: 0, fontSize: 14.5 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" style={{ padding: "48px 0 70px" }}>
        <h2>Simple pricing</h2>
        <div className="grid cols-3">
          {PLANS.map((p) => (
            <div key={p.key} className="card" style={p.hot ? { borderColor: "var(--brand)", boxShadow: "0 20px 44px -26px rgba(17,110,78,.5)" } : {}}>
              {p.hot && <div className="eyebrow">Most popular</div>}
              <h3 style={{ fontFamily: "Bricolage Grotesque", margin: "0 0 6px" }}>{p.name}</h3>
              <div style={{ fontFamily: "Bricolage Grotesque", fontWeight: 800, fontSize: 40, letterSpacing: "-.03em" }}>
                ${p.price}<small style={{ fontSize: 15, fontWeight: 500, color: "var(--muted)" }}>/mo</small>
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 20px", display: "grid", gap: 8 }}>
                {p.feats.map((f) => <li key={f} style={{ fontSize: 14, paddingLeft: 20, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "var(--brand)", fontWeight: 700 }}>✓</span>{f}</li>)}
              </ul>
              {/* Checkout requires login; we route through signup which then starts checkout. */}
              <Link href={`/signup?plan=${p.key}`} className={`btn ${p.hot ? "btn-solid" : "btn-line"}`} style={{ width: "100%", textAlign: "center" }}>
                Start free trial
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid var(--line)", padding: "26px 0", color: "var(--muted)", fontSize: 13 }}>
        <div className="brand" style={{ fontSize: 16 }}><i /> Frontdesk<b>AI</b></div>
      </footer>
    </div>
  );
}
