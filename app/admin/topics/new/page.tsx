import { createTopic } from "@/app/actions/topics/create";
import { TopicSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminTopicsNewPage() {
	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name, description } = parse(
				TopicSchema,
				Object.fromEntries(formData.entries()),
			);
			await createTopic(name, description);
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/topics");
		}
	};

	return (
		<div>
			<h1>Add Topic</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
				<input type="text" id="description" name="description" />
				<button type="submit">Create Topic</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Topic",
};

export const revalidate = 0;
