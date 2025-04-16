// Make sure to install the 'postgres' package
import { drizzle } from "drizzle-orm/postgres-js";

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute("select 1");
console.log("🚀 ~ result:", result);
