// Opening block for inner pages: two-line headline that slides in, then a lead paragraph and optional actions.
export function PageIntro({
  title,
  dim,
  lead,
  children,
}: {
  title: string;
  dim?: string;
  lead?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="horizon px-4 pb-20 pt-16 sm:px-6 md:pb-24 md:pt-24">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-4xl text-display font-semibold text-balance">
          <span className="intro-line">
            <span>{title}</span>
          </span>
          {dim && (
            <span className="intro-line text-dim">
              <span style={{ "--d": "120ms" } as React.CSSProperties}>{dim}</span>
            </span>
          )}
        </h1>
        {lead && (
          <p
            className="intro-fade mt-6 max-w-2xl text-lg leading-relaxed text-mist"
            style={{ "--d": "300ms" } as React.CSSProperties}
          >
            {lead}
          </p>
        )}
        {children && (
          <div className="intro-fade mt-9 flex flex-wrap gap-3" style={{ "--d": "420ms" } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
