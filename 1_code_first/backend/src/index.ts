import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import { Hono } from "hono";

import { config } from "dotenv";
import { generatePassword } from "./shared/helper";
import errors from "./shared/constants/errors";
import * as argon2 from "argon2";
import chalk from "chalk";

config({ path: [".env.local", ".env", ".envrc"] });

console.log(chalk.blue("url: ", process.env.DATABASE_URL));

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono();

app.get("/users", async (context) => {
  try {
    const users = await db.select().from(usersTable);

    if (context.req.query("email")) {
      let email = context.req.query("email") || "";

      const returnedUsers = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1);

      if (!returnedUsers.length) {
        return context.json(
          {
            error: errors.UserNotFound,
            data: null,
            success: false,
          },
          404
        );
      }

      const { password, ...returnedUserWithNoPassword } = returnedUsers[0];

      return context.json(
        {
          error: null,
          data: returnedUserWithNoPassword,
          success: true,
        },
        200
      );
    }

    const safeUsers = users.map(({ password, ...dataWithoutPassword }) => {
      return dataWithoutPassword;
    });

    return context.json(
      {
        error: null,
        data: safeUsers,
        success: true,
      },
      200
    );
  } catch (error) {
    return context.json(
      {
        error: errors.ServerError,
        data: null,
        success: false,
      },
      409
    );
  }
});

app.post("/users/new", async (context) => {
  const body = await context.req.parseBody();

  const hashedPassword = await argon2.hash(generatePassword());

  const user: typeof usersTable.$inferInsert = {
    username: body["username"] as string,
    first_name: body["first_name"] as string,
    last_name: body["last_name"] as string,
    email: body["email"] as string,
    password: hashedPassword,
  };

  const doesEmailExist = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, user.email))
    .limit(1);

  if (doesEmailExist.length) {
    return context.json(
      {
        error: errors.EmailAlreadyInUse,
        data: null,
        success: false,
      },
      409
    );
  }

  const doesUserNameExist = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, user.username))
    .limit(1);

  if (doesUserNameExist.length) {
    return context.json(
      {
        error: errors.UserNameAlreadyInUse,
        data: null,
        success: false,
      },
      409
    );
  }

  const result = await db.insert(usersTable).values(user).returning();

  return context.json(
    {
      error: null,
      data: result,
      success: true,
    },
    201
  );
});

app.put("/users/edit/:userId", async (context) => {
  try {
    let data = await context.req.parseBody();

    let userId: number = Number(await context.req.param().userId);

    const doesUserIdExist = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (!doesUserIdExist.length) {
      return context.json(
        {
          error: errors.UserNotFound,
          data: null,
          success: false,
        },
        409
      );
    }

    if ("password" in data) {
      data = {
        ...data,
        password: await argon2.hash(data["password"] as string),
      };
    }

    let [{ password, ...updatedUserWithoutPassword }] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, userId))
      .returning();

    return context.json(
      {
        error: null,
        data: updatedUserWithoutPassword,
        success: true,
      },
      201
    );
  } catch (error) {
    return context.json({
      error: errors.ServerError,
      data: null,
      success: false,
    });
  }
});

export default app;
