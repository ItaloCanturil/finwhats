"use server";

import db from "@/db";
import { expenseTable } from "@/db/schema";
import { auth } from "../../auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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

export const getExpenses = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const expenses = await db
        .select()
        .from(expenseTable)
        .where(eq(expenseTable.user_id, session.user.id));

    return expenses;
};

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
