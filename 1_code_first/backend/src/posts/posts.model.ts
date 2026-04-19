import { desc } from "drizzle-orm";
import db from "../db";
import { postsTable } from "../db/schema";

export const findPosts = () => {
  return db.query.postsTable.findMany({
    orderBy: desc(postsTable.title),
    with: {
      member_posted_by: {
        with: {
          user: true,
        },
      },
      comments: {
        with: {
          member_posted_by: {
            with: {
              user: true,
            },
          },
        },
      },
      votes: true,
    },
  });
};

export const findRecentPosts = async () => {
  return db.query.postsTable.findMany({
    orderBy: desc(postsTable.date_created),
    with: {
      member_posted_by: {
        with: {
          user: true,
        },
      },
      comments: {
        with: {
          member_posted_by: {
            with: {
              user: true,
            },
          },
        },
      },
      votes: true,
    },
  });
};
