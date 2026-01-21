"use client";

import React, { useRef } from "react";

type Props<E extends React.ElementType> = {
  as?: E;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "children" | "className">;

export default function GlowCard<E extends React.ElementType = "div">({
  as,
  className,
  children,
  ...rest
}: Props<E>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Comp: any = as || "div";
  const ref = useRef<HTMLElement | null>(null);

  function onMove(e: React.PointerEvent) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = x / r.width - 0.5;   // -0.5 ~ 0.5
    const py = y / r.height - 0.5;

    const rotX = (-py * 10).toFixed(2); // 角度可再加大
    const rotY = (px * 12).toFixed(2);

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    el.style.setProperty("--rx", `${rotX}deg`);
    el.style.setProperty("--ry", `${rotY}deg`);
    el.style.setProperty("--ty", `-2px`);
    el.setAttribute("data-active", "1");
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
    el.style.setProperty("--ty", `0px`);
    el.removeAttribute("data-active");
  }

  return (
    <Comp
      ref={ref}
      className={["card", className].filter(Boolean).join(" ")}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      <div className="card-inner">{children}</div>
    </Comp>
  );
}
