import { runAgent } from "@/_lib/agent";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({
            headers: req.headers,
        });

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const response = await runAgent(message);
        return NextResponse.json({ response });
    } catch (error) {
        console.error("Error in chat API:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
