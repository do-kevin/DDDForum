import db from "../db";
import { postsTable } from "../db/schema";

export const findPosts = () => {
  return db.select().from(postsTable);
};

export const findPostsAll = async () => {
  return db.query.postsTable.findMany({
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
