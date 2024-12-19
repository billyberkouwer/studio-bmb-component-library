import type { Meta, StoryObj } from '@storybook/react';

import VideoComponent from './VideoComponent';

const meta = {
  component: VideoComponent,
} satisfies Meta<typeof VideoComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://youtu.be/JSOMDOWA4SI?si=517LYNJRX1Yp-ufa"
  }
};