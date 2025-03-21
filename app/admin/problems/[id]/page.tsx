import { getProblem } from "@/app/actions/problems/get";
import { updateProblem } from "@/app/actions/problems/update";
import { getAllSubjects } from "@/app/actions/subjects/get-all";
import { getAllTopics } from "@/app/actions/topics/get-all";
import { getAllTags } from "@/app/actions/tags/get-all";
import { ProblemSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminProblemsEditPage({
	params,
}: {
	params: { id: string };
}) {
	const problem = await getProblem(Number(params.id));
	const subjects = await getAllSubjects();
	const topics = await getAllTopics();
	const tags = await getAllTags();

	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const selectedTags = formData.getAll("tags");
			const { name, problem: problemContent, subjectId, topicId, is_active, solution, solution_is_present, solution_is_verified } = parse(
				ProblemSchema,
				{
					...Object.fromEntries(formData.entries()),
					tags: selectedTags,
					is_active: formData.get("is_active") === "true",
					solution_is_present: formData.get("solution_is_present") === "true",
					solution_is_verified: formData.get("solution_is_verified") === "true",
				},
			);
			await updateProblem({
				id: Number(params.id),
				name,
				problem: problemContent,
				subjectId: Number(subjectId),
				topicId: Number(topicId),
				tags: selectedTags as string[],
				is_active,
				solution,
				solution_is_present,
				solution_is_verified,
			});
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/problems");
		}
	};

	return (
		<div>
			<h1>Edit Problem</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" defaultValue={problem[0].name} />
				<label htmlFor="problem">Problem</label>
				<textarea id="problem" name="problem" defaultValue={problem[0].problem ?? ""} />
				<label htmlFor="subjectId">Subject</label>
				<select id="subjectId" name="subjectId" defaultValue={problem[0].subjectId}>
					{subjects.map((subject) => (
						<option key={subject.id} value={subject.id}>
							{subject.name}
						</option>
					))}
				</select>
				<label htmlFor="topicId">Topic</label>
				<select id="topicId" name="topicId" defaultValue={problem[0].topicId}>
					{topics.map((topic) => (
						<option key={topic.id} value={topic.id}>
							{topic.name}
						</option>
					))}
				</select>
				<label htmlFor="tags">Tags</label>
				<select id="tags" name="tags" multiple defaultValue={problem[0].tags}>
					{tags.map((tag) => (
						<option key={tag.id} value={tag.name}>
							{tag.name}
						</option>
					))}
				</select>
				<label htmlFor="is_active">Active</label>
				<input type="checkbox" id="is_active" name="is_active" value="true" defaultChecked={problem[0].is_active} />
				<label htmlFor="solution">Solution</label>
				<textarea id="solution" name="solution" defaultValue={problem[0].solution ?? ""} />
				<label htmlFor="solution_is_present">Solution Present</label>
				<input type="checkbox" id="solution_is_present" name="solution_is_present" value="true" defaultChecked={problem[0].solution_is_present} />
				<label htmlFor="solution_is_verified">Solution Verified</label>
				<input type="checkbox" id="solution_is_verified" name="solution_is_verified" value="true" defaultChecked={problem[0].solution_is_verified} />
				<button type="submit">Save Problem</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Edit Problem",
};

export const revalidate = 0; 