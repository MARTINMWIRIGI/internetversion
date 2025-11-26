export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Replace with your KV binding or database logic
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

export async function onRequestGet({ env }) {
  try {
    // Example: fetch all keys (adjust if needed)
    const list = await env.MY_KV_NAMESPACE.list();
    const allItems = await Promise.all(
      list.keys.map(async (key) => {
        const value = await env.MY_KV_NAMESPACE.get(key.name);
        return { id: key.name, data: JSON.parse(value) };
      })
    );

    return new Response(JSON.stringify(allItems), {
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