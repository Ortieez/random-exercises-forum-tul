import { deleteUser } from "@/app/actions/users/delete";
import { getUser } from "@/app/actions/users/get";
import { redirect } from "next/navigation";

export default async function AdminUsersDeletePage({
	params,
}: { params: { id: string } }) {
	const user = await getUser(params.id);

	const onSubmitAction = async () => {
		"use server";
		try {
			await deleteUser(params.id);
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/users");
		}
	};

	return (
		<div>
			<h1>Delete User</h1>
			<form action={onSubmitAction}>
				<h1>Are you sure you want to delete this user?</h1>
				<button type="submit">Delete User</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Delete User",
};

export const revalidate = 0; 