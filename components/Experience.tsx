import Section from "./Section";
import Reveal from "./Reveal";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" number="01" title="Experience">
      <ol className="relative space-y-8 border-l border-border pl-6">
        {experiences.map((exp, i) => (
          <li key={exp.company} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
            <Reveal delay={i * 0.08}>
              <div className="flex flex-wrap items-baseline gap-x-3">
                <h3 className="text-lg font-semibold">{exp.company}</h3>
                <span className="text-sm text-muted">{exp.team}</span>
                <span className="ml-auto font-mono text-sm text-muted">
                  {exp.period}
                </span>
              </div>
              <p className="mt-2 text-muted">{exp.summary}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
