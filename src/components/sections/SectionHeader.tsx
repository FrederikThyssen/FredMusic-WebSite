import { cn } from "../../utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "dark" | "wedding";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  theme = "dark",
}: SectionHeaderProps) {
  const isCenter = align === "center";

  return (
    <div className={cn("max-w-3xl", isCenter && "mx-auto text-center")}>
      {eyebrow ? (
        <p className={cn("text-xs font-semibold uppercase", theme === "wedding" ? "text-gold-400" : "text-gold-300")}>
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl leading-tight sm:text-4xl",
          theme === "wedding" ? "font-wedding text-night-950" : "font-display text-ivory",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-4 text-base leading-7", theme === "wedding" ? "text-night-800" : "text-ivory/70")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
