import { SanityImageAssetDocument } from "next-sanity";
import { CSSProperties } from "react";
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
export declare function getNextImageSizes(size?: "xs" | "s" | "m" | "l" | "max", autoResolution?: boolean): string | undefined;
export default function SizedPlainImage({ src, alt, style, objectFit, fill, className, id, resolution, sizes, autoResolution, priority, notNextImage, sanityImageAsset, width, height, }: SizedImage): import("react/jsx-runtime").JSX.Element | null;
