"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const DEMO_BOT_ID = "d61bb035-ea02-47e0-ad2b-7c876b7a2579";
const SUGGESTIONS = ["What are your opening hours?", "Do you take new patients?", "I think I chipped a tooth"];

function Logo({ size = 34 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 256 256" aria-label="Frontdesk AI" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0B1730" /><stop offset="0.55" stopColor="#123E9A" /><stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <rect x="12" y="12" width="232" height="232" rx="52" fill="url(#lg)" />
      <path d="M60 101c0-23 19-42 42-42h55c23 0 42 19 42 42 0 22-17 40-39 42l-33 27c-5 4-12 1-12-6v-20h-13c-23 0-42-19-42-43z" fill="white" opacity="0.96" />
      <circle cx="103" cy="103" r="7" fill="#2563EB" /><circle cx="130" cy="103" r="7" fill="#0EA5E9" /><circle cx="157" cy="103" r="7" fill="#06B6D4" />
      <path d="M189 48l5 14 14 5-14 5-5 14-5-14-14-5 14-5 5-14z" fill="white" />
      <path d="M56 163c0-10 8-18 18-18h108c10 0 18 8 18 18v14H56v-14z" fill="white" opacity="0.97" />
      <path d="M45 177h166v24c0 10-8 18-18 18H63c-10 0-18-8-18-18v-24z" fill="white" opacity="0.9" />
      <path d="M87 179h82" stroke="#2563EB" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
      <path d="M103 198l15 13 35-38" fill="none" stroke="#22C55E" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function DemoChat() {
  const [messages, setMessages] = useState([{ role: "assistant", content: "Hi! I'm Ava 👋 This is a live demo of a dental clinic's assistant. Ask me anything — yours would know your business." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);
  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [messages, busy]);

  async function send(text) {
    const content = (text ?? input).trim();
    if (!content || busy) return;
    setInput("");
    const next = [...messages, { role: "user", content }];
    setMessages(next); setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: DEMO_BOT_ID, messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "Sorry, could you say that another way?" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I'm having a hiccup connecting — but this is exactly what your customers would chat with." }]);
    } finally { setBusy(false); }
  }

  return (
    <div className="fd-chat">
      <div className="fd-chat-head">
        <div className="fd-av">A</div>
        <div><div className="fd-cn">Ava · demo clinic</div><div className="fd-cs"><span className="fd-on" /> online now</div></div>
        <span className="fd-live">LIVE</span>
      </div>
      <div className="fd-msgs" ref={ref}>
        {messages.map((m, i) => (
          <div key={i} className={`fd-m ${m.role}`}><div className="fd-bub">{m.content}</div></div>
        ))}
        {busy && <div className="fd-m assistant"><div className="fd-bub fd-typing"><span /><span /><span /></div></div>}
      </div>
      <div className="fd-chips">
        {SUGGESTIONS.map((s) => <button key={s} onClick={() => send(s)} disabled={busy}>{s}</button>)}
      </div>
      <div className="fd-in">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…" aria-label="Message the demo" />
        <button onClick={() => send()} disabled={busy || !input.trim()} aria-label="Send">→</button>
      </div>
    </div>
  );
}

const PLANS = [
  { key: "starter", name: "Starter", price: 99, tag: "", feats: ["1 AI assistant", "Up to 500 chats / month", "Lead inbox + email alerts", "Works on any website"], hot: false },
  { key: "pro", name: "Pro", price: 149, tag: "Most popular", feats: ["3 AI assistants", "Unlimited chats", "Appointment booking", "Remove Frontdesk branding", "Priority email support"], hot: true },
  { key: "agency", name: "Agency", price: 199, tag: "", feats: ["Unlimited assistants", "Manage multiple clients", "White-label dashboard", "Everything in Pro"], hot: false },
];
const FAQ = [
  ["How long does setup take?", "About 5 minutes. Paste in your hours and services, drop one line of code on your site, and you're live."],
  ["Do I need to be technical?", "No. If you can copy and paste, you can set it up — or reply to us and we'll do it for you."],
  ["Will it work with my website?", "Yes — Wix, Squarespace, WordPress or custom. It's one snippet that works anywhere."],
  ["What happens to the leads?", "Every enquiry lands in your private dashboard with the person's name, contact and what they wanted."],
];

export default function Home() {
  return (
    <div className="fd">
      <style>{css}</style>
      <header className="fd-nav">
        <div className="fd-logo"><Logo /> <span>Frontdesk<b> AI</b></span></div>
        <nav className="fd-links">
          <a href="#how">How it works</a><a href="#pricing">Pricing</a><Link href="/help">Help</Link>
          <Link href="/login" className="fd-btn fd-ghost">Sign in</Link>
          <Link href="/signup" className="fd-btn fd-solid">Start free</Link>
        </nav>
      </header>

      <section className="fd-hero">
        <div className="fd-hero-copy">
          <span className="fd-pill">● Live demo — try it now</span>
          <h1>Never miss another<br /><span className="fd-grad">customer enquiry.</span></h1>
          <p className="fd-lead">Frontdesk AI is the receptionist that never sleeps. It answers your website visitors in seconds, books appointments, and captures every lead — even after hours.</p>
          <p className="fd-try">Go ahead — chat to the assistant on the right. It&apos;s really answering. →</p>
          <div className="fd-cta-row">
            <Link href="/signup" className="fd-btn fd-solid fd-lg">Build your own — free</Link>
            <a href="#how" className="fd-btn fd-line fd-lg">See how it works</a>
          </div>
          <div className="fd-trust"><span>✓ No code</span><span>✓ Live in 5 minutes</span><span>✓ Cancel anytime</span></div>
        </div>
        <DemoChat />
      </section>

      <section className="fd-band">
        <p>Every unanswered message is a job, a patient, or a client going to whoever replied first.
          <b> Frontdesk replies first — every single time.</b></p>
      </section>

      <section className="fd-section">
        <p className="fd-eyebrow">The payoff</p>
        <h2>Every conversation becomes a lead in your inbox</h2>
        <div className="fd-preview">
          <div className="fd-pbar"><span className="fd-d r" /><span className="fd-d y" /><span className="fd-d g" /><span className="fd-pt">Your leads · today</span></div>
          <div className="fd-inbox">
            <div className="fd-lr fresh"><div className="fd-lh"><b>Jane Smith</b><span className="fd-tm">just now</span></div><div className="fd-lc">jane.smith@email.com</div><div className="fd-ln">Lost a filling — wants a Friday 3pm appointment</div></div>
            <div className="fd-lr"><div className="fd-lh"><b>Marcus Lee</b><span className="fd-tm">9:42 am</span></div><div className="fd-lc">0411 ••• 902</div><div className="fd-ln">New patient — checkup &amp; clean</div></div>
            <div className="fd-lr"><div className="fd-lh"><b>Priya N.</b><span className="fd-tm">8:15 am</span></div><div className="fd-lc">priya.•••@gmail.com</div><div className="fd-ln">Asking about whitening prices</div></div>
          </div>
          <div className="fd-pf">3 leads captured while you were busy</div>
        </div>
      </section>

      <section id="how" className="fd-section fd-tint">
        <p className="fd-eyebrow">How it works</p>
        <h2>Up and running in an afternoon</h2>
        <div className="fd-steps">
          {[["01", "Teach it your business", "Paste in your hours, services and the questions customers ask most. It learns in minutes."],
            ["02", "Add one line of code", "Drop the chat bubble onto your website with a single snippet — or we'll do it for you."],
            ["03", "Wake up to booked leads", "It answers and books around the clock. Every lead lands in your inbox with full details."]].map(([n, t, d]) => (
            <div key={n} className="fd-step"><span className="fd-step-n">{n}</span><h3>{t}</h3><p>{d}</p></div>
          ))}
        </div>
      </section>

      <section className="fd-section">
        <p className="fd-eyebrow">What it does</p>
        <h2>A full-time receptionist, for less than a coffee a day</h2>
        <div className="fd-feats">
          {[["Answers instantly", "Replies to every visitor in seconds, day or night, in your business's voice."],
            ["Books appointments", "Qualifies the enquiry and locks in a time while the customer is still keen."],
            ["Captures every lead", "Name, contact and what they wanted — saved to your dashboard automatically."],
            ["Works everywhere", "Wix, Squarespace, WordPress or custom — one snippet, any website."],
            ["Never takes a day off", "No sick days, no missed calls, no after-hours voicemails piling up."],
            ["Sounds like you", "Trained on your services and FAQs, so answers are accurate and on-brand."]].map(([t, d]) => (
            <div key={t} className="fd-feat"><div className="fd-check">✓</div><div><h4>{t}</h4><p>{d}</p></div></div>
          ))}
        </div>
      </section>

      <section id="pricing" className="fd-section fd-tint">
        <p className="fd-eyebrow">Pricing</p>
        <h2>Simple plans. No surprises.</h2>
        <div className="fd-plans">
          {PLANS.map((p) => (
            <div key={p.key} className={`fd-plan ${p.hot ? "hot" : ""}`}>
              {p.tag && <span className="fd-plan-tag">{p.tag}</span>}
              <h3>{p.name}</h3>
              <div className="fd-price">${p.price}<small>/mo</small></div>
              <ul>{p.feats.map((f) => <li key={f}>{f}</li>)}</ul>
              <Link href={`/signup?plan=${p.key}`} className={`fd-btn ${p.hot ? "fd-solid" : "fd-line"}`} style={{ width: "100%", textAlign: "center" }}>Start free trial</Link>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="fd-section">
        <p className="fd-eyebrow">Questions</p>
        <h2>Good to know</h2>
        <div className="fd-faq">
          {FAQ.map(([q, a]) => <div key={q} className="fd-qa"><h4>{q}</h4><p>{a}</p></div>)}
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
.fd{--ink:#0B1730;--ink2:#243047;--muted:#5B6B82;--paper:#FFFFFF;--paper2:#F5F8FE;--line:#E4EBF6;--brand:#2563EB;--cyan:#06B6D4;--green:#16A34A;--grad:linear-gradient(135deg,#2563EB,#06B6D4);font-family:Inter,system-ui,sans-serif;color:var(--ink);background:var(--paper);line-height:1.6;-webkit-font-smoothing:antialiased;}
.fd *{box-sizing:border-box;}
.fd a{text-decoration:none;color:inherit;}
.fd h1,.fd h2,.fd h3,.fd h4{font-family:'Bricolage Grotesque';letter-spacing:-.02em;margin:0;}
.fd-grad{background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fd-btn{font-family:Inter;font-weight:600;font-size:15px;border-radius:11px;padding:11px 18px;cursor:pointer;border:1.5px solid transparent;display:inline-block;transition:transform .12s,box-shadow .2s,background .2s;}
.fd-btn:active{transform:translateY(1px);}
.fd-solid{background:var(--brand);color:#fff;box-shadow:0 8px 20px -8px rgba(37,99,235,.6);}
.fd-solid:hover{background:#1d4ed8;}
.fd-line{background:#fff;border-color:var(--line);color:var(--ink);}
.fd-line:hover{border-color:var(--brand);color:var(--brand);}
.fd-ghost{background:transparent;color:var(--ink2);}
.fd-ghost:hover{color:var(--brand);}
.fd-lg{padding:14px 24px;font-size:16px;}
.fd-nav{max-width:1140px;margin:0 auto;padding:20px 28px;display:flex;justify-content:space-between;align-items:center;}
.fd-logo{display:flex;align-items:center;gap:11px;font-family:'Bricolage Grotesque';font-weight:800;font-size:21px;}
.fd-logo b{font-weight:800;background:var(--grad);-webkit-background-clip:text;background-clip:text;color:transparent;}
.fd-links{display:flex;align-items:center;gap:22px;font-weight:500;font-size:15px;color:var(--ink2);}
.fd-links a:hover{color:var(--brand);}
.fd-hero{max-width:1140px;margin:0 auto;padding:50px 28px 70px;display:grid;grid-template-columns:1fr 420px;gap:48px;align-items:center;}
.fd-pill{display:inline-block;font-size:12.5px;font-weight:600;color:var(--brand);background:#EAF1FE;border:1px solid #D5E3FD;padding:5px 13px;border-radius:30px;margin-bottom:20px;}
.fd-pill::first-letter{color:var(--green);}
.fd-hero h1{font-size:clamp(36px,4.6vw,56px);line-height:1.05;font-weight:800;margin-bottom:18px;}
.fd-lead{font-size:17px;color:var(--muted);max-width:40ch;margin:0 0 14px;}
.fd-try{font-size:14.5px;font-weight:600;color:var(--brand);margin:0 0 24px;}
.fd-cta-row{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:20px;}
.fd-trust{display:flex;gap:18px;flex-wrap:wrap;font-size:13px;color:var(--muted);font-weight:500;}
.fd-chat{background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 40px 80px -40px rgba(11,23,48,.5);display:flex;flex-direction:column;height:520px;overflow:hidden;}
.fd-chat-head{display:flex;align-items:center;gap:11px;padding:14px 16px;border-bottom:1px solid var(--line);}
.fd-av{width:38px;height:38px;border-radius:50%;background:var(--grad);color:#fff;font-family:'Bricolage Grotesque';font-weight:800;display:flex;align-items:center;justify-content:center;}
.fd-cn{font-weight:600;font-size:14.5px;}
.fd-cs{font-size:12px;color:var(--muted);display:flex;align-items:center;gap:6px;}
.fd-on{width:7px;height:7px;border-radius:50%;background:var(--green);}
.fd-live{margin-left:auto;font-family:'JetBrains Mono';font-size:10px;font-weight:600;color:var(--green);background:#E7F6EC;padding:3px 8px;border-radius:20px;letter-spacing:.05em;}
.fd-msgs{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:10px;}
.fd-m{display:flex;}
.fd-m.user{justify-content:flex-end;}
.fd-bub{max-width:84%;padding:10px 13px;border-radius:14px;font-size:14.5px;}
.fd-m.assistant .fd-bub{background:#F1F5FB;border-bottom-left-radius:4px;}
.fd-m.user .fd-bub{background:var(--brand);color:#fff;border-bottom-right-radius:4px;}
.fd-typing{display:flex;gap:4px;}
.fd-typing span{width:6px;height:6px;border-radius:50%;background:var(--muted);animation:fdb 1s infinite;}
.fd-typing span:nth-child(2){animation-delay:.15s;}.fd-typing span:nth-child(3){animation-delay:.3s;}
@keyframes fdb{0%,60%,100%{opacity:.3;}30%{opacity:1;}}
.fd-chips{display:flex;gap:7px;padding:0 14px 10px;flex-wrap:wrap;}
.fd-chips button{font:inherit;font-size:12.5px;background:#fff;border:1px solid var(--line);border-radius:20px;padding:6px 11px;cursor:pointer;color:var(--muted);}
.fd-chips button:hover:not(:disabled){border-color:var(--brand);color:var(--brand);}
.fd-chips button:disabled{opacity:.5;cursor:default;}
.fd-in{display:flex;gap:8px;padding:12px 14px;border-top:1px solid var(--line);}
.fd-in input{flex:1;font:inherit;font-size:14.5px;border:1px solid var(--line);border-radius:10px;padding:9px 12px;outline:none;}
.fd-in input:focus{border-color:var(--brand);}
.fd-in button{width:42px;border:none;border-radius:10px;background:var(--ink);color:#fff;font-size:18px;cursor:pointer;}
.fd-in button:disabled{opacity:.4;cursor:default;}
.fd-band{background:var(--ink);}
.fd-band p{max-width:900px;margin:0 auto;padding:48px 28px;text-align:center;color:#C7D2E4;font-family:'Bricolage Grotesque';font-weight:600;font-size:clamp(20px,2.5vw,28px);line-height:1.35;}
.fd-band b{color:#fff;}
.fd-section{max-width:1140px;margin:0 auto;padding:74px 28px;}
.fd-tint{max-width:none;background:var(--paper2);}
.fd-tint > *{max-width:1140px;margin-left:auto;margin-right:auto;}
.fd-eyebrow{font-family:'JetBrains Mono';font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--brand);text-align:center;margin:0 0 12px;}
.fd-section h2{font-size:clamp(28px,3.4vw,40px);font-weight:800;text-align:center;margin-bottom:40px;}
.fd-preview{max-width:520px;margin:0 auto;background:#fff;border:1px solid var(--line);border-radius:18px;box-shadow:0 30px 60px -36px rgba(11,23,48,.4);overflow:hidden;}
.fd-pbar{display:flex;align-items:center;gap:7px;padding:13px 16px;border-bottom:1px solid var(--line);background:#FBFCFF;}
.fd-d{width:10px;height:10px;border-radius:50%;}.fd-d.r{background:#FF5F57;}.fd-d.y{background:#FEBC2E;}.fd-d.g{background:#28C840;}
.fd-pt{margin-left:8px;font-family:'JetBrains Mono';font-size:12px;color:var(--muted);}
.fd-inbox{padding:14px;display:flex;flex-direction:column;gap:11px;}
.fd-lr{border:1px solid var(--line);border-radius:13px;padding:13px 15px;}
.fd-lr.fresh{border-color:#BFE3CC;box-shadow:0 0 0 3px rgba(22,163,74,.1);}
.fd-lh{display:flex;justify-content:space-between;align-items:baseline;}
.fd-lh b{font-family:'Bricolage Grotesque';font-weight:700;font-size:15.5px;}
.fd-tm{font-family:'JetBrains Mono';font-size:11px;color:var(--muted);}
.fd-lc{font-family:'JetBrains Mono';font-size:12.5px;color:var(--brand);margin:4px 0 3px;}
.fd-ln{font-size:13.5px;color:var(--ink2);}
.fd-pf{padding:12px 16px;border-top:1px solid var(--line);background:#FBFCFF;font-size:12.5px;color:var(--green);font-weight:600;}
.fd-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
.fd-step{padding:26px 22px;background:#fff;border:1px solid var(--line);border-radius:16px;}
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
.fd-final{text-align:center;padding:80px 28px;background:var(--ink);color:#fff;}
.fd-final h2{font-size:clamp(28px,3.6vw,42px);font-weight:800;margin-bottom:14px;}
.fd-final p{color:#AEBCD2;font-size:17px;margin:0 auto 28px;max-width:46ch;}
.fd-foot{max-width:1140px;margin:0 auto;padding:34px 28px;display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--line);flex-wrap:wrap;gap:12px;}
.fd-foot-note{font-size:13.5px;color:var(--muted);}
@media(max-width:880px){.fd-hero{grid-template-columns:1fr;gap:34px;}.fd-chat{height:460px;}.fd-steps,.fd-feats,.fd-plans,.fd-faq{grid-template-columns:1fr;}.fd-links a{display:none;}}
@media(prefers-reduced-motion:reduce){.fd *{animation:none!important;transition:none!important;}}
`;
