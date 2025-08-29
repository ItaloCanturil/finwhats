export interface IntentDefinition {
  name: string;
  description: string;
  requiredEntities: string[];
  examples: Array<{
    userMessage: string;
    expectedResponse: object;
  }>;
}

export const SUPPORTED_INTENTS: IntentDefinition[] = [
  {
    name: 'add_expense',
    description: 'Extract: amount (as a number), category (as a string), and an optional description (as a string).',
    requiredEntities: ['amount', 'category'],
    examples: [
      {
        userMessage: 'Gastei 5,50 num café na padaria',
        expectedResponse: {
          intent: 'add_expense',
          entities: {
            amount: 5.50,
            category: 'café',
            description: 'na padaria'
          }
        }
      }
    ]
  },
  {
    name: 'add_appointment',
    description: 'Extract: title (as a string), date (as a "YYYY-MM-DD" string), time (as a "HH:MM" 24-hour format string). Today\'s date is 2025-08-29.',
    requiredEntities: ['title', 'date', 'time'],
    examples: [
      {
        userMessage: 'agendar dentista para amanhã às 15h',
        expectedResponse: {
          intent: 'add_appointment',
          entities: {
            title: 'dentista',
            date: '2025-08-30',
            time: '15:00'
          }
        }
      }
    ]
  },
  {
    name: 'query_expenses',
    description: 'Extract: time_period (e.g., "hoje", "ontem", "esta semana", "este mês").',
    requiredEntities: ['time_period'],
    examples: [
      {
        userMessage: 'Quanto eu gastei este mês?',
        expectedResponse: {
          intent: 'query_expenses',
          entities: {
            time_period: 'este mês'
          }
        }
      }
    ]
  },
  {
    name: 'query_appointments',
    description: 'Extract: time_period (e.g., "hoje", "ontem", "esta semana", "este mês").',
    requiredEntities: ['time_period'],
    examples: [
      {
        userMessage: 'Quais são meus compromissos hoje?',
        expectedResponse: {
          intent: 'query_appointments',
          entities: {
            time_period: 'hoje'
          }
        }
      }
    ]
  },
  {
    name: 'general_conversation',
    description: 'Use this if the message does not fit any other intent. The entities object should be empty.',
    requiredEntities: [],
    examples: [
      {
        userMessage: 'e aí, tudo bem?',
        expectedResponse: {
          intent: 'general_conversation',
          entities: {}
        }
      }
    ]
  }
];

export const SYSTEM_PROMPT = `You are the intelligent NLU (Natural Language Understanding) engine for a Brazilian personal assistant app. Your primary function is to analyze the user's message, which will be in Brazilian Portuguese (PT-BR), and respond ONLY with a valid JSON object. Do not add any explanations, introductory text, or markdown formatting. The JSON object must have two keys: "intent" and "entities". The "intent" must be one of the following strings: - "add_expense" - "add_appointment" - "query_expenses" - "query_appointments" - "general_conversation" The "entities" object will contain the information you extract. The keys in the entities object depend on the intent. Here are the rules for each intent: 1. **intent: "add_expense"** - Extract: \`amount\` (as a number), \`category\` (as a string), and an optional \`description\` (as a string). - Example User Message: "Gastei 5,50 num café na padaria" - Example JSON Output: \`\`\`json { "intent": "add_expense", "entities": { "amount": 5.50, "category": "café", "description": "na padaria" } } \`\`\` 2. **intent: "add_appointment"** - Extract: \`title\` (as a string), \`date\` (as a "YYYY-MM-DD" string), \`time\` (as a "HH:MM" 24-hour format string). Today's date is 2025-08-29. - Example User Message: "agendar dentista para amanhã às 15h" - Example JSON Output: \`\`\`json { "intent": "add_appointment", "entities": { "title": "dentista", "date": "2025-08-30", "time": "15:00" } } \`\`\` 3. **intent: "query_expenses"** or **"query_appointments"** - Extract: \`time_period\` (e.g., "hoje", "ontem", "esta semana", "este mês"). - Example User Message: "Quanto eu gastei este mês?" - Example JSON Output: \`\`\`json { "intent": "query_expenses", "entities": { "time_period": "este mês" } } \`\`\` 4. **intent: "general_conversation"** - Use this if the message does not fit any other intent. - The \`entities\` object should be empty. - Example User Message: "e aí, tudo bem?" - Example JSON Output: \`\`\`json { "intent": "general_conversation", "entities": {} } \`\`\``;

export const JSON_FORMAT_TEMPLATE = `{
  "intent": "...", // One of: {intents}
  "entities": {
    "amount": "...", // number, for add_expense
    "category": "...", // string, for add_expense
    "description": "...", // string, optional for add_expense
    "title": "...", // string, for add_appointment
    "date": "...", // string (YYYY-MM-DD), for add_appointment
    "time": "...", // string (HH:MM), for add_appointment
    "time_period": "..." // string, for query_expenses or query_appointments
  }
}`;

export const PROMPT_TEMPLATE = `{systemPrompt}`;