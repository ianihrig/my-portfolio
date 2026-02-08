"use client";

import React from "react";

export type ProjectMedia =
  | { type: "image"; src: string; alt?: string }
  | { type: "video"; src: string; poster?: string }
  | { type: "youtube"; id: string }
    | { type: "pdf"; src: string; label?: string; thumb?: string };

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tags: string[];
  imageSrc: string; // still used for grid + fallback
  size?: "1x1" | "2x2" | "2x1";
  media?: ProjectMedia[]; // 👈 NEW
  details?: {
    overview?: string;
    highlights?: string[];
    stack?: string[];
  };
};

function sizeClass(size?: Project["size"]) {
  switch (size) {
    case "2x2":
      return "sm:col-span-2 sm:row-span-2";
    case "2x1":
      return "sm:col-span-2";
    default:
      return "";
  }
}

export default function ProjectTile({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className={[
        "group relative w-full h-full",
        "rounded-xl overflow-hidden text-left",
        "border border-white/10 bg-white/5",
        "focus:outline-none focus:ring-2 focus:ring-white/25",
        "transition will-change-transform",
        // keep your lift if you want, or remove for a flatter Raphael feel
        "hover:-translate-y-0.5 hover:border-white/20",
        "hover:shadow-[0_14px_36px_rgba(0,0,0,0.30)]",
        sizeClass(project.size),
      ].join(" ")}
      aria-label={`Open project: ${project.title}`}
    >
      {/* Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={project.imageSrc}
        alt={project.title}
        className="
          absolute inset-0 h-full w-full object-cover
          transition duration-300
          group-hover:scale-[1.02]
          group-hover:opacity-15
        "
      />

      {/* Raphael-style overlay: mostly solid tint on hover */}
      <div
        className="
          absolute inset-0
          bg-[#0b1426]/0
          transition duration-300
          group-hover:bg-[#0b1426]/85
        "
      />

      {/* Optional subtle grid texture on hover (fits your blueprint vibe) */}
      <div
        className="
          absolute inset-0
          opacity-0 group-hover:opacity-[0.12]
          transition duration-300
          pointer-events-none
        "
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.22) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Center title (only appears on hover/focus) */}
      <div
        className="
          absolute inset-0 flex items-center justify-center
          px-6 text-center
          opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100
          transition duration-300
        "
      >
        <div className="max-w-[26ch]">
          <div className="text-lg font-semibold tracking-tight text-white">
            {project.title}
          </div>
        </div>
      </div>
    </button>
  );
}