"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import type { User } from "@/app/lib/types/server";

export const getAllUsers = async (): Promise<User[]> => {
	return await db.select().from(users);
};
