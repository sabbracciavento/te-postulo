/** Arma el link wa.me. El número va en formato internacional sin "+" (Argentina celular: 549 + área + número). */
export function buildWhatsAppUrl(number: string, text: string): string | null {
  const digits = (number ?? "").replace(/\D/g, "");
  if (digits.length < 8) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
