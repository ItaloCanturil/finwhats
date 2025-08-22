import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./app/_db/schema.ts",
	out: "./app/_db/migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
	},
});
