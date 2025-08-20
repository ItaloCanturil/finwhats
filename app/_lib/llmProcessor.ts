import sendWhatsAppMessage from "./whatsappSender";
import { addExpense } from "../_actions/expense";

type LlmResponse = {
	intent: string;
	entities: {
		category?: string;
		amount?: number | string;
		goal_name?: string;
	};
};

const createLlmPrompt = (userMessage: string) => {
	const supportedIntents = [
		"add_expense",
		"remove_last_expense",
		"set_goal",
		"view_goals",
		"unknow_intent",
	];

	const jsonFormat = `{
    "intent": '...', // One of: ${supportedIntents.join(",")}
    "entities": {
      "category": "...", // string, only for add_expense
      "amount": "...", // number, for add_expense or set_goal
      "goal_name": "..." // string, only fort set_goal
    }
  }`;

	const prompt = `You are an intelligent assistant for a personal finance tracker accessed via WhatsApp in Brazil.
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
  
  User Message: "mercado 123,45"
  JSON Response: {"intent": "add_expense", "entities": {"category": "mercado", "amount": 123.45}}
  
  User Message: "apague a última"
  JSON Response: {"intent": "remove_last_expense", "entities": {}}
  
  User Message: "defina um objetivo para viagem de R$5000"
  JSON Response: {"intent": "set_goal", "entities": {"goal_name": "trip", "amount": 5000}}
  
  User Message: "mostre meus objetivos"
  JSON Response: {"intent": "view_goals", "entities": {}}
  
  User Message: "Olá, como vai você?"
  JSON Response: {"intent": "unknown_intent", "entities": {}}
  
  Now, analyze the user message provided above and generate the JSON response.
  JSON Response:`;

	return prompt;
};

const tools = [
	{
		intent: 'add_expense',
		type: 'function',
		function: {
			name: 'add_expense',
			description: 'Add an expense to the database',
			parameters: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
					},
					amount: {
						type: 'number',
					}
				},
				required: ['category', 'amount'],
			}
		}
	},
	{
		intent: 'remove_expense',
		type: 'function',
		function: {
			name: 'remove_expense',
			description: 'Remove an expense from the database',
			parameters: {
				type: 'object',
				properties: {
					category: {
						type: 'string',
					},
					amount: {
						type: 'number',
					}
				},
				required: ['category', 'amount'],
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'set_goal',
			description: 'Set a goal for the user',
			parameters: {
				type: 'object',
				properties: {
					goal_name: {
						type: 'string',
					},
					amount: {
						type: 'number',
					}
				},
				required: ['goal_name', 'amount'],
			}
		}
	},
	{
		type: 'function',
		function: {
			name: 'view_goals',
			description: 'View the goals for the user',
		}
	},
	{
		type: 'function',
		function: {
			name: 'unknown_intent',
			description: 'Unknown intent, when you don\'t understand the user\'s intent',
			parameters: {
				type: 'object',
				properties: {
					message: {
						type: 'string',
					}
				},
				required: ['message'],
			}
		}
	}
]

const callLlMAPi = async (prompt: string) => {
	const LLM_ENDPOINT = process.env.OPEN_ROUTE_URL;
	const LLM_API_KEY = process.env.OPEN_ROUTE_KEY;

	if (!LLM_ENDPOINT || !LLM_API_KEY) {
		throw new Error("LLM API endpoint or key not configured.");
	}

	try {
		const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${LLM_API_KEY}`,
			},
			body: JSON.stringify({
				model: "openai/gpt-oss-20b:free",
				prompt
			}),
		});

		return response;
	} catch (error) {
		throw new Error("Erro na request da LLM", { cause: error });
	}
};

const processLlmRequest = async (
	user_Id: string,
	senderPhone: string,
	messageBody: string
) => {
	const prompt = await createLlmPrompt(messageBody);
	let llmResult: LlmResponse;

	try {
		const response = await callLlMAPi(prompt);
		llmResult = (await response.json()) as LlmResponse;
	} catch (error) {
		console.error("LLM processing failed:", error);
		await sendWhatsAppMessage(
			senderPhone,
			"Desculpe, foi encontrado um erro, tente novamente por favor."
		);
		return;
	}

	if (!llmResult || typeof llmResult !== "object" || !llmResult.intent) {
		console.error("Invalid LLM response structure:", llmResult);
		await sendWhatsAppMessage(
			senderPhone,
			"Desculpe, Eu não pude processar isso no momento."
		);
		return;
	}

	const intent = llmResult.intent;
	const entities = llmResult.entities || {};

	try {
		switch (intent) {
			case "add_expense":
				const amountRaw = entities.amount;
				const category = entities.category;
				const amount =
					typeof amountRaw === "string"
						? parseFloat(amountRaw.replace(",", "."))
						: amountRaw;

				if (category && amount && !isNaN(amount)) {
					await addExpense({ userId, category, amount });
					await sendWhatsAppMessage(
						senderPhone,
						`✅ Expense added: ${category} R$${amount.toFixed(2)}`
					);
				} else {
					console.warn("Missing entities for add_expense:", entities);
					await sendWhatsAppMessage(
						senderPhone,
						"Sorry, I couldn't understand the category or amount for the expense."
					);
				}
				break;

			case "remove_last_expense":
				await transactionService.removeLastExpense(userId);
				await sendWhatsAppMessage(
					senderPhone,
					`✅ Your last expense was removed.`
				);
				break;

			case "set_goal":
				const goalName = entities.goal_name;
				const goalAmountRaw = entities.amount;
				const goalAmount =
					typeof goalAmountRaw === "string"
						? parseFloat(goalAmountRaw.replace(",", "."))
						: goalAmountRaw;

				if (goalName && goalAmount && !isNaN(goalAmount)) {
					await goalService.setGoal(userId, goalName, goalAmount);
					await sendWhatsAppMessage(
						senderPhone,
						`✅ Goal set: ${goalName} R$${goalAmount.toFixed(2)}`
					);
				} else {
					console.warn("Missing entities for set_goal:", entities);
					await sendWhatsAppMessage(
						senderPhone,
						"Sorry, I couldn't understand the goal name or amount."
					);
				}
				break;

			case "view_goals":
				const goals = await goalService.getGoals(userId);
				const goalMessage =
					goals.length > 0
						? `Seus objetivoss:\n${goals
							.map((g) => `- ${g.name}: R$${g.amount.toFixed(2)}`)
							.join("\n")}`
						: "Você ainda não tem objetivos.";
				await sendWhatsAppMessage(senderPhone, goalMessage);
				break;

			case "unknown_intent":
			default:
				await sendWhatsAppMessage(
					senderPhone,
					"Deculpe, Eu não conseguir entender. Tente novamente algo como 'adicione comida R$50'."
				);
				break;
		}
	} catch (serviceError) {
		console.error(`Error executing action for intent ${intent}:`, serviceError);
		await sendWhatsAppMessage(
			senderPhone,
			"Sorry, there was an error processing your request."
		);
	}
};

export { createLlmPrompt, callLlMAPi, processLlmRequest };
