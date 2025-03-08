import { createTag } from "@/app/actions/tags/create";
import { TagSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminTagsNewPage() {
	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name } = parse(TagSchema, Object.fromEntries(formData.entries()));
			await createTag(name);
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/tags");
		}
	};

	return (
		<div>
			<h1>Add Tag</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
				<button type="submit">Create Tag</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Tag",
};

export const revalidate = 0;
