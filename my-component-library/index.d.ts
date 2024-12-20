import * as react_jsx_runtime from 'react/jsx-runtime';
import { SanityImageAssetDocument } from 'next-sanity';
import React, { CSSProperties, ReactNode, HTMLAttributes, AnchorHTMLAttributes } from 'react';
import { LinkProps } from 'next/link';

interface SizedImage {
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
declare function SizedImage({ src, alt, style, objectFit, fill, className, id, resolution, sizes, autoResolution, priority, notNextImage, sanityImageAsset, width, height, }: SizedImage): react_jsx_runtime.JSX.Element;

declare const TextBox: ({ children }: {
    children: ReactNode | ReactNode[];
}) => react_jsx_runtime.JSX.Element;

declare function VideoComponent({ src }: {
    src: string;
}): react_jsx_runtime.JSX.Element;

interface Button extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode | React.ReactNode[];
    size?: "small" | "medium" | "large";
    link?: LinkProps | null | undefined;
    externalLink?: AnchorHTMLAttributes<HTMLAnchorElement> | null | undefined;
}
declare const Button: ({ children, size, link, externalLink, ...props }: Button) => react_jsx_runtime.JSX.Element;

export { Button, SizedImage, TextBox, VideoComponent };
