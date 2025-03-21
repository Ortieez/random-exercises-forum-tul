import { db } from "@/app/lib/db/drizzle";
import { subjects } from "@/app/lib/db/schema";
import { SubjectSchema } from "@/app/lib/types/client";
import { parse } from "valibot";

export async function createSubject(name: string, description: string) {
	try {
		const validatedData = parse(SubjectSchema, { name, description });
		await db.insert(subjects).values(validatedData);
	} catch (error) {
		console.error("Error creating subject:", error);
		throw error;
	}
}
