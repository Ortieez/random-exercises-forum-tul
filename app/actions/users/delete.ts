"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(id: string) {
	try {
		await db.delete(users).where(eq(users.id, id));
	} catch (error) {
		console.error("Error deleting user:", error);
		throw error;
	}
}
