"use server";

import db from "@/_db/drizzle";
import { transactionTable } from "@/_db/schema";
import { auth } from "../../../auth";
import { eq, desc, and } from "drizzle-orm";
import { headers } from "next/headers";

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
