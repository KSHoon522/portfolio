"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Section from "./Section";
import Reveal from "./Reveal";
import { demos } from "./demos/registry";

/* 프레임 코너 틱 */
function CornerTicks() {
  const base = "pointer-events-none absolute h-3 w-3 border-accent";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export default function Showcase() {
  const [activeId, setActiveId] = useState(demos[0].id);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];
  const ActiveDemo = active.component;

  // #showcase-{id} 해시로 진입 시 해당 탭 활성화
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace("#showcase-", "");
      if (demos.some((d) => d.id === id)) setActiveId(id);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  return (
    <Section id="showcase" number="03" title="UI Showcase">
      <Reveal>
        <p className="mb-10 max-w-2xl leading-relaxed text-muted">
          실무에서 구현한 UI를 직접 조작해 볼 수 있는 인터랙티브 데모입니다.
          데이터와 API 응답은 샘플·시뮬레이션입니다.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          className="mb-8 flex flex-wrap gap-x-7 gap-y-3 border-b border-border pb-4"
          role="tablist"
        >
          {demos.map((demo, i) => (
            <button
              key={demo.id}
              id={`showcase-${demo.id}`}
              role="tab"
              aria-selected={demo.id === activeId}
              onClick={() => setActiveId(demo.id)}
              className={`label-mono scroll-mt-24 transition-colors ${
                demo.id === activeId
                  ? "text-accent"
                  : "text-muted hover:text-text"
              }`}
            >
              <span className="mr-1.5 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {demo.title}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.12}>
        <div className="relative p-3">
          <CornerTicks />
          <div className="flex flex-wrap items-baseline gap-2 px-2 pb-4 pt-1">
            <p className="text-sm leading-relaxed text-muted">{active.description}</p>
            <Link
              href={`/showcase/${active.id}/`}
              className="label-mono ml-auto shrink-0 text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              상세 페이지 →
            </Link>
          </div>
          <ActiveDemo />
        </div>
      </Reveal>
    </Section>
  );
}
