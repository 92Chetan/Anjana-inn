/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'http', hostname: 'www.gravatar.com' }]
  }
};

export default nextConfig;
