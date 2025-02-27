import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "./db/drizzle";
import { schema } from "./db/schema";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: schema.users,
			account: schema.accounts,
			session: schema.sessions,
			verification: schema.verifications,
		},
	}),
	user: {
		additionalFields: {
			role: {
				type: "string",
				default: "user",
				returned: true,
				required: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(data, request) {
			// TODO: Later
		},
	},
	plugins: [nextCookies()],
});
