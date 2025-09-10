export interface WhatsAppService {
  sendMessage(phoneNumber: string, message: string): Promise<WhatsAppResponse>;
}

export interface WhatsAppResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

export class EvolutionWhatsAppService implements WhatsAppService {
  private readonly instance: string;
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor() {
    this.instance = process.env.EVO_INSTANCE || '';
    this.apiKey = process.env.EVO_API_KEY || '';
    this.baseUrl = process.env.EVO_URL || '';

    this.validateConfiguration();
  }

  async sendMessage(phoneNumber: string, message: string): Promise<WhatsAppResponse> {
    try {
      const protocol = this.determineProtocol();
      const response = await this.makeRequest(protocol, phoneNumber, message);

      return {
        success: true,
        messageId: response.messageId // if available from API
      };
    } catch (error) {
      console.error('WhatsApp send error:', error);
      return {
        success: false,
        error: 'Erro no envio da mensagem.'
      };
    }
  }

  private validateConfiguration(): void {
    if (!this.instance || !this.apiKey || !this.baseUrl) {
      throw new Error('Evo API endpoint or key not configured.');
    }
  }

  private determineProtocol(): string {
    return this.baseUrl.includes('localhost') || this.baseUrl.includes('127.0.0.1')
      ? 'http'
      : 'https';
  }

  private async makeRequest(protocol: string, phoneNumber: string, message: string): Promise<any> {
    const response = await fetch(
      `${protocol}://${this.baseUrl}/message/sendText/${this.instance}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: this.apiKey,
        },
        body: JSON.stringify({
          number: phoneNumber,
          text: message
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}