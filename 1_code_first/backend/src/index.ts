import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";

import users from "./users/users.route";

const app = new Hono();
app.use("/*", cors());

app.use("/*", async (c, next) => {
  await next();
});

app.route("/users", users);

export default app;
