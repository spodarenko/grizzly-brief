import { BRAND } from "../config/site";

/** Рендерить текст, підсвічуючи {brand} */
export function WithBrand({ text }: { text: string }) {
  const parts = text.split("{brand}");
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <span className="pk">{BRAND}</span>}
        </span>
      ))}
    </>
  );
}
