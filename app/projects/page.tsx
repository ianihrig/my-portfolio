"use client";

import { useMemo, useState } from "react";
import ProjectModal from "../components/ProjectModal";
import ProjectTile, { type Project } from "../components/ProjectTile";

export default function ProjectsPage() {
  const projects = useMemo<Project[]>(
    () => [
      // 1) Newest — Slip Robotics (2nd internship) — HERO 2x2 (top-left)
      {
        id: "slip-intern-2025",
        title: "Slip Robotics — Swappable Battery Fleet Retrofit (V3)",
        subtitle: "Field deployment + DFM + serviceability redesign",
        year: "2025",
        tags: ["Design", "DFM", "Manufacturing"],
        imageSrc: "/projects/sliprobotics2.jpg",
        size: "2x2",
        details: {
          overview:
            "Production-minded mechanical redesign and field deployment of a swappable battery retrofit for Slip Robotics’ autonomous fleet. The project addressed repeated field failures caused by high-impact loading, connector misalignment, and latch deformation, with the goal of achieving a robust, serviceable, and production-ready solution compatible with existing robot architectures.",
          highlights: [
            "Led investigation of recurring field failures caused by high-impact events, connector rattle, and incomplete latch engagement across customer deployments",
            "Evaluated legacy latch and retention plate designs and identified failure modes related to deformation, tolerance stack-up, and assembly variability",
            "Designed and validated a retrofit solution accounting for impact loads, connector alignment, and passive battery retention under worst-case scenarios",
            "Developed rework procedures, drill jigs, and slotting strategies to enable repeatable field retrofits without full chassis replacement",
            "Coordinated mechanical redesign with service, manufacturing, and field teams to ensure feasibility, safety, and scalability",
          ],
          stack: ["SolidWorks", "GD&T and tolerance analysis", "Design for Manufacturing & Assembly (DFM/DFA)", "Supplier coordination and part sourcing", "Field testing and failure analysis"],
        },
      },

      // 2) Senior Design — HERO 2x2 (top row)
      {
        id: "capstone-flag-assembler",
        title: "Automated Toothpick Flag Assembler",
        subtitle: "Electromechanical automation for scalable assembly",
        year: "2025",
        tags: ["Mechanisms", "Mechatronics", "Prototyping"],
        imageSrc: "/projects/toothpick/toothpick.jpg",
        media: [
          { type: "image", src: "/projects/toothpick/toothpick.jpg", alt: "Automated toothpick flag assembly machine – full system view" },
          { type: "pdf", src: "/projects/toothpick/poster.pdf", label: "Expo Poster", thumb: "/projects/toothpick/poster.jpg" },
        ],
        size: "1x1",
        details: {
          overview:
            "Senior capstone project to convert a manual toothpick-flag assembly process into a scalable electromechanical system. The primary challenge was designing mechanisms that could reliably fold, glue, and insert components while maintaining alignment and cycle time under manufacturing constraints. I led the mechanical design of multiple subsystems, balancing tolerance stack-up, part manufacturability, and integration with sensors and controls. The final system served as a successful proof of concept for automating the assembly process, and FlagCo requested the prototype for continued evaluation following project completion.",
          highlights: [
            "Designed belt-driven slider actuation stage across five subsystems",
            "Led frame fabrication + integration of laser-cut, machined, and 3D-printed parts",
            "Delivered ~211 flags/hour with >50% usable; ~290% throughput increase",
          ],
          stack: ["SolidWorks", "Arduino", "CNC machining", "Sensors + motor control"],
        },
      },

      // 3) BattleBot analysis (newer than Slip 2024) — 2x1
      {
        id: "battlebot-analysis",
        title: "BattleBot Structural + Thermal Analysis",
        subtitle: "FEA-driven iteration under competition loading",
        year: "2024",
        tags: ["FEA", "Thermal", "Simulation"],
        imageSrc: "/projects/battlebot.jpg",
        size: "1x1",
        details: {
          overview:
            "Competition-driven structural and thermal analysis project focused on identifying failure modes in a combat robotics platform. The system experienced extreme impact loads and localized heating, requiring careful evaluation of stress concentrations and thermal paths. I performed structural simulations to guide geometry changes, material selection, and reinforcement strategies. The analysis directly informed redesign decisions that improved durability while minimizing mass and preserving performance.",
          highlights: [
            "Led structural FEA on armor/chassis to identify critical failure points",
            "Ran impact/stress scenarios and recommended reinforcements",
            "Simulated thermal effects on electronics to mitigate overheating risk",
          ],
          stack: ["Siemens NX (CAD/FEA)", "Structural mechanics", "Thermal analysis"],
        },
      },

      // 4) Slip Robotics (1st internship) — HERO 2x2
      {
        id: "slip-intern-2024",
        title: "Slip Robotics — V2/V2.5 Motor Reliability Retrofit & Encoder Integration",
        subtitle: "Retrofits + sourcing to reduce failures in the field",
        year: "2024",
        tags: ["Design", "Reliability", "Manufacturing"],
        imageSrc: "/projects/sliprobotics1.jpg",
        size: "2x2",
        details: {
          overview:
            "Production-critical motor retrofit to resolve recurring failures on Slip Robotics’ V2 and V2.5 autonomous robots. The existing drivetrain motors were burning out under high operational loads, limiting fleet reliability and customer uptime. I led the mechanical integration of a higher-torque, fan-cooled motor as a rapid field-ready replacement, enabling improved thermal performance, higher torque capacity, and long-term fleet standardization.",
          highlights: [
            "Investigated recurring motor burnouts on V2/V2.5 robots caused by high drivetrain loads and limited thermal margin.",
            "Integrated a higher-torque, fan-cooled motor and redesigned the encoder interface to resolve packaging conflicts introduced by active cooling",
            "Modified motor mounting and alignment features to support the new encoder placement and ensure reliable sensing",
            "Coordinated rapid machining with external shops to deliver four modified motors, bypassing long vendor lead times for accelerated validation",
            "Led deployment of five upgraded robots to a customer site; retrofit became the standard motor upgrade for all V2 and V2.5 platforms",
          ],
          stack: ["SolidWorks", "GD&T and tolerance specification", "Vendor coordination and machining quotes", "Rapid prototyping and field validation", "Design for Manufacturing & Assembly (DFM/DFA)"],
        },
      },

      // 5) ME 2110 — 1x1
      {
        id: "me2110-robot",
        title: "ME 2110 Autonomous Robotics Project",
        subtitle: "Design-build-program competition robot",
        year: "2023",
        tags: ["Mechatronics", "Autonomy", "Prototyping"],
        imageSrc: "/projects/me2110.jpg",
        size: "1x1",
        details: {
          overview:
            "Semester-long autonomous robotics build focused on designing a robot that could sense, plan, and execute tasks reliably in a constrained environment. The main challenge was integrating mechanical packaging with sensors and control logic while keeping the system robust to real-world variation (alignment, friction, battery voltage, and inconsistent inputs). I contributed to the mechanical design and iteration cycle, supporting integration/testing and refining the build based on observed failure modes. The final robot demonstrated repeatable performance through iterative prototyping, troubleshooting, and validation.",
          highlights: [
            "2nd place in design review for innovation + build quality (Out of 65 teams)",
            "Advanced to the final 16 teams; strong performance before competition-day failures",
            "Led mechanical design/fabrication + contributed to autonomy + sensor integration",
          ],
          stack: ["SolidWorks", "Arduino", "Laser cutting", "3D printing"],
        },
      },

      // 6) Robot Collective gripper — 1x1
      {
        id: "robot-collective-gripper",
        title: "Robot Collective Active Gripper",
        subtitle: "Mechanical add-on to expand robot capability",
        year: "2023",
        tags: ["Robotics", "Mechanisms", "Integration"],
        imageSrc: "/projects/robotcollective/gripper1.jpeg",
        media: [
          { type: "image", src: "/projects/robotcollective/gripper1.jpeg", alt: "3D printed gripper linkage detail" },
          { type: "image", src: "/projects/robotcollective/gripper2.jpeg", alt: "Active gripper prototype mounted on robot" },
        ],
        size: "1x1",
        details: {
          overview:
            "Design and integration of an active gripper attachment to expand the manipulation capabilities of a mobile robot platform. The core challenge was packaging a compact linkage-based gripping mechanism while maintaining compatibility with existing hardware and controls. I designed, prototyped, and iterated on the gripper geometry, coordinating mechanical interfaces with electrical and software teams. The final design enabled reliable object interaction and demonstrated system-level integration beyond navigation-only autonomy.",
          highlights: [
            "Designed + prototyped gripper mechanism and integrated with robot system",
            "Collaborated with electrical/software teams for controls integration",
            "Testing and iteration for durability and real-world interaction",
          ],
          stack: ["SolidWorks", "3D printing", "Servo actuation", "Systems integration"],
        },
      },

      // 7) Invention Studio personal builds — 2x1 (older, bottom-right endcap)
      {
        id: "invention-studio-personal",
        title: "Invention Studio Personal Projects",
        subtitle: "Fabrication + electronics across small builds",
        year: "2022–2024",
        tags: ["Fabrication", "Machining", "Electronics"],
        imageSrc: "/projects/inventionstudio/invention6.jpeg",
        media: [
          { type: "image", src: "/projects/inventionstudio/invention6.jpeg", alt: "Multi Color End Grain Cutting Board" },
          { type: "image", src: "/projects/inventionstudio/invention1.jpeg", alt: "Emoji Engraved Shot Glass" },
          { type: "image", src: "/projects/inventionstudio/invention2.jpeg", alt: "Research Photo of Yeast Engraved Shot Glass" },
          // { type: "video", src: "/projects/inventionstudio/invention8.MP4", poster: "/projects/inventionstudio/invention8P.png" },
          { type: "image", src: "/projects/inventionstudio/invention3.jpeg", alt: "Heart Shaped Candle Holders" },
          { type: "image", src: "/projects/inventionstudio/invention4.jpeg", alt: "Sri Lanka Engraving on Hydroflask" },
          // { type: "video", src: "/projects/inventionstudio/invention9.MP4", poster: "/projects/inventionstudio/invention9P.png" },
          { type: "image", src: "/projects/inventionstudio/invention5.jpeg", alt: "3D Cube Cutting Board" },
          { type: "image", src: "/projects/inventionstudio/invention7.jpeg", alt: "Engraved Glass with Name and Wreck" },
          // { type: "video", src: "/projects/inventionstudio/invention10.MP4", poster: "/projects/inventionstudio/invention10P.png" },
        ],
        size: "1x1",
        details: {
          overview:
            "Collection of fabrication and prototyping projects developed while serving as a Prototyping Instructor at Georgia Tech’s Invention Studio. The role required translating early-stage ideas into manufacturable designs under real shop constraints, including tooling limits, material availability, and safety considerations. I guided students through design reviews, fabrication planning, and iteration while also executing my own projects using machining, waterjet, and additive manufacturing processes. The experience sharpened my ability to balance design intent with practical manufacturing realities.",
          highlights: [
            "Custom cutting boards (material selection + finishing + precision milling)",
            "Laser engraving on glass and stainless (process tuning + clarity)",
            "Speed-controlled motor circuit for a mechanized display",
          ],
          stack: ["Laser cutter", "3D printing", "Machining", "Soldering + motor control"],
        },
      },
    ],
    []
  );

  const [active, setActive] = useState<Project | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-5xl font-semibold tracking-tight">Projects</h1>
        <p className="mt-3 bp-muted max-w-2xl">
          A selection of work across robotics, mechanisms, optimization, and
          manufacturing. Click a tile to expand.
        </p>
      </div>

      {/* Mosaic grid */}
      <section
        className="
          grid gap-2 sm:gap-3
          grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          auto-rows-[160px] sm:auto-rows-[170px] lg:auto-rows-[180px]
          grid-flow-dense
        "
      >
        {projects.map((p) => (
          <ProjectTile key={p.id} project={p} onOpen={() => setActive(p)} />
        ))}
      </section>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </div>
  );
}