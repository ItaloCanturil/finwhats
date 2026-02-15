import { NextResponse } from "next/server";
import { ProcessWhatsAppMessageUseCase } from '@/use-cases/messaging/ProcessWhatsAppMessageUseCase';
import { getUserFromSession } from '@/_lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senderPhone, message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const prompt = createLlmPrompt(message);
    const response = await callLlMAPi(prompt);

    if (!response.ok) {
      throw new Error(`LLM API failed with status: ${response.status}`);
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error("Error processing message:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}

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
      llmService,
      addExpenseUseCase,
      setGoalUseCase,
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
