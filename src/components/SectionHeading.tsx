export function SectionHeading({
  index,
  title,
  subtitle,
}: {
  index: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 sm:mb-14">
      <div className="flex items-baseline gap-3">
        <span aria-hidden="true" className="font-mono text-xs text-accent">
          {index}
        </span>
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
      </div>
      {subtitle && <p className="mt-3 max-w-xl text-sm text-muted">{subtitle}</p>}
    </div>
  );
}
