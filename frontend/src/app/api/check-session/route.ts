import { cookies } from "next/headers";
import { verifySession } from "@/app/lib/auth/sessions";
import { NextResponse } from "next/server";

export async function GET() {
    const sessionToken = (await cookies()).get("session")?.value;

    if (!sessionToken) {
        return NextResponse.json({ isAuthenticated: false}, { status: 401 });
    }

    const session = await verifySession(sessionToken);

    if (!session) {
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }

    return NextResponse.json({
        isAuthenticated: true,
        user: {
            username: session.username,
            is_superuser: session.isSuperuser,
            userId: session.userId
        },
    });
}