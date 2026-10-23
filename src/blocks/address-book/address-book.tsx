import { Badge } from "../../components/badge";
import { ButtonLink, buttonVariants } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { Schemas } from "../../types";
import { AddressText } from "../parts/address-text";
import { lineList } from "../parts/line-item";
import { AddressIcon, emptyAction, PlusIcon } from "../parts/empty-icons";

export type AddressRow = Schemas["AddressOut"];

export function AddressBook({
  addresses,
  removeAction,
  addHref,
}: {
  addresses: AddressRow[];
  removeAction: (data: FormData) => void | Promise<void>;
  addHref?: string;
}) {
  if (!addresses.length) {
    return (
      <EmptyState icon={<AddressIcon />} title="저장한 배송지가 없어요">
        {addHref && (
          <ButtonLink href={addHref} variant="outline" className={emptyAction}>
            <PlusIcon />
            배송지 추가
          </ButtonLink>
        )}
      </EmptyState>
    );
  }
  return (
    <ul data-slot="address-book" className={lineList}>
      {addresses.map((a) => (
        <li
          key={a.id}
          className="ez:flex ez:items-start ez:justify-between ez:gap-3 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-3.5"
        >
          <div className="ez:grid ez:gap-1">
            {a.is_default && <Badge tone="primary" className="ez:justify-self-start">기본</Badge>}
            <AddressText
              recipient={a.recipient}
              phone={a.phone}
              postalCode={a.postal_code}
              address={a.address}
              detail={a.address_detail}
            />
          </div>
          <form action={removeAction}>
            <input type="hidden" name="id" value={a.id} />
            <button type="submit" className={buttonVariants({ variant: "ghost", size: "sm" })} aria-label={`${a.recipient} 배송지 삭제`}>
              삭제
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
