import Link from "next/link";

/**
 * 커스텀 404 — MotionSites "404 Planet" 프롬프트 번안.
 * 배경 영상 대신 CSS 행성 호라이즌 + 별(모두 자체 렌더링, 외부 에셋 없음).
 * 정적 export 시 out/404.html 로 생성되어 GitHub Pages가 자동 사용.
 */

const STARS = [
  [8, 12, 2], [18, 28, 1], [26, 8, 1.5], [34, 22, 1], [44, 10, 2], [55, 30, 1],
  [63, 14, 1.5], [72, 26, 1], [81, 9, 2], [90, 20, 1], [12, 45, 1], [30, 40, 1.5],
  [48, 44, 1], [68, 42, 1.5], [86, 46, 1], [95, 35, 1.5], [5, 60, 1], [22, 58, 1],
] as const;

export default function NotFound() {
  return (
    <div className="dark relative flex min-h-svh flex-col overflow-hidden bg-[#0b0c0e] text-[#eae8e3]">
      {/* 별 */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {STARS.map(([x, y, s], i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white/70"
            style={{ left: `${x}%`, top: `${y}%`, width: s, height: s, opacity: 0.3 + (i % 5) * 0.14 }}
          />
        ))}
      </div>

      {/* 행성 호라이즌 — 하단에서 떠오르는 원호 + 라임 대기광 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[45vh] overflow-hidden" aria-hidden>
        <div
          className="absolute left-1/2 top-[30%] h-[160vw] w-[160vw] -translate-x-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, #1a2030 0%, #10141d 35%, #0b0c0e 70%)",
            boxShadow:
              "0 -2px 24px rgba(198,242,78,0.35), 0 -14px 80px rgba(198,242,78,0.12), 0 -40px 160px rgba(120,160,255,0.10)",
          }}
        />
      </div>

      {/* 상단 바 */}
      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
        <Link href="/" className="font-mono text-sm font-bold tracking-tight">
          KSH<span className="text-[#c6f24e]">©</span>
        </Link>
        <span className="label-mono text-white/50">LOST IN SPACE</span>
      </header>

      {/* 히어로 */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 pb-24 text-center">
        <h1 className="mb-1 text-lg font-light leading-snug tracking-tight text-white/80 sm:mb-2 sm:text-3xl md:text-4xl">
          찾으시는 페이지가
        </h1>
        <h1 className="mb-8 text-lg font-light leading-snug tracking-tight text-white/80 sm:mb-12 sm:text-3xl md:text-4xl">
          궤도를 벗어난 것 같아요 :/
        </h1>

        <span className="four-oh-four select-none font-mono text-[100px] font-black leading-none tracking-tighter text-white sm:text-[160px] md:text-[220px]">
          404
        </span>

        <Link
          href="/"
          className="liquid-glass mt-10 rounded-full px-8 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.2em] text-white transition-colors hover:text-[#c6f24e] sm:mt-14"
        >
          메인으로 돌아가기
        </Link>
      </main>

      {/* 하단 메타 */}
      <footer className="relative z-10 flex flex-wrap items-center justify-between gap-2 px-6 pb-6 md:px-12">
        <span className="label-mono text-white/40">KIM SANG HOON — PORTFOLIO</span>
        <span className="label-mono text-white/40">ERROR CODE: 404_NOT_FOUND</span>
      </footer>
    </div>
  );
}
