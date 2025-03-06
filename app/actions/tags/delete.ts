"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";

export const deleteTag = async (tagId: number): Promise<boolean> => {
	try {
		await db.delete(tags).where(eq(tags.id, tagId));
		return true;
	} catch (error) {
		return false;
	}
};
