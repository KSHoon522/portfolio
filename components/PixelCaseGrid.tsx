"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";

/**
 * 대표 프로젝트 2×2 케이스 스터디 그리드.
 * 픽셀 디졸브 hover(12×8 블록, 대각선 스태거)와 커서 반응형 마그네틱 스퀘어 —
 * MotionSites "Pixel Grid Hover" 프롬프트의 인터랙션 파라미터를 번안.
 * 이미지 대신 프로젝트별 추상 패턴(SVG)을 사용.
 */

type CaseItem = {
  id: string;
  title: string;
  category: string;
  year: string;
  href: string;
  pattern: "nodes" | "grid" | "rows" | "waves";
  squares: [number, number, number][]; // (x%, y%, size px)
};

const CASES: CaseItem[] = [
  {
    id: "agent",
    title: "AI 에이전트 플랫폼",
    category: "Frontend · Architecture",
    year: "2025",
    href: "/showcase/agent-run/",
    pattern: "nodes",
    squares: [[5, 30, 16], [10, 42, 10], [3, 52, 7], [80, 70, 14], [85, 82, 9], [78, 60, 6]],
  },
  {
    id: "genai",
    title: "생성형 AI 업무 플랫폼",
    category: "Frontend · TipTap Editor",
    year: "2025",
    href: "/showcase/editor/",
    pattern: "rows",
    squares: [[82, 55, 16], [88, 68, 10], [78, 72, 7], [85, 42, 6], [90, 80, 8]],
  },
  {
    id: "admin",
    title: "관리자 대시보드",
    category: "Frontend · Data Table",
    year: "2025",
    href: "/showcase/admin-table/",
    pattern: "grid",
    squares: [[4, 24, 16], [10, 36, 10], [2, 44, 7], [78, 78, 14], [84, 88, 8]],
  },
  {
    id: "edu",
    title: "교육용 스트리밍 플랫폼",
    category: "Frontend · WebSocket",
    year: "2025",
    href: "/showcase/live-class/",
    pattern: "waves",
    squares: [[82, 26, 14], [88, 38, 10], [78, 44, 7], [84, 54, 5], [90, 60, 8]],
  },
];

const COLS = 12;
const ROWS = 8;

/* 프로젝트별 추상 커버 패턴 */
function CoverPattern({ pattern }: { pattern: CaseItem["pattern"] }) {
  const stroke = "var(--accent)";
  return (
    <svg
      className="absolute inset-0 h-full w-full bg-surface"
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <rect width="400" height="300" fill="var(--surface)" />
      {pattern === "nodes" && (
        <g stroke={stroke} strokeWidth="1" opacity="0.55">
          {[[60, 80], [180, 50], [300, 100], [120, 190], [260, 220], [340, 180]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={stroke} stroke="none" opacity="0.9" />
              {i > 0 && <line x1={x} y1={y} x2={i === 3 ? 60 : 180} y2={i === 3 ? 80 : 50} />}
            </g>
          ))}
        </g>
      )}
      {pattern === "rows" && (
        <g fill={stroke} opacity="0.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <rect key={i} x="40" y={40 + i * 32} width={320 - i * 36} height="10" rx="2" />
          ))}
        </g>
      )}
      {pattern === "grid" && (
        <g stroke={stroke} strokeWidth="1" opacity="0.45">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 40} y1="30" x2={40 + i * 40} y2="270" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="40" y1={30 + i * 40} x2="360" y2={30 + i * 40} />
          ))}
          <rect x="120" y="110" width="80" height="40" fill={stroke} opacity="0.8" stroke="none" />
        </g>
      )}
      {pattern === "waves" && (
        <g stroke={stroke} strokeWidth="2" fill="none" opacity="0.55">
          {Array.from({ length: 5 }).map((_, i) => (
            <path
              key={i}
              d={`M0 ${90 + i * 35} Q 100 ${60 + i * 35} 200 ${90 + i * 35} T 400 ${90 + i * 35}`}
            />
          ))}
        </g>
      )}
    </svg>
  );
}

function CaseCard({ item, index }: { item: CaseItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // 마그네틱 스퀘어 — 커서 위치(0~1)를 spring으로 추적
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.6 });
  const dx = useTransform(sx, (v) => (v - 0.5) * 40);
  const dy = useTransform(sy, (v) => (v - 0.5) * 40);

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      px.set((e.clientX - rect.left) / rect.width);
      py.set((e.clientY - rect.top) / rect.height);
    },
    [px, py],
  );
  const onLeave = useCallback(() => {
    px.set(0.5);
    py.set(0.5);
  }, [px, py]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={item.href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="group relative block aspect-[4/3] overflow-hidden border border-border"
      >
        <CoverPattern pattern={item.pattern} />

        {/* 픽셀 디졸브 오버레이 — 12×8 블록, 대각선 스태거 */}
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: ROWS }).flatMap((_, row) =>
            Array.from({ length: COLS }).map((_, col) => (
              <span
                key={`${row}-${col}`}
                className="absolute scale-0 bg-accent/15 opacity-0 transition-all duration-[250ms] group-hover:scale-100 group-hover:opacity-100"
                style={{
                  width: `${100 / COLS}%`,
                  height: `${100 / ROWS}%`,
                  left: `${(col * 100) / COLS}%`,
                  top: `${(row * 100) / ROWS}%`,
                  transitionDelay: `${(row + col) * 0.018}s`,
                }}
              />
            )),
          )}
        </div>

        {/* 마그네틱 스퀘어 */}
        {item.squares.map(([x, y, size], i) => (
          <motion.span
            key={i}
            className="pointer-events-none absolute bg-accent"
            style={{ left: `${x}%`, top: `${y}%`, width: size, height: size, x: dx, y: dy }}
          />
        ))}

        {/* + 버튼 */}
        <span className="absolute right-4 top-4 z-10 flex h-7 w-7 items-center justify-center border border-text/30 text-xs text-text transition-colors group-hover:border-accent group-hover:text-accent">
          +
        </span>

        {/* 정보 플레이트 */}
        <span className="absolute bottom-0 left-0 z-20 block max-w-[75%] bg-bg px-4 pb-3 pt-2.5">
          <span className="block text-[clamp(1.1rem,1.8vw,1.5rem)] font-bold leading-tight">
            {item.title}
          </span>
          <span className="mt-1.5 flex gap-4">
            <span className="label-mono text-muted">{item.category}</span>
            <span className="label-mono text-accent">{item.year}</span>
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function PixelCaseGrid() {
  return (
    <div className="mb-16 grid gap-4 md:grid-cols-2">
      {CASES.map((item, i) => (
        <CaseCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
