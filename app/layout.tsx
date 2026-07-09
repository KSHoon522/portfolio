import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "김상훈 Joseph Kim | Frontend Developer",
  description:
    "3년 차 프론트엔드 개발자 김상훈의 포트폴리오 — React · Next.js · TypeScript 기반 AI 플랫폼/서비스 UI 개발",
};

// FOUC 방지: 렌더 전 저장된 테마 적용 (기본은 다크)
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="light")document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;700&display=swap"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
