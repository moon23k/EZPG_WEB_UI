import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { addresses } from "../../__stories__/fixtures/commerce";
import { AddressBook } from "../../index";

const meta: Meta<typeof AddressBook> = {
  title: "Blocks/AddressBook",
  component: AddressBook,
  parameters: { layout: "padded" },
};
export default meta;

async function remove() {
  "use server";
}

function DefaultExample() {
  return (
    <AddressBook
      addresses={addresses}
      removeAction={remove}
      defaultAction={remove}
      editHref={(id) => `/me/addresses/${id}`}
      addHref="/me/addresses/new"
    />
  );
}

function EmptyExample() {
  return <AddressBook addresses={[]} removeAction={remove} addHref="/me/addresses/new" />;
}

export const Default: StoryObj = { render: () => <DefaultExample /> };

export const Empty: StoryObj = { render: () => <EmptyExample /> };
