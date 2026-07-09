import Reveal from "./Reveal";

export default function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border">
      <div className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24">
        <Reveal>
          <div className="mb-14 flex items-baseline justify-between gap-4">
            <h2 className="text-[clamp(1.9rem,4vw,3rem)] font-extrabold tracking-[-0.02em]">
              {title}
            </h2>
            <span className="label-mono shrink-0 text-accent">
              ({number})
            </span>
          </div>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
