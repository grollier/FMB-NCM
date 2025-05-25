import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
	const session = request.cookies.get("session")?.value;
	const { pathname } = request.nextUrl;

	if (pathname.startsWith("/auth")) {
		if (session) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		}
		return NextResponse.next();
	}

	if (pathname.startsWith("/dashboard")) {
		if (!session) {
			return NextResponse.redirect(new URL("/auth/login", request.url));
		}

		try {
			const response = await fetch(
				`${request.nextUrl.origin}/api/check-session`,
				{
					headers: { Cookie: `session=${session}` },
				},
			);

			if (!response.ok) {
				throw new Error("Invalid session");
			}
		} catch (error) {
			const response = NextResponse.redirect(
				new URL("/auth/login", request.url),
			);
			response.cookies.delete("session");
			return response;
		}
	}

	return NextResponse.next();
}
