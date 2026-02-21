"use client";

import {
  IconBriefcase,
  IconCurrencyDollar,
  IconUsers,
  IconCode,
  IconFileCode,
  IconCalendarStats,
  IconSchool,
  IconTrophy,
} from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// ─────────────────────────── DATA ───────────────────────────

interface StatData {
  Icon: (props: {
    size?: number;
    stroke?: number;
    className?: string;
  }) => ReactNode;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  desc: string;
}

const STATS: StatData[] = [
  {
    Icon: IconBriefcase,
    label: "Projects Shipped",
    value: 30,
    suffix: "+",
    desc: "Across web, mobile & blockchain",
  },
  {
    Icon: IconCurrencyDollar,
    label: "Avg. Hourly Rate",
    value: 85,
    prefix: "$",
    suffix: "/hr",
    desc: "Competitive & results-driven",
  },
  {
    Icon: IconUsers,
    label: "Clients Served",
    value: 15,
    suffix: "+",
    desc: "From startups to enterprises",
  },
  {
    Icon: IconCode,
    label: "Technologies Used",
    value: 20,
    suffix: "+",
    desc: "Languages, frameworks & tools",
  },
  {
    Icon: IconFileCode,
    label: "Smart Contracts",
    value: 15,
    suffix: "+",
    desc: "Deployed on-chain securely",
  },
  {
    Icon: IconCalendarStats,
    label: "Years Experience",
    value: 5,
    suffix: "+",
    desc: "Building scalable systems",
  },
  {
    Icon: IconSchool,
    label: "Developers Mentored",
    value: 55,
    suffix: "+",
    desc: "Trained & coached to succeed",
  },
  {
    Icon: IconTrophy,
    label: "Bounties Earned",
    value: 5000,
    prefix: "$",
    suffix: "+",
    desc: "In blockchain hackathons",
  },
];

const TECH_BARS = [
  { name: "TypeScript / JavaScript", pct: 95 },
  { name: "React / Next.js", pct: 95 },
  { name: "Node.js / Express", pct: 90 },
  { name: "Solidity / Move (Blockchain)", pct: 85 },
  { name: "Rust", pct: 78 },
  { name: "Python / Django", pct: 75 },
  { name: "Databases (MongoDB, PostgreSQL)", pct: 80 },
  { name: "Cloud & DevOps (AWS, Docker)", pct: 70 },
];

const RADAR_SKILLS = [
  { label: "Frontend", value: 95 },
  { label: "Blockchain", value: 88 },
  { label: "Backend", value: 85 },
  { label: "Smart\nContracts", value: 83 },
  { label: "Mobile", value: 72 },
  { label: "DevOps", value: 68 },
];

// ─────────────────────── HELPERS ────────────────────────────

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

function polarXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function hexPoints(cx: number, cy: number, r: number, n: number): string {
  return Array.from({ length: n }, (_, i) => {
    const p = polarXY(cx, cy, r, (i * 360) / n);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function skillPolygonPoints(
  cx: number,
  cy: number,
  maxR: number,
  skills: { value: number }[],
  progress: number,
): string {
  return skills
    .map((s, i) => {
      const r = (s.value / 100) * maxR * progress;
      const p = polarXY(cx, cy, r, (i * 360) / skills.length);
      return `${p.x},${p.y}`;
    })
    .join(" ");
}

// ──────────────────── ANIMATED COUNTER ──────────────────────

function AnimatedCounter({
  to,
  prefix = "",
  suffix = "",
  running,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  running: boolean;
}) {
  const [val, setVal] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!running) {
      setVal(0);
      return;
    }
    const t0 = performance.now();
    const dur = 1800;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setVal(Math.round(easeOutCubic(p) * to));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [to, running]);

  return (
    <span>
      {prefix}
      {val.toLocaleString()}
      {suffix}
    </span>
  );
}

// ──────────────────────── STAT CARD ─────────────────────────

function StatCard({
  stat,
  delay,
  running,
}: {
  stat: StatData;
  delay: number;
  running: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!running) {
      setVisible(false);
      return;
    }
    const id = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(id);
  }, [running, delay]);

  const { Icon, label, value, prefix, suffix, desc } = stat;

  return (
    <div
      className={`panel--glass relative flex flex-col gap-2.5 p-4 sm:p-5 rounded-2xl border border-white/5 transition-all duration-700 ease-out cursor-default select-none
        hover:border-accent/30 hover:shadow-[0_0_30px_rgba(255,212,0,0.08)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      {/* corner accent glow */}
      <div className="absolute top-0 right-0 w-12 h-12 rounded-bl-full bg-accent/5 pointer-events-none" />

      <div className="flex items-center gap-2">
        <span className="p-1.5 rounded-lg bg-accent/10 flex-shrink-0">
          <Icon size={14} stroke={1.5} className="text-accent" />
        </span>
        <span className="text-[10px] sm:text-[11px] text-primary/45 font-medium uppercase tracking-[0.1em] sm:tracking-[0.14em] leading-tight">
          {label}
        </span>
      </div>

      <p className="text-2xl sm:text-[2rem] font-bold text-primary leading-none tabular-nums">
        <AnimatedCounter
          to={value}
          prefix={prefix}
          suffix={suffix}
          running={visible}
        />
      </p>

      <p className="text-[10px] sm:text-[11px] text-primary/40 font-light leading-snug">
        {desc}
      </p>
    </div>
  );
}

// ───────────────────────── TECH BAR ─────────────────────────

function TechBar({
  name,
  pct,
  delay,
  running,
}: {
  name: string;
  pct: number;
  delay: number;
  running: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!running) {
      setWidth(0);
      return;
    }
    const id = setTimeout(() => setWidth(pct), delay + 300);
    return () => clearTimeout(id);
  }, [running, pct, delay]);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-baseline">
        <span className="text-[11px] sm:text-[13px] text-primary/75 font-medium">
          {name}
        </span>
        <span className="text-[10px] sm:text-[12px] font-bold text-accent">
          {pct}%
        </span>
      </div>
      <div className="h-[5px] rounded-full bg-white/[0.06] overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            width: `${width}%`,
            background: "linear-gradient(90deg, #FFD400 0%, #E6C200 100%)",
            transition: "width 900ms cubic-bezier(.2,.9,.4,1)",
          }}
        />
      </div>
    </div>
  );
}

// ───────────────────────── RADAR CHART ──────────────────────

const CX = 140,
  CY = 145,
  MAX_R = 98,
  N = RADAR_SKILLS.length;
const GRID_LEVELS = [0.2, 0.4, 0.6, 0.8, 1.0];

function RadarChart({ running }: { running: boolean }) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!running) {
      setProgress(0);
      return;
    }
    const t0 = performance.now();
    const dur = 1400;

    const tick = (now: number) => {
      const p = Math.min((now - t0) / dur, 1);
      setProgress(easeOutCubic(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  return (
    <div className="flex flex-col items-center gap-5">
      <svg
        viewBox="0 0 280 295"
        className="w-full max-w-[240px] sm:max-w-[300px]"
        aria-label="Skill domains radar chart"
      >
        {/* ── Grid rings ── */}
        {GRID_LEVELS.map((lvl) => (
          <polygon
            key={lvl}
            points={hexPoints(CX, CY, MAX_R * lvl, N)}
            fill={lvl === 1.0 ? "rgba(255,212,0,0.025)" : "none"}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
        ))}

        {/* ── Axis spokes ── */}
        {RADAR_SKILLS.map((_, i) => {
          const end = polarXY(CX, CY, MAX_R, (i * 360) / N);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          );
        })}

        {/* ── Skill fill polygon ── */}
        <polygon
          points={skillPolygonPoints(CX, CY, MAX_R, RADAR_SKILLS, progress)}
          fill="rgba(255,212,0,0.11)"
          stroke="#FFD400"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />

        {/* ── Glow duplicate (soft) ── */}
        <polygon
          points={skillPolygonPoints(CX, CY, MAX_R, RADAR_SKILLS, progress)}
          fill="none"
          stroke="rgba(255,212,0,0.25)"
          strokeWidth="6"
          strokeLinejoin="round"
          style={{ filter: "blur(4px)" }}
        />

        {/* ── Dots at vertices ── */}
        {RADAR_SKILLS.map((s, i) => {
          const r = (s.value / 100) * MAX_R * progress;
          const pt = polarXY(CX, CY, r, (i * 360) / N);
          return (
            <circle
              key={i}
              cx={pt.x}
              cy={pt.y}
              r="4"
              fill="#FFD400"
              opacity={progress}
            />
          );
        })}

        {/* ── Ring % labels (top spoke) ── */}
        {[20, 40, 60, 80].map((pct) => {
          const pt = polarXY(CX, CY, (pct / 100) * MAX_R, 0);
          return (
            <text
              key={pct}
              x={pt.x + 4}
              y={pt.y}
              fill="rgba(255,255,255,0.22)"
              fontSize="7"
              fontFamily="Inter, system-ui, sans-serif"
              dominantBaseline="middle"
            >
              {pct}
            </text>
          );
        })}

        {/* ── Axis labels ── */}
        {RADAR_SKILLS.map((s, i) => {
          const pt = polarXY(CX, CY, MAX_R + 28, (i * 360) / N);
          const lines = s.label.split("\n");
          return (
            <text
              key={i}
              x={pt.x}
              y={pt.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#9ea3a6"
              fontSize="10"
              fontFamily="Inter, system-ui, sans-serif"
              fontWeight="500"
            >
              {lines.length > 1
                ? lines.map((line, li) => (
                    <tspan
                      key={li}
                      x={pt.x}
                      dy={li === 0 ? "-0.55em" : "1.2em"}
                    >
                      {line}
                    </tspan>
                  ))
                : s.label}
            </text>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 w-full">
        {RADAR_SKILLS.map((s) => (
          <div key={s.label} className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
            <span className="text-[11px] text-primary/60">
              {s.label.replace("\n", " ")} —{" "}
              <strong className="text-accent/80">{s.value}%</strong>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────── MAIN EXPORT ────────────────────────

export default function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [headerVis, setHeaderVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        setRunning(entry.isIntersecting);
        setHeaderVis(entry.isIntersecting);
      },
      { threshold: 0.12 },
    );

    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  return (
    <div ref={ref} id="stats" className="flex flex-col gap-12 py-16 w-full">
      {/* ── Section header ── */}
      <div
        className={`flex flex-col gap-3 items-center text-center transition-all duration-700 ease-out ${
          headerVis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-accent font-semibold">
          By The Numbers
        </span>
        <h2 className="text-primary text-2xl sm:text-3xl md:text-[52px] leading-tight font-bold">
          Stats &amp; Metrics
        </h2>
        <p className="text-primary/55 max-w-lg text-sm sm:text-base md:text-lg font-light">
          A transparent snapshot of my journey — projects shipped, clients
          served, and skills honed across 5+ years of building.
        </p>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
        {STATS.map((stat, i) => (
          <StatCard
            key={stat.label}
            stat={stat}
            delay={i * 90}
            running={running}
          />
        ))}
      </div>

      {/* ── Tech proficiency + radar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Left: proficiency bars */}
        <div className="panel--glass rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
          <div>
            <h3 className="text-primary font-bold text-base sm:text-lg">
              Tech Proficiency
            </h3>
            <p className="text-primary/45 text-xs sm:text-sm mt-0.5">
              Self-assessed skill depth across core technologies
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {TECH_BARS.map((t, i) => (
              <TechBar
                key={t.name}
                name={t.name}
                pct={t.pct}
                delay={i * 75}
                running={running}
              />
            ))}
          </div>
        </div>

        {/* Right: radar */}
        <div className="panel--glass rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col gap-4 sm:gap-5">
          <div>
            <h3 className="text-primary font-bold text-base sm:text-lg">
              Skill Domains
            </h3>
            <p className="text-primary/45 text-xs sm:text-sm mt-0.5">
              Relative strength across engineering disciplines
            </p>
          </div>
          <RadarChart running={running} />
        </div>
      </div>
    </div>
  );
}
