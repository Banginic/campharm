import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      region: string;
      town: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    region: string;
    town: string;
    role: string;
  }

  interface JWT {
    id: string;
    region: string;
    town: string;
    role: string;
  }
}