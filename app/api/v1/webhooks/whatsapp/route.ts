import { WhatsAppFeatureService } from "@/features/whatsapp/service";

function verifyWebhookToken(request: Request): boolean {
    const token =
        request.headers.get("apikey") ?? request.headers.get("authorization");
    const expectedToken = process.env.EVO_WEBHOOK_SECRET;

    if (!expectedToken) {
        console.error("❌ EVO_WEBHOOK_SECRET is not configured");
        return false;
    }

    return token === expectedToken;
}

export async function POST(request: Request) {
    if (!verifyWebhookToken(request)) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const body = await request.json();

        if (body.event !== "messages.upsert") {
            return Response.json({ status: "event_ignored" }, { status: 200 });
        }

        if (body.data?.key?.fromMe === true) {
            return Response.json({ status: "own_message_ignored" });
        }

        const whatsappFeature = new WhatsAppFeatureService();
        // Process synchronously — replace with a proper queue (Redis, BullMQ) for production scale
        await whatsappFeature.handleIncomingMessage(body);

        return Response.json({ status: "ok" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error processing WhatsApp Webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
