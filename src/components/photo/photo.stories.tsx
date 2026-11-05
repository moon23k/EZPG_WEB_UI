import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Row, Section } from "../../__stories__/helpers";
import { Photo } from "./photo";

const sample =
  "data:image/svg+xml;utf8," +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320"><rect width="320" height="320" fill="#e5e5e5"/></svg>');

const meta = {
  title: "Components/Photo",
  component: Photo,
  args: { src: sample, alt: "상품 사진" },
} satisfies Meta<typeof Photo>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <Section title="image · empty">
      <Row>
        <div style={{ width: 160 }}>
          <Photo src={sample} alt="상품 사진" />
        </div>
        <div style={{ width: 160 }}>
          <Photo src={null} alt="사진 없음" />
        </div>
      </Row>
    </Section>
  ),
};

export const Tiles: StoryObj<typeof meta> = {
  render: () => (
    <Section title="tone · strong">
      <Row>
        {[0, 1, 2, 3, 4].map((tone) => (
          <div key={tone} style={{ width: 120 }}>
            <Photo src={null} alt="사진 없음" tone={tone} />
          </div>
        ))}
      </Row>
      <Row>
        {[0, 1, 2, 3].map((tone) => (
          <div key={tone} style={{ width: 120 }}>
            <Photo src={null} alt="사진 없음" tone={tone} strong />
          </div>
        ))}
      </Row>
    </Section>
  ),
};

export const Playground: StoryObj<typeof meta> = {};
