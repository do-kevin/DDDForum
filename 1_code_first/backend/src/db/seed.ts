import { drizzle } from "drizzle-orm/node-postgres";
import {
  usersTable,
  membersTable,
  postsTable,
  votesTable,
  commentsTable,
} from "./schema";
import { Pool } from "pg";
import { config } from "dotenv";

config({ path: [".env.local", ".env", ".envrc"] });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

console.log("URL: ", process.env.DATABASE_URL);

const initialUsers = [
  {
    email: "bobvance@gmail.com",
    first_name: "Bob",
    last_name: "Vance",
    username: "bobvance",
    password: "123",
  },
  {
    email: "tonysoprano@gmail.com",
    first_name: "Tony",
    last_name: "Soprano",
    username: "tonysoprano",
    password: "123",
  },
  {
    email: "billburr@gmail.com",
    first_name: "Bill",
    last_name: "Burr",
    username: "billburr",
    password: "123",
  },
];

async function seed() {
  await db.delete(commentsTable);
  await db.delete(votesTable);
  await db.delete(postsTable);
  await db.delete(membersTable);
  await db.delete(usersTable);

  const [bob, tony, bill] = await db
    .insert(usersTable)
    .values(initialUsers)
    .returning();

  const [bobMember, tonyMember, billMember] = await db
    .insert(membersTable)
    .values([{ user_id: bob.id }, { user_id: tony.id }, { user_id: bill.id }])
    .returning();

  const [post1, post2, post3, post4] = await db
    .insert(postsTable)
    .values([
      {
        title: "First post!",
        content: "This is bob vances first post",
        post_type: "Text",
        member_id: bobMember.id,
        member_posted_by: bobMember.id,
      },
      {
        title: "Second post!",
        content: "This is bobs second post",
        post_type: "Text",
        member_id: bobMember.id,
        member_posted_by: bobMember.id,
      },
      {
        title: "another post",
        content: "This is tonys first post",
        post_type: "Text",
        member_id: tonyMember.id,
        member_posted_by: tonyMember.id,
      },
      {
        title: "Links",
        content: "This is a link post",
        post_type: "https://khalilstemmler.com",
        member_id: tonyMember.id,
        member_posted_by: tonyMember.id,
      },
    ])
    .returning();

  await db.insert(votesTable).values([
    {
      post_id: post1.id,
      vote_type: "Upvote",
      member_id: bobMember.id,
      member_posted_by: bobMember.id,
    },
    {
      post_id: post2.id,
      vote_type: "Upvote",
      member_id: bobMember.id,
      member_posted_by: bobMember.id,
    },
    {
      post_id: post3.id,
      vote_type: "Upvote",
      member_id: tonyMember.id,
      member_posted_by: tonyMember.id,
    },
    {
      post_id: post4.id,
      vote_type: "Upvote",
      member_id: tonyMember.id,
      member_posted_by: tonyMember.id,
    },
    {
      post_id: post3.id,
      vote_type: "Upvote",
      member_id: bobMember.id,
      member_posted_by: bobMember.id,
    },
    {
      post_id: post2.id,
      vote_type: "Downvote",
      member_id: billMember.id,
      member_posted_by: billMember.id,
    },
  ]);

  await db.insert(commentsTable).values([
    {
      text: "I posted this!",
      post_id: post1.id,
      member_id: bobMember.id,
      member_posted_by: bobMember.id,
      parent_comment_id: null,
    },
    {
      text: "Nice",
      post_id: post2.id,
      member_id: tonyMember.id,
      member_posted_by: tonyMember.id,
      parent_comment_id: null,
    },
  ]);

  console.log("✅ Seed complete");
}

seed()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => process.exit(0));
