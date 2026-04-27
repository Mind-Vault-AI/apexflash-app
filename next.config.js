/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      { source: '/signin', destination: '/auth/signin', permanent: false },
      { source: '/login', destination: '/auth/signin', permanent: false },
      { source: '/signup', destination: '/auth/signin', permanent: false },
      { source: '/register', destination: '/auth/signin', permanent: false },
      { source: '/premium', destination: '/#pricing', permanent: false },
    ];
  },
};

module.exports = nextConfig;
