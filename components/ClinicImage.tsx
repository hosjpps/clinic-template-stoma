type ClinicImageProps = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

const WIDTHS = [640, 1280, 1920];

export function ClinicImage({
  src,
  alt,
  className,
  priority,
  sizes,
  width,
  height,
}: ClinicImageProps) {
  const base = src.replace(/\.[^.]+$/, "");
  const srcSet = (ext: string) =>
    WIDTHS.map((w) => `${base}-${w}w.${ext} ${w}w`).join(", ");
  const fallback = `${base}.jpg`;

  return (
    <picture>
      <source type="image/avif" srcSet={srcSet("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        {...(priority ? { fetchPriority: "high" as const } : {})}
      />
    </picture>
  );
}
