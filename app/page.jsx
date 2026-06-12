import Link from "next/link";

function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" aria-label="Frontdesk AI" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1730" />
          <stop offset="0.55" stopColor="#123E9A" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="12" y="12" width="232" height="232" rx="52" fill="url(#lg)" />
      <path d="M60 101c0-23 19-42 42-42h55c23 0 42 19 42 42 0 22-17 40-39 42l-33 27c-5 4-12 1-12-6v-20h-13c-23 0-42-19-42-43z" fill="white" opacity="0.96" />
      <circle cx="103" cy="103" r="7" fill="#2563EB" />
      <circle cx="130" cy="103" r="7" fill="#0EA5E9" />
      <circle cx="157" cy="103" r="7" fill="#06B6D4" />
      <path d="M189 48l5 14 14 5-14 5-5 14-5-14-14-5 14-5 5-14z" fill="white" />
      <path d="M56 163c0-10 8-18 18-18h108c10 0 18 8 18 18v14H56v-14z" fill="white" opacity="0.97" />
      <path d="M45 177h166v24c0 10-8 18-18 18H63c-10 0-18-8-18-18v-24z" fill="white" opacity="0.9" />
      <path d="M87 179h82" stroke="#2563EB" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      <path d="M103 198l15 13 35-38" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const PLANS = [
  { key: "starter", name: "Starter", price: 99, tag: "", feats: ["1 AI assistant", "Up to 500 chats / month", "Lead inbox + email alerts", "Works on any website"], hot: false },
  { key: "pro", name: "Pro", price: 149, tag: "Most popular", feats: ["3 AI assistants", "Unlimited chats", "Appointment booking", "Remove Frontdesk branding", "Priority email support"], hot: true },
  { key: "agency", name: "Agency", price: 199, tag: "", feats: ["Unlimited assistants", "Manage multiple clients", "White-label dashboard", "Everything in Pro"], hot: false },
];

const FAQ = [
  ["How long does setup take?", "An afternoon. You paste in your hours, services and FAQs, drop one line of code on your site, and your assistant is live."],
  ["Do I need to be technical?", "No. If you can copy and paste, you can set it up. If you'd rather not, send us your website and we'll add it for you."],
  ["Will it work with my current website?", "Yes — Wix, Squarespace, WordPress, a custom site, it doesn't matter. It's a single snippet that works anywhere."],
  ["What happens to the leads it captures?", "Every enquiry lands in your dashboard with the person's name, contact details and what they wanted — ready for you to follow up."],
];

