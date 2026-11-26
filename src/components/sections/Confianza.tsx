import Link from "next/link";
import { trust } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

/** TrustSection del kit: autorización y privacidad sin absolutos. */
export function Confianza() {
  return (
    <section className="bg-cloud py-16 lg:py-24">
      <div className="container-site lg:grid lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <h2 className="t-h2">{trust.title}</h2>
          <Link href="/privacidad" className="t-ui mt-6 hidden items-center gap-2 text-action underline decoration-2 underline-offset-4 hover:text-action-hover lg:inline-flex">
            {trust.link}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
        <ul className="mt-8 divide-y divide-line border-y border-line lg:col-span-6 lg:mt-0">
          {trust.items.map((t) => (
            <li key={t} className="flex gap-3 py-4 text-[17px]">
              <Icon name="check" className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <Link href="/privacidad" className="t-ui mt-6 inline-flex min-h-12 items-center gap-2 text-action underline decoration-2 underline-offset-4 lg:hidden">
          {trust.link}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
