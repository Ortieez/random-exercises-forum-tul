"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import type { User } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const getUser = async (userId: string): Promise<User[]> => {
	return await db.select().from(users).where(eq(users.id, userId));
};
