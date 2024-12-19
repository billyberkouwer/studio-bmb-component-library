import type { StoryObj } from '@storybook/react';
declare const meta: {
    component: ({ children, size, link, externalLink, ...props }: import("./Button").Button) => import("react/jsx-runtime").JSX.Element;
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const InternalLink: Story;
export declare const ExternalLink: Story;
