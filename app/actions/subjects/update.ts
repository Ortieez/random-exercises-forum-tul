import { db } from "@/app/lib/db/drizzle";
import { subjects } from "@/app/lib/db/schema";
import { SubjectSchema } from "@/app/lib/types/client";
import { eq } from "drizzle-orm";
import { parse } from "valibot";

export async function updateSubject({
	id,
	name,
	description,
}: {
	id: number;
	name: string;
	description: string;
}) {
	try {
		const validatedData = parse(SubjectSchema, { name, description });
		await db.update(subjects).set(validatedData).where(eq(subjects.id, id));
	} catch (error) {
		console.error("Error updating subject:", error);
		throw error;
	}
}
