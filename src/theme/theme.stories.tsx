import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { Copy } from "../../.storybook/preview";

const meta: Meta = { title: "foundations/theme" };

export default meta;

const colors = [
  ["primary", "ez:bg-primary"],
  ["on-primary", "ez:bg-on-primary"],
  ["primary-hover", "ez:bg-primary-hover"],
  ["primary-tint", "ez:bg-primary-tint"],
  ["primary-border", "ez:bg-primary-border"],
  ["surface", "ez:bg-surface"],
  ["surface-alt", "ez:bg-surface-alt"],
  ["fg", "ez:bg-fg"],
  ["muted", "ez:bg-muted"],
  ["danger", "ez:bg-danger"],
] as const;

const radii = [
  ["sm", "ez:rounded-sm"],
  ["md", "ez:rounded-md"],
  ["lg", "ez:rounded-lg"],
  ["button", "ez:rounded-button"],
] as const;

export const Tokens: StoryObj = {
  render: (_, { loaded }) => {
    const copy = loaded.copy as Copy;
    return (
      <div className="ez:flex ez:flex-col ez:gap-8 ez:p-page ez:py-8 ez:font-body ez:text-fg">
        <section className="ez:flex ez:flex-col ez:gap-2">
          <p className="ez:text-sm ez:text-muted">{copy.shopName}</p>
          <h1 className="ez:font-display ez:font-title ez:text-3xl ez:tracking-brand">{copy.heroTitle}</h1>
          <p className="ez:text-muted">{copy.heroSubtitle}</p>
        </section>

        <section className="ez:grid ez:grid-cols-2 ez:gap-gutter ez:sm:grid-cols-5">
          {colors.map(([name, bg]) => (
            <div key={name} className="ez:flex ez:flex-col ez:gap-1">
              <div className={`${bg} ez:h-12 ez:rounded-md ez:border ez:border-primary-border`} />
              <span className="ez:text-xs ez:text-muted">{name}</span>
            </div>
          ))}
        </section>

        <section className="ez:flex ez:flex-wrap ez:gap-gutter">
          {radii.map(([name, radius]) => (
            <div key={name} className="ez:flex ez:flex-col ez:items-center ez:gap-1">
              <div className={`${radius} ez:size-16 ez:bg-primary-tint ez:border ez:border-primary-border`} />
              <span className="ez:text-xs ez:text-muted">{name}</span>
            </div>
          ))}
        </section>

        <section className="ez:flex ez:flex-col ez:gap-gutter ez:sm:flex-row">
          <div className="ez:aspect-photo ez:w-full ez:max-w-60 ez:rounded-lg ez:bg-surface-alt" />
          <button
            type="button"
            className="ez:h-12 ez:self-start ez:rounded-button ez:bg-primary ez:px-6 ez:text-on-primary ez:transition-colors ez:hover:bg-primary-hover"
          >
            {copy.buttonLabel}
          </button>
        </section>
      </div>
    );
  },
};
