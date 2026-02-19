"use server";

import db from "@/_db/drizzle";
import { expenseTable } from "@/_db/schema";
import { auth } from "../../../auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const removeExpense = async (id: string) => {
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
				eq(expenseTable.id, id),
				eq(expenseTable.user_id, session.user.id)
			)
		);

	revalidatePath("/dashboard");
};
