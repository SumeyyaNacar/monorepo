import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "./services/auth-service";
import { getIsTokenValid } from "./helpers/auth-helper";

const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const res = await login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          const data = await res.json();

          if (!res.ok || !data.user) return null;

          const { user } = data;

          return {
            id: user.id.toString(),
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            token: user.token,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // Sadece yetki kontrolü yapar, yönlendirme yapmaz (404'ü engeller)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboardPage = nextUrl.pathname.startsWith("/dashboard");

      if (isDashboardPage) {
        return isLoggedIn; // Giriş yapmamışsa otomatik olarak pages.signIn'e atar
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.accessToken = (user as any).token;
      }
      return token;
    },

    async session({ session, token }) {
      const isAPITokenValid = getIsTokenValid(token.accessToken as string);

      if (!isAPITokenValid) {
        return { ...session, user: undefined } as any;
      }

      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).accessToken = token.accessToken as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Hata veya yetkisizlik durumunda gidilecek yer
  },

  trustHost: true,
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(config);