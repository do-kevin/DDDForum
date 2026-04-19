import type { PostWithDetails } from "~/shared/post.types";

export const getPostsStub = (): PostWithDetails[] => {
  return [
    {
      id: 1,
      title: "First post!",
      content: "This is bob vances first post",
      post_type: "Text",
      member_id: 1,
      date_created: "2026-03-29T17:48:00.647Z",
      member_posted_by: {
        id: 1,
        user_id: 1,
        user: {
          id: 1,
          username: "bobvance",
          firstName: "Bob",
          lastName: "Vance",
          email: "bobvance@gmail.com",
          password: "",
        },
      },
      comments: [
        {
          id: 1,
          post_id: 1,
          member_id: 1,
          text: "I posted this!",
          parent_comment_id: null,
          date_created: "2026-03-29T17:48:00.649Z",
          member_posted_by: {
            id: 1,
            user_id: 1,
            user: {
              id: 1,
              username: "bobvance",
              firstName: "Bob",
              lastName: "Vance",
              email: "bobvance@gmail.com",
              password: "",
            },
          },
        },
      ],
      votes: [
        {
          id: 1,
          post_id: 1,
          member_id: 1,
          member_posted_by: 1,
          vote_type: "Upvote",
          date_created: "2026-03-29T17:48:00.648Z",
        },
      ],
    },
  ];
};
