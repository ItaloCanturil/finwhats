
export async function POST(request: Request) {
    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    const providedApiKey = request.headers.get("x-api-key");
    const expectedApiKey = process.env.WHATSAPP_API_KEY;

    if (providedApiKey !== expectedApiKey) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();

        // const senderNumber = body?.

        console.log('✅ WhatsApp Webhook Received!');
        console.log(body);
    } catch (error) {
        console.error('❌ Error processing WhatsApp Webhook:', error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("OK", { status: 200 });
}