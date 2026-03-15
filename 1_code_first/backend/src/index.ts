import "dotenv/config";
import { Hono } from "hono";

import users from "./users/users.route";

const app = new Hono();

app.route("/users", users);

export default app;
