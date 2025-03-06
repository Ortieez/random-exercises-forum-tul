"use server";

import { db } from "@/app/lib/db/drizzle";
import { tags } from "@/app/lib/db/schema";

export const getAllTags = async () => {
    const data = await db.select().from(tags);

    return data;
};
