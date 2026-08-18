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
    <div className={cn("relative -mx-4 -mt-16 mb-10 overflow-hidden bg-night-900 sm:-mx-6 sm:-mt-20 lg:hidden", className)}>
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
