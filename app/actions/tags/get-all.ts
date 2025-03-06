"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";
import type { Tag } from "@/app/lib/types/server";

export const getAllTags = async (): Promise<Tag[]> => {
	return await db.select().from(tags);
};
