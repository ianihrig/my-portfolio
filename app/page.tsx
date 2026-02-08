"use client";

import React, { useMemo } from "react";

type ResumeItem = {
  title: string;
  org: string;
  location?: string;
  dates: string;
  bullets: string[];
};

type EducationItem = {
  school: string;
  degree: string;
  dates: string;
  details?: string[];
};

function SectionHeader({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4">
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      {right}
    </div>
  );
}

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

export default function OverviewPage() {
  // --- EDIT THESE ---
  const HEADLINE = "Hello! My name is Ian.";
  const SUBHEAD =
    "I’m a mechanical engineer completing my master’s degree at Georgia Tech, with a strong interest in robotics hardware and mechanism design. My work spans the full engineering process, from requirements and concept CAD to analysis, sourcing, fabrication, and validation. I enjoy being hands-on with hardware and building systems designed to work in the real world.";
  const FOCUS = ["Robotics", "Mechanisms", "DFM", "Optimization", "Manufacturing"];
  const PHOTO_SRC = "/me.jpg"; // put in /public/me.jpg (or change path)

  const RESUME_PDF = "/resume.pdf"; // put in /public/resume.pdf

  const experience = useMemo<ResumeItem[]>(
    () => [
      {
        title: "Mechanical Engineering Intern ",
        org: "Slip Robotics",
        location: "Norcross, GA",
        dates: "May 2025 – Aug. 2025",
        bullets: [
          "Led design and field implementation of a swappable battery retrofit across a high-profile customer’s SlipBot fleet, reducing per-bot lifetime maintenance costs by 50.6%, totaling $155,846 in fleet-wide savings and notably improving reliability.",
          "Developed and validated rework procedures for SlipBot battery upgrades, including custom drill jigs, detailed instructions, and sourcing plans; reduced yearly battery swap labor time by 37% and improved serviceability across the entire fleet.",
          "Re-engineered a proof-of-concept Rack Attachment into a manufacturable MVP for current SlipBot, emphasizing DFM through modular panels, locating pins, and tab-slot joints; delivered a fully specified, prototype-ready design for fabrication.",
        ],
      },
      {
        title: "Mechanical Engineering Intern",
        org: "Slip Robotics",
        location: "Norcross, GA",
        dates: "May 2024 – Aug. 2024",
        bullets: [
          "Developed a fan-cooled motor retrofit to replace a high-failure legacy motor, enabling seamless integration into existing chassis architecture and resulting in reduced lifetime cost, enhanced cooling performance, and greater field reliability.",
          "Selected motor, component, and machined-part vendors based on cost, lead time, and quality to align with company goals; coordinated feedback and rapid iterations to meet tight production deadlines and support urgent field replacements.",
          "Led redesign of swappable battery charging components, eliminating electrical arcing and enhancing safety standards.",
          "Diagnosed Mecanum wheel issues through QA testing, identifying 4 failure modes that informed design improvements.",
        ],
      },
      {
        title: "Prototyping Instructor",
        org: "Georgia Tech Invention Studio",
        location: "Atlanta, GA",
        dates: "Sep. 2022 – May 2025",
        bullets: [
          "Conducted training sessions in advanced prototyping techniques, including water jetting, SLS printing, and laser cutting.",
          "Gained hands-on proficiency in project development, precise tool operation, and strict adherence to tool safety protocols.",
          "Assisted with 50+ Georgia Tech student prototypes as a project consultant, guiding students through project fabrication.",
        ],
      },
      {
        title: "Design Member (Combat Robotics)",
        org: "RoboJackets",
        location: "Atlanta, GA",
        dates: "Sep. 2022 – May 2023",
        bullets: [
          "Developed technical proficiency in machining strategies to optimize precision, efficiency, and post-manufacturing needs.",
          "Designed and fabricated drivetrain components for a unique modular combat robot using waterjets, mills, and lathes.",
        ],
      },
    ],
    []
  );

  const education = useMemo<EducationItem[]>(
    () => [
      {
        school: "Georgia Institute of Technology",
        degree: "M.S. Mechanical Engineering",
        dates: "2025–2026 (in progress)",
        details: [
          "Focus: robotics, design, controls/optimization, manufacturing",
          "Relevant coursework: Intro Robotics Research; Robotics; Linear Controls; Modeling & Simulation in Design; Computer-Aided Design; Fatigue of Materials & Structures; Manufacturing Processes & Systems",
        ],
      },
      {
        school: "Georgia Institute of Technology",
        degree: "B.S. Mechanical Engineering",
        dates: "2021–2025",
        details: [
          "Hands-on design/build/test, fabrication, and project leadership",
          "Relevant coursework: Interactive CAD & CAE (NX); Machine Design; Dynamics of Rigid Bodies; Mechanics of Deformable Bodies; Thermodynamics; Fluid Mechanics",
        ],
      },
    ],
    []
  );

  const leadership = useMemo(
    () => [
      {
        title: "Fraternity Leadership (FIJI)",
        bullets: [
          "Led initiatives and events; supported recruiting and member development.",
        ],
      },
      {
        title: "Team / Project Leadership",
        bullets: [
          "Coordinated timelines, delivered prototypes, and communicated technical decisions clearly.",
        ],
      },
    ],
    []
  );

  const skills = useMemo(
    () => [
      "SolidWorks",
      "GD&T",
      "DFM/DFA",
      "FEA (ANSYS / Simulation)",
      "MATLAB",
      "Tolerance analysis",
      "Supplier sourcing",
      "Machining + fabrication",
      "Prototyping + testing",
    ],
    []
  );

  

  return (
    <div className="w-full">
      <h1 className="text-5xl font-semibold tracking-tight">Overview</h1>

      {/* Top block: photo left, identity right */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
        <GlassCard className="p-5">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PHOTO_SRC} alt="Portrait" className="h-[360px] w-full object-cover" />
          </div>
          <p className="mt-4 text-sm text-white/60">
            Atlanta, GA • Open to robotics/mech design roles
          </p>
        </GlassCard>

        <GlassCard className="p-7">
          <div className="max-w-3xl">
            <div className="text-[11px] tracking-[0.25em] uppercase text-white/55">
              Identity
            </div>
            <h2 className="mt-2 text-2xl font-semibold leading-tight">
              {HEADLINE}
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">{SUBHEAD}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <Pill key={f}>{f}</Pill>
              ))}
            </div>

            <div className="mt-6">
              <a
                href={RESUME_PDF}
                className="
                  inline-flex items-center justify-center
                  rounded-xl border border-white/15
                  bg-white/10 hover:bg-white/15
                  px-5 py-3 text-sm font-medium
                  transition
                  focus:outline-none focus:ring-2 focus:ring-white/20
                "
              >
                Download Resume (PDF)
              </a>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Resume sections */}
      <div className="mt-10 space-y-6">
        <GlassCard className="p-7">
          <SectionHeader title="Experience" />
          <div className="mt-5 space-y-6">
            {experience.map((x) => (
              <div key={`${x.title}-${x.org}`} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div className="min-w-0">
                    <div className="text-lg font-semibold">{x.title}</div>
                    <div className="text-white/70">
                      {x.org}
                      {x.location ? <span className="text-white/45"> • {x.location}</span> : null}
                    </div>
                  </div>
                  <div className="text-sm text-white/55">{x.dates}</div>
                </div>
                <ul className="mt-3 space-y-2 text-white/80">
                  {x.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-7">
          <SectionHeader title="Education" />
          <div className="mt-5 space-y-5">
            {education.map((e) => (
              <div key={e.school + e.degree} className="border-b border-white/10 pb-5 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <div>
                    <div className="text-lg font-semibold">{e.school}</div>
                    <div className="text-white/70">{e.degree}</div>
                  </div>
                  <div className="text-sm text-white/55">{e.dates}</div>
                </div>
                {!!e.details?.length && (
                  <ul className="mt-3 space-y-2 text-white/80">
                    {e.details.map((d, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/35 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}