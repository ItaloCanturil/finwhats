import db from "@/app/_db/drizzle";
import { expenseTable } from "@/app/_db/schema";
import { auth } from "@clerk/nextjs/server";

interface AddExpenseParams {
	category: string;
	amount: number;
}

export const addExpense = async (params: AddExpenseParams) => {
	const { userId } = await auth();
	if (!userId) {
		throw new Error("Unauthorized");
	}

	await db
		.insert(expenseTable)
		.values({ ...params, amount: params.amount.toString(), user_id: userId });
};