export default function Home() {
  return (
    <div className="fd">
      <style>{css}</style>

      <header className="fd-nav">
        <div className="fd-logo"><Logo /> <span>Frontdesk<b> AI</b></span></div>
        <nav className="fd-links">
          <a href="#how">How it works</a>
          <a href="#pricing">Pricing</a>
          <a href="#faq">FAQ</a>
          <Link href="/login" className="fd-btn fd-ghost">Sign in</Link>
          <Link href="/signup" className="fd-btn fd-solid">Start free</Link>
        </nav>
      </header>

      <section className="fd-hero">
        <div className="fd-hero-copy">
          <span className="fd-pill">● Answering 24 / 7</span>
          <h1>Never miss another<br /><span className="fd-grad">customer enquiry.</span></h1>
          <p className="fd-lead">
            Frontdesk AI is the receptionist that never sleeps. It answers your website visitors in
            seconds, books appointments, and captures every lead — even at 2am, even when you&apos;re flat out.
          </p>
          <div className="fd-cta-row">
            <Link href="/signup" className="fd-btn fd-solid fd-lg">Build your assistant — free</Link>
            <a href="#how" className="fd-btn fd-line fd-lg">See how it works</a>
          </div>
          <div className="fd-trust">
            <span>✓ No code</span><span>✓ Live in an afternoon</span><span>✓ Cancel anytime</span>
          </div>
        </div>

        <div className="fd-preview">
          <div className="fd-preview-bar">
            <span className="fd-dot r" /><span className="fd-dot y" /><span className="fd-dot g" />
            <span className="fd-preview-title">Your leads · today</span>
          </div>
          <div className="fd-inbox">
            <div className="fd-lead-row fresh">
              <div className="fd-lead-head"><b>Jane Smith</b><span className="fd-time">just now</span></div>
              <div className="fd-lead-contact">jane.smith@email.com</div>
              <div className="fd-lead-note">Lost a filling — wants a Friday 3pm appointment</div>
            </div>
            <div className="fd-lead-row">
              <div className="fd-lead-head"><b>Marcus Lee</b><span className="fd-time">9:42 am</span></div>
              <div className="fd-lead-contact">0411 ••• 902</div>
              <div className="fd-lead-note">New patient — checkup &amp; clean</div>
            </div>
            <div className="fd-lead-row">
              <div className="fd-lead-head"><b>Priya N.</b><span className="fd-time">8:15 am</span></div>
              <div className="fd-lead-contact">priya.•••@gmail.com</div>
              <div className="fd-lead-note">Asking about whitening prices</div>
            </div>
          </div>
          <div className="fd-preview-foot">3 leads captured while you were busy</div>
        </div>
      </section>

      <section className="fd-band">
        <p>Every unanswered message is a job, a patient, or a client going to whoever replied first.
          <b> Frontdesk replies first — every single time.</b></p>
      </section>

      <section id="how" className="fd-section">
        <p className="fd-eyebrow">How it works</p>
        <h2>Up and running in an afternoon</h2>
        <div className="fd-steps">
          {[
            ["01", "Teach it your business", "Paste in your hours, services, pricing rules and common questions. It learns your business in minutes."],
            ["02", "Add one line of code", "Drop the chat bubble onto your website with a single snippet — or send us the link and we'll do it."],
            ["03", "Wake up to booked leads", "It answers, qualifies and books around the clock. Every lead lands in your inbox with full details."],
          ].map(([n, t, d]) => (
            <div key={n} className="fd-step">
              <span className="fd-step-n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-section fd-tint">
        <p className="fd-eyebrow">What it does</p>
        <h2>A full-time receptionist, for less than a coffee a day</h2>
        <div className="fd-feats">
          {[
            ["Answers instantly", "Replies to every visitor in seconds, day or night, in your business's voice."],
            ["Books appointments", "Qualifies the enquiry and locks in a time while the customer is still keen."],
            ["Captures every lead", "Name, contact and what they wanted — saved to your dashboard automatically."],
            ["Works everywhere", "Wix, Squarespace, WordPress or custom — one snippet, any website."],
            ["Never takes a day off", "No sick days, no missed calls, no after-hours voicemails piling up."],
            ["Sounds like you", "Trained on your services and FAQs, so answers are accurate and on-brand."],
          ].map(([t, d]) => (
            <div key={t} className="fd-feat">
              <div className="fd-check">✓</div>
              <div><h4>{t}</h4><p>{d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="fd-section">
        <p className="fd-eyebrow">Pricing</p>
        <h2>Simple plans. No surprises.</h2>
        <div className="fd-plans">
          {PLANS.map((p) => (
            <div key={p.key} className={`fd-plan ${p.hot ? "hot" : ""}`}>
              {p.tag && <span className="fd-plan-tag">{p.tag}</span>}
              <h3>{p.name}</h3>
              <div className="fd-price">${p.price}<small>/mo</small></div>
              <ul>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <Link href={`/signup?plan=${p.key}`} className={`fd-btn ${p.hot ? "fd-solid" : "fd-line"}`} style={{ width: "100%", textAlign: "center" }}>
                Start free trial
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="fd-section fd-tint">
        <p className="fd-eyebrow">Questions</p>
        <h2>Good to know</h2>
        <div className="fd-faq">
          {FAQ.map(([q, a]) => (
            <div key={q} className="fd-qa">
              <h4>{q}</h4>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="fd-final">
        <h2>Stop letting enquiries slip away.</h2>
        <p>Set up your AI receptionist today — it&apos;s free to start, and live this afternoon.</p>
        <Link href="/signup" className="fd-btn fd-solid fd-lg">Build your assistant — free</Link>
      </section>

      <footer className="fd-foot">
        <div className="fd-logo"><Logo size={28} /> <span>Frontdesk<b> AI</b></span></div>
        <span className="fd-foot-note">Answers, captures &amp; saves every client message.</span>
      </footer>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
.fd{
  --ink:#0B1730; --ink2:#243047; --muted:#5B6B82; --paper:#FFFFFF; --paper2:#F5F8FE;
  --line:#E4EBF6; --brand:#2563EB; --cyan:#06B6D4; --green:#16A34A;
  --grad:linear-gradient(135deg,#2563EB,#06B6D4);
  font-family:Inter,system-ui,sans-serif; color:var(--ink); background:var(--paper);
  line-height:1.6; -webkit-font-smoothing:antialiased;
}
.fd *{box-sizing:border-box;}
.fd a{text-decoration:none;color:inherit;}
.fd h1,.fd h2,.fd h3,.fd h4{font-family:'Bricolage Grotesque';letter-spacing:-.02em;margin:0;}
.fd-grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fd-btn{font-family:Inter;font-weight:600;font-size:15px;border-radius:11px;padding:11px 18px;cursor:pointer;border:1.5px solid transparent;display:inline-block;transition:transform .12s,box-shadow .2s,background .2s;}
.fd-btn:active{transform:translateY(1px);}
.fd-solid{background:var(--brand);color:#fff;box-shadow:0 8px 20px -8px rgba(37,99,235,.6);}
.fd-solid:hover{background:#1d4ed8;box-shadow:0 12px 26px -8px rgba(37,99,235,.7);}
.fd-line{background:#fff;border-color:var(--line);color:var(--ink);}
.fd-line:hover{border-color:var(--brand);color:var(--brand);}
.fd-ghost{background:transparent;color:var(--ink2);}
.fd-ghost:hover{color:var(--brand);}
.fd-lg{padding:14px 24px;font-size:16px;}
.fd-nav{max-width:1140px;margin:0 auto;padding:20px 28px;display:flex;justify-content:space-between;align-items:center;}
.fd-logo{display:flex;align-items:center;gap:11px;font-family:'Bricolage Grotesque';font-weight:800;font-size:21px;}
.fd-logo b{font-weight:800;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fd-links{display:flex;align-items:center;gap:24px;font-weight:500;font-size:15px;color:var(--ink2);}
.fd-links a:hover{color:var(--brand);}
.fd-hero{max-width:1140px;margin:0 auto;padding:54px 28px 72px;display:grid;grid-template-columns:1.05fr .95fr;gap:56px;align-items:center;}
.fd-pill{display:inline-block;font-size:12.5px;font-weight:600;color:var(--brand);background:#EAF1FE;border:1px solid #D5E3FD;padding:5px 13px;border-radius:30px;margin-bottom:22px;}
.fd-pill::first-letter{color:var(--green);}
.fd-hero h1{font-size:clamp(38px,5vw,60px);line-height:1.04;font-weight:800;margin-bottom:20px;}
.fd-lead{font-size:18px;color:var(--muted);max-width:38ch;margin:0 0 30px;}
.fd-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px;}
.fd-trust{display:flex;gap:18px;flex-wrap:wrap;font-size:13.5px;color:var(--muted);font-weight:500;}
.fd-trust span{white-space:nowrap;}
.fd-preview{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 40px 80px -40px rgba(11,23,48,.45);overflow:hidden;}
.fd-preview-bar{display:flex;align-items:center;gap:7px;padding:13px 16px;border-bottom:1px solid var(--line);background:#FBFCFF;}
.fd-dot{width:10px;height:10px;border-radius:50%;}
.fd-dot.r{background:#FF5F57;}.fd-dot.y{background:#FEBC2E;}.fd-dot.g{background:#28C840;}
.fd-preview-title{margin-left:8px;font-family:'JetBrains Mono';font-size:12px;color:var(--muted);}
.fd-inbox{padding:14px;display:flex;flex-direction:column;gap:11px;}
.fd-lead-row{border:1px solid var(--line);border-radius:13px;padding:13px 15px;background:#fff;}
.fd-lead-row.fresh{border-color:#BFE3CC;box-shadow:0 0 0 3px rgba(22,163,74,.1);}
.fd-lead-head{display:flex;justify-content:space-between;align-items:baseline;}
.fd-lead-head b{font-family:'Bricolage Grotesque';font-weight:700;font-size:15.5px;}
.fd-time{font-family:'JetBrains Mono';font-size:11px;color:var(--muted);}
.fd-lead-contact{font-family:'JetBrains Mono';font-size:12.5px;color:var(--brand);margin:4px 0 3px;}
.fd-lead-note{font-size:13.5px;color:var(--ink2);}
.fd-preview-foot{padding:12px 16px;border-top:1px solid var(--line);background:#FBFCFF;font-size:12.5px;color:var(--green);font-weight:600;}
.fd-band{background:var(--ink);}
.fd-band p{max-width:900px;margin:0 auto;padding:48px 28px;text-align:center;color:#C7D2E4;font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(20px,2.5vw,28px);line-height:1.35;}
.fd-band b{color:#fff;}
.fd-section{max-width:1140px;margin:0 auto;padding:80px 28px;}
.fd-tint{max-width:none;background:var(--paper2);}
.fd-tint > *{max-width:1140px;margin-left:auto;margin-right:auto;}
.fd-eyebrow{font-family:'JetBrains Mono';font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--brand);text-align:center;margin:0 0 12px;}
.fd-section h2{font-size:clamp(28px,3.4vw,40px);font-weight:800;text-align:center;margin-bottom:44px;}
.fd-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.fd-step{position:relative;padding:26px 22px;background:#fff;border:1px solid var(--line);border-radius:16px;}
.fd-step-n{font-family:'JetBrains Mono';font-size:14px;color:#fff;background:var(--grad);padding:4px 10px;border-radius:8px;}
.fd-step h3{font-size:19px;font-weight:700;margin:16px 0 8px;}
.fd-step p{font-size:14.5px;color:var(--muted);margin:0;}
.fd-feats{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}
.fd-feat{display:flex;gap:13px;background:#fff;border:1px solid var(--line);border-radius:14px;padding:20px;}
.fd-check{flex-shrink:0;width:30px;height:30px;border-radius:9px;background:#E7F6EC;color:var(--green);font-weight:800;display:flex;align-items:center;justify-content:center;}
.fd-feat h4{font-size:16px;font-weight:700;margin:0 0 5px;}
.fd-feat p{font-size:13.5px;color:var(--muted);margin:0;}
.fd-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;align-items:start;}
.fd-plan{position:relative;background:#fff;border:1px solid var(--line);border-radius:18px;padding:30px 26px;}
.fd-plan.hot{border:2px solid var(--brand);box-shadow:0 30px 60px -30px rgba(37,99,235,.5);}
.fd-plan-tag{position:absolute;top:-12px;left:26px;background:var(--grad);color:#fff;font-size:12px;font-weight:600;padding:4px 12px;border-radius:30px;}
.fd-plan h3{font-size:19px;font-weight:700;margin-bottom:8px;}
.fd-price{font-family:'Bricolage Grotesque';font-weight:800;font-size:46px;letter-spacing:-.03em;margin-bottom:20px;}
.fd-price small{font-size:16px;font-weight:500;color:var(--muted);}
.fd-plan ul{list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:11px;}
.fd-plan li{font-size:14.5px;padding-left:24px;position:relative;color:var(--ink2);}
.fd-plan li::before{content:"✓";position:absolute;left:0;color:var(--brand);font-weight:700;}
.fd-faq{display:grid;grid-template-columns:1fr 1fr;gap:22px;}
.fd-qa{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px 24px;}
.fd-qa h4{font-size:16.5px;font-weight:700;margin:0 0 8px;}
.fd-qa p{font-size:14.5px;color:var(--muted);margin:0;}
.fd-final{text-align:center;padding:84px 28px;background:var(--ink);color:#fff;}
.fd-final h2{font-size:clamp(28px,3.6vw,42px);font-weight:800;margin-bottom:14px;}
.fd-final p{color:#AEBCD2;font-size:17px;margin:0 auto 28px;max-width:46ch;}
.fd-foot{max-width:1140px;margin:0 auto;padding:34px 28px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);flex-wrap:wrap;gap:12px;}
.fd-foot-note{font-size:13.5px;color:var(--muted);}
@media(max-width:880px){
  .fd-hero{grid-template-columns:1fr;gap:40px;padding-top:30px;}
  .fd-steps,.fd-feats,.fd-plans,.fd-faq{grid-template-columns:1fr;}
  .fd-links a{display:none;}
}
@media(prefers-reduced-motion:reduce){.fd *{transition:none!important;}}
`;
