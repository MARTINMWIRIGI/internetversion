export async function onRequest(context) {
  try {
    const requestBody = await context.request.json();

    // Example: Store submission logic (stub)
    const result = {
      success: true,
      message: `Submission received: ${requestBody.title || 'no title'}`,
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