import { SanityImageAssetDocument } from "next-sanity";
import NextImage from "next/image";
import React, { CSSProperties, useEffect, useState } from "react";

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

export default function SizedPlainImage({
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
  const [loadedIntrinsicProps, setLoadedIntrinsicProps] = useState(false);
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
        setLoadedIntrinsicProps(true);
        console.log("Intrinsic size: " + img.width + "x" + img.height);
      };
      img.src = src;
    }
  }, [src, sanityImageAsset]);

  if (notNextImage && src) {
    return (
      <img
        className={`bmb-image bmb-plain-image ${loadedIntrinsicProps ? "--visible" : null} ${className ? className : null}`}
        src={src}
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
            : "100%"
        }
        height={
          !fill
            ? height
              ? height
              : width
                ? width / intrinsicImgSize.aspectRatio
                : 500 / intrinsicImgSize.aspectRatio
            : "100%"
        }
        loading={priority ? "eager" : "lazy"}
      />
    );
  }

  if (src) {
    return (
      <NextImage
        className={`bmb-image bmb-plain-image ${loadedIntrinsicProps ? "--visible" : null} ${className ? className : null}`}
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
                : 500 / intrinsicImgSize.aspectRatio
            : undefined
        }
        style={
          style
            ? { objectFit: objectFit ? objectFit : undefined, ...style }
            : undefined
        }
        fill={fill}
        priority={priority}
        sizes={sizes ? sizes : getNextImageSizes(resolution, autoResolution)}
      />
    );
  }

  return null;
}
