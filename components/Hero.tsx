import { profile } from "@/data/profile";
import Reveal from "./Reveal";

export default function Hero() {
  return (
    <section id="about" className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-16 pt-24">
      <Reveal>
        <p className="mb-3 font-mono text-sm text-accent">{profile.role}</p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {profile.nameKo}{" "}
          <span className="text-muted">{profile.nameEn}</span>
        </h1>
      </Reveal>
      <Reveal delay={0.15}>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text">
          {profile.tagline}
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{profile.about}</p>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {profile.highlights.map((h, i) => (
          <Reveal key={h.label} delay={0.25 + i * 0.1}>
            <div className="rounded-lg border border-border bg-card p-5 text-center">
              <div className="text-2xl font-bold text-accent">{h.value}</div>
              <div className="mt-1 text-sm text-muted">{h.label}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
