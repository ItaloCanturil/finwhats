import db from "@/app/_db/drizzle";
import { expenseTable } from "@/app/_db/schema";

interface AddExpenseParams {
	category: string;
	amount: number;
}

export const addExpense = async (params: AddExpenseParams) => {
	const { userId } = await getServerSession();
	if (!userId) {
		throw new Error("Unauthorized");
	}

	await db
		.insert(expenseTable)
		.values({ ...params, amount: params.amount.toString(), user_id: userId });
};
