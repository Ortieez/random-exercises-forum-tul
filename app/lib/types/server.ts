import type { InferSelectModel } from "drizzle-orm";
import type { tags, topics, users } from "../db/schema";

export type Tag = InferSelectModel<typeof tags>;
export type Topic = InferSelectModel<typeof topics>;
export type User = InferSelectModel<typeof users>;
