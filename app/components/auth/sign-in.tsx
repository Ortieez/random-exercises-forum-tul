import { auth } from "@/app/lib/auth";
import { LoginSchema } from "@/app/lib/types/client";
import { parse } from "valibot";

export const SignIn = async () => {
	async function login(formData: FormData) {
		"use server";
		try {
			const { email, password } = parse(
				LoginSchema,
				Object.fromEntries(formData.entries()),
			);
			await auth.api.signInEmail({
				body: {
					email,
					password,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<form action={login}>
				<input name="email" type="email" required />
				<input name="password" type="password" required minLength={8} />
				<button type="submit">Login</button>
			</form>
		</>
	);
};
