import type { Post } from "~/components/PostsList";

export const getPostsStub = (): Post[] => {
  return [
    {
      title: "First post",
      date_created: "2023-07-10T08:20:22.243Z",
      member_posted_by: {
        user: {
          username: "@john",
        },
      },
      comments: [],
      votes: [
        {
          id: 1,
          post_id: 1,
          vote_type: "Upvote",
        },
      ],
    },
    {
      title: "Second post",
      date_created: "2023-07-11T08:20:22.243Z",
      member_posted_by: {
        user: {
          username: "@kevin",
        },
      },
      comments: [],
      votes: [
        {
          id: 1,
          post_id: 2,
          vote_type: "Downvote",
        },
        {
          id: 2,
          post_id: 2,
          vote_type: "Downvote",
        },
      ],
    },
    {
      title: "Third post",
      date_created: "2023-07-14T08:20:22.243Z",
      member_posted_by: {
        user: {
          username: "@john",
        },
      },
      comments: [],
      votes: [],
    },
  ];
};
