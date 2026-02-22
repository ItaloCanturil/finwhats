import { auth } from "../../../../auth";
import { toNextJsHandler } from "better-auth/next-js";
import { authRateLimiter } from "@/lib/rate-limit";
import { NextRequest, NextResponse } from "next/server";

const { GET: authGET, POST: authPOST } = toNextJsHandler(auth);

function getClientIp(request: NextRequest): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        request.headers.get("x-real-ip") ??
        "unknown"
    );
}

export async function GET(request: NextRequest) {
    return authGET(request);
}

export async function POST(request: NextRequest) {
    const ip = getClientIp(request);
    const { allowed, retryAfterSeconds } = authRateLimiter.check(ip);

    if (!allowed) {
        return NextResponse.json(
            { error: "Too many requests. Please try again later." },
            {
                status: 429,
                headers: {
                    "Retry-After": String(retryAfterSeconds),
                },
            }
        );
    }

    return authPOST(request);
}