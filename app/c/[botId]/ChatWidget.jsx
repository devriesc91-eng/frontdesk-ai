"use client";
import { useEffect, useRef, useState } from "react";

export default function ChatWidget({ bot }) {
  const [messages, setMessages] = useState([{ role: "assistant", content: bot.greeting }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef(null);

  useEffect(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight; }, [messages, busy]);

  async function send() {
    const content = input.trim();
    if (!content || busy) return;
    setInput("");
    const next = [...messages, { role: "user", content }];
    setMessages(next); setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ botId: bot.id, messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply || "Sorry, could you rephrase that?" }]);
    } catch {
      setMessages([...next, { role: "assistant", content: "I'm having trouble connecting — leave your name and number and the team will call you back." }]);
    } finally { setBusy(false); }
  }

  return (
    <div style={S.shell}>
      <div style={S.head}>
        <div style={S.avatar}>{bot.name?.[0] || "A"}</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{bot.name} · {bot.business_name}</div>
          <div style={{ fontSize: 12, color: "#7a7f86" }}>online now</div>
        </div>
      </div>
      <div ref={ref} style={S.msgs}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={m.role === "user" ? S.userBubble : S.botBubble}>{m.content}</div>
          </div>
        ))}
        {busy && <div style={S.botBubble}>…</div>}
      </div>
      <div style={S.inputRow}>
        <input style={S.input} value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type a message…" />
        <button style={S.send} onClick={send} disabled={busy || !input.trim()}>→</button>
      </div>
    </div>
  );
}

const S = {
  shell: { display: "flex", flexDirection: "column", height: "100vh", maxHeight: 640, maxWidth: 420, margin: "0 auto", fontFamily: "system-ui,sans-serif", border: "1px solid #e6e2d8", borderRadius: 16, overflow: "hidden", background: "#fff" },
  head: { display: "flex", gap: 10, alignItems: "center", padding: "12px 14px", borderBottom: "1px solid #eee" },
  avatar: { width: 36, height: 36, borderRadius: "50%", background: "#116E4E", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 },
  msgs: { flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 8 },
  botBubble: { background: "#f1efe9", padding: "9px 12px", borderRadius: 13, borderBottomLeftRadius: 4, maxWidth: "82%", fontSize: 14.5 },
  userBubble: { background: "#116E4E", color: "#fff", padding: "9px 12px", borderRadius: 13, borderBottomRightRadius: 4, maxWidth: "82%", fontSize: 14.5 },
  inputRow: { display: "flex", gap: 8, padding: 12, borderTop: "1px solid #eee" },
  input: { flex: 1, fontSize: 14.5, border: "1px solid #e6e2d8", borderRadius: 10, padding: "9px 12px", outline: "none" },
  send: { width: 42, border: "none", borderRadius: 10, background: "#14161B", color: "#fff", fontSize: 18, cursor: "pointer" },
};
