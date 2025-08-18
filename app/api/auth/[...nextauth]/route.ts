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
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await LoginSchema.parseAsync(credentials);

          const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
          });

          const data = await res.json();
        
          if (data?.data?.[0]) {
            return {
                id: data.data[0].id,
                name: data.data[0].pharmacyName,
                email: data.data[0].email,
                role: data.data[0].role || 'pharmary-admin'
            }; // must return an object {id, name, email, role}
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
    signIn: "/pharmacy/login", // custom login page
  },
  secret: process.env.NEXTAUTH_SECRET,
  
};

const handler = NextAuth(authOptions);

// 🔹 App Router requires named exports for HTTP methods
export { handler as GET, handler as POST };
