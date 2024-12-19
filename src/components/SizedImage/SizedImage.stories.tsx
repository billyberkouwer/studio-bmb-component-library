import type { Meta, StoryObj } from "@storybook/react";

import SizedImage from "./SizedImage";

const meta = {
  component: SizedImage,
} satisfies Meta<typeof SizedImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "",
    alt: "",
    width: 300,
    height: 200,
    notNextImage: {
      src: "localhost:6006/181ed6fbb1a57bc3f26694731870ec7fe2bba621-5184x3456.webp"
    }
  }
};
