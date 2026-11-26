"use client";

import { useEffect, useState } from "react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

/** Barra fija inferior, solo celular (< 768 px; en tablet el WhatsApp está en el encabezado): aparece al pasar el hero y se oculta en el cierre. */
export function MobileCtaBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const end = document.getElementById("cierre");
    if (!hero || !end) return;
    let heroVisible = true;
    let endVisible = false;
    const update = () => setShow(!heroVisible && !endVisible);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === hero) heroVisible = e.isIntersecting;
          if (e.target === end) endVisible = e.isIntersecting;
        }
        update();
      },
      { threshold: 0.15 },
    );
    io.observe(hero);
    io.observe(end);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 safe-bottom border-t border-line bg-white transition-transform duration-300 md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      inert={!show}
    >
      <div className="px-6 py-3">
        <WhatsAppButton className="w-full" />
      </div>
    </div>
  );
}
