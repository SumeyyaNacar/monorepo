import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");
  const isLoginPage = nextUrl.pathname.startsWith("/login");

  // 1. Kullanıcı giriş yapmışken /login'e gitmek isterse /dashboard'a gönder
  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }

  // 2. Giriş yapmamış kullanıcı dashboard'a gitmek isterse /login'e gönder
  if (isDashboardPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Middleware'in çalışacağı rotalar (Performans için optimize edildi)
  matcher: ["/dashboard/:path*", "/login", "/register"],
};