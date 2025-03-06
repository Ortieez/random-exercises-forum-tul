"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";
import type { Tag } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const getTag = async (tagId: number): Promise<Tag[]> => {
	return await db.select().from(tags).where(eq(tags.id, tagId));
};
