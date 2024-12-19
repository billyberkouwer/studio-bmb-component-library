import { SanityImageAssetDocument } from "next-sanity";
import { CSSProperties } from "react";
export interface SizedImage {
    src?: string;
    alt?: string;
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
export declare function getNextImageSizes(size?: "xs" | "s" | "m" | "l" | "max", autoSize?: boolean): string | undefined;
export default function SizedImage({ src, alt, style, objectFit, className, id, resolution, sizes, autoSize, priority, notNextImage, sanityImageAsset, width, height, }: SizedImage): import("react/jsx-runtime").JSX.Element;
