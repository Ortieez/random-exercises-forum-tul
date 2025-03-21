import { getAllProblems } from "@/app/actions/problems/get-all";
import Link from "next/link";

const AdminProblemsPage = async () => {
	const problems = await getAllProblems();

	return (
		<div>
			<h1>Problems</h1>
			<Link href="/admin/problems/new">Add Problem</Link>
			<ul>
				{problems.map((problem) => (
					<li key={problem.id}>
						<Link href={`/admin/problems/${problem.id}`}>{problem.name}</Link>
						<br />
						<Link href={`/admin/problems/${problem.id}/delete`}>Delete</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminProblemsPage;
