import db from "@/db/drizzle";
import { expenseTable } from "@/db/schema";
import { auth } from "../../../../auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";

interface RemoveExpenseParams {
	category: string;
	amount: number;
}

export const removeExpense = async (params: RemoveExpenseParams) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	await db
		.delete(expenseTable)
		.where(
			and(
				eq(expenseTable.user_id, session.user.id),
				eq(expenseTable.category, params.category),
				eq(expenseTable.amount, params.amount.toString())
			)
		);
};
