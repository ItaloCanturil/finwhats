"use server";

import db from "@/_db/drizzle";
import { expenseTable } from "@/_db/schema";
import { auth } from "../../../auth";
import { headers } from "next/headers";

interface AddExpenseParams {
	category: string;
	amount: number;
}

export const addExpense = async (params: AddExpenseParams) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	await db
		.insert(expenseTable)
		.values({ ...params, amount: params.amount.toString(), user_id: session.user.id });
};
