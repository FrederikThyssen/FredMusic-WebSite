import type { SelectHTMLAttributes } from "react";
import { cn } from "../../utils/cn";

type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
};

export function Select({ id, label, options, error, placeholder, className, required, ...props }: SelectProps) {
  const selectId = id ?? props.name ?? label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${selectId}-error`;

  return (
    <label className="grid gap-2 text-sm text-current/82" htmlFor={selectId}>
      <span>
        {label}
        {required ? <span className="ml-1 text-gold-300">*</span> : null}
      </span>
      <select
        id={selectId}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "min-h-11 border border-white/14 bg-white/5 px-3 text-base text-current transition focus:border-gold-300",
          className,
        )}
        {...props}
      >
        {placeholder ? <option value="">{placeholder}</option> : null}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-night-900 text-ivory">
            {option.label}
          </option>
        ))}
      </select>
      {error ? <span id={errorId} className="text-sm text-red-300">{error}</span> : null}
    </label>
  );
}
