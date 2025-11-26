import { json } from '@cloudflare/workers-types'; // Optional: if using Response helpers
// Remove `import type` completely
// import type { RequestHandler } from '@cloudflare/pages-types'

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Example: Store submission in KV (replace MY_KV_NAMESPACE with your actual binding)
    await env.MY_KV_NAMESPACE.put(data.id, JSON.stringify(data));

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}