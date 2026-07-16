import { profile } from "@/data/profile";

/**
 * 미니멀 테크 푸터 — MotionSites "Stark Minimal Footer" 컨셉 번안.
 * 도트 그리드 · 링크 컬럼 · 자이언트 워드마크.
 */

const COLUMNS = [
  {
    title: "INDEX",
    links: [
      { label: "Experience", href: "/#experience" },
      { label: "Projects", href: "/#projects" },
      { label: "UI Showcase", href: "/#showcase" },
      { label: "Skills", href: "/#skills" },
    ],
  },
  {
    title: "CONTACT",
    links: [
      { label: "Email", href: `mailto:${profile.email}` },
      { label: "GitHub", href: profile.github },
      { label: "Resume", href: profile.resumeUrl },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-border">
      <div className="mx-auto max-w-6xl px-4 pt-12">
        {/* 도트 그리드 */}
        <div
          className="mb-10 h-10 w-full opacity-40"
          aria-hidden
          style={{
            backgroundImage: "radial-gradient(var(--muted) 1px, transparent 1px)",
            backgroundSize: "22px 11px",
            maskImage: "linear-gradient(to bottom, black, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, black, transparent)",
          }}
        />

        <div className="flex flex-wrap justify-between gap-10 pb-14">
          <p className="label-mono max-w-[220px] leading-relaxed text-muted">
            FRONTEND FIRST —<br />
            FLUENT IN BACKEND.<br />
            SEOUL, KOREA · UTC+9
          </p>
          <div className="flex gap-16">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="label-mono mb-4 text-accent">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 자이언트 워드마크 */}
      <div className="mx-auto max-w-6xl px-4">
        <p
          className="select-none whitespace-nowrap text-center font-mono text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-text/10"
          aria-hidden
        >
          KIM SANG HOON
        </p>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-5">
          <span className="label-mono text-muted">
            © {new Date().getFullYear()} {profile.nameEn.toUpperCase()}
          </span>
          <span className="label-mono text-muted">
            BUILT WITH NEXT.JS<span className="text-accent"> ✦</span> DESIGNED IN CODE
          </span>
        </div>
      </div>
    </footer>
  );
}
