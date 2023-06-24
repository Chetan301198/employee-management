/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  async headers() {
    return [
      {
        source: "/api/user",
        headers: [
          {
            key: "host",
            value: "https://empfs.netlify.app",
          },
          {
            key: "Accept",
            value: "application/json, application/xml",
          },
          {
            key: "Cache-Control",
            value: "no-cache",
          },
          {
            key: "Accept-Charset",
            value: "UTF-8",
          },
        ],
      },
      {
        source: "/api/user/:userId",
        headers: [
          {
            key: "host",
            value: "https://empfs.netlify.app",
          },
          {
            key: "Accept",
            value: "application/json, application/xml",
          },
          {
            key: "Cache-Control",
            value: "no-cache",
          },
          {
            key: "Accept-Charset",
            value: "UTF-8",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
