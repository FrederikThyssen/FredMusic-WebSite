import type { ReactNode } from "react";
import { ButtonLink } from "../ui/Button";
import { Card } from "../ui/Card";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  theme?: "dark" | "wedding";
  children?: ReactNode;
};

export function CTASection({
  eyebrow,
  title,
  description,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  theme = "dark",
  children,
}: CTASectionProps) {
  const isWedding = theme === "wedding";

  return (
    <section className={isWedding ? "bg-warm-100 px-4 py-16 sm:px-6 lg:px-8" : "bg-night-950 px-4 py-16 sm:px-6 lg:px-8"}>
      <Card
        variant={isWedding ? "wedding" : "dark"}
        className="mx-auto grid max-w-7xl gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
      >
        <div>
          {eyebrow ? <p className="text-xs font-semibold uppercase text-gold-300">{eyebrow}</p> : null}
          <h2 className={isWedding ? "mt-3 font-wedding text-3xl text-night-950 sm:text-4xl" : "mt-3 font-display text-3xl text-ivory sm:text-4xl"}>
            {title}
          </h2>
          <p className={isWedding ? "mt-4 max-w-2xl leading-7 text-night-800" : "mt-4 max-w-2xl leading-7 text-ivory/70"}>
            {description}
          </p>
          {children ? <div className="mt-6">{children}</div> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <ButtonLink to={primaryTo} variant={isWedding ? "weddingPrimary" : "primary"} showArrow>
            {primaryLabel}
          </ButtonLink>
          {secondaryLabel && secondaryTo ? (
            <ButtonLink to={secondaryTo} variant={isWedding ? "weddingSecondary" : "secondary"} showArrow>
              {secondaryLabel}
            </ButtonLink>
          ) : null}
        </div>
      </Card>
    </section>
  );
}
