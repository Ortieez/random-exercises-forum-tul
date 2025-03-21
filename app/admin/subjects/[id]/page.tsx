import { createSubject } from "@/app/actions/subjects/create";
import { getSubject } from "@/app/actions/subjects/get";
import { updateSubject } from "@/app/actions/subjects/update";
import { SubjectSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminSubjectsEditPage({
	params,
}: {
	params: { id: string };
}) {
	const subject = await getSubject(Number(params.id));

	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name, description } = parse(
				SubjectSchema,
				Object.fromEntries(formData.entries()),
			);
			await updateSubject({ id: Number(params.id), name, description });
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/subjects");
		}
	};

	return (
		<div>
			<h1>Edit Subject</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" defaultValue={subject[0].name} />
				<label htmlFor="description">Description</label>
				<input
					type="text"
					id="description"
					name="description"
					defaultValue={subject[0].description ?? ""}
				/>
				<button type="submit">Save Subject</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Edit Subject",
};

export const revalidate = 0; 