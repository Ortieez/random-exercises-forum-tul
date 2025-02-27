import { type NextRequest, NextResponse } from "next/server";
import type { auth } from "./app/lib/auth";
import { betterFetch } from "@better-fetch/fetch";

type Session = typeof auth.$Infer.Session;
const PUBLIC_FILE = /\.(.*)$/;
const ONLY_MAIN_PAGE = /^\/$/;

export async function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	const sessionCookie = request.headers.get("cookie") || null;

	if (
		pathname.startsWith("/_next") || // exclude Next.js internals
		pathname.startsWith("/api") || //  exclude all API routes
		pathname.startsWith("/static") || // exclude static files
		PUBLIC_FILE.test(pathname) || // exclude all files in the public folder
		ONLY_MAIN_PAGE.test(pathname) // exclude the main page
	)
		return NextResponse.next();

	const { data: session } = await betterFetch<Session>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				cookie: sessionCookie || "",
			},
		},
	);

	if (pathname.includes("/admin")) {
		if (!sessionCookie) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (!session) {
			return NextResponse.redirect(new URL("/login", request.url));
		}

		if (!session.user.role || session.user.role !== "admin") {
			return NextResponse.redirect(new URL("/", request.url));
		}
	}

	return NextResponse.next();
}
