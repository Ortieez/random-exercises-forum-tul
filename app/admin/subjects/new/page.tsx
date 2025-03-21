import { createSubject } from "@/app/actions/subjects/create";
import { SubjectSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminSubjectsNewPage() {
	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name, description } = parse(
				SubjectSchema,
				Object.fromEntries(formData.entries()),
			);
			await createSubject(name, description);
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/subjects");
		}
	};

	return (
		<div>
			<h1>Add Subject</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
				<label htmlFor="description">Description</label>
				<input type="text" id="description" name="description" />
				<button type="submit">Create Subject</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Subject",
};

export const revalidate = 0;
