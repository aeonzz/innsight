/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
      },
      {
        protocol: "https",
        hostname: "jolfgowviyxdrvtelayh.supabase.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
