import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const { session, expiresAt } = await request.json();

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(expiresAt),
        sameSite: "lax",
        path: '/',
    });

    return NextResponse.json({ sucess: true });
}