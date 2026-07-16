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
  // 일반 <a href>에는 basePath가 자동으로 붙지 않으므로,
  // public/ 정적 파일 링크에 쓸 수 있게 클라이언트에 노출
  env: {
    NEXT_PUBLIC_BASE_PATH: isProd ? `/${repoName}` : "",
  },
};

export default nextConfig;
