import { db } from '@/lib/db';
import { AuthOptions, ISODateString, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

export interface CustomSession {
  user?: CustomUser;
  expires: ISODateString;
}
export interface CustomUser {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}
export const authOptions: AuthOptions = {
  pages: {
    signIn: '/login'
  },
  secret: process.env.NEXT_AUTH_SECRET as string,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }: { session: CustomSession; token: JWT; user: User }) {
      session.user = token.user as CustomUser;
      return session;
    }
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials?.email.toLowerCase()
          }
        });

        if (!user || !user.password) {
          throw new Error('Invalid credentials');
        }

        const validPass = await bcrypt.compare(credentials?.password, user?.password);

        if (!validPass) {
          throw new Error('Invalid credentials');
        }

        return user;
      }
    })
  ]
};
