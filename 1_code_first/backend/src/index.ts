import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import { Hono } from "hono";

import { config } from "dotenv";

config({ path: [".env.local", ".env", ".envrc"] });

console.log("url: ", process.env.DATABASE_URL);

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono();

app.get("/users", async (context) => {
  const users = await db.select().from(usersTable);

  return context.json({
    ok: true,
    data: users,
  });
});

app.post("/users", async (context) => {
  const body = await context.req.parseBody();

  const user: typeof usersTable.$inferInsert = {
    name: body["name"] as string,
    age: Number(body["age"]),
    email: body["email"] as string,
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

  await db.insert(usersTable).values(user);

  const result = await db.select().from(usersTable).where(eq(usersTable, user));

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
