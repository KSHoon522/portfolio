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

  const DemoComponent = demo.component;
  const others = demos.filter((d) => d.id !== demo.id);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4">
          <Link href="/#showcase" className="text-sm text-muted transition-colors hover:text-accent">
            ← UI Showcase로 돌아가기
          </Link>
          <span className="font-mono text-xs text-muted">인터랙티브 데모</span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold tracking-tight">{demo.title}</h1>
        <p className="mt-3 max-w-2xl text-muted">{demo.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {demo.tech.map((t) => (
            <span
              key={t}
              className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-8 rounded-lg border border-border bg-card p-6">
          <DemoComponent />
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-semibold">구현 포인트</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-text">
            {demo.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          {demo.related && (
            <p className="mt-6 rounded-md border border-border bg-card px-4 py-3 text-sm text-muted">
              관련 프로젝트 — <span className="text-text">{demo.related}</span>
            </p>
          )}
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">다른 데모</h2>
          <div className="flex flex-wrap gap-2">
            {others.map((d) => (
              <Link
                key={d.id}
                href={`/showcase/${d.id}/`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:border-accent hover:text-accent"
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
