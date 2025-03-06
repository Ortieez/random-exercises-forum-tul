import { getAllTags } from "@/app/actions/tags/get-all-tags"

const AdminTagsPage = async () => {
    const tags = await getAllTags();

    console.log(tags);

    return (
        <div>
            asd
        </div>
    )
}

export default AdminTagsPage;