import Section from "./Section";
import Reveal from "./Reveal";
import { skillGroups } from "@/data/skills";

export default function Skills() {
  return (
    <Section id="skills" number="04" title="Skills">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <Reveal
            key={group.category}
            delay={(i % 3) * 0.1}
            className="rounded-lg border border-border bg-card p-5"
          >
            <h3 className="mb-3 font-semibold text-accent">{group.category}</h3>
            <ul className="space-y-2 text-sm">
              {group.items.map((item) => (
                <li key={item.name} className="flex flex-wrap items-baseline gap-x-2">
                  <span>{item.name}</span>
                  {item.note && (
                    <span className="text-xs text-muted">{item.note}</span>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
