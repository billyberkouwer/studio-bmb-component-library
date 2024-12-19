import Link, { LinkProps } from "next/link";
import "../global.css";
import "./button.css";
import React, { HTMLAttributes } from "react";

export interface Button extends HTMLAttributes<HTMLElement> {
  children?: React.ReactNode | React.ReactNode[];
  size?: "small" | "medium" | "large";
  link?: LinkProps | null | undefined;
  externalLink?: HTMLAttributes<HTMLAnchorElement> | null | undefined;
}

const Button = ({
  children = "Button",
  size = "medium",
  link,
  externalLink,
  ...props
}: Button) => {
  if (externalLink) {
    return (
      <a
        {...props}
        {...externalLink}
        className={`bmb-button bmb-button--${size} bmb-button--link`}
      >
        {children}
      </a>
    );
  }

  if (link) {
    return (
      <Link
        {...props}
        {...link}
        className={`bmb-button bmb-button--${size} bmb-button--link`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={`bmb-button bmb-button--${size}`}>
      {children}
    </button>
  );
};

export default Button;
