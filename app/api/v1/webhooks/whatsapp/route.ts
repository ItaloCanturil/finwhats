import { EvolutionWhatsAppService } from "@/services/WhatsAppService";
import db from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
    if (request.method !== "POST") {
        return new Response("Method not allowed", { status: 405 });
    }

    // const providedApiKey = request.headers.get("x-api-key");
    // console.log("🚀 ~ POST ~ providedApiKey:", providedApiKey)
    const expectedApiKey = process.env.WHATSAPP_API_KEY;

    // if (providedApiKey !== expectedApiKey) {
    //     return new Response("Unauthorized", { status: 401 });
    // }

    try {
        const body = await request.json();

        if (body.event !== 'contacts.update') {
            return Response.json({ status: 'event_ignored' });
        }

        console.log('✅ WhatsApp Webhook Received!', body);

        const senderNumber = body?.sender;

        const eventData = Array.isArray(body.data) ? body.data[0] : body.data;
        const receiveNumber = eventData.remoteJid.replace('@s.whatsapp.net', '').replace(/[^0-9]/g, '');
        const formattedNumber = `${receiveNumber.slice(0, 4)}9${receiveNumber.slice(4)}`;
        console.log("🚀 ~ POST ~ formattedNumber:", formattedNumber)

        const potentialUser = await db.select().from(users).where(
            eq(users.phone, senderNumber),
        );

        if (!potentialUser[0]) {
            const whatsappService = new EvolutionWhatsAppService();
            const result = await whatsappService.sendMessage(formattedNumber, `Usuário não encontrado, crie o login pelo site`);
            console.log("🚀 ~ POST ~ result:", result)

            return new Response("User not found", { status: 404 });
        }
    } catch (error) {
        console.error('❌ Error processing WhatsApp Webhook:', error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("OK", { status: 200 });
}