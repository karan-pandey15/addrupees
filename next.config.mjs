/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.addrupee.com",
        port: "8000",
      },
    ],
  },
};

export default nextConfig;
