import sendWhatsAppMessage from "@/_lib/whatsappSender";
import db from "@/db/drizzle";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

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

        const potentialUser = await db.select().from(usersTable).where(
            eq(usersTable.phone, body?.senderNumber),
        );

        if (!potentialUser[0]) {
            await sendWhatsAppMessage(body?.senderNumber, `Usuário não encontrado, crie o login pelo site ${process.env.SITE_URL}`);
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