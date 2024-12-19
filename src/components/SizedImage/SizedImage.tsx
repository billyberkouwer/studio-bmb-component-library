import Image, { ImageProps } from "next/image";
import React, { HTMLAttributes } from "react";

export interface SizedImage extends ImageProps {
  notNextImage?: HTMLAttributes<HTMLImageElement>;
}
export default function SizedImage({ notNextImage, ...props }: SizedImage) {
  if (notNextImage) {
    return <img {...notNextImage} />;
  }

  return <Image className="bmb-image" {...props} />;
}