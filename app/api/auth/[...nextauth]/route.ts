// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

const allowedEmails = process.env.ALLOWED_EMAILS?.split(",") || [];

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      if (user.email && allowedEmails.includes(user.email)) {
        return true; // Allow sign-in
      } else {
        // Deny sign-in and redirect with an error message
        return "/?error=denied";
      }
    },

    async redirect({ url, baseUrl }) {
      // Redirect the user to `/dashboard` after login
      if (url === baseUrl) {
        return `${baseUrl}/dashboard`; // Redirect to dashboard after successful login
      }
      return url;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
