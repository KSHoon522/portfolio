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
    <section id={id} className="mx-auto max-w-5xl scroll-mt-20 px-4 py-20">
      <Reveal>
        <h2 className="mb-10 text-2xl font-bold tracking-tight">
          <span className="mr-3 font-mono text-accent">{number}</span>
          {title}
        </h2>
      </Reveal>
      {children}
    </section>
  );
}
