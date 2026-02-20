import { NextResponse } from "next/server";
import { ProcessWhatsAppMessageUseCase } from '@/use-cases/messaging/ProcessWhatsAppMessageUseCase';
// import { getUserFromSession } from '@/lib/auth'; // Not found
import { OpenRouterLLMService } from '@/services/LLMService';
import { AddExpenseUseCase } from '@/use-cases/expenses/AddExpenseUseCase';
// import { SetGoalUseCase } from '@/use-cases/goals/SetGoalUseCase';
import { EvolutionWhatsAppService } from '@/services/WhatsAppService';
import { DrizzleExpenseRepository } from '@/repositories/ExpenseRepository';
import { DrizzleUserRepository } from '@/repositories/UserRepository';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderPhone, message } = body;

    // Authentication (interface concern)
    /* 
    const user = await getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    */
    const user = { id: 'user_1' }; // Placeholder for now

    // Dependency injection (could be done via DI container)
    const llmService = new OpenRouterLLMService();
    const whatsappService = new EvolutionWhatsAppService();
    const expenseRepository = new DrizzleExpenseRepository();
    const userRepository = new DrizzleUserRepository();

    // CategoryValidator is commented out in AddExpenseUseCase for now
    const addExpenseUseCase = new AddExpenseUseCase(
      expenseRepository,
      userRepository
      // null as any // categoryValidator is commented out
    );

    const useCase = new ProcessWhatsAppMessageUseCase(
      llmService,
      addExpenseUseCase,
      // null as any, // SetGoalUseCase
      whatsappService
    );

    // Execute business logic
    const result = await useCase.execute({
      senderPhone,
      messageBody: message,
      userId: user.id
    });

    return NextResponse.json(result);
  } catch (_error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
