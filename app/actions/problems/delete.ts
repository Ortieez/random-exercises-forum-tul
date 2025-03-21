import { db } from "@/app/lib/db/drizzle";
import { problems } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function deleteProblem(id: number) {
	try {
		await db.delete(problems).where(eq(problems.id, id));
	} catch (error) {
		console.error("Error deleting problem:", error);
		throw error;
	}
}
