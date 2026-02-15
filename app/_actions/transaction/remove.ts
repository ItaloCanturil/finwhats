"use server";

import db from "@/_db/drizzle";
import { transactionTable } from "@/_db/schema";
import { auth } from "../../../auth";
import { eq, and } from "drizzle-orm";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

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
