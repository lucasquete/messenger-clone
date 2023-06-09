import bcypt from "bcrypt";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import client from "@/app/libs/prismadb";

export const authOptions = {
    adapter: PrismaAdapter(client),
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      CredentialsProvider({
        name: "credentials",
        credentials: {
            email: { label: "email", type: "text" },
            password: {label: "password", type: "password"}
        },
        async authorize(credentials) {
            if (!credentials?.email || !credentials?.password) {
                throw new Error("Invalid Credentials")
            }

            const user = await client.user.findUnique({
                where: {
                    email: credentials.email
                }
            });

            if (!user || !user.hashedPassword) {
                throw new Error("Invalid Credentials")
            }

            const isCorrectPassword = await bcypt.compare(credentials.password, user.hashedPassword);

            if (!isCorrectPassword) {
                throw new Error("Invalid Credentials")
            }

            return user;
        }
      })
    ],
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };
  
    const handler = NextAuth(authOptions);
  
  export { handler as GET, handler as POST };