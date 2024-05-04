/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'www.gravatar.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' }
    ]
  }
};

export default nextConfig;
