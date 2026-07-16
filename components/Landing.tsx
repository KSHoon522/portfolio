"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

/* ── 코드 → UI 라이브 위젯: 타이핑되는 코드가 실제 버튼이 된다 ── */

type Token = { text: string; cls: string };

const CODE: Token[] = [
  { text: "export function ", cls: "text-accent" },
  { text: "Greeting", cls: "text-text" },
  { text: "() {\n  ", cls: "text-muted" },
  { text: "return", cls: "text-accent" },
  { text: " (\n    <", cls: "text-muted" },
  { text: "button", cls: "text-accent" },
  { text: "\n      ", cls: "text-muted" },
  { text: "onClick", cls: "text-text" },
  { text: "={", cls: "text-muted" },
  { text: "wave", cls: "text-text" },
  { text: "}\n    >\n      ", cls: "text-muted" },
  { text: "만나서 반가워요", cls: "text-text italic" },
  { text: "\n    </", cls: "text-muted" },
  { text: "button", cls: "text-accent" },
  { text: ">\n  );\n}", cls: "text-muted" },
];

const TOTAL = CODE.reduce((n, t) => n + t.text.length, 0);

function CodeToUi() {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? TOTAL : 0);
  const [waves, setWaves] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const run = () => {
    if (timer.current) clearInterval(timer.current);
    setTyped(0);
    setWaves(0);
    timer.current = setInterval(() => {
      setTyped((n) => {
        if (n >= TOTAL) {
          if (timer.current) clearInterval(timer.current);
          return n;
        }
        return n + 1;
      });
    }, 26);
  };

  useEffect(() => {
    if (!reduceMotion) run();
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const done = typed >= TOTAL;

  // 누적 글자 수 기준으로 토큰 슬라이스
  let remaining = typed;
  const visible = CODE.map((t) => {
    const take = Math.max(0, Math.min(t.text.length, remaining));
    remaining -= take;
    return { ...t, text: t.text.slice(0, take) };
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-surface">
      {/* 창 크롬 */}
      <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="label-mono ml-2 text-muted">Greeting.tsx</span>
        <button
          onClick={run}
          className="label-mono ml-auto text-muted transition-colors hover:text-accent"
        >
          ↺ rerun
        </button>
      </div>

      {/* 코드 */}
      <pre className="min-h-[13.5rem] whitespace-pre-wrap px-4 py-4 font-mono text-[13px] leading-relaxed">
        {visible.map((t, i) => (
          <span key={i} className={t.cls}>
            {t.text}
          </span>
        ))}
        {!done && <span className="caret" />}
      </pre>

      {/* 프리뷰 — 코드가 완성되면 실제로 동작하는 버튼 */}
      <div className="border-t border-border px-4 py-4">
        <p className="label-mono mb-3 text-muted">PREVIEW</p>
        {done ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3"
          >
            <button
              onClick={() => setWaves((w) => w + 1)}
              className="rounded-md bg-accent px-4 py-2 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              만나서 반가워요
            </button>
            {waves > 0 && (
              <span className="font-mono text-sm text-muted">
                {"👋".repeat(Math.min(waves, 5))} ×{waves}
              </span>
            )}
          </motion.div>
        ) : (
          <div className="h-9 w-36 animate-pulse rounded-md border border-dashed border-border" />
        )}
      </div>
    </div>
  );
}

/* ── 랜딩 ── */

const STACK = [
  "React", "Next.js", "TypeScript", "Tailwind CSS", "MUI",
  "Tanstack Query", "Zustand", "WebSocket", "SSE", "TipTap", "Storybook",
];

export default function Landing() {
  return (
    <section id="about" className="relative flex min-h-[calc(100svh-4rem)] flex-col">
      {/* 상단 메타 */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 pt-5">
        <span className="label-mono text-muted">SEOUL, KOREA — UTC+9</span>
        <span className="label-mono hidden items-center gap-2 text-muted sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
          OPEN TO WORK
        </span>
        <span className="label-mono text-muted">PORTFOLIO — 2026</span>
      </div>

      {/* 본문 */}
      <div className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-4 py-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="label-mono mb-6 text-accent"
          >
            KIM SANG HOON — FRONTEND DEVELOPER
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
          >
            코드를 화면으로,
            <br />
            화면을{" "}
            <span className="font-serif font-normal italic tracking-normal text-accent">
              experience
            </span>
            로.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="mt-5 font-serif text-lg italic text-muted sm:text-xl"
          >
            frontend first — fluent in backend.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-7 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {profile.about}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34 }}
            className="mt-9 flex flex-wrap items-center gap-6"
          >
            <a
              href="#projects"
              className="group rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-contrast transition-transform hover:-translate-y-0.5"
            >
              프로젝트 보기{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a
              href={profile.resumeUrl}
              className="label-mono text-muted underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
            >
              RESUME.PDF ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-x-8 gap-y-2"
          >
            {profile.highlights.map((h) => (
              <span key={h.label} className="font-mono text-xs text-muted">
                <b className="mr-2 font-semibold text-text">{h.value}</b>
                {h.label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="lg:col-span-5"
        >
          <CodeToUi />
        </motion.div>
      </div>

      {/* 스택 마퀴 */}
      <div className="overflow-hidden border-t border-border py-3">
        <div className="animate-marquee flex w-max gap-0">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {STACK.map((s) => (
                <span key={`${dup}-${s}`} className="label-mono flex items-center text-muted">
                  <span className="px-5">{s}</span>
                  <span className="text-accent">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
