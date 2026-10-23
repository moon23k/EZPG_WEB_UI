export function AddressText({
  recipient,
  phone,
  postalCode,
  address,
  detail,
}: {
  recipient: string;
  phone?: string;
  postalCode?: string;
  address: string;
  detail?: string | null;
}) {
  return (
    <address data-slot="address" className="ez:grid ez:gap-0.5 ez:not-italic ez:text-fg">
      {recipient && (
        <span className="ez:font-semibold">
          {recipient}
          {phone && <span className="ez:ml-2 ez:font-normal ez:text-muted">{phone}</span>}
        </span>
      )}
      <span className="ez:text-[13px]">
        {postalCode && <span className="ez:text-muted">({postalCode}) </span>}
        {address} {detail ?? ""}
      </span>
    </address>
  );
}
