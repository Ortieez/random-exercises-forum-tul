import { deleteProblem } from "@/app/actions/problems/delete";
import { getProblem } from "@/app/actions/problems/get";
import { redirect } from "next/navigation";

export default async function AdminProblemsDeletePage({
	params,
}: { params: { id: string } }) {
	const problem = await getProblem(Number(params.id));

	const onSubmitAction = async () => {
		"use server";
		try {
			await deleteProblem(Number(params.id));
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/problems");
		}
	};

	return (
		<div>
			<h1>Delete Problem</h1>
			<form action={onSubmitAction}>
				<h1>Are you sure you want to delete this problem?</h1>
				<button type="submit">Delete Problem</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Delete Problem",
};

export const revalidate = 0;
