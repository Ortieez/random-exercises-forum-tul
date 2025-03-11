"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export const deleteTopic = async (topicId: number): Promise<boolean> => {
	try {
		await db.delete(topics).where(eq(topics.id, topicId));
		return true;
	} catch (error) {
		return false;
	}
};
