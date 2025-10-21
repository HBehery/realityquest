import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { sql } from "@vercel/postgres";
import { compare } from "bcrypt";

const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!usernameRegex.test(credentials?.username || "")) {
          throw new Error("InvalidUsername");
        }

        const response = await sql`
        SELECT id, username, password, profile_photo FROM users WHERE username=${credentials?.username}`;
        const user = response.rows[0];

        if (user) {
          const passwordCorrect = await compare(
            credentials?.password || "",
            user.password
          );

          if (passwordCorrect) {
            return {
              id: user.id,
              username: user.username,
              image: user.profile_photo,
            };
          } else {
            throw new Error("IncorrectPassword");
          }
        }

        throw new Error("UserNotFound");
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = user;
      }

      // Refresh user data from database when session is updated
      if (trigger === "update" && token.user) {
        const userResponse = await sql`
          SELECT id, username, profile_photo FROM users WHERE id=${
            (token.user as any).id
          }
        `;

        if (userResponse.rows[0]) {
          token.user = {
            ...(token.user as any),
            image: userResponse.rows[0].profile_photo,
          };
        }
      }

      return token;
    },
  },
};
