import { auth } from "@/app/lib/auth";
import { SignUpSchema } from "@/app/lib/types/client";
import { parse } from "valibot";

export const SignUp = async () => {
	async function signUp(formData: FormData) {
		"use server";
		try {
			const { email, password, name } = parse(
				SignUpSchema,
				Object.fromEntries(formData.entries()),
			);

			await auth.api.signUpEmail({
				body: {
					email,
					password,
					name,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<form action={signUp}>
				<input name="name" type="text" required />
				<input name="email" type="email" required />
				<input name="password" type="password" required minLength={8} />
				<button type="submit">Login</button>
			</form>
		</>
	);
};
