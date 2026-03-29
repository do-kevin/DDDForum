import { Hono } from "hono";

import UsersController from "./users.controller";

const users = new Hono();

const usersController = new UsersController();

users.get("/", usersController.getUsers);

users.post("/new", usersController.createNewUser);

users.put("/edit/:userId", usersController.editUser);

export default users;
