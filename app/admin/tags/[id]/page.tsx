import { createTag } from "@/app/actions/tags/create";
import { getTag } from "@/app/actions/tags/get";
import { updateTag } from "@/app/actions/tags/update";
import { TagSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminTagsEditPage({
	params,
}: { params: { id: string } }) {
	const tag = await getTag(Number(params.id));

	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name } = parse(TagSchema, Object.fromEntries(formData.entries()));
			await updateTag({ id: Number(params.id), name });
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/tags");
		}
	};

	return (
		<div>
			<h1>Edit Tag</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" defaultValue={tag[0].name} />
				<button type="submit">Save Tag</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Tag",
};

export const revalidate = 0;
