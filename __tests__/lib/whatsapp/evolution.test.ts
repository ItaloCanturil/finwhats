import { EvolutionWhatsAppService } from "../../../lib/whatsapp/evolution";
import { WhatsAppService } from "../../../lib/whatsapp/types";

// Mock fetch globally
global.fetch = jest.fn();

describe("EvolutionWhatsAppService", () => {
    let service: WhatsAppService;
    const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

    // Mock environment variables
    const originalEnv = process.env;

    beforeEach(() => {
        jest.resetAllMocks();
        process.env = {
            ...originalEnv,
            EVO_INSTANCE: "test-instance",
            EVO_API_KEY: "test-api-key",
            EVO_URL: "api.test.com",
        };
        service = new EvolutionWhatsAppService();
    });

    afterEach(() => {
        process.env = originalEnv;
    });

    describe("Constructor and Configuration", () => {
        it("should initialize with valid environment variables", () => {
            expect(() => new EvolutionWhatsAppService()).not.toThrow();
        });

        it("should throw error when EVO_INSTANCE is missing", () => {
            delete process.env.EVO_INSTANCE;
            expect(() => new EvolutionWhatsAppService()).toThrow(
                "Evo API endpoint or key not configured."
            );
        });

        it("should throw error when EVO_API_KEY is missing", () => {
            delete process.env.EVO_API_KEY;
            expect(() => new EvolutionWhatsAppService()).toThrow(
                "Evo API endpoint or key not configured."
            );
        });

        it("should throw error when EVO_URL is missing", () => {
            delete process.env.EVO_URL;
            expect(() => new EvolutionWhatsAppService()).toThrow(
                "Evo API endpoint or key not configured."
            );
        });
    });

    describe("Protocol Detection", () => {
        it("should use http for localhost URLs", () => {
            process.env.EVO_URL = "localhost:8080";
            service = new EvolutionWhatsAppService();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ messageId: "test-123" }),
            } as unknown as Response);

            service.sendMessage("5511999999999", "Test message");

            expect(mockFetch).toHaveBeenCalledWith(
                "http://localhost:8080/message/sendText/test-instance",
                expect.any(Object)
            );
        });

        it("should use http for 127.0.0.1 URLs", () => {
            process.env.EVO_URL = "127.0.0.1:8080";
            service = new EvolutionWhatsAppService();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ messageId: "test-123" }),
            } as unknown as Response);

            service.sendMessage("5511999999999", "Test message");

            expect(mockFetch).toHaveBeenCalledWith(
                "http://127.0.0.1:8080/message/sendText/test-instance",
                expect.any(Object)
            );
        });

        it("should use https for production URLs", () => {
            process.env.EVO_URL = "api.evolution.com";
            service = new EvolutionWhatsAppService();

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ messageId: "test-123" }),
            } as unknown as Response);

            service.sendMessage("5511999999999", "Test message");

            expect(mockFetch).toHaveBeenCalledWith(
                "https://api.evolution.com/message/sendText/test-instance",
                expect.any(Object)
            );
        });
    });

    describe("sendMessage - Success Cases", () => {
        it("should send message successfully and return success response", async () => {
            const mockResponse = { messageId: "msg-123" };
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => mockResponse,
            } as unknown as Response);

            const result = await service.sendMessage("5511999999999", "Hello World");

            expect(result).toEqual({
                success: true,
                messageId: "msg-123",
            });
        });

        it("should make correct API call with proper headers and body", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({ messageId: "test-123" }),
            } as unknown as Response);

            await service.sendMessage("5511999999999", "Test message");

            expect(mockFetch).toHaveBeenCalledWith(
                "https://api.test.com/message/sendText/test-instance",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        apikey: "test-api-key",
                    },
                    body: JSON.stringify({
                        number: "5511999999999",
                        text: "Test message",
                    }),
                }
            );
        });

        it("should handle response without messageId", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => ({}),
            } as unknown as Response);

            const result = await service.sendMessage("5511999999999", "Hello");

            expect(result).toEqual({
                success: true,
                messageId: undefined,
            });
        });
    });

    describe("sendMessage - Error Cases", () => {
        it("should handle HTTP error responses", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 401,
            } as unknown as Response);

            const result = await service.sendMessage("5511999999999", "Test");

            expect(result).toEqual({
                success: false,
                error: "Erro no envio da mensagem.",
            });
        });

        it("should handle network errors", async () => {
            mockFetch.mockRejectedValueOnce(new Error("Network error"));

            const result = await service.sendMessage("5511999999999", "Test");

            expect(result).toEqual({
                success: false,
                error: "Erro no envio da mensagem.",
            });
        });

        it("should handle JSON parsing errors", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: async () => {
                    throw new Error("Invalid JSON");
                },
            } as unknown as Response);

            const result = await service.sendMessage("5511999999999", "Test");

            expect(result).toEqual({
                success: false,
                error: "Erro no envio da mensagem.",
            });
        });

        it("should log errors to console", async () => {
            const consoleSpy = jest.spyOn(console, "error").mockImplementation();
            const error = new Error("Test error");
            mockFetch.mockRejectedValueOnce(error);

            await service.sendMessage("5511999999999", "Test");

            expect(consoleSpy).toHaveBeenCalledWith("WhatsApp send error:", error);
            consoleSpy.mockRestore();
        });
    });

    describe("Input Validation", () => {
        beforeEach(() => {
            mockFetch.mockResolvedValue({
                ok: true,
                json: async () => ({ messageId: "test-123" }),
            } as unknown as Response);
        });

        it("should handle empty phone number", async () => {
            const result = await service.sendMessage("", "Test message");
            expect(result.success).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify({
                        number: "",
                        text: "Test message",
                    }),
                })
            );
        });

        it("should handle empty message", async () => {
            const result = await service.sendMessage("5511999999999", "");
            expect(result.success).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify({
                        number: "5511999999999",
                        text: "",
                    }),
                })
            );
        });

        it("should handle special characters in message", async () => {
            const specialMessage = "Olá! Como está? 😊 R$ 50,00";
            const result = await service.sendMessage("5511999999999", specialMessage);

            expect(result.success).toBe(true);
            expect(mockFetch).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    body: JSON.stringify({
                        number: "5511999999999",
                        text: specialMessage,
                    }),
                })
            );
        });
    });

    describe("Connectivity Tests", () => {
        it("should successfully connect to Evolution API", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: true,
                status: 200,
                json: async () => ({
                    messageId: "conn-test-123",
                    status: "sent",
                }),
            } as unknown as Response);

            const result = await service.sendMessage(
                "5511999999999",
                "Connectivity test"
            );

            expect(result.success).toBe(true);
            expect(result.messageId).toBe("conn-test-123");
            expect(mockFetch).toHaveBeenCalledTimes(1);
        });

        it("should handle API timeout scenarios", async () => {
            jest.setTimeout(10000);

            mockFetch.mockImplementationOnce(
                () =>
                    new Promise((_, reject) =>
                        setTimeout(() => reject(new Error("Request timeout")), 5000)
                    )
            );

            const result = await service.sendMessage(
                "5511999999999",
                "Timeout test"
            );

            expect(result.success).toBe(false);
            expect(result.error).toBe("Erro no envio da mensagem.");
        });

        it("should handle rate limiting (429 status)", async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                status: 429,
                statusText: "Too Many Requests",
            } as unknown as Response);

            const result = await service.sendMessage(
                "5511999999999",
                "Rate limit test"
            );

            expect(result.success).toBe(false);
            expect(result.error).toBe("Erro no envio da mensagem.");
        });
    });
});
