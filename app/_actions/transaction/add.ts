"use server";

import db from "@/_db/drizzle";
import { transactionTable } from "@/_db/schema";
import { auth } from "../../../auth";
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
