import db from "@/_db/drizzle";
import { goalsTable } from "@/_db/schema";

interface SetGoalParams {
	name: string;
	user_id: string;
	target_amount: string;
}

export const setGoal = async (params: SetGoalParams) => {
	await db
		.insert(goalsTable)
		.values({ ...params, target_amount: params.target_amount });
};
