import Link from "next/link";
import Section from "./Section";
import Reveal from "./Reveal";
import { workProjects, personalProjects, type Project } from "@/data/projects";

function ProjectRow({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group grid gap-3 border-t border-border py-8 transition-colors hover:bg-surface sm:grid-cols-12 sm:gap-6">
      <span className="font-mono text-sm text-muted sm:col-span-1 sm:pt-1.5">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="sm:col-span-11">
        <h3 className="text-xl font-bold tracking-tight transition-colors group-hover:text-accent sm:text-2xl">
          {project.title}
        </h3>
        <p className="label-mono mt-1.5 text-muted">
          {project.org} — {project.role}
        </p>

        <ul className="mt-4 max-w-3xl space-y-1.5 text-sm leading-relaxed text-muted">
          {project.points.map((point) => (
            <li key={point} className="flex gap-2.5">
              <span className="mt-0.5 shrink-0 text-accent">·</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <span className="font-mono text-xs text-muted">
            {project.tech.join(" / ")}
          </span>
          <span className="ml-auto flex gap-5">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="label-mono text-muted underline decoration-border underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
              >
                GitHub ↗
              </a>
            )}
            {project.demoId && (
              <Link
                href={`/showcase/${project.demoId}/`}
                className="label-mono text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
              >
                Live Demo →
              </Link>
            )}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" number="02" title="Projects">
      <div>
        {workProjects.map((p, i) => (
          <Reveal key={p.title}>
            <ProjectRow project={p} index={i} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="label-mono mb-2 mt-20 text-accent">PERSONAL & STUDY</p>
      </Reveal>
      <div>
        {personalProjects.map((p, i) => (
          <Reveal key={p.title}>
            <ProjectRow project={p} index={workProjects.length + i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
