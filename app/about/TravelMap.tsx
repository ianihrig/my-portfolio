"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export type TravelPin = {
  id: string;
  title: string;
  country?: string;
  lat: number;
  lng: number;
  photos: { src: string; alt?: string }[];
  note?: string;
};

type Props = {
  pins: TravelPin[];
};

function PhotoModal({
  open,
  onClose,
  title,
  photos,
  note,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  photos: { src: string; alt?: string }[];
  note?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) setIdx(0);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((v) => Math.min(v + 1, photos.length - 1));
      if (e.key === "ArrowLeft") setIdx((v) => Math.max(v - 1, 0));
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, photos.length]);

  if (!open || !mounted) return null;
  if (!photos.length) return null;

  const active = photos[idx];

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <button
        type="button"
        className="absolute inset-0 bg-black/65 backdrop-blur-md"
        onPointerDown={onClose}
        aria-label="Close modal"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onPointerDown={(e) => e.stopPropagation()}
          className="
            relative
            w-full max-w-[900px]
            rounded-2xl border border-white/12
            bg-[#071428]/95
            shadow-2xl overflow-hidden
            max-h-[calc(100vh-2rem)]
            sm:max-h-[calc(100vh-3rem)]
          "
        >
          <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-white/10">
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-tight truncate">{title}</h3>
              {note ? <p className="mt-1 text-white/65 text-sm">{note}</p> : null}
              <div className="mt-2 text-xs text-white/45">
                {idx + 1} / {photos.length} • Tip: ← / → to navigate, Esc to close
              </div>
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

          <div className="overflow-y-auto">
            <div className="p-6">
              {/* Body */}
              <div className="p-6 flex flex-col items-center">
                {/* Image stage — centered horizontally */}
                <div className="w-full flex justify-center">
                  <div className="max-w-[980px] max-h-[60vh]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={active.src}
                      alt={active.alt ?? title}
                      className="
                        block
                        max-h-[60vh]
                        max-w-full
                        w-auto
                        object-contain
                        rounded-2xl
                        select-none
                      "
                      loading="eager"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
              {photos.length > 1 ? (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                  {photos.map((p, i) => (
                    <button
                      key={p.src + i}
                      onClick={() => setIdx(i)}
                      className={[
                        "shrink-0 rounded-xl overflow-hidden transition ring-1",
                        i === idx
                          ? "ring-white/30"
                          : "ring-white/10 hover:ring-white/20",
                      ].join(" ")}
                      type="button"
                      aria-label={`Open photo ${i + 1}`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.src}
                      alt={p.alt ?? ""}
                      className="h-16 w-24 object-cover rounded-lg"
                    />
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TravelMap({ pins }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<any>(null);
  const hoverPopupRef = useRef<any>(null);

  const [activePin, setActivePin] = useState<TravelPin | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  // Stable lookup for click -> pin
  const pinById = useMemo(() => {
    const m = new Map<string, TravelPin>();
    pins.forEach((p) => m.set(p.id, p));
    return m;
  }, [pins]);

  // GeoJSON for Mapbox
  const geojson = useMemo(() => {
    return {
      type: "FeatureCollection",
      features: pins.map((p) => ({
        type: "Feature",
        geometry: { type: "Point", coordinates: [p.lng, p.lat] },
        properties: { id: p.id, title: p.title, country: p.country },
      })),
    } as const;
  }, [pins]);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!token) return;

    let cancelled = false;
    let map: any;

    (async () => {
      const mod = await import("mapbox-gl");
      const mapboxgl = mod.default;
      if (cancelled) return;

      mapboxgl.accessToken = token;

      map = new mapboxgl.Map({
        container: containerRef.current!,
        style: "mapbox://styles/iihrig/cmkabgqvl001w01s00tlw3lin",
        center: [-20, 20],
        zoom: 1.2,
        projection: "mercator",
        attributionControl: false,
      });

      mapRef.current = map;

      hoverPopupRef.current = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        offset: 14,
        className: "pin-hover-popup",
      });

      map.addControl(new mapboxgl.NavigationControl({ visualizePitch: true }), "top-right");

      // Make sure it sizes correctly in a glass container
      requestAnimationFrame(() => map.resize());
      setTimeout(() => map.resize(), 150);

      map.on("load", () => {
        // Fit bounds first (optional)
        if (pins.length >= 2) {
          const b = new mapboxgl.LngLatBounds();
          pins.forEach((p) => b.extend([p.lng, p.lat]));
          map.fitBounds(b, { padding: 80, duration: 900, maxZoom: 4.2 });
        } else if (pins.length === 1) {
          map.flyTo({ center: [pins[0].lng, pins[0].lat], zoom: 4, duration: 900 });
        }

        // SOURCE
        if (!map.getSource("travel-pins")) {
          map.addSource("travel-pins", { type: "geojson", data: geojson });
        }

        // GLOW (under)
        if (!map.getLayer("travel-pins-glow")) {
          map.addLayer({
            id: "travel-pins-glow",
            type: "circle",
            source: "travel-pins",
            paint: {
              "circle-radius": [
                "case",
                ["==", ["get", "id"], hoverId ?? ""],
                18,
                14,
              ],
              "circle-color": [
                "case",
                ["==", ["get", "id"], hoverId ?? ""],
                "rgba(120,190,255,0.35)",
                "rgba(120,190,255,0.22)",
              ],
              "circle-blur": 0.8,
            },
          });
        }

        // PIN (top)
        if (!map.getLayer("travel-pins-layer")) {
          map.addLayer({
            id: "travel-pins-layer",
            type: "circle",
            source: "travel-pins",
            paint: {
              "circle-radius": [
                "case",
                ["==", ["get", "id"], hoverId ?? ""],
                10,
                8,
              ],
              "circle-color": "#0B1220", // dark pin
              "circle-stroke-width": 2,
              "circle-stroke-color": [
                "case",
                ["==", ["get", "id"], hoverId ?? ""],
                "rgba(255, 255, 255, 1)",
                "rgba(255, 255, 255, 0.95)",
              ],
            },
          });
        }

        // Hover cursor + state (no smooth transform, so it won't "wiggle")
        map.on("mouseenter", "travel-pins-layer", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mousemove", "travel-pins-layer", (e: any) => {
          const f = e.features?.[0];
          const id = f?.properties?.id as string | undefined;
          const title = f?.properties?.title as string | undefined;
          if (!id || !title) return;

          setHoverId(id);

          // e.lngLat is where your cursor is on the map
          const country = f?.properties?.country as string | undefined;

          hoverPopupRef.current
            ?.setLngLat(e.lngLat)
            ?.setHTML(`
              <div class="pin-hover-label">
                ${title}${country ? ` <span class="pin-hover-dot">•</span> ${country}` : ""}
              </div>
            `)
            ?.addTo(map);
        });

        map.on("mouseleave", "travel-pins-layer", () => {
          map.getCanvas().style.cursor = "";
          setHoverId(null);
          hoverPopupRef.current?.remove();
        });

        // Click => open modal
        map.on("click", "travel-pins-layer", (e: any) => {
          const f = e.features?.[0];
          const id = f?.properties?.id as string | undefined;
          if (!id) return;

          const pin = pinById.get(id);
          if (pin) setActivePin(pin);
        });
      });
    })();

    return () => {
      cancelled = true;
      try {
        map?.remove();
        mapRef.current = null;
      } catch {}
      hoverPopupRef.current?.remove();
      hoverPopupRef.current = null;
    };
    // IMPORTANT: do not depend on `pins` here, or you'll recreate the whole map.
    // We'll update the source data in a separate effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Update the GeoJSON source when pins change (without rebuilding map)
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const src = map.getSource("travel-pins") as any;
    if (!src) return;

    src.setData(geojson);
  }, [geojson]);

  // Update hover styling without rebuilding layers
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (!map.getLayer("travel-pins-layer")) return;

    // force a style refresh by re-setting paint properties (cheap + reliable)
    try {
      map.setPaintProperty("travel-pins-layer", "circle-radius", [
        "case",
        ["==", ["get", "id"], hoverId ?? ""],
        10,
        8,
      ]);
      map.setPaintProperty("travel-pins-layer", "circle-stroke-color", [
        "case",
        ["==", ["get", "id"], hoverId ?? ""],
        "rgba(255, 255, 255, 1)",
        "rgba(251, 251, 251, 1)",
      ]);

      map.setPaintProperty("travel-pins-glow", "circle-radius", [
        "case",
        ["==", ["get", "id"], hoverId ?? ""],
        18,
        14,
      ]);
      map.setPaintProperty("travel-pins-glow", "circle-color", [
        "case",
        ["==", ["get", "id"], hoverId ?? ""],
        "rgba(120,190,255,0.35)",
        "rgba(120,190,255,0.22)",
      ]);
    } catch {}
  }, [hoverId]);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />

      {!token ? (
        <div className="absolute inset-0 grid place-items-start p-4">
          <div className="text-sm text-white/70">
            Mapbox token missing. Add{" "}
            <span className="font-mono text-white/85">NEXT_PUBLIC_MAPBOX_TOKEN</span>{" "}
            to <span className="font-mono text-white/85">.env.local</span> and restart the dev server.
          </div>
        </div>
      ) : null}

      {/* Mapbox UI polish */}
      <style jsx global>{`
        .mapboxgl-control-container .mapboxgl-ctrl-group {
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          backdrop-filter: blur(10px);
        }
        .mapboxgl-ctrl-group button {
          filter: brightness(1.15);
        }
        .pin-hover-popup .mapboxgl-popup-content {
          background: rgba(7, 20, 40, 0.92);
          border: 1px solid rgba(255, 255, 255, 0.14);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          padding: 8px 10px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.35);
        }

        .pin-hover-popup .mapboxgl-popup-tip {
          border-top-color: rgba(7, 20, 40, 0.92) !important;
        }

        .pin-hover-label {
          color: rgba(255,255,255,0.9);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .pin-hover-dot {
          margin: 0 4px;
          color: rgba(255,255,255,0.45);
        }
      `}</style>

      <PhotoModal
        open={!!activePin}
        onClose={() => setActivePin(null)}
        title={activePin?.title ?? ""}
        photos={activePin?.photos ?? []}
        note={activePin?.note}
      />
    </div>
  );
}