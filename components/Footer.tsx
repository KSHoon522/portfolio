import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-7">
        <span className="label-mono text-muted">
          © {new Date().getFullYear()} {profile.nameEn.toUpperCase()}
        </span>
        <span className="label-mono text-muted">SEOUL, KOREA</span>
        <span className="label-mono text-muted">
          BUILT WITH NEXT.JS<span className="text-accent"> ✦</span> DESIGNED IN CODE
        </span>
      </div>
    </footer>
  );
}
