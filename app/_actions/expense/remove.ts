import db from "@/app/_db/drizzle";
import { expenseTable } from "@/app/_db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";

interface RemoveExpenseParams {
	category: string;
	amount: number;
}

export const removeExpense = async (params: RemoveExpenseParams) => {
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
