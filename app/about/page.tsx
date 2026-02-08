"use client";

import React from "react";
import { motion } from "motion/react";
import TravelMap from "./TravelMap";
import { travelPins } from "./TravelPins";

function GlassCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`bp-glass rounded-2xl border border-white/10 ${className}`}>
      {children}
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

type MediaCard = {
  labelTop: string;
  title: string;
  subtitle?: string;
  imageSrc: string;
  ctaLabel?: string;
  ctaHref?: string;
};

type Creator = {
  name: string;
  description: string;
  href: string;
  imageSrc: string;
  platform: "YouTube" | "Instagram";
};

type WorkingItem = {
  title: string;
  description: string;
  status?: string;
  updated?: string;
};

type MosaicSlot =
  | { id: string; kind: "map"; col: number; row: number; w: number; h: number }
  | {
      id: string;
      kind: "media";
      media: "reading" | "listening";
      col: number;
      row: number;
      w: number;
      h: number;
    }
  | { id: string; kind: "working"; col: number; row: number; w: number; h: number }
  | {
      id: string;
      kind: "creator";
      creatorIndex: number;
      col: number;
      row: number;
      w: number;
      h: number;
    }
  | {
      id: string;
      kind: "placeholder";
      label?: string;
      col: number;
      row: number;
      w: number;
      h: number;
    };

