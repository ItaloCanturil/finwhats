import { LLMService } from "@/services/LLMService";
import { WhatsAppService } from "@/services/WhatsAppService";
import { AddExpenseUseCase } from "../expenses/AddExpenseUseCase";
// import { SetGoalUseCase } from "../goals/SetGoalUseCase";

export interface ProcessWhatsAppMessageInput {
  senderPhone: string;
  messageBody: string;
  userId: string;
}

export interface ProcessWhatsAppMessageOutput {
  success: boolean;
  responseMessage: string;
  actionTaken?: string;
}

export class ProcessWhatsAppMessageUseCase {
  constructor(
    private llmService: LLMService,
    private addExpenseUseCase: AddExpenseUseCase,
    // private setGoalUseCase: SetGoalUseCase,
    private whatsappService: WhatsAppService
  ) { }

  async execute(input: ProcessWhatsAppMessageInput): Promise<ProcessWhatsAppMessageOutput> {
    // Parse intent using LLM
    const intent = await this.llmService.parseIntent(input.messageBody);

    let responseMessage = '';
    let actionTaken = '';

    switch (intent.type) {
      case 'add_expense':
        if (!intent.entities.category || !intent.entities.amount) {
          responseMessage = 'Please provide both a category and an amount.';
          break;
        }
        await this.addExpenseUseCase.execute({
          userId: input.userId,
          category: intent.entities.category,
          amount: intent.entities.amount
        });
        responseMessage = `Expense of R$${intent.entities.amount} for ${intent.entities.category} added successfully!`;
        actionTaken = 'expense_added';
        break;

      /* 
      case 'set_goal':
        const goalResult = await this.setGoalUseCase.execute({
          userId: input.userId,
          goalName: intent.entities.goal_name,
          targetAmount: intent.entities.amount
        });
        responseMessage = `Goal "${intent.entities.goal_name}" set for R$${intent.entities.amount}!`;
        actionTaken = 'goal_set';
        break;
      */

      default:
        responseMessage = 'Sorry, I didn\'t understand that. Try: "spent R$50 on groceries" or "set goal vacation R$2000"';
    }

    // Send response via WhatsApp
    await this.whatsappService.sendMessage(input.senderPhone, responseMessage);

    return {
      success: true,
      responseMessage,
      actionTaken
    };
  }
}
