import { Hono } from "hono";

import PostsController from "./posts.controller";

const posts = new Hono();

const postsController = new PostsController();

posts.get("/", postsController.getPosts);
posts.get("/all", postsController.getPostsAll);

export default posts;
