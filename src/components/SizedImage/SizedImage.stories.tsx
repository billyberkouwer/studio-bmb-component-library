import type { Meta, StoryObj } from "@storybook/react";
import SizedImage from "./SizedImage";
import { client } from "@/sanity/lib/client";
import fileSvg from "../../../public/file.svg"

const documentData = await client.fetch(`
        *[_type == "testDocument"][] {
          "images": images[].asset->,
        }
    `);

const image = documentData[0].images[0];

console.log(image);

const meta = {
  component: SizedImage,
} satisfies Meta<typeof SizedImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: fileSvg,
    alt: "",
    sanityImageAsset: undefined,
    width: 200,
    fill: true
  },
};

export const SanityImage: Story = {
  args: {
    src: undefined,
    alt: "",
    sanityImageAsset: image,
    style: {},
    width: 500,
    resolution: "s",
    autoSize: true,
  },
};
