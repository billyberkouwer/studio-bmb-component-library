import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
    size: "medium",
    link: null,
    externalLink: null,
  }
};

export const InternalLink: Story = {
  args: {
    children: "Internal Link",
    size: "medium",

    link: {
      "href": "#"
    },

    externalLink: null
  }
};

export const ExternalLink: Story = {
  args: {
    children: "External Link",
    size: "medium",
    link: null,
    externalLink: {}
  }
};