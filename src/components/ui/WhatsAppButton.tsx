import { site } from "@/content/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppIcon";

type Props = {
  variant?: "primary" | "ink" | "icon" | "inline";
  size?: "md" | "lg";
  className?: string;
  label?: string;
};

const base =
  "group inline-flex items-center justify-center gap-3 font-display font-extrabold tracking-tight transition-transform duration-150 motion-safe:hover:-translate-y-0.5 active:translate-y-0";

const variants = {
  primary: "bg-naranja text-tinta rounded-[6px] hover:bg-naranja-2",
  ink: "bg-tinta text-papel rounded-[6px] hover:bg-tinta-2",
  icon: "bg-naranja text-tinta rounded-full h-12 w-12",
  inline: "text-tinta underline decoration-naranja decoration-4 underline-offset-4",
};

const sizes = { md: "px-5 py-3 text-base", lg: "px-7 py-4 text-lg lg:text-xl" };

export function WhatsAppButton({ variant = "primary", size = "md", className = "", label }: Props) {
  const url = buildWhatsAppUrl(site.whatsapp.number, site.whatsapp.message);
  const text = label ?? site.whatsapp.label;
  const sizing = variant === "icon" || variant === "inline" ? "" : sizes[size];
  const missing = url === null;
  return (
    <a
      href={url ?? "#"}
      target={missing ? undefined : "_blank"}
      rel="noopener noreferrer"
      aria-label={text}
      title={missing ? "Falta NEXT_PUBLIC_WHATSAPP_NUMBER" : undefined}
      className={`${base} ${variants[variant]} ${sizing} ${className}`}
    >
      <WhatsAppIcon className={variant === "icon" ? "h-6 w-6" : "h-5 w-5 shrink-0"} />
      {variant !== "icon" && <span>{text}</span>}
    </a>
  );
}
