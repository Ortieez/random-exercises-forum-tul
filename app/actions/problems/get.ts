import { db } from "@/app/lib/db/drizzle";
import { problems } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getProblem(id: number) {
	try {
		const problem = await db
			.select()
			.from(problems)
			.where(eq(problems.id, id));
		return problem;
	} catch (error) {
		console.error("Error getting problem:", error);
		throw error;
	}
} 