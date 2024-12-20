import { LinkProps } from "next/link";
import "../global.css";
import "./button.css";
import React, { AnchorHTMLAttributes, HTMLAttributes } from "react";
export interface Button extends HTMLAttributes<HTMLElement> {
    children?: React.ReactNode | React.ReactNode[];
    size?: "small" | "medium" | "large";
    link?: LinkProps | null | undefined;
    externalLink?: AnchorHTMLAttributes<HTMLAnchorElement> | null | undefined;
}
declare const Button: ({ children, size, link, externalLink, ...props }: Button) => import("react/jsx-runtime").JSX.Element;
export default Button;
