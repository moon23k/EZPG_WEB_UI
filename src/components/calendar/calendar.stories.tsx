import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Section } from "../../__stories__/helpers";
import { Calendar, type CalendarDate } from "./calendar";

const days: CalendarDate[] = Array.from({ length: 40 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 10, 1 + i)).toISOString().slice(0, 10);
  const weekend = [5, 6].includes(new Date(`${date}T00:00:00Z`).getUTCDay());
  return { date, label: weekend ? "16만" : "12만", disabled: i === 9 || i === 10 };
});

const meta = {
  title: "Components/Calendar",
  component: Calendar,
  args: { days },
} satisfies Meta<typeof Calendar>;
export default meta;

export const AllVariants: StoryObj<typeof meta> = {
  render: () => (
    <>
      <Section title="range">
        <Calendar days={days} mode="range" value={{ start: "2026-11-06", end: "2026-11-08" }} />
      </Section>
      <Section title="single">
        <Calendar days={days} />
      </Section>
    </>
  ),
};

export const Playground: StoryObj<typeof meta> = { args: { mode: "range" } };
