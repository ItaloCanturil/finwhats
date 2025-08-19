import { auth } from "@clerk/nextjs/server";
import { expenseTable } from "@/db/schema";
import db from "@/db/drizzle";
import { and, eq } from "drizzle-orm";

interface ExpenseParams {
    category: string;
    amount: number;
}
export class TransactionService {
    async processWebRequest (params: ExpenseParams) {
        const { userId } = await auth();

        if (!userId) {
            throw new Error("Unauthorized");
        }
    }

    async addExpense (params: ExpenseParams) {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        await db
            .insert(expenseTable)
            .values({ ...params, amount: params.amount.toString(), user_id: userId });
    }

    async removeExpense  (params: ExpenseParams) {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }
    
        await db
            .delete(expenseTable)
            .where(
                and(
                    eq(expenseTable.user_id, userId),
                    eq(expenseTable.category, params.category),
                    eq(expenseTable.amount, params.amount.toString())
                )
            );
    };

    async getExpenses () {
        const { userId } = await auth();
        if (!userId) {
            throw new Error("Unauthorized");
        }

        await db
            .select()
            .from(expenseTable)
            .where(eq(expenseTable.user_id, userId))
    }
}