import { relations } from "drizzle-orm";
import { integer, text, boolean, pgTable, varchar, primaryKey, pgEnum } from "drizzle-orm/pg-core";

// Enums
export const roles = pgEnum("roles", ["admin", "user"]);

// Tables
export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  name: varchar({ length: 255 }),
  surname: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roles().notNull().default("user"),
});

export const subjects = pgTable("subjects", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  is_active: boolean().notNull().default(false),
});

// TODO: add more tables here
















// Relations

export const usersRelations = relations(users, ({ many }) => ({
  usersToSubjects: many(usersToSubjects),
}));

export const subjectsRelations = relations(subjects, ({ many }) => ({
  usersToSubjects: many(usersToSubjects),
}));

export const usersToSubjects = pgTable(
  'users_to_subjects',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    subjectId: integer('group_id')
      .notNull()
      .references(() => subjects.id),
  },
  (t) => [
		primaryKey({ columns: [t.userId, t.subjectId] })
	],
);
export const usersToSubjectsRelations = relations(usersToSubjects, ({ one }) => ({
  subject: one(subjects, {
    fields: [usersToSubjects.subjectId],
    references: [subjects.id],
  }),
  user: one(users, {
    fields: [usersToSubjects.userId],
    references: [users.id],
  }),
}));

