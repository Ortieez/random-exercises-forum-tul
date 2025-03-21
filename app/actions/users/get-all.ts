"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import type { User } from "@/app/lib/types/server";

export async function getAllUsers(): Promise<User[]> {
	try {
		const allUsers = await db.select().from(users);
		return allUsers;
	} catch (error) {
		console.error("Error getting users:", error);
		throw error;
	}
}
