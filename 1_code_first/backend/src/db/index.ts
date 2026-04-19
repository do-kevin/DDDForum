import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import chalk from "chalk";
import { Pool } from "pg";
import * as schema from "./schema";

config({ path: [".env.local", ".env", ".envrc"] });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

console.log(chalk.blue("url: ", process.env.DATABASE_URL));

export default db;
