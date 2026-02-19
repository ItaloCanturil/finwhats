import { EvolutionWhatsAppService } from "@/services/WhatsAppService";
import db from "@/_db/drizzle";
import { user } from "@/_db/schema";
import { eq } from "drizzle-orm";

function verifyWebhookToken(request: Request): boolean {
    const token = request.headers.get("apikey") ?? request.headers.get("authorization");
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

        // Process synchronously — replace with a proper queue (Redis, BullMQ) for production scale
        await processWebhookMessage(body);

        return Response.json({ status: "ok" }, { status: 200 });
    } catch (error) {
        console.error("❌ Error processing WhatsApp Webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

async function processWebhookMessage(body: Record<string, unknown>) {
    const whatsappService = new EvolutionWhatsAppService();
    const senderNumber = body?.sender as string | undefined;

    const eventData = Array.isArray(body.data)
        ? (body.data as Record<string, unknown>[])[0]
        : (body.data as Record<string, unknown>);

    const remoteJid = (eventData?.key as Record<string, unknown>)?.remoteJid as string;
    const receiveNumber = remoteJid
        .replace("@s.whatsapp.net", "")
        .replace(/[^0-9]/g, "");
    const formattedNumber = `${receiveNumber.slice(0, 4)}9${receiveNumber.slice(4)}`;

    if (!senderNumber) {
        console.error("❌ No sender number in webhook body");
        return;
    }

    const potentialUser = await db
        .select()
        .from(user)
        .where(eq(user.phone, senderNumber));

    if (!potentialUser[0]) {
        const result = await whatsappService.sendMessage(
            formattedNumber,
            `Usuário não encontrado, crie o login pelo site abaixo:\n${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/sign-up`
        );
        console.log("🚀 Message result:", result);
    } else {
        console.log("✅ User found:", potentialUser[0].id);
    }
}
