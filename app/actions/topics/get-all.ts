"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics } from "@/app/lib/db/schema";
import type { Topic } from "@/app/lib/types/server";

export const getAllTopics = async (): Promise<Topic[]> => {
	return await db.select().from(topics);
};
