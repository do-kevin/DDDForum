import { Hono } from "hono";

import PostsController from "./posts.controller";

const posts = new Hono();

const postsController = new PostsController();

posts.get("/", postsController.getPosts);

export default posts;
