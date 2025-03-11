"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics } from "@/app/lib/db/schema";
import type { Topic } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const updateTopic = async ({
	name,
	description,
	id,
}: Topic): Promise<Partial<Topic[]>> => {
	return await db
		.update(topics)
		.set({
			name,
			description,
		})
		.where(eq(topics.id, id))
		.returning();
};
