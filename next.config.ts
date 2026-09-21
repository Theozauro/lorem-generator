import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every public route is emitted as HTML at build time. The generator itself
  // remains interactive because its state and text generation run in the browser.
  output: "export",
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
