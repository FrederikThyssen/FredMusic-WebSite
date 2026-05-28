type PageShellProps = {
  eyebrow?: string;
  title: string;
  description: string;
  theme?: "dark" | "wedding";
};

export function PageShell({ eyebrow = "Fredmusic", title, description, theme = "dark" }: PageShellProps) {
  if (theme === "wedding") {
    return (
      <section className="min-h-[58vh] bg-warm-100 text-night-950">
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-gold-400">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-wedding text-4xl leading-tight text-night-950 sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-night-800">{description}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[58vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-gold-300">{eyebrow}</p>
      <h1 className="mt-4 max-w-4xl font-display text-4xl leading-tight text-ivory sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-ivory/72">{description}</p>
    </section>
  );
}
