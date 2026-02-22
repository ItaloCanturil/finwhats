"use server";

import db from "@/db";
import { transactionTable } from "@/db/schema";
import { auth } from "../../auth";
import { eq, desc, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

interface AddTransactionParams {
    type: "income" | "expense";
    category: string;
    amount: number;
    description?: string;
    referenceMonth?: string; // "YYYY-MM-DD" (1st of month)
    recurrenceType?: "none" | "subscription" | "installment";
    installmentCurrent?: number;
    installmentTotal?: number;
}

function getDefaultReferenceMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}-01`;
}

export const addTransaction = async (params: AddTransactionParams) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    if (params.amount <= 0) {
        throw new Error("Amount must be positive");
    }

    if (
        params.recurrenceType === "installment" &&
        (!params.installmentCurrent || !params.installmentTotal)
    ) {
        throw new Error("Installment transactions require current and total installment numbers");
    }

    await db.insert(transactionTable).values({
        user_id: session.user.id,
        type: params.type,
        category: params.category,
        amount: params.amount.toString(),
        description: params.description ?? null,
        reference_month: params.referenceMonth ?? getDefaultReferenceMonth(),
        recurrence_type: params.recurrenceType ?? "none",
        installment_current: params.recurrenceType === "installment"
            ? params.installmentCurrent ?? null
            : null,
        installment_total: params.recurrenceType === "installment"
            ? params.installmentTotal ?? null
            : null,
    });

    revalidatePath("/dashboard");
};

export const getTransactions = async (type?: "income" | "expense") => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    const conditions = [eq(transactionTable.user_id, session.user.id)];

    if (type) {
        conditions.push(eq(transactionTable.type, type));
    }

    const transactions = await db
        .select()
        .from(transactionTable)
        .where(and(...conditions))
        .orderBy(desc(transactionTable.created_at));

    return transactions;
};

export const removeTransaction = async (id: string) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    await db
        .delete(transactionTable)
        .where(
            and(
                eq(transactionTable.id, id),
                eq(transactionTable.user_id, session.user.id)
            )
        );

    revalidatePath("/dashboard");
};
