import sendWhatsAppMessage from "@/_lib/whatsappSender";
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

        const senderNumber = body?.sender;
        // Remove o sufixo '@s.whatsapp.net' do número do remetente
        // Format number with country code (e.g. 5511999999999)
        // need add 9 after fourth number
        // Format: 55748142912 -> 5574981429126
        const receiveNumber = body.data.remoteJid.replace('@s.whatsapp.net', '').replace(/[^0-9]/g, '');
        const formattedNumber = `${receiveNumber.slice(0, 4)}9${receiveNumber.slice(4)}`;
        console.log("🚀 ~ POST ~ formattedNumber:", formattedNumber)

        const potentialUser = await db.select().from(users).where(
            eq(users.phone, senderNumber),
        );

        if (!potentialUser[0]) {
            await sendWhatsAppMessage(formattedNumber, `Usuário não encontrado, crie o login pelo site`);
            return new Response("User not found", { status: 404 });
        }

        console.log('✅ WhatsApp Webhook Received!');
        console.log(body);
    } catch (error) {
        console.error('❌ Error processing WhatsApp Webhook:', error);
        return new Response("Internal Server Error", { status: 500 });
    }

    return new Response("OK", { status: 200 });
}