import { getAllSubjects } from "@/app/actions/subjects/get-all";
import Link from "next/link";

const AdminSubjectsPage = async () => {
	const subjects = await getAllSubjects();

	return (
		<div>
			<h1>Subjects</h1>
			<Link href="/admin/subjects/new">Add Subject</Link>
			<ul>
				{subjects.map((subject) => (
					<li key={subject.id}>
						<Link href={`/admin/subjects/${subject.id}`}>{subject.name}</Link>
						<br />
						<Link href={`/admin/subjects/${subject.id}/delete`}>Delete</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminSubjectsPage;
