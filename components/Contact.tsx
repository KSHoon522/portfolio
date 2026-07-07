import Section from "./Section";
import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <Section id="contact" number="05" title="Contact">
      <p className="max-w-xl text-muted">
        새로운 기회와 협업 제안을 환영합니다. 아래 채널로 편하게 연락 주세요.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="rounded-md bg-accent px-5 py-2.5 font-medium text-accent-contrast transition-opacity hover:opacity-90"
        >
          {profile.email}
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-md border border-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
        >
          GitHub
        </a>
        <a
          href={profile.resumeUrl}
          className="rounded-md border border-border px-5 py-2.5 transition-colors hover:border-accent hover:text-accent"
        >
          Resume PDF
        </a>
      </div>
    </Section>
  );
}
