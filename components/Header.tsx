"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "#about", label: "About", index: "00" },
  { href: "#experience", label: "Experience", index: "01" },
  { href: "#projects", label: "Projects", index: "02" },
  { href: "#showcase", label: "Showcase", index: "03" },
  { href: "#skills", label: "Skills", index: "04" },
  { href: "#contact", label: "Contact", index: "05" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#about" className="font-mono text-sm font-bold tracking-tight">
          KSH<span className="text-accent">©</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {navItems.slice(1).map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="label-mono group text-muted transition-colors hover:text-text"
            >
              <span className="mr-1.5 text-accent opacity-60 transition-opacity group-hover:opacity-100">
                {item.index}
              </span>
              {item.label}
            </a>
          ))}
          <a
            href={profile.resumeUrl}
            className="label-mono text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
          >
            Resume
          </a>
          <ThemeToggle />
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className="label-mono text-muted"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setOpen(!open)}
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border md:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-3 border-b border-border/50 px-4 py-3.5 text-lg font-semibold"
            >
              <span className="font-mono text-xs text-accent">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
