import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { detailData } from "../../__stories__/fixtures/templates";
import { DetailLayout, SessionList, SessionRow, SessionStatus } from "../../index";

const meta: Meta = { title: "Sections/Sessions", parameters: { layout: "padded" } };
export default meta;

const sessions = detailData.class.sessions ?? [];

function RowsExample() {
  return <SessionList sessions={sessions} />;
}

function RowExample() {
  return sessions[0] ? <SessionRow session={sessions[0]} /> : null;
}

function StatusExample() {
  return (
    <div className="ez:flex ez:gap-2">
      {sessions.map((s) => (
        <SessionStatus key={s.id} session={s} />
      ))}
    </div>
  );
}

function DetailExample() {
  return <DetailLayout slots={[{ kind: "class_summary", variant: "banner" }, { kind: "booking_box", side: true }, { kind: "refund" }]} data={detailData.class} />;
}

export const Rows: StoryObj = { render: () => <RowsExample /> };

export const Row: StoryObj = { render: () => <RowExample /> };

export const Status: StoryObj = { render: () => <StatusExample /> };

export const Detail: StoryObj = { render: () => <DetailExample /> };
