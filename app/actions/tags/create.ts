"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";

export const createTag = async (name: string): Promise<boolean> => {
	try {
		await db.insert(tags).values({
			name: name,
		});

		return true;
	} catch (error) {
		return false;
	}
};
