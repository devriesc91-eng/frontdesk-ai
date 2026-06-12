"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabaseBrowser } from "../../lib/supabaseBrowser";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    setErr(""); setBusy(true);
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) return setErr(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="wrap">
      <div className="center card">
        <div className="brand" style={{ marginBottom: 18 }}><i /> Frontdesk<b>AI</b></div>
        <h2 style={{ fontSize: 24 }}>Welcome back</h2>
        <label className="field"><span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
        <label className="field"><span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()} /></label>
        {err && <p className="err">{err}</p>}
        <button className="btn btn-solid" style={{ width: "100%" }} onClick={submit} disabled={busy}>
          {busy ? "Signing in…" : "Sign in"}
        </button>
        <p className="muted" style={{ fontSize: 14, marginTop: 16 }}>
          No account? <Link href="/signup" className="mark">Create one</Link>
        </p>
      </div>
    </div>
  );
}
