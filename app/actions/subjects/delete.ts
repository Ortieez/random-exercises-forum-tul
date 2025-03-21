import { db } from "@/app/lib/db/drizzle";
import { subjects } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function deleteSubject(id: number) {
	try {
		await db.delete(subjects).where(eq(subjects.id, id));
	} catch (error) {
		console.error("Error deleting subject:", error);
		throw error;
	}
}
