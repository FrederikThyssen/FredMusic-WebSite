import { cn } from "../../utils/cn";

type HeroMediaProps = {
  src: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  priority?: boolean;
};

export function HeroMedia({
  src,
  alt = "",
  className,
  imageClassName,
  objectPosition,
  priority = true,
}: HeroMediaProps) {
  return (
    <div className={cn("mb-8 overflow-hidden rounded-sm border border-white/[0.07] bg-night-900 lg:hidden", className)}>
      <img
        src={src}
        alt={alt}
        style={{ objectPosition }}
        className={cn("aspect-[4/3] w-full object-cover", imageClassName)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}
