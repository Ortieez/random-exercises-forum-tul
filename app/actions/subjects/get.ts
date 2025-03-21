import { db } from "@/app/lib/db/drizzle";
import { subjects } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getSubject(id: number) {
	try {
		const subject = await db.select().from(subjects).where(eq(subjects.id, id));
		return subject;
	} catch (error) {
		console.error("Error getting subject:", error);
		throw error;
	}
}
