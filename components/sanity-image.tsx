import Image from "next/image";

import { getImageUrl } from "@/lib/seo";
import type { SanityImage as SanityImageType } from "@/types/sanity";

export function SanityImage({
  image,
  fallbackSrc,
  alt,
  width = 900,
  height = 600,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw"
}: {
  image?: SanityImageType;
  fallbackSrc?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const src = getImageUrl(image, width, height) || fallbackSrc;

  if (!src) return null;

  return (
    <Image
      src={src}
      alt={image?.alt || alt || ""}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={sizes}
    />
  );
}
