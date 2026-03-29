import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import chalk from "chalk";

config({ path: [".env.local", ".env", ".envrc"] });

const db = drizzle(process.env.DATABASE_URL!);

console.log(chalk.blue("url: ", process.env.DATABASE_URL));

export default db;
