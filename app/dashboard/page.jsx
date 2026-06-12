"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

export default function Dashboard() {
  const router = useRouter();
  const [supabase] = useState(() => supabaseBrowser());
  const [bots, setBots] = useState([]);
  const [active, setActive] = useState(null);
  const [leads, setLeads] = useState([]);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({ name: "Ava", business_name: "", greeting: "Hi! How can I help you today?", knowledge: "" });
  const [siteUrl, setSiteUrl] = useState("");

  useEffect(() => { setSiteUrl(window.location.origin); }, []);

  const loadBots = useCallback(async () => {
    const { data } = await supabase.from("chatbots").select("*").order("created_at", { ascending: false });
    setBots(data || []);
    if (data && data.length && !active) setActive(data[0]);
  }, [supabase, active]);

  useEffect(() => { loadBots(); }, [loadBots]);

  useEffect(() => {
    if (!active) return;
    supabase.from("leads").select("*").eq("bot_id", active.id).order("created_at", { ascending: false })
      .then(({ data }) => setLeads(data || []));
  }, [active, supabase]);

  async function createBot() {
    if (!form.business_name.trim()) return;
    const { data, error } = await supabase.from("chatbots").insert(form).select().single();
    if (!error && data) { setCreating(false); setForm({ ...form, business_name: "", knowledge: "" }); await loadBots(); setActive(data); }
  }

  async function signOut() { await supabase.auth.signOut(); router.push("/login"); }

  const snippet = active
    ? `<script src="${siteUrl}/embed.js" data-bot="${active.id}" data-api="${siteUrl}"></script>`
    : "";

  return (
    <div className="wrap">
      <header className="nav">
        <div className="brand"><i /> Frontdesk<b>AI</b></div>
        <button className="btn btn-ghost" onClick={signOut}>Sign out</button>
      </header>

      <div className="grid cols-2" style={{ alignItems: "start", marginTop: 8 }}>
        {/* Left: bots + create */}
        <div>
          <div className="row" style={{ justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ margin: 0, fontSize: 24 }}>Your assistants</h2>
            <button className="btn btn-solid" onClick={() => setCreating((v) => !v)}>{creating ? "Cancel" : "+ New"}</button>
          </div>

          {creating && (
            <div className="card" style={{ marginBottom: 16 }}>
              <label className="field"><span>Assistant name</span>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="field"><span>Business name</span>
                <input value={form.business_name} placeholder="e.g. Brightline Dental"
                  onChange={(e) => setForm({ ...form, business_name: e.target.value })} /></label>
              <label className="field"><span>Greeting</span>
                <input value={form.greeting} onChange={(e) => setForm({ ...form, greeting: e.target.value })} /></label>
              <label className="field"><span>What should it know? (hours, services, FAQs)</span>
                <textarea value={form.knowledge} placeholder="Open Mon–Fri 8–6. We do checkups, fillings, whitening. Most insurance accepted. On Hay St, Perth."
                  onChange={(e) => setForm({ ...form, knowledge: e.target.value })} /></label>
              <button className="btn btn-solid" style={{ width: "100%" }} onClick={createBot}>Create assistant</button>
            </div>
          )}

          {bots.length === 0 && !creating && <p className="muted">No assistants yet. Create your first one to get an embed snippet.</p>}

          {bots.map((b) => (
            <div key={b.id} className="card" onClick={() => setActive(b)}
              style={{ marginBottom: 10, cursor: "pointer", borderColor: active?.id === b.id ? "var(--brand)" : "var(--line)" }}>
              <strong>{b.name}</strong> · <span className="muted">{b.business_name}</span>
            </div>
          ))}

          {active && (
            <div className="card" style={{ marginTop: 8 }}>
              <div className="eyebrow">Embed snippet</div>
              <p className="muted" style={{ fontSize: 14, marginTop: 0 }}>Paste this before <code>&lt;/body&gt;</code> on the client&apos;s website.</p>
              <div className="snippet">{snippet}</div>
              <a className="btn btn-line" style={{ marginTop: 12 }} href={`/c/${active.id}`} target="_blank" rel="noreferrer">Open live test page →</a>
            </div>
          )}
        </div>

        {/* Right: leads */}
        <div>
          <h2 style={{ fontSize: 24 }}>Leads {active ? `· ${active.business_name}` : ""}</h2>
          {!active && <p className="muted">Select an assistant to see its leads.</p>}
          {active && leads.length === 0 && <p className="muted">No leads yet. Test the assistant and leave a name + email or phone to see one appear.</p>}
          {leads.map((l) => (
            <div key={l.id} className="lead">
              <div className="top">
                <span className="name">{l.name || "Visitor"}</span>
                <span className="when">{new Date(l.created_at).toLocaleString()}</span>
              </div>
              <div className="contact">{l.contact || "—"}</div>
              <div className="muted" style={{ fontSize: 13 }}>{l.intent}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
