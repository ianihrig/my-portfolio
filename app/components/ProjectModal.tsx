"use client";

import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { Project, ProjectMedia } from "./ProjectTile";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/80">
      {children}
    </span>
  );
}

function mediaLabel(m: ProjectMedia) {
  switch (m.type) {
    case "image":
      return "Image";
    case "video":
      return "Video";
    case "youtube":
      return "YouTube";
    case "pdf":
      return m.label ?? "PDF";
    default:
      return "Media";
  }
}

function isVisual(m: ProjectMedia) {
  return m.type === "image" || m.type === "video" || m.type === "youtube" || m.type === "pdf";
}

function getThumbSrc(m: ProjectMedia) {
  // Prefer explicit visual thumbnails; otherwise fall back to generic look
  if (m.type === "image") return m.src;
  if (m.type === "video") return m.poster ?? "";
  if (m.type === "youtube") return `https://img.youtube.com/vi/${m.id}/hqdefault.jpg`;
  if (m.type === "pdf") return m.thumb ?? "";
  // pdf: no reliable thumbnail without extra work; return empty -> we’ll render a fallback tile
  return "";
}

export default function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const open = !!project;

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Build media array (uses new `media` if present; otherwise uses `imageSrc` as a single image)
  const media = useMemo<ProjectMedia[]>(() => {
    if (!project) return [];
    if (project.media?.length) return project.media;
    return [{ type: "image", src: project.imageSrc, alt: project.title }];
  }, [project]);

  const [idx, setIdx] = useState(0);

  // Reset gallery index when switching projects
  useEffect(() => {
    if (!open) return;
    setIdx(0);
  }, [open, project?.id]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();

      if (e.key === "ArrowLeft") {
        setIdx((v) => (media.length ? (v - 1 + media.length) % media.length : 0));
      }
      if (e.key === "ArrowRight") {
        setIdx((v) => (media.length ? (v + 1) % media.length : 0));
      }
    };

    window.addEventListener("keydown", onKeyDown);

    // Lock scroll behind modal
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, media.length]);

  const tags = useMemo(() => project?.tags ?? [], [project]);
  const highlights = useMemo(() => project?.details?.highlights ?? [], [project]);
  const stack = useMemo(() => project?.details?.stack ?? [], [project]);

  const active = media[idx];

  if (!open || !mounted || !project) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
        onPointerDown={onClose}
        aria-label="Close project modal"
      />

      {/* panel */}
      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
          onPointerDown={(e) => e.stopPropagation()}
          className="
            relative
            w-full max-w-[1200px]
            rounded-2xl border border-white/12
            bg-[#071428]/95
            shadow-2xl overflow-hidden
            max-h-[calc(100vh-2rem)]
            sm:max-h-[calc(100vh-3rem)]
            flex flex-col
          "
        >
          {/* header (fixed) */}
          <div className="shrink-0 flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10">
            <div className="min-w-0">
              <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
                Project • {project.year}
              </div>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight truncate">
                {project.title}
              </h3>
              <p className="mt-1 text-white/70 text-sm">{project.subtitle}</p>

              {tags.length ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              ) : null}

              {media.length > 1 ? (
                <div className="mt-3 text-xs text-white/45">
                  {idx + 1} / {media.length} • Tip: ← → to navigate, Esc to close
                </div>
              ) : (
                <div className="mt-3 text-xs text-white/45">
                  Tip: press <span className="font-mono text-white/70">Esc</span> to close
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                shrink-0
                rounded-xl border border-white/15
                bg-white/5 hover:bg-white/10
                px-4 py-2 text-sm
                transition
                focus:outline-none focus:ring-2 focus:ring-white/20
              "
            >
              Close
            </button>
          </div>

          {/* body (scrollable) */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            <div className="p-6">

              {/* FULL-WIDTH OVERVIEW */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
                  Overview
                </div>
                <p className="mt-3 text-sm text-white/75 leading-relaxed">
                  {project.details?.overview ?? "Add an overview in project.details.overview."}
                </p>
              </div>

              {/* BELOW: Media left, Highlights/Tools right */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LEFT: media + thumbs */}
                <div className="lg:col-span-2">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] overflow-hidden">
                    <div className="p-4 sm:p-6">
                      <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden">
                        {/* MEDIA VIEWER */}
                        <div className="w-full">
                          {active.type === "image" ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={active.src}
                              alt={active.alt ?? project.title}
                              className="block w-full h-auto max-h-[60vh] object-contain bg-black/20"
                              loading="lazy"
                            />
                          ) : null}

                          {active.type === "video" ? (
                            <video
                              autoPlay
                              controls
                              muted
                              playsInline
                              poster={active.poster}
                              className="block w-full max-h-[60vh] bg-black/20"
                            >
                              <source src={active.src} />
                              Your browser does not support the video tag.
                            </video>
                          ) : null}

                          {active.type === "youtube" ? (
                            <div className="w-full aspect-video bg-black/20">
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${active.id}?autoplay=1&mute=1`}
                                title={project.title}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            </div>
                          ) : null}

                          {active.type === "pdf" ? (
                            <div className="w-full h-[60vh] bg-black/20">
                              <iframe
                                src={active.src}
                                className="w-full h-full"
                                title={active.label ?? project.title}
                              />
                            </div>
                          ) : null}
                        </div>
                      </div>

                      {/* THUMBNAILS */}
                      {media.length > 1 ? (
                        <div className="mt-4">
                          <div className="flex items-center justify-between">
                            <div className="text-[10px] tracking-[0.25em] uppercase text-white/45">
                              Media
                            </div>
                            <div className="text-xs text-white/45">{mediaLabel(active)}</div>
                          </div>

                          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                            {media.map((m, i) => {
                              const thumb = getThumbSrc(m);
                              const selected = i === idx;

                              return (
                                <button
                                  key={i}
                                  type="button"
                                  onClick={() => setIdx(i)}
                                  className={[
                                    "shrink-0 rounded-xl border overflow-hidden",
                                    selected ? "border-white/30" : "border-white/10 hover:border-white/20",
                                    "bg-white/5 transition",
                                  ].join(" ")}
                                  aria-label={`Open ${mediaLabel(m)} ${i + 1}`}
                                >
                                  {thumb ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                      src={thumb}
                                      alt={mediaLabel(m)}
                                      className="h-14 w-20 object-cover"
                                      loading="lazy"
                                    />
                                  ) : (
                                    <div className="h-14 w-20 flex items-center justify-center text-[10px] text-white/55">
                                      {m.type.toUpperCase()}
                                    </div>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {/* RIGHT: highlights + tools */}
                <div className="lg:col-span-1 space-y-6">
                  {highlights.length ? (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
                        Highlights
                      </div>
                      <ul className="mt-3 space-y-2 text-sm text-white/75">
                        {highlights.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="text-[10px] tracking-[0.25em] uppercase text-white/55">
                      Tools / Stack
                    </div>

                    {stack.length ? (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {stack.map((s) => (
                          <Pill key={s}>{s}</Pill>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-3 text-sm text-white/60">
                        Add items in <span className="font-mono">project.details.stack</span>.
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}