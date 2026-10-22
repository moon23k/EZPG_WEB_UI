import { won } from "../../utils/cn";

export function Price({ value, list }: { value: number; list?: number }) {
  const discounted = list !== undefined && list > value;
  return (
    <span className="ez-price">
      {discounted && (
        <>
          <span className="ez-price__rate">{Math.floor(((list - value) / list) * 100)}%</span>
          <s className="ez-price__list">{won(list)}</s>
        </>
      )}
      <strong className="ez-price__value">{won(value)}</strong>
    </span>
  );
}
