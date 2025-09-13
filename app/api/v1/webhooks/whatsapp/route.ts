import { EvolutionWhatsAppService } from "@/services/WhatsAppService";
import db from "@/db/drizzle";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

// Example in-memory queue (replace with Redis, RabbitMQ, etc. in prod)
const jobQueue: any[] = [];

export async function POST(request: Request) {
    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    try {
        const body = await request.json();

        const ackResponse = Response.json({ status: "ok" }, { status: 200 });

        if (body.event !== "messages.upsert") {
            return Response.json({ status: "event_ignored" }, { status: 200 });
        }

        if (body.data?.key?.fromMe === true) {
            return Response.json({ status: 'own_message_ignored' });
        }

        jobQueue.push(body);

        processWebhookJobs();

        return ackResponse;
    } catch (error) {
        console.error("❌ Error processing WhatsApp Webhook:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}

async function processWebhookJobs() {
    while (jobQueue.length > 0) {
        const body = jobQueue.shift();
        console.log("✅ Processing WhatsApp Webhook!", body);

        const whatsappService = new EvolutionWhatsAppService();
        const senderNumber = body?.sender;

        const eventData = Array.isArray(body.data) ? body.data[0] : body.data;
        const receiveNumber = eventData.key.remoteJid
            .replace("@s.whatsapp.net", "")
            .replace(/[^0-9]/g, "");
        const formattedNumber = `${receiveNumber.slice(0, 4)}9${receiveNumber.slice(4)}`;

        const potentialUser = await db
            .select()
            .from(user)
            .where(eq(user.phone, senderNumber));

        if (!potentialUser[0]) {
            const result = await whatsappService.sendMessage(
                formattedNumber,
                `Usuário não encontrado, crie o login pelo site abaixo: 
                ${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`
            );
            console.log("🚀 Message result:", result);
        } else {
            console.log("✅ User found:", potentialUser[0]);
        }
    }
}
