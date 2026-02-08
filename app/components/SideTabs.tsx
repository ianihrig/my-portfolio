"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Children, cloneElement, useMemo, useRef } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "motion/react";

type Tab = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

/** Minimal inline icons (no extra packages) */
function IconHome() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M6.5 10.5V21h11V10.5" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z" />
    </svg>
  );
}
function IconUser() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 21a8 8 0 0 0-16 0" />
      <path d="M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6h16v12H4z" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  );
}

const tabs: Tab[] = [
  { label: "Overview", href: "/", icon: <IconHome /> },
  { label: "Projects", href: "/projects", icon: <IconGrid /> },
  { label: "About", href: "/about", icon: <IconUser /> },
  { label: "Contact", href: "/contact", icon: <IconMail /> },
];

type DockItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  axis: "x" | "y";
  mouse: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  className?: string;
};

function DockItem({
  children,
  className = "",
  onClick,
  axis,
  mouse,
  spring,
  distance,
  magnification,
  baseItemSize,
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouse, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return Infinity;
    const center = axis === "y" ? rect.y + rect.height / 2 : rect.x + rect.width / 2;
    return val - center;
  });

  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize]
  );

  const size = useSpring(targetSize, spring);

  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      className={[
        "group relative flex items-center justify-center rounded-2xl cursor-pointer select-none",
        "border border-white/15 bg-white/5 backdrop-blur-md",
        "transition-colors",
        className,
      ].join(" ")}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
    >
      {Children.map(children, (child) =>
        React.isValidElement(child)
          ? cloneElement(
              child as React.ReactElement<{ isHovered?: MotionValue<number> }>,
              { isHovered }
            )
          : child
      )}
    </motion.div>
  );
}

function DockIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-current opacity-90 transition-opacity group-hover:opacity-100">
      {children}
    </div>
  );
}

function DockLabel({
  children,
  isHovered,
  orientation,
}: {
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  orientation: "vertical" | "horizontal";
}) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (!isHovered) return;
    const unsub = isHovered.on("change", (latest) => setIsVisible(latest === 1));
    return () => unsub();
  }, [isHovered]);

  const tooltipClass =
    orientation === "vertical"
      ? "absolute left-[76px] top-1/2 -translate-y-1/2"
      : "absolute left-1/2 -translate-x-1/2 bottom-[76px]";

  const motionProps =
    orientation === "vertical"
      ? {
          initial: { opacity: 0, x: 8 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 8 },
        }
      : {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: 8 },
        };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          {...motionProps}
          transition={{ duration: 0.18 }}
          className={[
            "pointer-events-none",
            tooltipClass,
            "rounded-lg border border-white/15 bg-[#071428]/90",
            "px-3 py-1.5 text-xs text-white/90 whitespace-nowrap shadow-lg",
          ].join(" ")}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function VerticalDock() {
  const pathname = usePathname();

  const mouseY = useMotionValue(Infinity);

  const spring = useMemo<SpringOptions>(
    () => ({ mass: 0.14, stiffness: 180, damping: 14 }),
    []
  );
  const baseItemSize = 46;
  const magnification = 68;
  const distance = 130;

  return (
    <motion.nav
      className="
        w-[84px]
        overflow-visible
        rounded-2xl border border-white/15 bg-white/5
        backdrop-blur-md shadow-lg
        px-2 py-3
      "
      onMouseMove={({ pageY }) => mouseY.set(pageY)}
      onMouseLeave={() => mouseY.set(Infinity)}
      aria-label="Primary"
    >
      <div className="flex flex-col items-center gap-2.5">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);

          return (
            <Link
              key={t.href}
              href={t.href}
              className="outline-none"
              aria-current={active ? "page" : undefined}
            >
              <DockItem
                axis="y"
                mouse={mouseY}
                spring={spring}
                distance={distance}
                baseItemSize={baseItemSize}
                magnification={magnification}
                className={
                  active
                    ? "bg-white text-black ring-1 ring-white/35 shadow-[0_0_14px_rgba(210,230,255,0.12)]"
                    : "hover:ring-1 hover:ring-white/20 hover:shadow-[0_0_12px_rgba(210,230,255,0.08)]"
                }
              >
                <DockIcon>{t.icon}</DockIcon>
                <DockLabel orientation="vertical">{t.label}</DockLabel>
              </DockItem>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

function HorizontalDock() {
  const pathname = usePathname();

  const mouseX = useMotionValue(Infinity);

  const spring = useMemo<SpringOptions>(
    () => ({ mass: 0.14, stiffness: 180, damping: 14 }),
    []
  );
  const baseItemSize = 44;
  const magnification = 64;
  const distance = 120;

  return (
    <motion.nav
      className="
        w-fit
        overflow-visible
        rounded-2xl border border-white/15 bg-white/5
        backdrop-blur-md shadow-lg
        px-3 py-3
      "
      onMouseMove={({ pageX }) => mouseX.set(pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      aria-label="Primary"
    >
      <div className="flex items-center justify-center gap-2.5">
        {tabs.map((t) => {
          const active = isActive(pathname, t.href);

          return (
            <Link
              key={t.href}
              href={t.href}
              className="outline-none"
              aria-current={active ? "page" : undefined}
            >
              <DockItem
                axis="x"
                mouse={mouseX}
                spring={spring}
                distance={distance}
                baseItemSize={baseItemSize}
                magnification={magnification}
                className={
                  active
                    ? "bg-white text-black ring-1 ring-white/35 shadow-[0_0_14px_rgba(210,230,255,0.12)]"
                    : "hover:ring-1 hover:ring-white/20 hover:shadow-[0_0_12px_rgba(210,230,255,0.08)]"
                }
              >
                <DockIcon>{t.icon}</DockIcon>
                <DockLabel orientation="horizontal">{t.label}</DockLabel>
              </DockItem>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}

export default function SideTabs() {
  return (
    <>
      <div className="hidden md:block">
        <VerticalDock />
      </div>

      <div className="md:hidden">
        <HorizontalDock />
      </div>
    </>
  );
}