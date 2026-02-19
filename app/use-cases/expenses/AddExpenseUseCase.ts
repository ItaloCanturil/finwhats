import { ExpenseRepository } from "@/repositories/ExpenseRepository";
import { UserRepository } from "@/repositories/UserRepository";
import { CategoryValidator } from "@/services/categoryValidator";

export interface AddExpenseInput {
  userId: string;
  category: string;
  amount: number;
  description?: string;
}

export interface AddExpenseOutput {
  expenseId: string;
  success: boolean;
  message?: string;
}

export class AddExpenseUseCase {
  constructor(
    private expenseRepository: ExpenseRepository,
    private userRepository: UserRepository,
    private categoryValidator: CategoryValidator
  ) { }

  async execute(input: AddExpenseInput): Promise<AddExpenseOutput> {
    // Business validation
    if (input.amount <= 0) {
      throw new Error('Amount must be positive');
    }

    // Verify user exists
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new Error('User not found');
    }

    // Validate category
    const isValidCategory = await this.categoryValidator.validate(input.category);
    if (!isValidCategory) {
      throw new Error('Invalid expense category');
    }

    // Business logic: Create expense
    const expense = await this.expenseRepository.create({
      userId: input.userId,
      category: input.category,
      amount: input.amount,
      description: input.description,
      createdAt: new Date()
    });

    return {
      expenseId: expense.id,
      success: true,
      message: 'Expense added successfully'
    };
  }
}
