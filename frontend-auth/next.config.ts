import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },
  sassOptions: {
    // Modern compiler seçeneği standart 'sass' paketiyle uyumludur
    modernCompiler: true, 
    silenceDeprecations: [
      "legacy-js-api",
      "import", 
      "global-builtin", 
      "color-functions", 
      "if-function"
    ],
  },
  transpilePackages: ['primereact'],
};

export default nextConfig;