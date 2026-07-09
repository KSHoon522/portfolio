import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" number="04" title="Skills">
      <div>
        {skillGroups.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.05}>
            <div className="grid gap-2 border-t border-border py-6 transition-colors hover:bg-surface sm:grid-cols-12 sm:gap-6">
              <span className="label-mono pt-1 text-accent sm:col-span-3">
                {group.category}
              </span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 sm:col-span-9">
                {group.items.map((item) => (
                  <span key={item.name} className="text-[15px] font-medium">
                    {item.name}
                    {item.note && (
                      <span className="ml-1.5 font-mono text-xs text-muted">
                        — {item.note}
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
