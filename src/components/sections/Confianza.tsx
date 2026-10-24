import Link from "next/link";
import { confianza } from "@/content/home";
import { Tag } from "@/components/ui/Tag";

function Col({ title, items, before, after }: { title: string; items: string[]; before?: React.ReactNode; after?: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[1.8rem] wide lg:text-[2.4rem]">{title}</h2>
      {before}
      <ul className="mt-6 space-y-4">
        {items.map((t) => (
          <li key={t} className="flex gap-3 text-[16px] leading-snug lg:text-lg">
            <span className="mt-[0.5em] h-2.5 w-2.5 shrink-0 bg-papel" aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ul>
      {after}
    </div>
  );
}

export function Confianza() {
  const { ba, datos } = confianza;
  return (
    <section className="bg-verde py-16 text-papel lg:py-24">
      <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Col
          title={ba.title}
          items={ba.items}
          before={
            <div className="no-scrollbar snap-row -mx-5 mt-5 px-5 lg:mx-0 lg:flex-wrap lg:px-0">
              {ba.zones.map((z) => (
                <Tag key={z} tone={z === "CABA" ? "naranja" : "papel"} className="text-[12px]">
                  {z}
                </Tag>
              ))}
            </div>
          }
        />
        <Col
          title={datos.title}
          items={datos.items}
          after={
            <Link href="/privacidad" className="mt-6 inline-block text-[15px] font-medium underline decoration-naranja decoration-[3px] underline-offset-4 lg:text-base">
              {datos.link}
            </Link>
          }
        />
      </div>
    </section>
  );
}
