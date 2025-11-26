export async function onRequest(context) {
  try {
    // Example: Mint API logic
    const requestBody = await context.request.json();

    // Your minting logic here (stub example)
    const result = {
      success: true,
      message: `Mint request received for ${requestBody.user || 'unknown user'}`,
    };

    return new Response(JSON.stringify(result), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}