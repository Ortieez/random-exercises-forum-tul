"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (userId: string): Promise<boolean> => {
	try {
		await db.delete(users).where(eq(users.id, userId));
		return true;
	} catch (error) {
		return false;
	}
};
