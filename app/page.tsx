import { headers } from "next/headers";
import Image from "next/image";
import { SignIn } from "./components/auth/sign-in";
import { SignUp } from "./components/auth/sign-up";
import KatexSpan from "./components/visualizing/math";
import { auth } from "./lib/auth";
import { authClient } from "./lib/auth-client";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	console.log(session);

	return (
		<div>
			<KatexSpan text={"$$c = \\pm\\sqrt{a^2 + b^2}$$"} />
			<SignIn />
			<SignUp />
			{session ? (
				<>
					<h1>Logged in</h1>
				</>
			) : (
				<>
					<h1>Not logged in</h1>
				</>
			)}
		</div>
	);
}
