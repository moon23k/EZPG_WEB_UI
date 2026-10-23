import NextLink from "next/link";
import { ButtonLink } from "../../components/button";
import { EmptyState } from "../../components/empty-state";
import type { Schemas } from "../../types";
import { cn } from "../../utils/cn";
import { focusRing } from "../../utils/styles";
import { AddressText } from "../parts/address-text";
import { AddressIcon, emptyAction, PlusIcon } from "../parts/empty-icons";
import { lineList } from "../parts/line-item";

export type AddressRow = Schemas["AddressOut"];

type Action = (data: FormData) => void | Promise<void>;

const small = cn(
  "ez:inline-flex ez:h-8 ez:items-center ez:whitespace-nowrap ez:rounded-md ez:border ez:border-solid ez:border-primary-border ez:bg-transparent ez:px-3 ez:font-body ez:text-[13px] ez:text-fg ez:no-underline ez:cursor-pointer ez:hover:bg-primary-tint",
  focusRing,
);

// The default address can be edited but not removed.
export function AddressBook({
  addresses,
  removeAction,
  defaultAction,
  editHref,
  addHref,
}: {
  addresses: AddressRow[];
  removeAction: Action;
  defaultAction?: Action;
  editHref?: (id: string) => string;
  addHref?: string;
}) {
  const add = addHref && (
    <ButtonLink href={addHref} variant="outline" className={emptyAction}>
      <PlusIcon />
      배송지 추가
    </ButtonLink>
  );
  if (!addresses.length) {
    return (
      <EmptyState icon={<AddressIcon />} title="저장한 배송지가 없어요">
        {add}
      </EmptyState>
    );
  }
  return (
    <div data-slot="address-book" className="ez:grid ez:gap-2 ez:text-fg">
      {add && <div className="ez:grid">{add}</div>}
      <ul className={lineList}>
        {addresses.map((a) => (
          <li key={a.id} className="ez:grid ez:gap-2.5 ez:border-0 ez:border-b ez:border-solid ez:border-primary-border ez:py-4">
            <div className="ez:grid ez:gap-0.5">
              <span>
                <strong className="ez:font-semibold">{a.recipient}</strong>
                {a.is_default && <span className="ez:ml-1.5 ez:text-[13px] ez:font-semibold ez:text-primary">기본 배송지</span>}
              </span>
              <span className="ez:text-[13px] ez:text-muted">{a.phone}</span>
              <AddressText recipient="" postalCode={a.postal_code} address={a.address} detail={a.address_detail} />
            </div>
            <div className="ez:flex ez:flex-wrap ez:items-center ez:gap-2">
              {editHref && (
                <NextLink href={editHref(a.id)} className={small} aria-label={`${a.recipient} 배송지 수정`}>
                  수정
                </NextLink>
              )}
              {!a.is_default && defaultAction && (
                <form action={defaultAction}>
                  <input type="hidden" name="id" value={a.id} />
                  <button type="submit" className={small}>
                    기본으로 설정
                  </button>
                </form>
              )}
              {!a.is_default && (
                <form action={removeAction}>
                  <input type="hidden" name="id" value={a.id} />
                  <button
                    type="submit"
                    aria-label={`${a.recipient} 배송지 삭제`}
                    className={cn(small, "ez:border-transparent ez:px-2 ez:text-muted")}
                  >
                    삭제
                  </button>
                </form>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
