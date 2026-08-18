import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Link, type LinkProps } from "react-router-dom";
import { cn } from "../../utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "weddingPrimary" | "weddingSecondary";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  showArrow?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-gold-300 bg-gold-300 text-night-950 shadow-glow hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-night-950 hover:shadow-[0_18px_46px_rgba(199,161,91,0.22)]",
  secondary:
    "border-gold-400/80 bg-transparent text-ivory hover:-translate-y-0.5 hover:border-gold-300 hover:bg-gold-300/12 hover:text-gold-200",
  ghost: "border-transparent bg-transparent text-gold-200 hover:text-gold-300",
  weddingPrimary:
    "border-gold-400 bg-gold-400 text-night-950 hover:border-gold-500 hover:bg-gold-500",
  weddingSecondary:
    "border-warm-500 bg-transparent text-night-950 hover:bg-warm-200",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2 text-xs",
  md: "min-h-11 px-5 py-3 text-xs",
  lg: "min-h-12 px-6 py-3 text-sm",
};

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-3 rounded-sm border text-center font-semibold uppercase leading-snug transition disabled:cursor-not-allowed disabled:opacity-55",
    sizeClasses[size],
    variantClasses[variant],
    className,
  );
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  icon,
  showArrow = false,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName(variant, size, className)}
      {...props}
    >
      {icon ? <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
    </button>
  );
}

type ButtonLinkProps = LinkProps & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  showArrow?: boolean;
};

export function ButtonLink({
  className,
  variant = "primary",
  size = "md",
  icon,
  showArrow = false,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, size, className)} {...props}>
      {icon ? <span className="inline-flex shrink-0" aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
      {showArrow ? <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
    </Link>
  );
}
