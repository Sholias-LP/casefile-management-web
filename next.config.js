const withTM = require("next-transpile-modules")(["truparse-lodre"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  compiler: {
    styledComponents: true,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: "@svgr/webpack", options: { icon: true } }],
    });
    return config;
  },

  publicRuntimeConfig: {
    // Will be available on both server and client
    backendUrl: process.env.NEXT_PUBLIC_BASE_URL,
  },
});
