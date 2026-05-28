import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type CardVariant = "dark" | "wedding" | "admin";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
};

const variants: Record<CardVariant, string> = {
  dark: "border-white/12 bg-night-900/78 text-ivory shadow-glow",
  wedding: "border-warm-300 bg-white text-night-950",
  admin: "border-white/10 bg-night-900 text-ivory",
};

export function Card({ className, variant = "dark", ...props }: CardProps) {
  return <div className={cn("border", variants[variant], className)} {...props} />;
}
