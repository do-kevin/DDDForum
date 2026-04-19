import {
  integer,
  pgTable,
  varchar,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull().unique(),
  first_name: varchar({ length: 255 }).notNull(),
  last_name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  member: one(membersTable, {
    fields: [usersTable.id],
    references: [membersTable.user_id],
  }),
}));

export const membersTable = pgTable("members", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  user_id: integer()
    .notNull()
    .unique()
    .references(() => usersTable.id),
});

export const membersRelations = relations(membersTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [membersTable.user_id],
    references: [usersTable.id],
  }),
  posts: many(postsTable),
}));

export const postsTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  member_posted_by: integer()
    .notNull()
    .references(() => membersTable.id),
  member_id: integer()
    .notNull()
    .references(() => membersTable.id),
  post_type: varchar({ length: 50 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  date_created: timestamp().notNull().defaultNow(),
});

export const postsRelations = relations(postsTable, ({ one, many }) => ({
  member_posted_by: one(membersTable, {
    fields: [postsTable.member_posted_by],
    references: [membersTable.id],
  }),
  comments: many(commentsTable),
  votes: many(votesTable),
}));

export const commentsTable = pgTable("comments", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  post_id: integer()
    .notNull()
    .references(() => postsTable.id),
  member_id: integer()
    .notNull()
    .references(() => membersTable.id),
  member_posted_by: integer()
    .notNull()
    .references(() => membersTable.id),
  text: text().notNull(),
  parent_comment_id: integer().references(() => commentsTable.id),
  date_created: timestamp().notNull().defaultNow(),
});

export const commentsRelations = relations(commentsTable, ({ one, many }) => ({
  post: one(postsTable, {
    fields: [commentsTable.post_id],
    references: [postsTable.id],
  }),
  member: one(membersTable, {
    fields: [commentsTable.member_id],
    references: [membersTable.id],
    relationName: "members_comments",
  }),
  member_posted_by: one(membersTable, {
    fields: [commentsTable.member_posted_by],
    references: [membersTable.id],
    relationName: "comment_author",
  }),
  parent_comment: one(commentsTable, {
    fields: [commentsTable.parent_comment_id],
    references: [commentsTable.id],
    relationName: "replies",
  }),
  reply_comments: many(commentsTable, {
    relationName: "replies",
  }),
}));

export const votesTable = pgTable("votes", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  post_id: integer()
    .notNull()
    .references(() => postsTable.id),
  member_id: integer()
    .notNull()
    .references(() => membersTable.id),
  member_posted_by: integer()
    .notNull()
    .references(() => membersTable.id),
  vote_type: varchar({ length: 50 }).notNull(),
  date_created: timestamp().notNull().defaultNow(),
});

export const votesRelations = relations(votesTable, ({ one }) => ({
  post: one(postsTable, {
    fields: [votesTable.post_id],
    references: [postsTable.id],
  }),
  member: one(membersTable, {
    fields: [votesTable.member_id],
    references: [membersTable.id],
    relationName: "member_votes",
  }),
  member_posted_by: one(membersTable, {
    fields: [votesTable.member_posted_by],
    references: [membersTable.id],
    relationName: "vote_author",
  }),
}));
