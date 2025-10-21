import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      username: string;
      image?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    username: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      image?: string | null;
    };
  }
}
