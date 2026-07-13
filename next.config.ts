import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 静态导出模式 - 输出到 dist 文件夹，可直接部署到 Netlify
  output: "export",
  distDir: "dist",
  images: {
    // 静态导出时禁用图片优化，使用本地原始资源
    unoptimized: true,
  },
  // 确保尾部斜杠一致，便于静态托管
  trailingSlash: true,
};

export default nextConfig;
