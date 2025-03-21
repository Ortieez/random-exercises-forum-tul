import { getAllUsers } from "@/app/actions/users/get-all";
import Link from "next/link";

const AdminUsersPage = async () => {
	const users = await getAllUsers();

	return (
		<div>
			<h1>Users</h1>
			<ul>
				{users.map((user) => (
					<li key={user.id}>
						<Link href={`/admin/users/${user.id}`}>{user.name}</Link>
						<br />
						<Link href={`/admin/users/${user.id}/delete`}>Delete</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminUsersPage;
