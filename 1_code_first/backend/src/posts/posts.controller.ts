import errors from "../shared/constants/errors";
import type { Context, Next } from "hono";
import * as PostsModel from "./posts.model";

type PostResult = Awaited<ReturnType<typeof PostsModel.findPosts>>[number];
type VoteResult = PostResult["votes"][number];

const getScore = (votes: VoteResult[]) => {
  return votes.reduce((count, vote) => {
    if (vote.vote_type === "Upvote") {
      return count + 1;
    }

    if (vote.vote_type === "Downvote") {
      return count - 1;
    }

    return count;
  }, 0);
};

class PostsController {
  getPosts = async (context: Context, _next: Next) => {
    try {
      let posts: Awaited<ReturnType<typeof PostsModel.findPosts>> = [];
      if (context.req.query("sort") && context.req.query("sort") === "recent") {
        posts = await PostsModel.findRecentPosts();
      } else {
        posts = await PostsModel.findPosts();
        posts = posts.sort((a, b) => getScore(b.votes) - getScore(a.votes));
      }
      return context.json({ error: null, data: posts, success: true }, 200);
    } catch (error) {
      console.log(error);
      return context.json(
        { error: errors.ServerError, data: null, success: false },
        500
      );
    }
  };
}

export default PostsController;
