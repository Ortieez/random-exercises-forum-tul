import { db } from "@/app/lib/db/drizzle";
import { subjects } from "@/app/lib/db/schema";

export async function getAllSubjects() {
	try {
		const allSubjects = await db.select().from(subjects);
		return allSubjects;
	} catch (error) {
		console.error("Error getting subjects:", error);
		throw error;
	}
}
