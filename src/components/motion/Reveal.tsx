"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; y?: number };

/** Único punto de entrada de motion: aparece una vez al entrar en viewport. */
export function Reveal({ children, className, delay = 0, y = 16 }: Props) {
  const reduce = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
    <m.div
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: reduce ? 0.2 : 0.55, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </m.div>
    </LazyMotion>
  );
}
