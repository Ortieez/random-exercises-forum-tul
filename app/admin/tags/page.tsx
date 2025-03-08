import { getAllTags } from "@/app/actions/tags/get-all";
import Link from "next/link";

const AdminTagsPage = async () => {
	const tags = await getAllTags();

	return (
		<div>
			<h1>Tags</h1>
			<Link href="/admin/tags/new">Add Tag</Link>
			<ul>
				{tags.map((tag) => (
					<li key={tag.id}>
						<Link href={`/admin/tags/${tag.id}`}>{tag.name}</Link>
						<br />
						<Link href={`/admin/tags/${tag.id}/delete`}>Delete</Link>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AdminTagsPage;
