import type { User } from "./user.types";

export type Member = {
  id: number;
  user_id: number;
};

export type MemberWithUser = Member & {
  user: User;
};

export type Vote = {
  id: number;
  post_id: number;
  member_id: number;
  member_posted_by: number;
  vote_type: "Upvote" | "Downvote";
  date_created: string;
};

export type Comment = {
  id: number;
  post_id: number;
  member_id: number;
  member_posted_by: MemberWithUser;
  text: string;
  parent_comment_id: number | null;
  date_created: string;
};

export type Post = {
  id: number;
  member_id: number;
  post_type: string;
  title: string;
  content: string;
  date_created: string;
};

export type PostWithDetails = Post & {
  member_posted_by: MemberWithUser;
  comments: Comment[];
  votes: Vote[];
};
