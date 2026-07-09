import Section from "./Section";
import Reveal from "./Reveal";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <Section id="contact" number="05" title="Contact">
      <Reveal>
        <p className="font-serif text-2xl italic text-muted sm:text-3xl">
          Let&rsquo;s build something{" "}
          <span className="text-accent">together.</span>
        </p>
        <p className="mt-4 max-w-xl leading-relaxed text-muted">
          새로운 기회와 협업 제안을 환영합니다. 아래 채널로 편하게 연락 주세요.
        </p>
      </Reveal>

      <Reveal delay={0.12}>
        <a
          href={`mailto:${profile.email}`}
          className="group mt-10 block break-all text-[clamp(1.5rem,4.5vw,3.5rem)] font-extrabold tracking-[-0.02em] transition-colors hover:text-accent"
        >
          {profile.email}
          <span className="ml-3 inline-block text-accent transition-transform group-hover:translate-x-2 group-hover:-translate-y-1">
            ↗
          </span>
        </a>
      </Reveal>

      <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-8">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="label-mono text-muted underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
        >
          GITHUB ↗
        </a>
        <a
          href={profile.resumeUrl}
          className="label-mono text-muted underline decoration-border underline-offset-8 transition-colors hover:text-accent hover:decoration-accent"
        >
          RESUME.PDF ↓
        </a>
        <span className="label-mono text-muted">TEL — {profile.phone}</span>
      </Reveal>
    </Section>
  );
}
