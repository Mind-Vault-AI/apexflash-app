import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import crypto from 'crypto';

const handler = NextAuth({
  providers: [
    // Google OAuth
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          }),
        ]
      : []),

    // Telegram Login (via credentials — validates Telegram hash)
    CredentialsProvider({
      id: 'telegram',
      name: 'Telegram',
      credentials: {
        id: { type: 'text' },
        first_name: { type: 'text' },
        last_name: { type: 'text' },
        username: { type: 'text' },
        photo_url: { type: 'text' },
        auth_date: { type: 'text' },
        hash: { type: 'text' },
      },
      async authorize(credentials) {
        if (!credentials?.id || !credentials?.hash) return null;

        // Verify Telegram login hash
        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        if (!botToken) return null;

        const secret = crypto.createHash('sha256').update(botToken).digest();
        const checkString = Object.keys(credentials)
          .filter((k) => k !== 'hash')
          .sort()
          .map((k) => `${k}=${credentials[k as keyof typeof credentials]}`)
          .join('\n');

        const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');

        if (hmac !== credentials.hash) {
          // In dev, allow without hash verification
          if (process.env.NODE_ENV === 'development') {
            return {
              id: credentials.id,
              name: `${credentials.first_name || ''} ${credentials.last_name || ''}`.trim() || 'Telegram User',
              image: credentials.photo_url || null,
              email: null,
            };
          }
          return null;
        }

        // Check auth_date is recent (within 1 day)
        const authDate = parseInt(credentials.auth_date || '0');
        if (Date.now() / 1000 - authDate > 86400) return null;

        return {
          id: credentials.id,
          name: `${credentials.first_name || ''} ${credentials.last_name || ''}`.trim() || 'Telegram User',
          image: credentials.photo_url || null,
          email: null,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET || 'apexflash-secret-change-in-production',
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // Kaizen: Assign admin role if user ID is in the admin list
        const adminIds = (process.env.ADMIN_IDS || '').split(',').map(id => id.trim());
        token.role = adminIds.includes(String(user.id)) ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
