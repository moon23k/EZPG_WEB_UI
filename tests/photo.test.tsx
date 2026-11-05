import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteLogo } from "../src/blocks/site-header/site-logo";
import { Photo } from "../src/components/photo";

const tile = (container: HTMLElement) => container.querySelector('[data-slot="photo"]') as HTMLElement;

describe("Photo", () => {
  it("shows a coloured tile and icon when there is no photo", () => {
    const { container } = render(<Photo src={null} alt="상품" tone={1} />);
    expect(tile(container).className).toContain("ez:bg-tile-2");
    expect(container.querySelector("svg")).toBeInTheDocument();
    expect(container.querySelector("img")).not.toBeInTheDocument();
  });

  it("gives neighbours different tiles", () => {
    const { container } = render(
      <>
        {[0, 1, 2, 3, 4].map((tone) => (
          <Photo key={tone} src={null} alt="상품" tone={tone} />
        ))}
      </>,
    );
    const classes = [...container.querySelectorAll('[data-slot="photo"]')].map((p) => p.className.match(/ez:bg-tile-\d/)?.[0]);
    expect(new Set(classes).size).toBe(5);
  });

  it("keeps one tile for the same name without a tone", () => {
    const first = render(<Photo src={null} alt="머그컵" />);
    const second = render(<Photo src={null} alt="머그컵" />);
    expect(tile(first.container).className).toBe(tile(second.container).className);
  });

  it("uses the dark tile under text", () => {
    const { container } = render(<Photo src={null} alt="" tone={0} strong />);
    expect(tile(container).className).toContain("ez:bg-tile-strong-1");
  });

  it("falls back to the tile when the image fails", () => {
    const { container } = render(<Photo src="/broken.png" alt="상품" tone={2} />);
    fireEvent.error(screen.getByRole("img", { name: "상품" }));
    expect(container.querySelector("img")).not.toBeInTheDocument();
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});

describe("SiteLogo", () => {
  it("shows the store name without a logo", () => {
    render(<SiteLogo name="온기상점" />);
    expect(screen.getByText("온기상점")).toBeInTheDocument();
  });

  it("falls back to the store name when the logo fails", () => {
    render(<SiteLogo name="온기상점" src="/broken.png" />);
    fireEvent.error(screen.getByRole("img", { name: "온기상점" }));
    expect(screen.getByText("온기상점")).toBeInTheDocument();
  });
});
