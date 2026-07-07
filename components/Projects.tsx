import Link from "next/link";
import Section from "./Section";
import { workProjects, personalProjects, type Project } from "@/data/projects";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-accent/50">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-1 text-sm text-muted">
        {project.org} · {project.role}
      </p>

      <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-text">
        {project.points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {project.tech.map((t) => (
          <span
            key={t}
            className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-xs text-accent"
          >
            {t}
          </span>
        ))}
        <span className="ml-auto flex gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              GitHub →
            </a>
          )}
          {project.demoId && (
            <Link
              href={`/showcase/${project.demoId}/`}
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              관련 패턴 데모 →
            </Link>
          )}
        </span>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <Section id="projects" number="02" title="Projects">
      <div className="space-y-6">
        {workProjects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      <h3 className="mb-6 mt-14 text-xl font-bold">Personal & Study</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {personalProjects.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>
    </Section>
  );
}
