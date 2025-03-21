import { db } from "@/app/lib/db/drizzle";
import { problems } from "@/app/lib/db/schema";
import { ProblemSchema } from "@/app/lib/types/client";
import { parse } from "valibot";

export async function createProblem(
	name: string,
	problem: string,
	subjectId: number,
	topicId: number,
	tags: string[],
	is_active: boolean,
	solution: string,
	solution_is_present: boolean,
	solution_is_verified: boolean,
) {
	try {
		const validatedData = parse(ProblemSchema, {
			name,
			problem,
			subjectId,
			topicId,
			tags,
			is_active,
			solution,
			solution_is_present,
			solution_is_verified,
		});
		await db.insert(problems).values(validatedData);
	} catch (error) {
		console.error("Error creating problem:", error);
		throw error;
	}
} 