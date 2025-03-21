"use server";

import { db } from "@/app/lib/db/drizzle";
import { users } from "@/app/lib/db/schema";
import { UserSchema } from "@/app/lib/types/client";
import { eq } from "drizzle-orm";
import { parse } from "valibot";

export async function updateUser({
	id,
	name,
	email,
	role,
}: {
	id: string;
	name: string;
	email: string;
	role: "user" | "admin";
}) {
	try {
		const validatedData = parse(UserSchema, {
			name,
			email,
			role,
		});
		await db.update(users).set(validatedData).where(eq(users.id, id));
	} catch (error) {
		console.error("Error updating user:", error);
		throw error;
	}
}
