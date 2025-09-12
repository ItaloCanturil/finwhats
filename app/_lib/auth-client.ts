"use client";

import db from "@/_db/drizzle";
import { betterAuth } from "better-auth";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
});

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    database: {
        type: "drizzle",
        db: db,
    },
    trustedOrigins: [
        "http://localhost:3000",
        "https://whatsapp-finance.vercel.app",
    ],    
});

export type AuthType = typeof auth;

export const {
    signUp,
    signIn,
    signOut,
    useSession,
    getSession,
} = authClient;
