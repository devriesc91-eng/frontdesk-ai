/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    // Allow the embeddable widget to be loaded cross-origin from client sites.
    return [
      {
        source: "/embed.js",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
      {
        source: "/api/chat",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },
};
export default nextConfig;
