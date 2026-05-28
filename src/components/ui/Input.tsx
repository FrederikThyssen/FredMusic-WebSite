import type { InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ id, label, error, className, required, ...props }: InputProps) {
  const inputId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;

  return (
    <label className="grid gap-2 text-sm text-current/82" htmlFor={inputId}>
      <span>
        {label}
        {required ? <span className="ml-1 text-gold-300">*</span> : null}
      </span>
      <input
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-11 border border-white/14 bg-white/5 px-3 text-base text-current transition placeholder:text-current/40 focus:border-gold-300",
          className,
        )}
        {...props}
      />
      {error ? <span id={errorId} className="text-sm text-red-300">{error}</span> : null}
    </label>
  );
}
