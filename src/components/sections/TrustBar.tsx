import { trust } from "@/content/home";
import { Marquee } from "@/components/ui/Marquee";

export function TrustBar() {
  return (
    <section className="border-y border-tinta bg-tinta py-4 font-display text-xl font-bold tracking-tight text-papel lg:py-5">
      <div className="lg:hidden">
        <Marquee items={trust} />
      </div>
      <ul className="container-site hidden items-center justify-between lg:flex">
        {trust.map((t, i) => (
          <li key={t} className="flex items-center gap-5">
            {i > 0 && <span className="h-2.5 w-2.5 rounded-full bg-naranja" aria-hidden="true" />}
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
