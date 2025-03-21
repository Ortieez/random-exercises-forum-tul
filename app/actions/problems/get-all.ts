import { db } from "@/app/lib/db/drizzle";
import { problems } from "@/app/lib/db/schema";

export async function getAllProblems() {
	try {
		const allProblems = await db.select().from(problems);
		return allProblems;
	} catch (error) {
		console.error("Error getting problems:", error);
		throw error;
	}
}
