import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/_db/drizzle";
import { users, session, account, verification } from "@/_db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: {
            user: {
                tableName: "users",
                fields: {
                    id: "user_id",
                    name: "name",
                    email: "email",
                    phone: "phone",
                    emailVerified: "emailVerified",
                    image: "image",
                    createdAt: "created_at",
                    updatedAt: "updated_at",
                },
            },
            session,
            account,
            verification,
        },
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 days
        updateAge: 60 * 60 * 24, // 1 day
    },
});
