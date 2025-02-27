import Link from "next/link";

const AdminPage = () => {
	return (
		<div>
			<h1>Problems list</h1>
			<div className="container mx-auto">
				<Link href="/admin/problems">
					<p className="text-blue-500">Problems</p>
				</Link>
				<Link href="/admin/subjects">
					<p className="text-blue-500">Subjects</p>
				</Link>
				<Link href="/admin/users">
					<p className="text-blue-500">Users</p>
				</Link>
				<Link href="/admin/topics">
					<p className="text-blue-500">Topics</p>
				</Link>
				<Link href="/admin/tags">
					<p className="text-blue-500">Tags</p>
				</Link>
			</div>
		</div>
	);
};

export default AdminPage;
