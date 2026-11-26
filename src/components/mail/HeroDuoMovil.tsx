import type { ReactNode } from "react";
import { GmailLogo } from "./GmailIcons";
import { fondoCelular } from "./HeroPantallas";

/**
 * Hero del celular (< 768 px): la compu y el celular en versión propia (no el escritorio achicado). Diseñado a 342 × 360 px y
 * escalado con unidades de contenedor (cqw): mismo alto siempre. La ventana muestra el mail en su lado izquierdo; el celular, entero
 * (proporción ~2,2), ocupa el alto del bloque a la derecha y tapa solo el lado vacío de la ventana. Debajo de la ventana, el selector.
 * `ventana` y `celular` son las capas por escenario (HeroPantallas); los dispositivos son decorativos.
 */
export function HeroDuoMovil({ ventana, celular, selector }: { ventana: ReactNode; celular: ReactNode; selector?: ReactNode }) {
  return (
    <div className="@container w-full">
      <div className="relative aspect-[342/360] w-full font-sans text-ink">
        <div aria-hidden="true">
          {/* banda inclinada del TP, detrás */}
          <span className="tp-slant pointer-events-none absolute inset-y-[2cqw] left-[50cqw] w-[24cqw] bg-brand" />

          {/* compu: ventana de Gmail con cromo mínimo */}
          <div className="absolute left-0 top-0 h-[84cqw] w-[80cqw] overflow-hidden rounded-[3.5cqw] border border-line bg-[#f6f8fc] shadow-[0_1cqw_4cqw_rgba(16,24,40,0.08)]">
            <div className="flex h-[9cqw] items-center gap-[1.8cqw] px-[3.5cqw] font-gmail">
              <GmailLogo className="h-[4.4cqw] w-[4.4cqw]" />
              <span className="text-[3.6cqw] text-[#444746]">Gmail</span>
            </div>
            <div className="absolute inset-x-[2.5cqw] bottom-[2.5cqw] top-[9cqw] overflow-hidden rounded-[2.5cqw] bg-white">{ventana}</div>
          </div>

          {/* celular entero, adelante */}
          <div className="absolute bottom-[1cqw] right-0 top-[1cqw] w-[46cqw] rounded-[6.5cqw] bg-ink p-[1.6cqw] shadow-[0_2cqw_6cqw_rgba(16,24,40,0.18)]">
            <div className={`relative h-full overflow-hidden rounded-[5cqw] ${fondoCelular}`}>{celular}</div>
          </div>
        </div>

        {/* selector de escenarios: debajo de la ventana, a la izquierda del celular */}
        {selector && <div className="absolute bottom-0 left-0 flex h-[19cqw] w-[52cqw] items-center">{selector}</div>}
      </div>
    </div>
  );
}
