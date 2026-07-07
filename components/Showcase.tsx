"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Section from "./Section";
import { demos } from "./demos/registry";

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
      <p className="mb-8 max-w-2xl text-muted">
        실무에서 구현한 UI를 직접 조작해 볼 수 있는 인터랙티브 데모입니다.
        데이터와 API 응답은 샘플·시뮬레이션입니다.
      </p>

      <div className="mb-6 flex flex-wrap gap-2" role="tablist">
        {demos.map((demo) => (
          <button
            key={demo.id}
            id={`showcase-${demo.id}`}
            role="tab"
            aria-selected={demo.id === activeId}
            onClick={() => setActiveId(demo.id)}
            className={`scroll-mt-24 rounded-full px-4 py-2 text-sm transition-colors ${
              demo.id === activeId
                ? "bg-accent font-semibold text-accent-contrast"
                : "border border-border text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {demo.title}
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          <p className="text-sm text-muted">{active.description}</p>
          <Link
            href={`/showcase/${active.id}/`}
            className="ml-auto shrink-0 text-sm text-accent underline-offset-4 hover:underline"
          >
            상세 페이지에서 보기 →
          </Link>
        </div>
        <ActiveDemo />
      </div>
    </Section>
  );
}
