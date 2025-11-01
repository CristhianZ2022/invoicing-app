import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import z from "zod";

const userCredentials = z.object({
  email: z.email(),
  password: z.string().min(6),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log("Authorizing user with credentials:", credentials);

        const parseCredentials = userCredentials.safeParse(credentials);

        if (!parseCredentials.success) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = parseCredentials.data;

        try {
          const login = await fetch(`${process.env.BACKEND_URL}auth/login`, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
          });

          if (login.status !== 200) {
            throw new Error(
              `Failed to authenticate user. Status code: ${login.status}`
            );
          }

          const user = await login.json();
          console.log("Login successful:", user);

          return user;
        } catch (error) {
          throw new Error(`Failed to authenticate user. ${error}`);
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      console.log("Redirect callback:", { url, baseUrl });
      const callbackUrl = new URL(url).searchParams.get("callbackUrl");
      return callbackUrl || baseUrl + "/dashboard";
    },
    jwt: async ({ token, user, trigger }) => {
      console.log("token:", token);
      console.log("user:", user);
      console.log("trigger:", trigger);

      if (trigger === "signIn" && user) {
        token.id = user.id;
        token.token = user.token;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;
      session.user.token = token.token as string;
      
      return session;
    },
  },
  debug: true,
});
