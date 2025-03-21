import { createProblem } from "@/app/actions/problems/create";
import { getAllSubjects } from "@/app/actions/subjects/get-all";
import { getAllTags } from "@/app/actions/tags/get-all";
import { getAllTopics } from "@/app/actions/topics/get-all";
import { ProblemSchema } from "@/app/lib/types/client";
import { redirect } from "next/navigation";
import { parse } from "valibot";

export default async function AdminProblemsNewPage() {
	const subjects = await getAllSubjects();
	const topics = await getAllTopics();
	const tags = await getAllTags();

	const onSubmitAction = async (formData: FormData) => {
		"use server";
		try {
			const selectedTags = formData.getAll("tags");
			const rawData = Object.fromEntries(formData.entries());

			const validatedData = parse(ProblemSchema, {
				name: rawData.name,
				problem: rawData.problem,
				subjectId: Number(rawData.subjectId),
				topicId: Number(rawData.topicId),
				tags: selectedTags,
				is_active: rawData.is_active === "true",
				solution: rawData.solution,
				solution_is_present: rawData.solution_is_present === "true",
				solution_is_verified: rawData.solution_is_verified === "true",
			});

			await createProblem(
				validatedData.name,
				validatedData.problem,
				validatedData.subjectId,
				validatedData.topicId,
				validatedData.tags,
				validatedData.is_active,
				validatedData.solution,
				validatedData.solution_is_present,
				validatedData.solution_is_verified,
			);
		} catch (error) {
			console.error(error);
		} finally {
			redirect("/admin/problems");
		}
	};

	return (
		<div>
			<h1>Add Problem</h1>
			<form action={onSubmitAction}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" />
				<label htmlFor="problem">Problem</label>
				<textarea id="problem" name="problem" />
				<label htmlFor="subjectId">Subject</label>
				<select id="subjectId" name="subjectId">
					{subjects.map((subject) => (
						<option key={subject.id} value={subject.id}>
							{subject.name}
						</option>
					))}
				</select>
				<label htmlFor="topicId">Topic</label>
				<select id="topicId" name="topicId">
					{topics.map((topic) => (
						<option key={topic.id} value={topic.id}>
							{topic.name}
						</option>
					))}
				</select>
				<label htmlFor="tags">Tags</label>
				<select id="tags" name="tags" multiple>
					{tags.map((tag) => (
						<option key={tag.id} value={tag.name}>
							{tag.name}
						</option>
					))}
				</select>
				<label htmlFor="is_active">Active</label>
				<input
					type="checkbox"
					id="is_active"
					name="is_active"
					value="true"
					defaultChecked
				/>
				<label htmlFor="solution">Solution</label>
				<textarea id="solution" name="solution" />
				<label htmlFor="solution_is_present">Solution Present</label>
				<input
					type="checkbox"
					id="solution_is_present"
					name="solution_is_present"
					value="true"
					defaultChecked
				/>
				<label htmlFor="solution_is_verified">Solution Verified</label>
				<input
					type="checkbox"
					id="solution_is_verified"
					name="solution_is_verified"
					value="true"
				/>
				<button type="submit">Create Problem</button>
			</form>
		</div>
	);
}

export const metadata = {
	title: "Add Problem",
};

export const revalidate = 0;