export default function AboutPage() {
  // --- EDIT THESE ---
  const ABOUT =
    "Here’s a little bit about me — I love building things, traveling to new places, and sharing the journey with people who are just as curious.";

  const interests = ["Food", "Basketball", "Anime", "Travel", "Building", "Reading"];

  const readingNow: MediaCard = {
    labelTop: "READING NOW",
    title: "The Sword of Kaigen",
    subtitle: "M.L. Wang",
    imageSrc: "/about/swordofkaigen.jpg",
    ctaLabel: "Details ↗",
    ctaHref: "https://www.goodreads.com/book/show/41886271-the-sword-of-kaigen?from_search=true&from_srp=true&qid=7Upt4zFglT&rank=1",
  };

  const listeningNow: MediaCard = {
    labelTop: "LISTENING NOW",
    title: "Treasure In The Hills",
    subtitle: "Leon Thomas",
    imageSrc: "/about/listening.jpg",
    ctaLabel: "Open ↗",
    ctaHref: "https://open.spotify.com/track/64TJKMfx0QxpuR7rTXL05c?si=436f8dd3d1a844f6",
  };

  const creators: Creator[] = [
    {
      name: "Salim Benbouziyane",
      description: "Mechanical intuition, physical reasoning, and first-principles thinking.",
      href: "https://www.youtube.com/@salimbenbouz",
      imageSrc: "/about/creators/salimbenb.jpg",
      platform: "YouTube",
    },
    {
      name: "Sunday Nobody",
      description: "Minimalist industrial art exploring form, material, and balance.",
      href: "https://www.instagram.com/sunday.nobody.art/",
      imageSrc: "/about/creators/sundaynobody.jpeg",
      platform: "Instagram",
    },
    {
      name: "Chris Borge",
      description: "Thoughtful mechanical design, CAD workflows, and real-world product development.",
      href: "https://www.youtube.com/@Borgedesigns/videos",
      imageSrc: "/about/creators/chrisborge.jpg",
      platform: "YouTube",
    },
  ];

  const workingNow: WorkingItem = {
    title: "CNC Graffiti Machine + Slicing Software",
    description:
       "A CNC-style graffiti system combining a hot-swappable spray head with custom slicing software to generate layered paint paths for large-format banners.",
    status: "concept design",
    updated: "02/03/26",
  };

  // === MOSAIC LAYOUT (EDIT COORDINATES HERE) ===
  // 12 columns wide. Rows are implicit; increase row numbers to push items down.
  const MOSAIC_LAYOUT: MosaicSlot[] = [
    // Center anchor: MAP (largest)
    { id: "map", kind: "map", col: 4, row: 3, w: 9, h: 6 },

    // Media squares (3×3)
    { id: "reading", kind: "media", media: "reading", col: 1, row: 1, w: 3, h: 5 },
    { id: "listening", kind: "media", media: "listening", col: 1, row: 8, w: 3, h: 3 },

    // Working on (6×2)
    { id: "working", kind: "working", col: 7, row: 1, w: 6, h: 2 },

    // Creators (3×2)
    { id: "creator-0", kind: "creator", creatorIndex: 0, col: 1, row: 6, w: 3, h: 2 },
    { id: "creator-1", kind: "creator", creatorIndex: 1, col: 4, row: 1, w: 3, h: 2 },
    { id: "creator-2", kind: "creator", creatorIndex: 2, col: 4, row: 9, w: 3, h: 2 },

    // Future growth placeholders (subtle)
    { id: "p-1", kind: "placeholder", label: "RESERVED", col: 7, row: 9, w: 6, h: 2 },
  ];

  const renderSlot = (slot: MosaicSlot) => {
    switch (slot.kind) {
      case "map":
        return (
         <GlassCard className="h-full p-5 flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] tracking-[0.25em] uppercase text-white/55">
                Travel map
              </div>
              <div className="mt-2 text-sm text-white/65">
                Pins for places I’ve been — click a pin to view photos.
              </div>
            </div>
          </div>

          {/* IMPORTANT: flex-1 + no h-[100%] */}
          <div className="mt-4 flex-1 rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
            <TravelMap pins={travelPins} />
          </div>
        </GlassCard>
        );

      case "media": {
        const card = slot.media === "reading" ? readingNow : listeningNow;
        return <MediaMiniCard card={card} />;
      }

      case "working":
        return (
          <GlassCard className="h-full p-5 flex flex-col">
            {/* Top content should be allowed to shrink */}
            <div className="flex-1 min-h-0">
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
                WHAT I’M BUILDING
              </div>

              <div className="mt-3 text-sm font-semibold">
                {workingNow.title}
              </div>

              <p className="mt-2 text-sm text-white/65 leading-relaxed line-clamp-3">
                {workingNow.description}
              </p>
            </div>

            {/* Footer pinned at bottom */}
            <div className="mt-auto" />

            <div className="pt-32 text-xs text-white/40 font-mono">
              status: {workingNow.status ?? "active"} • updated: {workingNow.updated ?? "manual"}
            </div>
          </GlassCard>
        );

      case "creator":
        return <CreatorCard creator={creators[slot.creatorIndex]} />;

      case "placeholder":
        return <PlaceholderTile label={slot.label ?? "RESERVED"} />;

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight">About</h1>
      <p className="mt-3 text-white/70 max-w-3xl leading-relaxed">{ABOUT}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {interests.map((i) => (
          <Pill key={i}>{i}</Pill>
        ))}
      </div>

      {/* MOSAIC BOARD */}
      <div className="mt-10">

        <div className="bp-glass rounded-2xl border border-white/10 p-5">
          <div
            className="grid grid-cols-12 gap-4"
            style={{
              // tune this: 72–96px is a good range
              gridAutoRows: "80px",
            }}
          >
            {MOSAIC_LAYOUT.map((slot, i) => (
              <RevealCard
                key={slot.id}
                delay={Math.min(0.3, i * 0.03)}
                style={{
                  gridColumn: `${slot.col} / span ${slot.w}`,
                  gridRow: `${slot.row} / span ${slot.h}`,
                }}
              >
                {renderSlot(slot)}
              </RevealCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================
   Cards
========================= */

function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <a
      href={creator.href}
      target="_blank"
      rel="noreferrer"
      className="group block h-full cursor-pointer"
      aria-label={`Open ${creator.name}`}
    >
      <GlassCard
        className="
          h-full p-5
          transition
          hover:border-white/20 hover:bg-white/[0.07]
          hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]
        "
      >
        {/* Label row (like WHAT I'M BUILDING) */}
        <div className="flex items-start justify-between gap-3">
          <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
            CREATOR
          </div>

          {/* keep it small and separate from the title */}
          <div className="text-xs text-white/55 shrink-0">
            {creator.platform} ↗
          </div>
        </div>

        <div className="mt-3 flex items-start gap-4">
          {/* Bigger thumbnail */}
          <div className="shrink-0 rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            <img
              src={creator.imageSrc}
              alt={creator.name}
              className="h-24 w-24 object-cover"
              loading="lazy"
            />
          </div>

          {/* Text block */}
          <div className="min-w-0 flex-1">
            <div className="font-semibold leading-snug">
              {/* allow 2 lines before truncating */}
              <div className="line-clamp-2">{creator.name}</div>
            </div>

            <p
              className="
                mt-2 text-sm text-white/65 leading-relaxed
                line-clamp-3
                transition
                group-hover:line-clamp-none group-focus-within:line-clamp-none
                group-hover:overflow-auto group-focus-within:overflow-auto
                group-hover:max-h-[4.5rem] group-focus-within:max-h-[4.5rem]
                pr-1
              "
            >
              {creator.description}
            </p>
          </div>
        </div>
      </GlassCard>
    </a>
  );
}

function MediaMiniCard({ card }: { card: MediaCard }) {
  const clickable = !!(card.ctaHref && card.ctaLabel);

  const inner = (
    <GlassCard
      className={[
        "h-full p-5 flex flex-col overflow-hidden",
        clickable
          ? "transition hover:border-white/20 hover:bg-white/[0.07] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]"
          : "",
      ].join(" ")}
    >
      {/* top row */}
      <div className="flex items-start justify-between gap-4 shrink-0 min-w-0">
        <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
          {card.labelTop}
        </div>
        {clickable ? (
          <div className="text-xs text-white/55 shrink-0">
            {card.ctaLabel}
          </div>
        ) : null}
      </div>

      {/* image fills remaining height */}
      <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 bg-white/5 flex-1 min-h-0">
        <img
          src={card.imageSrc}
          alt={card.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      {/* bottom text stays inside */}
      <div className="mt-4 shrink-0 min-w-0">
        <div className="font-semibold truncate">{card.title}</div>
        {card.subtitle ? (
          <div className="text-sm text-white/65 truncate">{card.subtitle}</div>
        ) : null}
      </div>
    </GlassCard>
  );

  if (!clickable) return inner;

  return (
    <a
      href={card.ctaHref}
      target="_blank"
      rel="noreferrer"
      className="block h-full cursor-pointer"
      aria-label={`Open ${card.title}`}
    >
      {inner}
    </a>
  );
}

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div
      className="
        h-full rounded-2xl border border-white/10
        bg-white/[0.02]
        relative overflow-hidden
      "
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-[0.10] pointer-events-none">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="absolute inset-0 p-4 flex items-end justify-between">
        <div className="text-[10px] tracking-[0.25em] uppercase text-white/25">{label}</div>
        <div className="text-xs text-white/20 font-mono">∅</div>
      </div>
    </div>
  );
}

/* =========================
   Scroll reveal
========================= */

function RevealCard({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      style={style}
      className="h-full"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.45, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}