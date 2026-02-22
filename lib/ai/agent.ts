import { model } from "@/lib/ai/gemini";
import { addExpense, removeExpense, getExpenses } from "@/features/expense/actions";

const tools = [
    {
        functionDeclarations: [
            {
                name: "addExpense",
                description: "Add a new expense to the database. Requires category and amount.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        category: { type: "STRING", description: "The category of the expense (e.g., food, transport)" },
                        amount: { type: "NUMBER", description: "The amount of the expense" },
                    },
                    required: ["category", "amount"],
                },
            },
            {
                name: "removeExpense",
                description: "Remove an expense from the database by its unique ID. Call getExpenses first to find the expense ID.",
                parameters: {
                    type: "OBJECT",
                    properties: {
                        id: { type: "STRING", description: "The unique ID (UUID) of the expense to remove" },
                    },
                    required: ["id"],
                },
            },
            {
                name: "getExpenses",
                description: "Get the list of expenses for the current user.",
            },
        ],
    },
];

type DispatchFn = (arg: unknown) => Promise<unknown>;
const functions: Record<string, DispatchFn> = {
    addExpense: addExpense as DispatchFn,
    removeExpense: removeExpense as DispatchFn,
    getExpenses: getExpenses as DispatchFn,
};

export async function runAgent(message: string) {
    const chat = model.startChat({
        // @ts-expect-error – tools typing is not perfectly aligned with SDK generics
        tools: tools,
    });

    try {
        const result = await chat.sendMessage(message);
        const response = result.response;
        const functionCalls = response.functionCalls();

        if (functionCalls && functionCalls.length > 0) {
            const functionCall = functionCalls[0];
            const { name, args } = functionCall;
            const func = functions[name];

            if (func) {
                console.log(`Executing function: ${name} with args:`, args);
                try {
                    const functionResult = await func(args);

                    // Send the result back to the model
                    const result2 = await chat.sendMessage([
                        {
                            functionResponse: {
                                name: name,
                                response: {
                                    result: functionResult || "Success",
                                },
                            },
                        },
                    ]);

                    return result2.response.text();
                } catch (error) {
                    console.error(`Error executing function ${name}:`, error);
                    return `Error executing function ${name}: ${error instanceof Error ? error.message : "Unknown error"}`;
                }
            }
        }

        return response.text();
    } catch (error) {
        console.error("Error in runAgent:", error);
        return "Sorry, I encountered an error processing your request.";
    }
}
