"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#showcase", label: "UI Showcase" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <a href="#about" className="font-semibold tracking-tight">
          {profile.nameKo} <span className="text-muted">{profile.nameEn}</span>
        </a>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted transition-colors hover:text-accent"
            >
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            className="rounded-md border border-accent px-3 py-1.5 text-accent transition-colors hover:bg-accent-soft"
          >
            Download Resume
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            className="p-1"
            aria-label="메뉴 열기"
            onClick={() => setOpen(!open)}
          >
            <span className="block h-0.5 w-6 bg-text" />
            <span className="mt-1.5 block h-0.5 w-6 bg-text" />
            <span className="mt-1.5 block h-0.5 w-6 bg-text" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded px-2 py-2 text-muted hover:bg-card hover:text-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
