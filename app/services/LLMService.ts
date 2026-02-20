export interface LLMIntent {
  type: 'add_expense' | 'remove_last_expense' | 'set_goal' | 'view_goals' | 'unknown_intent';
  entities: {
    category?: string;
    amount?: number;
    goal_name?: string;
    message?: string;
  };
  confidence?: number;
}

export interface LLMService {
  parseIntent(userMessage: string): Promise<LLMIntent>;
}

interface OpenRouterResponse {
  choices?: Array<{ message: { content: string } }>;
}

interface ParsedLLMResponse {
  intent?: string;
  entities?: Record<string, unknown>;
}

export class OpenRouterLLMService implements LLMService {
  private readonly endpoint: string;
  private readonly apiKey: string;
  private readonly model: string;

  constructor() {
    this.endpoint = process.env.OPEN_ROUTE_URL || 'https://openrouter.ai/api/v1/chat/completions';
    this.apiKey = process.env.OPEN_ROUTE_KEY || '';
    this.model = process.env.LLM_MODEL || 'deepseek/deepseek-chat-v3.1:free';

    if (!this.apiKey) {
      throw new Error('LLM API key not configured');
    }
  }

  async parseIntent(userMessage: string): Promise<LLMIntent> {
    const prompt = this.createPrompt(userMessage);
    const response = await this.callAPI(prompt);
    return this.parseResponse(response);
  }

  private createPrompt(userMessage: string): string {
    const supportedIntents = [
      "add_expense",
      "remove_last_expense",
      "set_goal",
      "view_goals",
      "unknown_intent"
    ];

    const jsonFormat = `{
      "intent": "...", // One of: ${supportedIntents.join(", ")}
      "entities": {
        "category": "...", // string, only for add_expense
        "amount": "...", // number, for add_expense or set_goal
        "goal_name": "..." // string, only for set_goal
      }
    }`;

    return `You are an intelligent assistant for a personal finance tracker accessed via WhatsApp in Brazil.
    Your task is to analyze the user's message and determine their intent and extract relevant entities.
    
    The user's message is: "${userMessage}"
    
    Supported intents are:
    - add_expense: User wants to log an expense. Requires 'category' (string) and 'amount' (number). Assume currency is BRL (R$).
    - remove_last_expense: User wants to delete the most recent expense logged. No entities required.
    - set_goal: User wants to set a financial goal. Requires 'goal_name' (string) and 'amount' (number).
    - view_goals: User wants to see their current financial goals. No entities required.
    - unknown_intent: If the user's message does not clearly match any of the above intents.
    
    Extract the information and respond ONLY with a valid JSON object in the following format:
    ${jsonFormat}
    
    Examples:
    User Message: "gasto no shopping de R$50"
    JSON Response: {"intent": "add_expense", "entities": {"category": "shopping", "amount": 50}}
    
    User Message: "apague a última"
    JSON Response: {"intent": "remove_last_expense", "entities": {}}
    
    Now, analyze the user message provided above and generate the JSON response.
    JSON Response:`;
  }

  private async callAPI(prompt: string): Promise<OpenRouterResponse> {
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.1,
          max_tokens: 150
        }),
      });

      if (!response.ok) {
        throw new Error(`LLM API failed with status: ${response.status}`);
      }

      return await response.json() as OpenRouterResponse;
    } catch (_error) {
      throw new Error(`LLM API failed with status: ${_error}`, { cause: _error });
    }
  }

  private parseResponse(response: OpenRouterResponse): LLMIntent {
    try {
      // Extract content from OpenRouter response format
      const content = response.choices?.[0]?.message?.content || '';
      const parsed = JSON.parse(content) as ParsedLLMResponse;

      return {
        type: (parsed.intent || 'unknown_intent') as LLMIntent['type'],
        entities: (parsed.entities || {}) as LLMIntent['entities'],
        confidence: this.calculateConfidence(parsed)
      };
    } catch (_error) {
      // Fallback for parsing errors
      return {
        type: 'unknown_intent',
        entities: { message: 'Failed to parse LLM response' },
        confidence: 0
      };
    }
  }

  private calculateConfidence(parsed: ParsedLLMResponse): number {
    // Simple confidence calculation based on completeness
    if (!parsed.intent) return 0;
    if (parsed.intent === 'unknown_intent') return 0.1;

    const requiredFields = this.getRequiredFields(parsed.intent);
    const providedFields = Object.keys(parsed.entities || {});
    const completeness = requiredFields.length > 0
      ? providedFields.filter(f => requiredFields.includes(f)).length / requiredFields.length
      : 1;

    return Math.min(0.9, 0.5 + (completeness * 0.4));
  }

  private getRequiredFields(intent: string): string[] {
    switch (intent) {
      case 'add_expense': return ['category', 'amount'];
      case 'set_goal': return ['goal_name', 'amount'];
      default: return [];
    }
  }
}
