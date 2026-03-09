/** @type {import('next').NextConfig} */

const isStatic = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  output: isStatic ? 'export' : undefined,
  images: {
    unoptimized: isStatic,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "coresg-normal.trae.ai",
        pathname: "/api/ide/v1/text_to_image",
      },
    ],
  },
};

export default nextConfig;
