import { SanityImageAssetDocument } from "next-sanity";
import NextImage from "next/image";
import React, { CSSProperties, useEffect, useState } from "react";

export interface SizedImage {
  src?: string;
  alt?: string;
  resolution?: "xs" | "s" | "m" | "l" | "max";
  fill?: boolean;
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
  fill,
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
  const [intrinsicImgSize, setIntrinsicImgSize] = useState({
    x: 0,
    y: 0,
    aspectRatio: 1,
  });

  useEffect(() => {
    if (!sanityImageAsset && src) {
      const img = new Image();
      img.onload = function () {
        setIntrinsicImgSize({
          x: img.width,
          y: img.height,
          aspectRatio: img.width / img.height,
        });
        console.log("Intrinsic size: " + img.width + "x" + img.height);
      };
      img.src = src;
    }
  }, [src, sanityImageAsset]);

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
            ? setWidth(
                width,
                height,
                sanityImageAsset.metadata.dimensions.aspectRatio,
                sanityImageAsset.metadata.dimensions.width
              )
            : undefined
        }
        height={
          !fill
            ? setHeight(
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
        width={
          !fill
            ? width
              ? width
              : height
                ? height * intrinsicImgSize.aspectRatio
                : 500
            : undefined
        }
        height={
          !fill
            ? height
              ? height
              : width
                ? width / intrinsicImgSize.aspectRatio
                : 500
            : undefined
        }
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  return (
    <NextImage
      className={`bmb-image ${className}`}
      id={id ? id : undefined}
      src={src ? src : ""}
      alt={alt ? alt : ""}
      width={
        !fill
          ? width
            ? width
            : height
              ? height * intrinsicImgSize.aspectRatio
              : 500
          : undefined
      }
      height={
        !fill
          ? height
            ? height
            : width
              ? width / intrinsicImgSize.aspectRatio
              : 500
          : undefined
      }
      style={
        style
          ? { objectFit: objectFit ? objectFit : undefined, ...style }
          : undefined
      }
      fill={fill}
      priority={priority}
      sizes={sizes ? sizes : getNextImageSizes(resolution, autoSize)}
    />
  );
}
