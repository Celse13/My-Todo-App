import NextAuth from 'next-auth';
import authConfig from './auth.config';
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import db from "@/database/drizzle";

export const { auth, handlers, signIn, signOut } = NextAuth({
    ...authConfig,
    session: { strategy: 'jwt' },
    adapter: DrizzleAdapter(db),
    callbacks: {
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.sub as string;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.sub = user.id;
            }
            return token;
        }
    }
});
