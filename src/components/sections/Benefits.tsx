import { benefits } from "@/content/home";
import { Icon } from "@/components/ui/Icon";

export function Benefits() {
  return (
    <section className="bg-cloud py-16 lg:py-24">
      <div className="container-site">
        <h2 className="t-h2">{benefits.title}</h2>
        <ul className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4 lg:mt-12 lg:gap-6">
          {benefits.items.map((b) => (
            <li key={b.title} className="flex gap-4 rounded-card border border-line bg-white p-5 max-sm:flex-col md:flex-col lg:gap-6 lg:p-8">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-control bg-ice text-brand lg:h-12 lg:w-12">
                <Icon name={b.icon} />
              </span>
              <div>
                <h3 className="t-h3">{b.title}</h3>
                <p className="mt-1.5 text-slate lg:mt-2">{b.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
