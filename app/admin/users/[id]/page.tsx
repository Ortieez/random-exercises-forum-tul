import { getUser } from "@/app/actions/users/get";
import { updateUser } from "@/app/actions/users/update";
import { UserSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminUsersEditPage({
	params,
}: {
	params: { id: string };
}) {
	const user = await getUser(params.id);

	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const { name, email, role } = parse(
				UserSchema,
				Object.fromEntries(formData.entries()),
			);
			await updateUser({
				id: params.id,
				name,
				email,
				role: role as 'user' | 'admin',
			});
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/users");
		}
	};

	return (
		<div>
			<h1>Edit User</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" defaultValue={user[0].name} />
				<label htmlFor="email">Email</label>
				<input type="email" id="email" name="email" defaultValue={user[0].email} />
				<label htmlFor="role">Role</label>
				<select id="role" name="role" defaultValue={user[0].role}>
					<option value="user">User</option>
					<option value="admin">Admin</option>
				</select>
				<button type="submit">Save User</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Edit User",
};

export const revalidate = 0; 