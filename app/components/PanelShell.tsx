import SideTabs from "./SideTabs";

export default function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bp-bg)] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 bp-grid opacity-[0.18]" />
      <div className="pointer-events-none fixed inset-0 bp-grid-fine opacity-[0.10]" />
      <div className="pointer-events-none fixed inset-0 bp-noise" />

      {/* Dock: left on desktop, top on mobile */}
      <div
        className="
          fixed z-50
          left-6 top-1/2 -translate-y-1/2
          max-md:left-1/2 max-md:top-6 max-md:-translate-y-0 max-md:-translate-x-1/2
        "
      >
        <SideTabs />
      </div>

    {/* Main content panel */}
      <div className="relative w-full px-6 py-10">
        <div className="mx-auto grid w-full max-w-[1600px] grid-cols-[128px_1fr_128px] max-md:grid-cols-1">
          {/* left gutter (dock lives outside, this is just spacing) */}
          <div className="hidden md:block" />

          <main
            className="
              bp-glass rounded-2xl shadow-lg px-10 py-10
              min-h-[calc(100vh-5rem)]
              max-md:mt-[120px]
            "
          >
            {children}
          </main>

          {/* right gutter keeps it visually centered */}
          <div className="hidden md:block" />
        </div>
      </div>
    </div>
  );
}