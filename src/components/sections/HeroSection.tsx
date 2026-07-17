import type { ReactNode } from "react";
import { ButtonLink } from "../ui/Button";
import { cn } from "../../utils/cn";

type HeroSectionProps = {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageObjectPosition?: string;
  primaryLabel: string;
  primaryTo: string;
  secondaryLabel?: string;
  secondaryTo?: string;
  theme?: "dark" | "wedding";
  children?: ReactNode;
};

export function HeroSection({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  imageObjectPosition,
  primaryLabel,
  primaryTo,
  secondaryLabel,
  secondaryTo,
  theme = "dark",
  children,
}: HeroSectionProps) {
  const isWedding = theme === "wedding";

  return (
    <section className={cn("relative overflow-hidden", isWedding ? "bg-warm-100 text-night-950" : "bg-night-950 text-ivory")}>
      <img
        src={image}
        alt={imageAlt}
        style={{ objectPosition: imageObjectPosition }}
        className={cn(
          "absolute inset-0 h-full w-full object-cover",
          isWedding ? "opacity-55" : "opacity-100",
        )}
      />
      <div
        className={cn(
          "absolute inset-0",
          isWedding
            ? "bg-gradient-to-r from-warm-100 via-warm-100/86 to-warm-100/10"
            : "bg-gradient-to-r from-night-950 via-night-950/82 to-night-950/6",
        )}
      />
      {!isWedding ? <div className="absolute inset-0 bg-gradient-to-b from-night-950/64 via-transparent to-night-950/68" /> : null}
      <div className="relative mx-auto flex min-h-[68svh] max-w-7xl flex-col justify-center px-4 py-16 sm:min-h-[72vh] sm:px-6 sm:py-20 lg:px-8">
        <div className={cn(!isWedding && "max-w-4xl rounded-md bg-night-950/42 p-5 backdrop-blur-[2px] sm:p-7")}>
          <p className={cn("text-xs font-semibold uppercase", isWedding ? "text-gold-400" : "text-gold-300")}>{eyebrow}</p>
          <h1 className={cn("mt-4 max-w-4xl text-4xl leading-tight sm:text-6xl sm:leading-none lg:text-7xl", isWedding ? "font-wedding text-night-950" : "font-display text-ivory")}>
            {title}
          </h1>
          <p className={cn("mt-6 max-w-2xl text-lg leading-8", isWedding ? "text-night-800" : "text-ivory/76")}>
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={primaryTo} variant={isWedding ? "weddingPrimary" : "primary"} size="lg" className="w-full sm:w-auto" showArrow>
            {primaryLabel}
          </ButtonLink>
          {secondaryLabel && secondaryTo ? (
            <ButtonLink to={secondaryTo} variant={isWedding ? "weddingSecondary" : "secondary"} size="lg" className="w-full sm:w-auto" showArrow>
              {secondaryLabel}
            </ButtonLink>
          ) : null}
          </div>
        </div>
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </section>
  );
}
