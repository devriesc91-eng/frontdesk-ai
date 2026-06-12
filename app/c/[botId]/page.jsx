import ChatWidget from "./ChatWidget";
import { supabaseAdmin } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export default async function PublicChat({ params }) {
  const db = supabaseAdmin();
  const { data: bot } = await db.from("chatbots").select("id,name,business_name,greeting").eq("id", params.botId).single();

  if (!bot) {
    return <div style={{ fontFamily: "system-ui", padding: 40 }}>Assistant not found.</div>;
  }
  return <ChatWidget bot={bot} />;
}
