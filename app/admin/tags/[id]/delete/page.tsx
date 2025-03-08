import { deleteTag } from "@/app/actions/tags/delete";
import { getTag } from "@/app/actions/tags/get";
import { redirect } from "next/navigation";

export default async function AdminTagsDeletePage({
	params,
}: { params: { id: string } }) {
	const tag = await getTag(Number(params.id));

	const onSubmitAction = async () => {
		"use server";
		try {
			await deleteTag(Number(params.id));
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
				<h1>Are you sure you want to delete this tag?</h1>
				<button type="submit">Delete Tag</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Tag",
};

export const revalidate = 0;
