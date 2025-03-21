import { createTopic } from "@/app/actions/topics/create";
import { getTopic } from "@/app/actions/topics/get";
import { TopicSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminTopicsNewPage({
	params,
}: {
	params: { id: string };
}) {
	const topic = await getTopic(Number(params.id));

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
				<input type="text" id="name" name="name" defaultValue={topic[0].name} />
				<input
					type="text"
					id="description"
					name="description"
					defaultValue={topic[0].description ?? ""}
				/>
				<button type="submit">Create Topic</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Topic",
};

export const revalidate = 0;
