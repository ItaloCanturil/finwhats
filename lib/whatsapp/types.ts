export interface WhatsAppResponse {
    success: boolean;
    messageId?: string;
    error?: string;
}

export interface WhatsAppService {
    sendMessage(phoneNumber: string, message: string): Promise<WhatsAppResponse>;
}
