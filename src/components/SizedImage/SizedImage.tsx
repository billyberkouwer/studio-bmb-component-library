import { SanityImageAssetDocument } from "next-sanity";
import NextImage from "next/image";
import React, { CSSProperties} from "react";
import SizedPlainImage from "./SizedPlainImage";
import "./sized-image.css";

export interface SizedImage {
  src?: string;
  alt?: string;
  resolution?: "xs" | "s" | "m" | "l" | "max";
  fill?: boolean;
  sizes?: string;
  autoResolution?: boolean;
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
  autoResolution?: boolean
): string | undefined {
  if (autoResolution) {
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

function getWidth(
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

function getHeight(
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
  fill,
  className,
  id,
  resolution,
  sizes,
  autoResolution,
  priority,
  notNextImage,
  sanityImageAsset,
  width,
  height,
}: SizedImage) {
  if (sanityImageAsset) {
    return (
      <NextImage
        className={`bmb-image ${className}`}
        id={id ? id : undefined}
        src={src ? src : sanityImageAsset.url}
        alt={alt ? alt : sanityImageAsset.alt}
        fill={fill}
        width={
          !fill
            ? getWidth(
                width,
                height,
                sanityImageAsset.metadata.dimensions.aspectRatio,
                sanityImageAsset.metadata.dimensions.width
              )
            : undefined
        }
        height={
          !fill
            ? getHeight(
                height,
                width,
                sanityImageAsset.metadata.dimensions.aspectRatio,
                sanityImageAsset.metadata.dimensions.height
              )
            : undefined
        }
        style={
          style
            ? { objectFit: objectFit ? objectFit : undefined, ...style }
            : undefined
        }
        sizes={sizes ? sizes : getNextImageSizes(resolution, autoResolution)}
        placeholder="blur"
        blurDataURL={sanityImageAsset.metadata.lqip}
        priority={priority}
      />
    );
  }

  return (
    <SizedPlainImage
      src={src}
      alt={alt}
      style={style}
      objectFit={objectFit}
      fill={fill}
      className={className}
      id={id}
      resolution={resolution}
      sizes={sizes}
      autoResolution={autoResolution}
      priority={priority}
      notNextImage={notNextImage}
      sanityImageAsset={sanityImageAsset}
      width={width}
      height={height}
    />
  );
}
