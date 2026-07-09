import Section from "./Section";
import Reveal from "./Reveal";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <Section id="experience" number="01" title="Experience">
      <div>
        {experiences.map((exp, i) => (
          <Reveal key={exp.company} delay={i * 0.06}>
            <div className="group grid gap-2 border-t border-border py-7 transition-colors hover:bg-surface sm:grid-cols-12 sm:gap-6">
              <span className="label-mono pt-1.5 text-muted sm:col-span-3">
                {exp.period}
              </span>
              <div className="sm:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">
                    {exp.company}
                  </h3>
                  <span className="label-mono text-muted">{exp.team}</span>
                </div>
                <p className="mt-2 max-w-2xl leading-relaxed text-muted">
                  {exp.summary}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
