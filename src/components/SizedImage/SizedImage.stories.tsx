import type { Meta, StoryObj } from "@storybook/react";
import SizedImage from "./SizedImage";

import { createClient } from "@sanity/client";
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: "2023-05-03", // use current date (YYYY-MM-DD) to target the latest API version
  // token: process.env.SANITY_SECRET_TOKEN // Needed for certain operations like updating content or accessing previewDrafts perspective
});

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
    alt: "",
    width: 300,
    height: 200,
    src: image.url
  },
};
