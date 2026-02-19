import { NextResponse } from "next/server";
import { ProcessWhatsAppMessageUseCase } from '@/use-cases/messaging/ProcessWhatsAppMessageUseCase';
import { getUserFromSession } from '@/lib/auth';
import { LLMService } from '@/services/llmService';
import { AddExpenseUseCase } from '@/use-cases/expenses/AddExpenseUseCase';
import { SetGoalUseCase } from '@/use-cases/goals/SetGoalUseCase';
import { WhatsAppService } from '@/services/whatsappService';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderPhone, message } = body;

    // Authentication (interface concern)
    const user = await getUserFromSession(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Dependency injection (could be done via DI container)
    const useCase = new ProcessWhatsAppMessageUseCase(
      LLMService,
      AddExpenseUseCase,
      SetGoalUseCase,
      whatsappService
    );

    // Execute business logic
    const result = await useCase.execute({
      senderPhone,
      messageBody: message,
      userId: user.id
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
