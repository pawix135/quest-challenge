import { Role } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";
import { getUserRole } from "./actions/user";
import { PrismaAdapter } from "@auth/prisma-adapter";

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			accountType: Role;
		} & DefaultSession["user"];
	}
}

import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
	interface JWT {
		accountType: Role;
	}
}

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [GoogleProvider],
	adapter: PrismaAdapter(db),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		jwt: async ({ user, token }) => {
			if (user) {
				const userId = token.sub as string;
				token.accountType = await getUserRole(userId);
			}
			return token;
		},
		session: async ({ session, token }) => {
			const userId = token.sub as string;
			session.user.id = userId;
			session.user.accountType = token.accountType;
			return session;
		},
	},
});
