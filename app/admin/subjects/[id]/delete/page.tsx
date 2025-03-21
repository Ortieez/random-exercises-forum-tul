import { deleteSubject } from "@/app/actions/subjects/delete";
import { getSubject } from "@/app/actions/subjects/get";
import { redirect } from "next/navigation";

export default async function AdminSubjectsDeletePage({
	params,
}: { params: { id: string } }) {
	const subject = await getSubject(Number(params.id));

	const onSubmitAction = async () => {
		"use server";
		try {
			await deleteSubject(Number(params.id));
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/subjects");
		}
	};

	return (
		<div>
			<h1>Delete Subject</h1>
			<form action={onSubmitAction}>
				<h1>Are you sure you want to delete this subject?</h1>
				<button type="submit">Delete Subject</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Delete Subject",
};

export const revalidate = 0; 