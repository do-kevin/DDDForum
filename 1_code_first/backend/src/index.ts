import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import { Hono } from "hono";

import { config } from "dotenv";
import { generatePassword } from "./shared/helper";
import * as argon2 from "argon2";

config({ path: [".env.local", ".env", ".envrc"] });

console.log("url: ", process.env.DATABASE_URL);

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono();

app.get("/users", async (context) => {
  const users = await db.select().from(usersTable);

  return context.json({
    error: null,
    data: users,
    success: true,
  });
});

app.post("/users", async (context) => {
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
        error: "EmailAlreadyInUse",
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
        error: "UserNameAlreadyInUse",
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

export default app;
