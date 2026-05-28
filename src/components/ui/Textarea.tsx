import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function Textarea({ id, label, error, className, required, ...props }: TextareaProps) {
  const textareaId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${textareaId}-error`;

  return (
    <label className="grid gap-2 text-sm text-current/82" htmlFor={textareaId}>
      <span>
        {label}
        {required ? <span className="ml-1 text-gold-300">*</span> : null}
      </span>
      <textarea
        id={textareaId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-32 resize-y border border-white/14 bg-white/5 px-3 py-3 text-base text-current transition placeholder:text-current/40 focus:border-gold-300",
          className,
        )}
        {...props}
      />
      {error ? <span id={errorId} className="text-sm text-red-300">{error}</span> : null}
    </label>
  );
}
