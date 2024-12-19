import { ImageProps } from "next/image";
import { HTMLAttributes } from "react";
export interface SizedImage extends ImageProps {
    notNextImage?: HTMLAttributes<HTMLImageElement>;
}
export default function SizedImage({ notNextImage, ...props }: SizedImage): import("react/jsx-runtime").JSX.Element;
