import { relations } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const dbSchema = p.pgSchema("main");

// Better Auth compatible user table (replaces the existing users table)
export const user = dbSchema.table("user", {
	id: p.text("id").primaryKey(),
	name: p.text("name").notNull(),
	phone: p.text("phone").notNull().unique(),
	email: p.text("email").notNull().unique(),
	emailVerified: p.boolean("email_verified").default(false).notNull(),
	image: p.text("image"),
	createdAt: p.timestamp("created_at").defaultNow().notNull(),
	updatedAt: p.timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// Better Auth tables
export const session = dbSchema.table("session", {
	id: p.text("id").primaryKey(),
	expiresAt: p.timestamp("expires_at").notNull(),
	token: p.text("token").notNull().unique(),
	createdAt: p.timestamp("created_at").defaultNow().notNull(),
	updatedAt: p.timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull(),
	ipAddress: p.text("ip_address"),
	userAgent: p.text("user_agent"),
	userId: p.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = dbSchema.table("account", {
	id: p.text("id").primaryKey(),
	accountId: p.text("account_id").notNull(),
	providerId: p.text("provider_id").notNull(),
	userId: p.text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: p.text("access_token"),
	refreshToken: p.text("refresh_token"),
	idToken: p.text("id_token"),
	accessTokenExpiresAt: p.timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: p.timestamp("refresh_token_expires_at"),
	scope: p.text("scope"),
	password: p.text("password"),
	createdAt: p.timestamp("created_at").defaultNow().notNull(),
	updatedAt: p.timestamp("updated_at")
		.$onUpdate(() => new Date())
		.notNull(),
});

export const verification = dbSchema.table("verification", {
	id: p.text("id").primaryKey(),
	identifier: p.text("identifier").notNull(),
	value: p.text("value").notNull(),
	expiresAt: p.timestamp("expires_at").notNull(),
	createdAt: p.timestamp("created_at").defaultNow().notNull(),
	updatedAt: p.timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
});

// Your existing business tables (updated to reference the new user table)
export const expenseTable = dbSchema.table("expenses", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.text("user_id").references(() => user.id), // Changed from UUID to text
	category: p.text("category").notNull(),
	amount: p.decimal({ precision: 10, scale: 2 }).notNull(),
	updated_at: p.timestamp({ withTimezone: true }),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const expenseCategories = dbSchema.table("expense_categories", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	name: p.text("name").notNull(),
});

export const goalsTable = dbSchema.table("goals", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.text("user_id").references(() => user.id), // Changed from UUID to text
	name: p.text("name").notNull(),
	target_amount: p.decimal({ precision: 10, scale: 2 }).notNull(),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const subscriptionPeriodEnum = dbSchema.enum("subscription_billing_period", [
	"monthly",
	"annual",
]);

export const subscriptionStatusEnum = dbSchema.enum("subscription_status_type", [
	"active",
	"inactive",
	"canceled",
]);

export const subscriptions = dbSchema.table("subscriptions", {
	id: p.uuid().defaultRandom().primaryKey().notNull(),
	user_id: p.text("user_id").references(() => user.id), // Changed from UUID to text
	stripe_subscription_id: p.text().unique(),
	status: subscriptionStatusEnum("status").notNull(),
	period: subscriptionPeriodEnum("billing").notNull(),
	updated_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
	created_at: p.timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// Relations
export const expenseCategoryRelations = relations(expenseCategories, ({ many }) => ({
	expenses: many(expenseTable),
}));

export const expenseRelations = relations(expenseTable, ({ one }) => ({
	category: one(expenseCategories, {
		fields: [expenseTable.category],
		references: [expenseCategories.name],
	}),
	user: one(user, {
		fields: [expenseTable.user_id],
		references: [user.id],
	}),
}));

export const goalRelations = relations(goalsTable, ({ one, many }) => ({
	user: one(user, {
		fields: [goalsTable.user_id],
		references: [user.id],
	}),
	expenses: many(expenseTable),
}));

export const userRelations = relations(user, ({ many }) => ({
	subscriptions: many(subscriptions),
	expenses: many(expenseTable),
	goals: many(goalsTable),
}));
