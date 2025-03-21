import * as v from "valibot";

export const LoginSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(8)),
});

export const SignUpSchema = v.object({
	email: v.pipe(v.string(), v.email()),
	password: v.pipe(v.string(), v.minLength(8)),
	name: v.string(),
});

export const TagSchema = v.object({
	name: v.string(),
});

export const TopicSchema = v.object({
	name: v.string(),
	description: v.string(),
});

export const SubjectSchema = v.object({
	name: v.string(),
	description: v.string(),
});

enum DifficultyEnum {
	Easy = 'easy',
	Medium = 'medium',
	Hard = 'hard',
}

enum RoleEnum {
	User = 'user',
	Admin = 'admin',
}

export const ProblemSchema = v.object({
	name: v.string(),
	problem: v.string(),
	subjectId: v.number(),
	topicId: v.number(),
	tags: v.array(v.string()),
	is_active: v.boolean(),
	solution: v.string(),
	solution_is_present: v.boolean(),
	solution_is_verified: v.boolean(),
});

export const UserSchema = v.object({
	name: v.string(),
	email: v.string(),
	role: v.enum(RoleEnum),
});
