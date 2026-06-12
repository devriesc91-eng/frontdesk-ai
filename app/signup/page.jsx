"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr(""); setMsg(""); setBusy(true);
    const supabase = supabaseBrowser();
    const { data, error } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if (error) return setErr(error.message);
    // If email confirmation is OFF in Supabase, a session exists → go to dashboard.
    if (data.session) { router.push("/dashboard"); router.refresh(); return; }
    setMsg("Check your email to confirm your account, then sign in.");
  }

  return (
    <div className="wrap">
      <div className="center card">
        <div className="brand" style={{ marginBottom: 18 }}><i /> Frontdesk<b>AI</b></div>
        <h2 style={{ fontSize: 24 }}>Create your account</h2>
        <label className="field"><span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="field"><span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()} /></label>
        {err && <p className="err">{err}</p>}
        {msg && <p className="ok">{msg}</p>}
        <button className="btn btn-solid" style={{ width: "100%" }} onClick={submit} disabled={busy}>
          {busy ? "Creating…" : "Create account"}
        </button>
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
          Already have one? <Link href="/login" className="mark">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
