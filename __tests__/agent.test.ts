import { runAgent } from "../app/_lib/agent";

// Mock Gemini client
const mockSendMessage = jest.fn();
const mockStartChat = jest.fn().mockReturnValue({
    sendMessage: mockSendMessage,
});

jest.mock("../app/_lib/gemini", () => ({
    model: {
        startChat: mockStartChat,
    },
}));

// Mock actions
jest.mock("../app/_actions/expense/add", () => ({
    addExpense: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../app/_actions/expense/remove", () => ({
    removeExpense: jest.fn().mockResolvedValue(undefined),
}));
jest.mock("../app/_actions/expense/get", () => ({
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

        const { addExpense } = require("../app/_actions/expense/add");
        expect(addExpense).toHaveBeenCalledWith({ category: "food", amount: 50 });
        expect(result).toBe("Expense added");
    });
});
