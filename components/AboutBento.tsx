import Reveal from "./Reveal";
import { profile } from "@/data/profile";
import { experiences } from "@/data/experience";

/**
 * At-a-glance 벤토 그리드 — MotionSites "Max Reed Portfolio" 프롬프트 번안.
 * 커리어 타임라인 · 원칙 카드 · 통계 카드 · 스택 마퀴 · Reach Me 카드.
 */

function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 0c.9 6.6 5.4 11.1 12 12-6.6.9-11.1 5.4-12 12-.9-6.6-5.4-11.1-12-12C6.6 11.1 11.1 6.6 12 0Z" />
    </svg>
  );
}

function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="label-mono flex items-center gap-2 text-muted">
      <Sparkle className="h-3 w-3 text-accent" />
      {children}
      <Sparkle className="h-3 w-3 text-accent" />
    </p>
  );
}

const STACK_ROW_1 = ["React", "Next", "TS", "TW", "MUI", "Zod", "Jest", "SB"];
const STACK_ROW_2 = ["RQ", "Zust", "WS", "SSE", "Git", "Podman", "nginx", "Spring"];

function StackTile({ label }: { label: string }) {
  return (
    <span className="liquid-glass flex h-14 w-14 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-semibold text-text/80 md:h-16 md:w-16">
      {label}
    </span>
  );
}

export default function AboutBento() {
  return (
    <section className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-5">
          {/* 1 — 커리어 타임라인 */}
          <Reveal className="rounded-2xl border border-border bg-card p-5 md:p-6">
            <CardLabel>BACKGROUND</CardLabel>
            <div className="mt-6 space-y-4">
              {experiences.map((exp) => (
                <div key={exp.company} className="grid grid-cols-[auto_auto_1fr] items-baseline gap-x-3">
                  <span className="font-mono text-[11px] text-muted">{exp.period.split(" ")[0]}</span>
                  <Sparkle className="h-2.5 w-2.5 self-center text-muted/60" />
                  <span className="text-sm font-medium">
                    {exp.company}
                    <span className="ml-2 text-xs text-muted">{exp.team}</span>
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* 2 — 원칙 + 통계 */}
          <div className="flex flex-col gap-4 md:gap-5">
            <Reveal delay={0.08} className="flex-1 rounded-2xl border border-border bg-accent-soft p-5 md:p-6">
              <CardLabel>PRINCIPLE</CardLabel>
              <p className="mt-5 text-[13.5px] leading-[1.7] text-text/85">
                &ldquo;{profile.tagline}&rdquo;
              </p>
              <p className="mt-4 text-xs text-muted">
                <b className="font-semibold text-text">{profile.nameKo}</b> — Frontend Developer
              </p>
            </Reveal>
            <Reveal delay={0.14} className="rounded-2xl border border-border bg-card px-6 py-8 text-center">
              <p className="font-mono text-6xl font-light tracking-tight text-accent md:text-7xl">3Y+</p>
              <p className="mt-2 text-sm text-muted">프론트엔드 실무 · 공공/AI 플랫폼</p>
            </Reveal>
          </div>

          {/* 3 — 스택 마퀴 + Reach Me */}
          <div className="flex flex-col gap-4 md:col-span-2 md:gap-5 lg:col-span-1">
            <Reveal delay={0.12} className="rounded-2xl border border-border bg-card p-5 md:p-6">
              <CardLabel>DAILY STACK</CardLabel>
              <div className="mt-5 space-y-3 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                <div className="animate-marquee-left flex w-max gap-3">
                  {[...STACK_ROW_1, ...STACK_ROW_1].map((s, i) => (
                    <StackTile key={`a${i}`} label={s} />
                  ))}
                </div>
                <div className="animate-marquee-right flex w-max gap-3">
                  {[...STACK_ROW_2, ...STACK_ROW_2].map((s, i) => (
                    <StackTile key={`b${i}`} label={s} />
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.18} className="relative flex-1 rounded-2xl border border-border bg-accent-soft p-5 md:p-6">
              <CardLabel>REACH ME</CardLabel>
              <p className="mt-5 text-sm font-medium">{profile.email}</p>
              <p className="mt-1.5 font-mono text-xs text-muted">{profile.phone}</p>
              <a
                href={`mailto:${profile.email}`}
                aria-label="이메일 보내기"
                className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
