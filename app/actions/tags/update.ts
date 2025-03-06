"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";
import type { Tag } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const updateTag = async ({ name, id }: Tag): Promise<Tag[]> => {
	return await db
		.update(tags)
		.set({
			name: name,
		})
		.where(eq(tags.id, id))
		.returning();
};
