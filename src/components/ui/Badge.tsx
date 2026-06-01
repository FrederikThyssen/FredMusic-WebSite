import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type BadgeVariant = "dark" | "gold" | "wedding" | "outline";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  dark: "border-white/[0.07] bg-white/5 text-ivory/78",
  gold: "border-gold-400/50 bg-gold-300/10 text-gold-200",
  wedding: "border-warm-300/80 bg-warm-200 text-warm-700",
  outline: "border-white/[0.08] bg-transparent text-ivory/72",
};

export function Badge({ className, variant = "gold", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-sm border px-3 py-1 text-xs font-semibold uppercase",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
