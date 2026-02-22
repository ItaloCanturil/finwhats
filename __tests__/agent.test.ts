import { runAgent } from "../lib/ai/agent";

// Mock Gemini client
const mockSendMessage = jest.fn();
const mockStartChat = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage,
});

jest.mock("../lib/ai/gemini", () => ({
    model: {
        startChat: mockStartChat,
    },
}));

// Mock actions
jest.mock("../features/expense/actions", () => ({
    addExpense: jest.fn().mockResolvedValue(undefined),
    removeExpense: jest.fn().mockResolvedValue(undefined),
    getExpenses: jest.fn().mockResolvedValue([{ category: "food", amount: 10 }]),
}));

describe("Agent", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should handle simple text response", async () => {
        mockSendMessage.mockResolvedValueOnce({
            response: {
                text: () => "Hello back",
                functionCalls: () => [],
            },
        });

        const result = await runAgent("Hello");
        expect(result).toBe("Hello back");
        expect(mockStartChat).toHaveBeenCalled();
    });

    it("should handle function call", async () => {
        // First call returns function call request
        mockSendMessage.mockResolvedValueOnce({
            response: {
                functionCalls: () => [{ name: "addExpense", args: { category: "food", amount: 50 } }],
            },
        });

        // Second call returns final text
        mockSendMessage.mockResolvedValueOnce({
            response: {
                text: () => "Expense added",
                functionCalls: () => [],
            },
        });

        const result = await runAgent("Add expense");

        const { addExpense } = require("../features/expense/actions");
        expect(addExpense).toHaveBeenCalledWith({ category: "food", amount: 50 });
        expect(result).toBe("Expense added");
    });
});
