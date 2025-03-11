"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics, users } from "@/app/lib/db/schema";
import type { User } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const updateTopic = async ({
	name,
	surname,
	firstname,
	role,
	email,
	id,
}: User): Promise<Partial<User[]>> => {
	return await db
		.update(users)
		.set({
			name,
			surname,
			firstname,
			role,
			email,
		})
		.where(eq(users.id, id))
		.returning();
};
