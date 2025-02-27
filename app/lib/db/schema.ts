import { relations, sql } from "drizzle-orm";
import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	primaryKey,
	text,
	timestamp,
	varchar,
} from "drizzle-orm/pg-core";

// Enums
export const roles = pgEnum("roles", ["admin", "user"]);

// Tables
export const users = pgTable("users", {
	id: text("id").primaryKey(),
	username: varchar({ length: 255 }).notNull(),
	name: varchar({ length: 255 }),
	surname: varchar({ length: 255 }),
	email: varchar({ length: 255 }).notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	role: roles().notNull().default("user"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const sessions = pgTable("sessions", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = pgTable("accounts", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verifications", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const subjects = pgTable("subjects", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({
		startWith: 0,
		increment: 1,
		minValue: 0,
		maxValue: 2147483647,
	}),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	is_active: boolean().notNull().default(false),
});

export const problems = pgTable("problems", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({
		startWith: 0,
		increment: 1,
		minValue: 0,
		maxValue: 2147483647,
	}),
	subjectId: integer()
		.notNull()
		.references(() => subjects.id),
	topicId: integer()
		.notNull()
		.references(() => topics.id),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	problem: text(),
	solution: text(),
	tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
	is_active: boolean().notNull().default(false),
	solution_is_present: boolean().notNull().default(false),
	solution_is_verified: boolean().notNull().default(false),
});

export const topics = pgTable("topics", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({
		startWith: 0,
		increment: 1,
		minValue: 0,
		maxValue: 2147483647,
	}),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
});

export const tags = pgTable("tags", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({
		startWith: 0,
		increment: 1,
		minValue: 0,
		maxValue: 2147483647,
	}),
	name: varchar({ length: 255 }).notNull(),
});

// Relation tables
export const usersToSubjects = pgTable(
	"users_to_subjects",
	{
		userId: text("user_id")
			.notNull()
			.references(() => users.id),
		subjectId: integer("subject_id")
			.notNull()
			.references(() => subjects.id, { onDelete: "cascade" }),
	},
	(t) => [primaryKey({ columns: [t.userId, t.subjectId] })],
);

export const problemsToTags = pgTable(
	"problems_to_tags",
	{
		problemId: integer("problem_id")
			.notNull()
			.references(() => problems.id),
		tagId: integer("tag_id")
			.notNull()
			.references(() => tags.id),
	},
	(t) => [primaryKey({ columns: [t.problemId, t.tagId] })],
);

// Relations
export const usersRelations = relations(users, ({ many }) => ({
	usersToSubjects: many(usersToSubjects),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
	usersToSubjects: many(usersToSubjects),
	problems: many(problems),
}));

export const usersToSubjectsRelations = relations(
	usersToSubjects,
	({ one }) => ({
		subject: one(subjects, {
			fields: [usersToSubjects.subjectId],
			references: [subjects.id],
		}),
		user: one(users, {
			fields: [usersToSubjects.userId],
			references: [users.id],
		}),
	}),
);

export const problemsRelations = relations(problems, ({ one, many }) => ({
	subject: one(subjects, {
		fields: [problems.subjectId],
		references: [subjects.id],
	}),
	topic: one(topics, {
		fields: [problems.topicId],
		references: [topics.id],
	}),
	problemsToTags: many(problemsToTags),
}));

export const topicsRelations = relations(topics, ({ many }) => ({
	problems: many(problems),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
	problemsToTags: many(problemsToTags),
}));

export const problemsToTagsRelations = relations(problemsToTags, ({ one }) => ({
	problem: one(problems, {
		fields: [problemsToTags.problemId],
		references: [problems.id],
	}),
	tag: one(tags, {
		fields: [problemsToTags.tagId],
		references: [tags.id],
	}),
}));
