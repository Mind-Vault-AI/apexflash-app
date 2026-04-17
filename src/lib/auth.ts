import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// ISO 9001 resilience: only register Google provider when credentials are
// present. Without this guard, next-auth initializes GoogleProvider with
// undefined clientId/clientSecret and /api/auth/session returns HTTP 500.
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers: NextAuthOptions['providers'] = [];
if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

export const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async session({ session, token }) {
      // Pass user ID to session so client components can access it
      if (session.user && token.sub) {
        (session.user as typeof session.user & { id: string }).id = token.sub;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
