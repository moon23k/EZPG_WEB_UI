import { Badge } from "../../components/badge";
import { EmptyState } from "../../components/empty-state";

export type AddressRow = {
  id: string;
  recipient: string;
  phone: string;
  postal_code: string;
  address: string;
  address_detail: string | null;
  is_default: boolean;
};

export function AddressBook({
  addresses,
  removeAction,
}: {
  addresses: AddressRow[];
  removeAction: (data: FormData) => void | Promise<void>;
}) {
  if (!addresses.length) return <EmptyState title="저장한 배송지가 없어요." />;
  return (
    <ul className="ez-addresses">
      {addresses.map((a) => (
        <li key={a.id}>
          <div>
            <strong>{a.recipient}</strong> {a.is_default && <Badge tone="primary">기본</Badge>}
            <p>
              ({a.postal_code}) {a.address} {a.address_detail ?? ""}
            </p>
            <p className="ez-muted">{a.phone}</p>
          </div>
          <form action={removeAction}>
            <input type="hidden" name="id" value={a.id} />
            <button type="submit" className="ez-link">
              삭제
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
