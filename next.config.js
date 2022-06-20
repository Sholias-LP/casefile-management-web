const withTM = require("next-transpile-modules")(["truparse-lodre"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  compiler: {
    styledComponents: true,
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
