import { getAllTopics } from "@/app/actions/topics/get-all";
import Link from "next/link";

const AdminTopicsPage = async () => {
	const topics = await getAllTopics();

	return (
		<div>
			<h1>Topics</h1>
			<Link href="/admin/topics/new">Add Topic</Link>
			<ul>
				{topics.map((topic) => (
					<li key={topic.id}>
						<Link href={`/admin/topics/${topic.id}`}>{topic.name}</Link>
						<br />
						<Link href={`/admin/topics/${topic.id}/delete`}>Delete</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminTopicsPage;
