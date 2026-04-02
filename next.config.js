/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['img.freepik.com', 'upload.wikimedia.org', 'ipfs.io'],
  },
  async rewrites() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
  // For static export (optional, remove if using SSR)
  // output: 'export',
  // distDir: 'dist',
};

module.exports = nextConfig;
