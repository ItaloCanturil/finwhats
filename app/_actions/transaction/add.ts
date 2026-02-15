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

    await db.insert(transactionTable).values({
        user_id: session.user.id,
        type: params.type,
        category: params.category,
        amount: params.amount.toString(),
        description: params.description ?? null,
    });

    revalidatePath("/dashboard");
};
