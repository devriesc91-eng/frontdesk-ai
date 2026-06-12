import Anthropic from "@anthropic-ai/sdk";
import { supabaseAdmin } from "../../../lib/supabase";

export const runtime = "nodejs";

const emailRe = /[\w.+-]+@[\w-]+\.[\w.-]{2,}/;
const phoneRe = /(\+?\d[\d\s().-]{7,}\d)/;
const nameRe = /\b(?:i['’]?m|i am|my name is|this is|it['’]?s)\s+([A-Z][a-z]+(?:\s[A-Z][a-z]+)?)/i;

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: cors() });
}

export async function POST(req) {
  try {
    const { botId, messages } = await req.json();
    if (!botId || !Array.isArray(messages)) {
      return json({ error: "Bad request" }, 400);
    }

    const db = supabaseAdmin();
    const { data: bot } = await db.from("chatbots").select("*").eq("id", botId).single();
    if (!bot) return json({ error: "Assistant not found" }, 404);

    // Capture a lead from the latest visitor message.
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (lastUser?.content) {
      const text = String(lastUser.content);
      const contact = (text.match(emailRe) || text.match(phoneRe) || [])[0];
      if (contact) {
        const nm = text.match(nameRe);
        const intent = messages.filter((m) => m.role === "user").map((m) => m.content).join(" · ").slice(0, 200);
        await db.from("leads").insert({
          bot_id: botId,
          name: nm ? nm[1] : null,
          contact: contact.trim(),
          intent,
        });
      }
    }

    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const system = `You are ${bot.name}, the AI front-desk assistant for "${bot.business_name}".
Answer visitor questions and gently collect their name, a phone OR email, and the reason for their visit so the team can follow up.
Be warm and brief (2-4 sentences), ask one question at a time, and never invent prices — say the team will confirm.

What you know about the business:
${bot.knowledge || "(no extra details provided)"}`;

    const resp = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      system,
      messages: messages.map((m) => ({ role: m.role, content: String(m.content) })),
    });

    const reply = resp.content.map((b) => (b.type === "text" ? b.text : "")).join("").trim();
    return json({ reply });
  } catch (e) {
    return json({ error: "Server error", detail: String(e?.message || e) }, 500);
  }
}

function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}
function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "Content-Type": "application/json", ...cors() },
  });
}
