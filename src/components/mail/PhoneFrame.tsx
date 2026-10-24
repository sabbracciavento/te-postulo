import type { ReactNode } from "react";
import { GmailLogo } from "./GmailIcons";

type Notification = { app: string; sender: string; text: string; time: string };

type Props = {
  children: ReactNode;
  notification?: Notification;
  className?: string;
  /** Recorta el marco por abajo (hero): el contenido se corta con el borde del contenedor padre. */
  cropped?: boolean;
};

/** Teléfono Android genérico dibujado en CSS. Sin marcas. */
export function PhoneFrame({ children, notification, className = "", cropped = false }: Props) {
  return (
    <div
      className={`relative mx-auto w-full max-w-[380px] rounded-[2.4rem] border-[10px] border-tinta bg-tinta shadow-[12px_12px_0_0_var(--color-naranja)] ${
        cropped ? "rounded-b-none border-b-0" : ""
      } ${className}`}
      aria-label="Ejemplo del mail de resumen en el celular, abierto en Gmail"
      role="group"
    >
      <div className={`overflow-hidden bg-white ${cropped ? "rounded-t-[1.8rem]" : "rounded-[1.8rem]"}`}>
        {/* barra de estado Android simplificada */}
        <div className="flex items-center justify-between bg-white px-5 pb-0.5 pt-2.5 font-gmail text-[12px] font-medium text-[#1f1f1f]">
          <span>12:30</span>
          <span className="flex items-center gap-1.5" aria-hidden="true">
            <span className="flex items-end gap-[2px]">
              <i className="block h-1.5 w-[3px] rounded-sm bg-[#1f1f1f]" />
              <i className="block h-2 w-[3px] rounded-sm bg-[#1f1f1f]" />
              <i className="block h-2.5 w-[3px] rounded-sm bg-[#1f1f1f]" />
              <i className="block h-3 w-[3px] rounded-sm bg-[#1f1f1f]/40" />
            </span>
            <i className="block h-2.5 w-5 rounded-[3px] border border-[#1f1f1f]">
              <i className="block h-full w-3/4 bg-[#1f1f1f]" />
            </i>
          </span>
        </div>

        {notification && (
          <div className="mx-3 mt-1.5 rounded-[20px] bg-[#f2f3f8] px-4 py-3 font-gmail">
            <div className="flex items-center gap-2 text-[12px] text-[#444746]">
              <GmailLogo className="h-4 w-4" />
              <span>{notification.app}</span>
              <span aria-hidden="true">•</span>
              <span>{notification.time}</span>
            </div>
            <p className="mt-1 text-[14px] font-medium text-[#1f1f1f]">{notification.sender}</p>
            <p className="truncate text-[14px] text-[#444746]">{notification.text}</p>
          </div>
        )}

        <div className={notification ? "mt-2" : ""}>{children}</div>
      </div>
    </div>
  );
}
