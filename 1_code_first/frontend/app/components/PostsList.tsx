import arrow from "assets/arrow.svg";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link } from "react-router";
import type { PostWithDetails } from "~/shared/post.types";

dayjs.extend(relativeTime);

type Vote = {
  id: number;
  post_id: number;
  vote_type: "Upvote" | "Downvote";
};

type Comment = {};

export type Post = {
  title: string;
  date_created: string;
  member_posted_by: any;
  comments: Comment[];
  votes: Vote[];
};

function computeVoteCount(votes: Vote[]) {
  let count = 0;
  votes.forEach((v) => (v.vote_type === "Upvote" ? count++ : count--));
  return count;
}

export const PostsList = ({ posts }: { posts: PostWithDetails[] }) => {
  return (
    <div className="posts-list">
      {posts.map((post, key) => {
        return (
          <div className="post-item mb-6" key={key}>
            <div className="post-item-votes">
              <div className="post-item-upvote">
                <img src={arrow} alt="Upvote arrow" />
              </div>
              <div>{computeVoteCount(post.votes)}</div>
              <div className="post-item-downvote">
                <img src={arrow} alt="Upvote arrow" />
              </div>
            </div>
            <div className="post-item-content">
              <div className="post-item-title">{post.title}</div>
              <div className="post-item-details">
                <div>{dayjs(post.date_created).fromNow(true)}</div>
                <div className="inline-block">
                  by{" "}
                  <Link
                    to={`/member/${post.member_posted_by.user.username}`}
                    className="underline text-blue-700"
                  >
                    {post.member_posted_by.user.username}
                  </Link>
                </div>

                <div>
                  {post.comments.length}{" "}
                  {post.comments.length !== 1 ? `comments` : "comment"}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
