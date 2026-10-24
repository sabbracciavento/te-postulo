type Props = { children: React.ReactNode; tone?: "tinta" | "naranja" | "verde" | "azul" | "papel"; className?: string };

const tones = {
  tinta: "bg-tinta text-papel",
  naranja: "bg-naranja text-tinta",
  verde: "bg-verde text-papel",
  azul: "bg-azul text-papel",
  papel: "bg-papel text-tinta",
};

export function Tag({ children, tone = "tinta", className = "" }: Props) {
  return (
    <span className={`kicker inline-block rounded-tag px-2.5 py-1.5 leading-none ${tones[tone]} ${className}`}>{children}</span>
  );
}

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`kicker text-azul ${className}`}>{children}</p>;
}
