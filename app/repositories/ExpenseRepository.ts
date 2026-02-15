import { expenseTable } from "@/_db/schema";
import { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";

// Infer types from Drizzle schema
export type Expense = InferSelectModel<typeof expenseTable>;
export type CreateExpenseData = Omit<InferInsertModel<typeof expenseTable>, 'id' | 'created_at' | 'updated_at'> & {
  userId: string; // Map user_id to userId for better API
  createdAt?: Date; // Optional, will default to now
};

export interface ExpenseRepository {
  create(expense: CreateExpenseData): Promise<Expense>;
  findByUserId(userId: string): Promise<Expense[]>;
  findById(id: string): Promise<Expense | null>;
  delete(id: string): Promise<void>;
}

type Database = PostgresJsDatabase<{
  expenseTable: typeof expenseTable;
}>

export class DrizzleExpenseRepository implements ExpenseRepository {
  constructor(private db: Database = db) { }

  async create(expense: CreateExpenseData): Promise<Expense> {
    const [created] = await this.db
      .insert(expenseTable)
      .values({
        user_id: expense.userId,
        category: expense.category,
        amount: expense.amount.toString(),
        created_at: expense.createdAt || new Date()
      })
      .returning();

    return this.mapToExpense(created);
  }

  async findByUserId(userId: string): Promise<Expense[]> {
    const results = await this.db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.user_id, userId));

    return results.map(this.mapToExpense);
  }

  async findById(id: string): Promise<Expense | null> {
    const [result] = await this.db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.id, id))
      .limit(1);

    return result ? this.mapToExpense(result) : null;
  }

  async delete(id: string): Promise<void> {
    await this.db
      .delete(expenseTable)
      .where(eq(expenseTable.id, id));
  }

  private mapToExpense(dbExpense: InferSelectModel<typeof expenseTable>): Expense {
    return {
      id: dbExpense.id,
      user_id: dbExpense.user_id,
      category: dbExpense.category,
      amount: dbExpense.amount,
      updated_at: dbExpense.updated_at,
      created_at: dbExpense.created_at
    };
  }
}
