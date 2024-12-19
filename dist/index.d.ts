import * as react_jsx_runtime from 'react/jsx-runtime';
import { ImageProps } from 'next/image';
import React, { HTMLAttributes, ReactNode } from 'react';
import { LinkProps } from 'next/link';

interface SizedImage extends ImageProps {
    notNextImage?: HTMLAttributes<HTMLImageElement>;
}
declare function SizedImage({ notNextImage, ...props }: SizedImage): react_jsx_runtime.JSX.Element;

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
    externalLink?: HTMLAttributes<HTMLAnchorElement> | null | undefined;
}
declare const Button: ({ children, size, link, externalLink, ...props }: Button) => react_jsx_runtime.JSX.Element;

export { Button, SizedImage, TextBox, VideoComponent };
