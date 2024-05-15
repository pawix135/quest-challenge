import { auth } from "@/auth";
import { MiddlewareConfig, NextResponse } from "next/server";

export default auth((req) => {
	if (!req.nextUrl.pathname.includes("/dashboard") && req.auth) {
		const url = new URL("/dashboard", req.url);
		return Response.redirect(url);
	}

	if (req.nextUrl.pathname.includes("/dashboard") && !req.auth) {
		const url = req.url.replace(req.nextUrl.pathname, "/");
		return Response.redirect(url);
	}

	return NextResponse.next();
});

export const config: MiddlewareConfig = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
		"/dashboard/:path",
	],
};
