import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김상훈 Joseph Kim | Frontend Developer",
  description:
    "3년 차 프론트엔드 개발자 김상훈의 포트폴리오 — React · Next.js · TypeScript 기반 AI 플랫폼/서비스 UI 개발",
};

// FOUC 방지: 렌더 전 저장된 테마(없으면 시스템 설정) 적용
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
