"use server";

import db from "@/_db/drizzle";
import { goalsTable } from "@/_db/schema";
import { auth } from "../../../auth";
import { headers } from "next/headers";

interface SetGoalParams {
	name: string;
	target_amount: string;
}

export const setGoal = async (params: SetGoalParams) => {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session?.user?.id) {
		throw new Error("Unauthorized");
	}

	await db
		.insert(goalsTable)
		.values({
			name: params.name,
			target_amount: params.target_amount,
			user_id: session.user.id,
		});
};
