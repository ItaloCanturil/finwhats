import * as p from "drizzle-orm/pg-core";

export const subscriptionStatusEnum = p.pgEnum("status", [
	"active",
	"inactive",
	"canceled",
]);

export const usersTable = p.pgTable("users", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.text("user_id").unique().notNull(),
	phone: p.text("phone").unique(),
	updated_at: p.timestamp({ withTimezone: true }),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const expenseTable = p.pgTable("expenses", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.uuid().references(() => usersTable.id),
	category: p.text("category").notNull(),
	amount: p.decimal({ precision: 10, scale: 2 }).notNull(),
	updated_at: p.timestamp({ withTimezone: true }),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const goalsTable = p.pgTable("goals", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.uuid().references(() => usersTable.id),
	name: p.text("name").notNull(),
	target_amount: p.decimal({ precision: 10, scale: 2 }).notNull(),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const subscriptions = p.pgTable("subscriptions", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.uuid().references(() => usersTable.id),
	stripe_subscription_id: p.text().unique(),
	status: subscriptionStatusEnum("status").notNull(),
	updated_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});
