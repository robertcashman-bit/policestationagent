import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { SignJWT } from "jose";

// Authorized Google account email (Robert Cashman)
const AUTHORIZED_EMAIL =
  process.env.AUTHORIZED_GOOGLE_EMAIL || "robertcashman@defencelegalservices.co.uk";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Restrict access to single authorized Google account
      if (user.email && user.email.toLowerCase() === AUTHORIZED_EMAIL.toLowerCase()) {
        return true;
      }
      // Block all other users
      return false;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Create JWT token for admin access
        const adminToken = await new SignJWT({
          userId: user.id || user.email,
          username: user.email || "admin",
          email: user.email,
        })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("24h")
          .sign(secret);

        // Store token in cookie
        const cookieStore = await cookies();
        cookieStore.set("auth-token", adminToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60 * 24, // 24 hours
        });
      }
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  pages: {
    signIn: "/admin/blog-generator",
    error: "/admin/blog-generator?error=unauthorized",
  },
});

// Export AUTHORIZED_EMAIL for use in other files
export { AUTHORIZED_EMAIL };
