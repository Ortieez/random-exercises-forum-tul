import { getAllTags } from "@/app/actions/tags/get-all";

const AdminTagsPage = async () => {
	const tags = await getAllTags();

	return (
		<div>
			<h1>Tags</h1>
			<ul>
				{tags.map((tag) => (
					<li key={tag.id}>{tag.name}</li>
				))}
			</ul>
		</div>
	);
};

export default AdminTagsPage;
