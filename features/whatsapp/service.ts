import db from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EvolutionWhatsAppService } from "@/lib/whatsapp/evolution";

export class WhatsAppFeatureService {
    private whatsappService: EvolutionWhatsAppService;

    constructor() {
        this.whatsappService = new EvolutionWhatsAppService();
    }

    async handleIncomingMessage(body: Record<string, any>) {
        const senderNumber = body?.sender as string | undefined;

        const eventData = Array.isArray(body.data)
            ? (body.data as Record<string, any>[])[0]
            : (body.data as Record<string, any>);

        const remoteJid = (eventData?.key as Record<string, any>)?.remoteJid as string;
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
            const result = await this.whatsappService.sendMessage(
                formattedNumber,
                `Usuário não encontrado, crie o login pelo site abaixo:\n${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/sign-up`
            );
            console.log("🚀 Message result:", result);
        } else {
            console.log("✅ User found:", potentialUser[0].id);
        }
    }
}
