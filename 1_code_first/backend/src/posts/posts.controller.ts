import errors from "../shared/constants/errors";
import type { Context, Next } from "hono";
import * as PostsModel from "./posts.model";

class PostsController {
  getPosts = async (context: Context, _next: Next) => {
    try {
      const posts = await PostsModel.findPosts();
      return context.json(
        {
          error: null,
          data: posts,
          success: true,
        },
        200
      );
    } catch (error) {
      console.log(error);
      return context.json(
        {
          error: errors.ServerError,
          data: null,
          success: false,
        },
        500
      );
    }
  };
  getPostsAll = async (context: Context, _next: Next) => {
    try {
      const posts = await PostsModel.findPostsAll();
      return context.json(
        {
          error: null,
          data: posts,
          success: true,
        },
        200
      );
    } catch (error) {
      console.log(error);
      return context.json(
        {
          error: errors.ServerError,
          data: null,
          success: false,
        },
        500
      );
    }
  };
}

export default PostsController;
