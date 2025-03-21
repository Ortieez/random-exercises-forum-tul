"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export async function getUser(id: string) {
	try {
		const user = await db
			.select()
			.from(users)
			.where(eq(users.id, id));
		return user;
	} catch (error) {
		console.error("Error getting user:", error);
		throw error;
	}
}
