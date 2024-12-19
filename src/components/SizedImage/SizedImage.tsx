import { SanityImageAssetDocument } from "next-sanity";
import Image from "next/image";
import React, { CSSProperties } from "react";

export interface SizedImage {
  src: string | undefined;
  alt: string | undefined;
  resolution?: "xs" | "s" | "m" | "l" | "max";
  sizes?: string;
  autoSize?: boolean;
  objectFit?: "cover" | "contain";
  style?: Partial<CSSProperties>;
  className?: string;
  id?: string;
  priority?: boolean;
  notNextImage?: boolean;
  sanityImageAsset?: SanityImageAssetDocument;
  aspectRatio?: number;
  width?: number;
  height?: number;
}

export function getNextImageSizes(
  size?: "xs" | "s" | "m" | "l" | "max",
  autoSize?: boolean
): string | undefined {
  if (autoSize) {
    return undefined;
  }
  if (size === "xs") {
    return "(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 10vw";
  }
  if (size === "s") {
    return "(max-width: 768px) 60vw, (max-width: 1200px) 30vw, 20vw";
  }
  if (size === "m") {
    return "(max-width: 768px) 70vw, (max-width: 1200px) 50vw, 33vw";
  }
  if (size === "l") {
    return "(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 65vw";
  }
  if (size === "max") {
    return "100vw";
  }
  return "(max-width: 768px) 70vw, (max-width: 1200px) 50vw, 33vw";
}

function setWidth(
  width: number | undefined,
  height: number | undefined,
  aspectRatio: number | undefined,
  defaultWidth: number | undefined
) {
  if (width) {
    return width;
  }
  if (height && aspectRatio) {
    return (height * aspectRatio) | 0;
  }
  if (defaultWidth) {
    return defaultWidth;
  }
  return 200;
}

function setHeight(
  height: number | undefined,
  width: number | undefined,
  aspectRatio: number | undefined,
  defaultHeight: number | undefined
) {
  if (height) {
    return height;
  }
  if (width && aspectRatio) {
    return (width / aspectRatio) | 0;
  }
  if (defaultHeight) {
    return defaultHeight;
  }
  return 200;
}

export default function SizedImage({
  src,
  alt,
  style,
  objectFit = "cover",
  className,
  id,
  resolution,
  sizes,
  autoSize,
  priority,
  notNextImage,
  sanityImageAsset,
  width,
  height,
}: SizedImage) {
  if (sanityImageAsset) {
    return (
      <Image
        className={`bmb-image ${className}`}
        id={id ? id : undefined}
        src={src ? src : sanityImageAsset.url}
        alt={alt ? alt : sanityImageAsset.alt}
        width={setWidth(
          width,
          height,
          sanityImageAsset.metadata.dimensions.aspectRatio,
          sanityImageAsset.metadata.dimensions.width
        )}
        height={setHeight(
          height,
          width,
          sanityImageAsset.metadata.dimensions.aspectRatio,
          sanityImageAsset.metadata.dimensions.height
        )}
        style={
          style
            ? { objectFit: objectFit ? objectFit : undefined, ...style }
            : undefined
        }
        sizes={sizes ? sizes : getNextImageSizes(resolution, autoSize)}
        placeholder="blur"
        blurDataURL={sanityImageAsset.metadata.lqip}
        priority={priority}
      />
    );
  }

  if (notNextImage) {
    return (
      <img
        className={`bmb-image ${className}`}
        src={src ? src : ""}
        id={id ? id : undefined}
        alt={alt ? alt : ""}
        style={
          style
            ? { objectFit: objectFit ? objectFit : undefined, ...style }
            : undefined
        }
        width={width ? width : undefined}
        height={height ? height : undefined}
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <Image
      className={`bmb-image ${className}`}
      id={id ? id : undefined}
      src={src ? src : ""}
      alt={alt ? alt : ""}
      width={width ? width : 500}
      height={height ? height : 500}
      style={
        style
          ? { objectFit: objectFit ? objectFit : undefined, ...style }
          : undefined
      }
      priority={priority}
      sizes={sizes ? sizes : getNextImageSizes(resolution, autoSize)}
    />
  );
}
