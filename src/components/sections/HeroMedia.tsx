import { cn } from "../../utils/cn";

type HeroMediaProps = {
  src: string;
  srcSet?: string;
  sizes?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  imageClassName?: string;
  objectPosition?: string;
  priority?: boolean;
};

export function HeroMedia({
  src,
  srcSet,
  sizes,
  alt = "",
  width = 1536,
  height = 1024,
  className,
  imageClassName,
  objectPosition,
  priority = true,
}: HeroMediaProps) {
  return (
    <div className={cn("relative -mx-4 -mt-16 mb-10 overflow-hidden bg-night-900 sm:-mx-6 sm:-mt-20 lg:hidden", className)}>
      <img
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        style={{ objectPosition }}
        className={cn("aspect-[4/3] w-full object-cover", imageClassName)}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
      />
    </div>
  );
}
