/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "realityquest-pfps.s3.us-east-2.amazonaws.com",
        port: "",
        pathname: "/avatars/**",
      },
    ],
  },
};

export default nextConfig;
