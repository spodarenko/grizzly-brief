import { WHATSAPP_NUMBER } from "../config/site";

/** Відкриває чат WhatsApp з готовим текстом. Повертає false, якщо вікно заблоковане. */
export function openWhatsApp(text: string): boolean {
  try {
    navigator.clipboard?.writeText(text).catch(() => {});
  } catch {
    // буфер обміну недоступний — не критично
  }
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  const win = window.open(url, "_blank");
  if (win) win.opener = null;
  return Boolean(win);
}
