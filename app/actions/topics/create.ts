"use server";

import { db } from "@/app/lib/db/drizzle";
import { topics } from "@/app/lib/db/schema";

export const createTopic = async (
	name: string,
	description: string | null,
): Promise<boolean> => {
	try {
		await db.insert(topics).values({
			name: name,
			description: description,
		});

		return true;
	} catch (error) {
		return false;
	}
};
