import type { NextConfig } from "next";

// GitHub Pages 배포 시: 저장소 이름이 곧 basePath가 됩니다.
// 예) https://<username>.github.io/portfolio/ 로 배포하려면 저장소 이름을 portfolio로.
const isProd = process.env.NODE_ENV === "production";
const repoName = "portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? `/${repoName}` : "",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
