import { callLlMAPi, createLlmPrompt } from "@/app/_lib/llmProcessor";
import { NextResponse } from "next/server";

export async function POST(request : Request) {
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