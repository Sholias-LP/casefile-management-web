const withTM = require("next-transpile-modules")(["truparse-lodre"]);

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
  webpack5: true,
  compiler: {
    styledComponents: true,
  },
});
