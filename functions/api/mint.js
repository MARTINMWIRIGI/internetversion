import { createClient } from "@supabase/supabase-js";

export async function onRequestPost({ request, env }) {
  const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY);

  try {
    const body = await request.json();
    const { data, error } = await supabase.from("submissions").insert([body]);

    if (error) throw error;

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}