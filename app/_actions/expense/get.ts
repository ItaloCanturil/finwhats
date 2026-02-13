import db from "@/db/drizzle";
import { expenseTable } from "@/db/schema";
import { auth } from "../../../../auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

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
