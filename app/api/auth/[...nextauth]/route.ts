// app/api/auth/[...nextauth]/route.ts
import { LoginSchema } from "@/schemas/pharmacyAuth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            }
          );

          const data = await res.json();

          if (res.ok && data?.data?.[0]) {
            return {
              id: data.data[0].id,
              region: data.data[0].region,
              town: data.data[0].town,
              role: data.data[0].role || "pharmary-admin",
            };
          }

          return null;
        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/pharmacy/login",
  },
  secret: process.env.NEXTAUTH_SECRET,

  // 👇 Add this
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      // First login → attach custom fields
      if (user) {
        token.id = user.id;
        token.region = user.region;
        token.town = user.town;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      // Attach fields from token to session.user
      session.user = {
        id: token.id,
        region: token.region,
        town: token.town,
        role: token.role,
      };
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
