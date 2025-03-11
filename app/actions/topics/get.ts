"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics } from "@/app/lib/db/schema";
import type { Topic } from "@/app/lib/types/server";
import { eq } from "drizzle-orm";

export const getTopic = async (topicId: number): Promise<Topic[]> => {
	return await db.select().from(topics).where(eq(topics.id, topicId));
};
