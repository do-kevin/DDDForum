import { eq } from "drizzle-orm";
import db from "../db";
import { usersTable } from "../db/schema";

export const findUsers = () => {
  return db.select().from(usersTable);
};

export const findUserById = (id: number) => {
  return db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
};

export const findUserByEmail = (email: string) => {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);
};

export const findUserByUsername = (username: string) => {
  return db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username))
    .limit(1);
};

export const createUser = (user: typeof usersTable.$inferInsert) => {
  return db.insert(usersTable).values(user).returning();
};

export const updateUserById = (
  id: number,
  data: Partial<typeof usersTable.$inferInsert>
) => {
  return db
    .update(usersTable)
    .set(data)
    .where(eq(usersTable.id, id))
    .returning();
};
