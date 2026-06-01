import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type CardVariant = "dark" | "wedding" | "admin";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  dark: "border-white/[0.07] bg-night-900/78 text-ivory shadow-glow",
  wedding: "border-warm-300/80 bg-white text-night-950",
  admin: "border-white/[0.07] bg-night-900 text-ivory",
};

export function Card({ className, variant = "dark", ...props }: CardProps) {
  return <div className={cn("rounded-md border", variants[variant], className)} {...props} />;
}
