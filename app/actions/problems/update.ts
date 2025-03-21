import { db } from "@/app/lib/db/drizzle";
import { problems } from "@/app/lib/db/schema";
import { ProblemSchema } from "@/app/lib/types/client";
import { eq } from "drizzle-orm";
import { parse } from "valibot";

export async function updateProblem({
	id,
	name,
	problem,
	subjectId,
	topicId,
	tags,
	is_active,
	solution,
	solution_is_present,
	solution_is_verified,
}: {
	id: number;
	name: string;
	problem: string;
	subjectId: number;
	topicId: number;
	tags: string[];
	is_active: boolean;
	solution: string;
	solution_is_present: boolean;
	solution_is_verified: boolean;
}) {
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
		await db.update(problems).set(validatedData).where(eq(problems.id, id));
	} catch (error) {
		console.error("Error updating problem:", error);
		throw error;
	}
}
