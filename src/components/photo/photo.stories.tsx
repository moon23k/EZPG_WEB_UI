import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { padded } from "../../../.storybook/decorators";
import { Photo } from "./photo";

const sample =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3d9cf"/><stop offset="1" stop-color="#b0602d"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><circle cx="200" cy="230" r="90" fill="#fff" fill-opacity=".35"/></svg>`,
  );

const meta: Meta<typeof Photo> = {
  title: "components/photo",
  component: Photo,
  tags: ["autodocs"],
  decorators: [padded],
  args: { src: sample, alt: "라넌큘러스 핸드타이드" },
};

export default meta;
type Story = StoryObj<typeof Photo>;

export const Default: Story = { render: (args) => <Photo {...args} className="ez:max-w-60" /> };

export const Empty: Story = { args: { src: null }, render: (args) => <Photo {...args} className="ez:max-w-60" /> };

export const Grid: Story = {
  render: (args) => (
    <div className="ez:grid ez:w-full ez:grid-cols-2 ez:gap-gutter">
      <Photo {...args} />
      <Photo {...args} src={null} />
    </div>
  ),
};
