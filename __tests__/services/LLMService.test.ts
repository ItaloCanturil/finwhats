import { OpenRouterLLMService, LLMService, LLMIntent } from '../../app/services/LLMService';

// Mock fetch globally
global.fetch = jest.fn();

describe('OpenRouterLLMService', () => {
  let service: LLMService;
  const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

  // Mock environment variables
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetAllMocks();
    process.env = {
      ...originalEnv,
      OPEN_ROUTE_URL: 'https://openrouter.ai/api/v1/chat/completions',
      OPEN_ROUTE_KEY: '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',
      LLM_MODEL: 'deepseek/deepseek-chat-v3.1:free'
    };
    service = new OpenRouterLLMService();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Constructor and Configuration', () => {
    it('should initialize with valid environment variables', () => {
      expect(() => new OpenRouterLLMService()).not.toThrow();
    });

    it('should throw error when OPEN_ROUTE_KEY is missing', () => {
      delete process.env.OPEN_ROUTE_KEY;
      expect(() => new OpenRouterLLMService()).toThrow('LLM API key not configured');
    });

    it('should use default values when optional env vars are missing', () => {
      delete process.env.OPEN_ROUTE_URL;
      delete process.env.LLM_MODEL;
      expect(() => new OpenRouterLLMService()).not.toThrow();
    });
  });

  describe('parseIntent', () => {
    it('should parse add_expense intent correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'add_expense',
              entities: {
                category: 'food',
                amount: 25.50
              }
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('gastei R$25,50 com comida');

      expect(result.type).toBe('add_expense');
      expect(result.entities.category).toBe('food');
      expect(result.entities.amount).toBe(25.50);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should parse remove_last_expense intent correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'remove_last_expense',
              entities: {}
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('apague o último gasto');

      expect(result.type).toBe('remove_last_expense');
      expect(result.entities).toEqual({});
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should parse set_goal intent correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'set_goal',
              entities: {
                goal_name: 'vacation',
                amount: 5000
              }
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('quero economizar R$5000 para férias');

      expect(result.type).toBe('set_goal');
      expect(result.entities.goal_name).toBe('vacation');
      expect(result.entities.amount).toBe(5000);
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should parse view_goals intent correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'view_goals',
              entities: {}
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('quais são minhas metas?');

      expect(result.type).toBe('view_goals');
      expect(result.entities).toEqual({});
      expect(result.confidence).toBeGreaterThan(0.5);
    });

    it('should handle unknown_intent correctly', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'unknown_intent',
              entities: {}
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('como está o tempo hoje?');

      expect(result.type).toBe('unknown_intent');
      expect(result.confidence).toBeLessThan(0.2);
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500
      } as Response);

      await expect(service.parseIntent('test message')).rejects.toThrow('LLM API failed with status: 500');
    });

    it('should handle network errors gracefully', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(service.parseIntent('test message')).rejects.toThrow('LLM API failed with status:');
    });

    it('should handle malformed JSON response gracefully', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: 'invalid json response'
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('test message');

      expect(result.type).toBe('unknown_intent');
      expect(result.entities.message).toBe('Failed to parse LLM response');
      expect(result.confidence).toBe(0);
    });

    it('should handle missing response structure gracefully', async () => {
      const mockResponse = {};

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('test message');

      expect(result.type).toBe('unknown_intent');
      expect(result.entities.message).toBe('Failed to parse LLM response');
      expect(result.confidence).toBe(0);
    });
  });

  describe('API Request Structure', () => {
    it('should make correct API request with proper headers and body', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'add_expense',
              entities: { category: 'food', amount: 10 }
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      await service.parseIntent('gastei R$10 com comida');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://openrouter.ai/api/v1/chat/completions',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPEN_ROUTE_KEY}`
          },
          body: expect.stringContaining(process.env.LLM_MODEL || '')
        })
      );

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(requestBody.model).toBe(process.env.LLM_MODEL);
      expect(requestBody.temperature).toBe(0.1);
      expect(requestBody.max_tokens).toBe(150);
      expect(requestBody.messages).toHaveLength(1);
      expect(requestBody.messages[0].role).toBe('user');
      expect(requestBody.messages[0].content).toContain('gastei R$10 com comida');
    });
  });

  describe('Confidence Calculation', () => {
    it('should calculate high confidence for complete add_expense', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'add_expense',
              entities: {
                category: 'food',
                amount: 25
              }
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('test');
      expect(result.confidence).toBe(0.9); // Complete required fields
    });

    it('should calculate medium confidence for incomplete add_expense', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'add_expense',
              entities: {
                category: 'food'
                // missing amount
              }
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('test');
      expect(result.confidence).toBe(0.7); // 50% completeness: 0.5 + (0.5 * 0.4)
    });

    it('should calculate low confidence for unknown_intent', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({
              intent: 'unknown_intent',
              entities: {}
            })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const result = await service.parseIntent('test');
      expect(result.confidence).toBe(0.1);
    });
  });

  describe('Prompt Generation', () => {
    it('should include user message in prompt', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({ intent: 'unknown_intent', entities: {} })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      const userMessage = 'gastei R$50 no supermercado';
      await service.parseIntent(userMessage);

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      expect(requestBody.messages[0].content).toContain(userMessage);
    });

    it('should include all supported intents in prompt', async () => {
      const mockResponse = {
        choices: [{
          message: {
            content: JSON.stringify({ intent: 'unknown_intent', entities: {} })
          }
        }]
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      } as Response);

      await service.parseIntent('test');

      const requestBody = JSON.parse(mockFetch.mock.calls[0][1]?.body as string);
      const prompt = requestBody.messages[0].content;

      expect(prompt).toContain('add_expense');
      expect(prompt).toContain('remove_last_expense');
      expect(prompt).toContain('set_goal');
      expect(prompt).toContain('view_goals');
      expect(prompt).toContain('unknown_intent');
    });
  });
});