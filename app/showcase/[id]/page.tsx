import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { demos } from "@/components/demos/registry";
import Footer from "@/components/Footer";

export function generateStaticParams() {
  return demos.map((d) => ({ id: d.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const demo = demos.find((d) => d.id === id);
  return { title: demo ? `${demo.title} | UI Showcase` : "UI Showcase" };
}

export default async function ShowcaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const demo = demos.find((d) => d.id === id);
  if (!demo) notFound();

  const index = demos.findIndex((d) => d.id === demo.id);
  const others = demos.filter((d) => d.id !== demo.id);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link
            href="/#showcase"
            className="label-mono text-muted transition-colors hover:text-accent"
          >
            ← BACK TO SHOWCASE
          </Link>
          <span className="label-mono text-muted">
            DEMO {String(index + 1).padStart(2, "0")} / {String(demos.length).padStart(2, "0")}
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-14">
        <p className="label-mono mb-4 text-accent">INTERACTIVE DEMO</p>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-extrabold tracking-[-0.02em]">
          {demo.title}
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{demo.description}</p>
        <p className="mt-3 font-mono text-xs text-muted">{demo.tech.join(" / ")}</p>

        <div className="mt-10 border-y border-border py-8">
          <demo.component />
        </div>

        {/* 케이스 스터디 — 문제 정의 → 접근 → 결과 → 배움 */}
        {demo.caseStudy && (
          <section className="mt-14">
            <p className="label-mono mb-2 text-accent">CASE STUDY</p>
            <div>
              {(
                [
                  ["01", "문제 정의", demo.caseStudy.problem],
                  ["02", "가설과 접근", demo.caseStudy.approach],
                  ["03", "결과", demo.caseStudy.result],
                  ["04", "배운 것", demo.caseStudy.learned],
                ] as const
              ).map(([num, label, text]) => (
                <div
                  key={num}
                  className="grid gap-2 border-t border-border py-6 sm:grid-cols-12 sm:gap-6"
                >
                  <div className="sm:col-span-3">
                    <span className="mr-2 font-mono text-sm text-accent">{num}</span>
                    <span className="text-sm font-semibold">{label}</span>
                  </div>
                  <p className="text-sm leading-[1.8] text-muted sm:col-span-9">{text}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="mt-12 grid gap-10 md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="label-mono mb-5 text-accent">
              {demo.caseStudy ? "기술 노트" : "구현 포인트"}
            </p>
            <ul className="space-y-3 text-sm leading-relaxed text-muted">
              {demo.details.map((d) => (
                <li key={d} className="flex gap-2.5">
                  <span className="mt-0.5 shrink-0 text-accent">·</span>
                  {d}
                </li>
              ))}
            </ul>
          </div>
          {demo.related && (
            <div className="md:col-span-4">
              <p className="label-mono mb-5 text-accent">관련 프로젝트</p>
              <p className="text-sm leading-relaxed">{demo.related}</p>
            </div>
          )}
        </section>

        <section className="mt-16 border-t border-border pt-8">
          <p className="label-mono mb-5 text-muted">다른 데모</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3">
            {others.map((d) => (
              <Link
                key={d.id}
                href={`/showcase/${d.id}/`}
                className="label-mono text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                {d.title} →
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
