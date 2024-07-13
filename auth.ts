import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import authConfig from "./auth.config"
import { db } from "./lib/db"
 
const prisma = new PrismaClient()
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
        await db.user.update({
            where: { id: user.id },
            data: { emailVerified: new Date() }
        })
    }
  },
  callbacks: {
      async session({ token, session }) {
          if (token.sub && session.user) {
              session.user.id = token.sub
          }
          return session
      },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
})