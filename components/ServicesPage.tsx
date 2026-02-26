"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  IconRobot,
  IconWorldWww,
  IconDeviceMobile,
  IconCurrencyEthereum,
  IconChartCandle,
  IconApi,
  IconSettings,
  IconBug,
  IconPuzzle,
  IconArrowRight,
  IconSparkles,
  IconStack2,
  IconBraces,
  IconBulb,
  IconArrowUpRight,
} from "@tabler/icons-react";
import type { ReactNode } from "react";

// ─────────────────────────── TYPES ───────────────────────────

interface ServiceDef {
  id: string;
  title: string;
  tagline: string;
  description: string;
  Icon: (p: {
    size?: number;
    stroke?: number;
    className?: string;
  }) => ReactNode;
  category: string;
  tools: string[];
  paradigms: string[];
  deliverables: string[];
  accentColor: string; // tailwind bg class for icon badge
}

// ──────────────────────── SERVICE DATA ───────────────────────

const SERVICES: ServiceDef[] = [
  {
    id: "social-bots",
    title: "Social & Community Bots",
    tagline: "Automate engagement, moderate at scale",
    description:
      "AI-powered Telegram and Discord bots that handle community moderation, onboarding flows, reward distribution, and real-time notifications — freeing your team from repetitive manual work.",
    Icon: IconRobot,
    category: "Automation",
    accentColor: "bg-violet-500/15",
    tools: [
      "Node.js",
      "Python",
      "grammY / Telegraf",
      "Discord.js",
      "OpenAI API",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    paradigms: [
      "Event-driven architecture",
      "Finite state machines",
      "Webhook & long-polling",
      "Rate limiting & anti-spam",
      "AI prompt engineering",
    ],
    deliverables: [
      "Custom bot with command system",
      "Admin dashboard / control panel",
      "Analytics & engagement reports",
      "Deployment + maintenance docs",
    ],
  },
  {
    id: "websites",
    title: "Web Applications & Sites",
    tagline: "Fast, accessible, conversion-optimised",
    description:
      "High-performance marketing sites, dashboards, and full-stack web apps built with modern tooling. From pixel-perfect landing pages to complex SaaS platforms with auth, payments, and CMS.",
    Icon: IconWorldWww,
    category: "Web",
    accentColor: "bg-blue-500/15",
    tools: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Prisma / Drizzle",
      "MongoDB",
      "PostgreSQL",
      "Stripe / Paystack",
      "Vercel / AWS",
    ],
    paradigms: [
      "Server Components & Streaming",
      "Edge rendering",
      "Optimistic UI",
      "Accessible design (WCAG 2.1)",
      "Core Web Vitals optimisation",
      "SEO & structured data",
    ],
    deliverables: [
      "Responsive, multi-device site",
      "CMS integration or admin panel",
      "Payment gateway & auth",
      "Lighthouse 90+ score",
      "Source code + deployment",
    ],
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    tagline: "iOS & Android — one codebase, native feel",
    description:
      "Cross-platform mobile apps using React Native & Expo that deliver smooth 60fps animations and deep OS integrations — push notifications, biometrics, offline sync, and more.",
    Icon: IconDeviceMobile,
    category: "Mobile",
    accentColor: "bg-emerald-500/15",
    tools: [
      "React Native",
      "Expo SDK",
      "TypeScript",
      "Redux / Zustand",
      "React Query",
      "Expo Router",
      "Firebase",
      "Supabase",
      "Reanimated 3",
    ],
    paradigms: [
      "Native-feel transitions",
      "Offline-first architecture",
      "OTA updates",
      "Biometric & push notifications",
      "Deep linking",
    ],
    deliverables: [
      "iOS + Android builds",
      "App Store / Play Store submission",
      "Push notification setup",
      "Source code + CI/CD pipeline",
    ],
  },
  {
    id: "blockchain",
    title: "Blockchain Development",
    tagline: "Secure on-chain logic, from DeFi to NFTs",
    description:
      "Smart contracts, DApp frontends, and full protocol architecture on Ethereum, Solana, Aptos, and Sui. Security-first approach with comprehensive testing and audit-ready code.",
    Icon: IconCurrencyEthereum,
    category: "Web3",
    accentColor: "bg-amber-500/15",
    tools: [
      "Solidity",
      "Move (Aptos & Sui)",
      "Rust / Anchor",
      "Hardhat / Foundry",
      "ethers.js / viem",
      "wagmi",
      "The Graph",
      "IPFS / Arweave",
      "OpenZeppelin",
    ],
    paradigms: [
      "ERC-20 / ERC-721 / ERC-1155",
      "Proxy upgrade patterns",
      "DeFi primitives (AMM, vault, staking)",
      "zkProofs / rollups (conceptual integration)",
      "Cross-chain bridges",
      "Reentrancy & overflow guards",
    ],
    deliverables: [
      "Auditable smart contracts",
      "Full test suite (unit + integration)",
      "DApp frontend with wallet connect",
      "Deployment scripts & verification",
    ],
  },
  {
    id: "trading-bots",
    title: "Trading Bots & Automation",
    tagline: "Strategy execution at machine speed",
    description:
      "Algorithmic trading bots for CEXs (via REST/WebSocket APIs) and DeFi protocols. Custom strategies, backtesting pipelines, and real-time monitoring dashboards.",
    Icon: IconChartCandle,
    category: "Automation",
    accentColor: "bg-green-500/15",
    tools: [
      "Python",
      "Node.js",
      "CCXT",
      "Binance / Bybit APIs",
      "Jupiter / Uniswap v3 SDK",
      "Pandas / NumPy",
      "Redis pub/sub",
      "PostgreSQL (time-series)",
      "Docker",
    ],
    paradigms: [
      "Event-driven order management",
      "Risk management systems",
      "Backtesting frameworks",
      "WebSocket streaming",
      "DEX / CEX arbitrage",
      "Grid & DCA strategies",
    ],
    deliverables: [
      "Live trading bot + strategy config",
      "Backtesting report",
      "Real-time dashboard",
      "Risk controls & kill-switch",
    ],
  },
  {
    id: "api-integrations",
    title: "API & Payment Integrations",
    tagline: "Connect your stack to any third-party service",
    description:
      "Robust REST and GraphQL API design, third-party service integration, and secure payment gateway implementation. From simple webhooks to complex multi-provider orchestration.",
    Icon: IconApi,
    category: "Backend",
    accentColor: "bg-cyan-500/15",
    tools: [
      "Node.js / Express",
      "FastAPI / Django REST",
      "GraphQL (Apollo)",
      "tRPC",
      "Stripe",
      "Paystack",
      "Flutterwave",
      "Twilio",
      "SendGrid",
      "OAuth 2.0",
    ],
    paradigms: [
      "RESTful design principles",
      "GraphQL schema-first",
      "OAuth 2.0 / PKCE",
      "Idempotency & retry logic",
      "Rate limiting & throttling",
      "API versioning",
    ],
    deliverables: [
      "Documented API endpoints",
      "Postman / OpenAPI spec",
      "Webhook handler + retry queue",
      "Payment flow with reconciliation",
    ],
  },
  {
    id: "maintenance",
    title: "Maintenance & Performance",
    tagline: "Keep your product fast, secure, and live",
    description:
      "Proactive monitoring, dependency upgrades, security patches, and performance tuning to keep your application healthy. SLA-backed response times and detailed incident reports.",
    Icon: IconSettings,
    category: "DevOps",
    accentColor: "bg-slate-500/15",
    tools: [
      "Sentry",
      "Datadog / Grafana",
      "GitHub Actions",
      "Docker",
      "AWS CloudWatch",
      "Lighthouse CI",
      "Dependabot",
      "Playwright (E2E)",
    ],
    paradigms: [
      "CI/CD pipelines",
      "Blue-green deployments",
      "Observability & alerting",
      "Automated regression testing",
      "Dependency auditing",
    ],
    deliverables: [
      "Monitoring dashboard",
      "Monthly health reports",
      "Automated test suite",
      "Upgrade & patch log",
    ],
  },
  {
    id: "bug-fixes",
    title: "Debugging & Bug Fixes",
    tagline: "Ship the fix fast, understand the root cause",
    description:
      "Rapid diagnosis and resolution of production bugs across any stack. Includes root cause analysis, regression test, and documentation so the bug never returns.",
    Icon: IconBug,
    category: "Backend",
    accentColor: "bg-red-500/15",
    tools: [
      "Chrome DevTools",
      "React DevTools",
      "GDB / lldb",
      "Sentry",
      "Wireshark",
      "Node.js profiler",
      "Foundry traces",
    ],
    paradigms: [
      "Root cause analysis",
      "Bisect & binary search debugging",
      "Memory leak profiling",
      "Transaction replay (blockchain)",
      "Regression test authoring",
    ],
    deliverables: [
      "Fix with reproduction steps",
      "Regression test(s) added",
      "Root cause write-up",
      "Follow-up recommendations",
    ],
  },
  {
    id: "browser-extensions",
    title: "Browser Extensions",
    tagline: "Extend the browser with your own superpowers",
    description:
      "Custom Chrome/Firefox extensions — productivity tools, Web3 wallets, scrapers, or content enhancers. MV3-compliant with safe CSPs and minimal permission footprint.",
    Icon: IconPuzzle,
    category: "Web",
    accentColor: "bg-orange-500/15",
    tools: [
      "Chrome Extensions API (MV3)",
      "React / Svelte",
      "TypeScript",
      "Webpack / Vite",
      "IndexedDB",
      "web3.js / ethers.js",
      "Content Scripts",
    ],
    paradigms: [
      "Manifest V3 architecture",
      "Service worker background scripts",
      "Content script injection",
      "Message passing",
      "Minimal permission principle",
    ],
    deliverables: [
      "Extension package (.crx / .zip)",
      "Chrome Web Store submission",
      "Privacy-compliant manifest",
      "Source code + docs",
    ],
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(SERVICES.map((s) => s.category))),
];

// ────────────────────── HELPERS ──────────────────────────────

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { threshold },
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [threshold]);
  return { ref, visible };
}

// ─────────────────── TOOL PROFICIENCY MAP ────────────────────

// Approximate mastery 0-100 for the radial chart
const TOOL_PROFICIENCY: Record<string, number> = {
  "Next.js 15": 96,
  "React 19": 95,
  TypeScript: 95,
  "Tailwind CSS": 93,
  "Node.js": 92,
  Solidity: 88,
  "Move (Aptos & Sui)": 85,
  "Rust / Anchor": 80,
  Python: 78,
  "React Native": 82,
  "Expo SDK": 80,
  PostgreSQL: 82,
  MongoDB: 84,
  Redis: 75,
  Docker: 72,
  "Hardhat / Foundry": 82,
};

// ─────────────────── MINI RADIAL BAR ─────────────────────────

function RadialBar({ pct, size = 48 }: { pct: number; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="4"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#FFD400"
        strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`}
        strokeDashoffset={circ / 4}
        strokeLinecap="round"
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        fill="#FFD400"
        fontSize="9"
        fontWeight="bold"
        fontFamily="Inter,sans-serif"
      >
        {pct}
      </text>
    </svg>
  );
}

// ─────────────────── SERVICE CARD ────────────────────────────

function ServiceCard({ svc, index }: { svc: ServiceDef; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const {
    Icon,
    title,
    tagline,
    description,
    tools,
    paradigms,
    deliverables,
    accentColor,
  } = svc;

  return (
    <div
      ref={ref}
      className={`panel--glass rounded-2xl border border-white/5 overflow-hidden transition-all duration-700 ease-out
        hover:border-accent/20 hover:shadow-[0_0_40px_rgba(255,212,0,0.06)]
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` }}
    >
      {/* ── Header ── */}
      <button
        className="w-full text-left flex items-start gap-4 p-4 sm:p-6 group"
        onClick={() => setExpanded((x) => !x)}
        aria-expanded={expanded}
      >
        <span
          className={`flex-shrink-0 p-2.5 rounded-xl ${accentColor} mt-0.5`}
        >
          <Icon size={22} stroke={1.5} className="text-accent" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-primary font-bold text-base sm:text-lg leading-snug">
              {title}
            </h3>
            <span
              className={`flex-shrink-0 transition-transform duration-300 text-accent/60 ${expanded ? "rotate-90" : ""}`}
            >
              <IconArrowRight size={16} />
            </span>
          </div>
          <p className="text-primary/50 text-xs sm:text-sm mt-0.5">{tagline}</p>
          <p className="text-primary/70 text-xs sm:text-sm mt-2 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
      </button>

      {/* ── Expandable detail ── */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${expanded ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 sm:px-6 pb-6 flex flex-col gap-5">
          <hr className="border-white/5" />

          {/* Tools */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <IconStack2 size={14} className="text-accent/70" />
              <span className="text-[11px] uppercase tracking-widest text-accent/70 font-semibold">
                Tools & Tech
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((t) => {
                const pct = TOOL_PROFICIENCY[t];
                return (
                  <span
                    key={t}
                    title={pct ? `Proficiency: ${pct}%` : undefined}
                    className="flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.07] rounded-full px-2.5 py-1 text-[11px] sm:text-xs text-primary/80 hover:border-accent/30 hover:text-primary transition-colors duration-150 cursor-default"
                  >
                    {pct && <RadialBar pct={pct} size={20} />}
                    {t}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Paradigms */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <IconBraces size={14} className="text-accent/70" />
              <span className="text-[11px] uppercase tracking-widest text-accent/70 font-semibold">
                Concepts & Paradigms
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {paradigms.map((p) => (
                <span
                  key={p}
                  className="bg-accent/[0.07] border border-accent/10 rounded-full px-2.5 py-1 text-[11px] sm:text-xs text-accent/80 font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Deliverables */}
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <IconBulb size={14} className="text-accent/70" />
              <span className="text-[11px] uppercase tracking-widest text-accent/70 font-semibold">
                What You Get
              </span>
            </div>
            <ul className="flex flex-col gap-1.5">
              {deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-2 text-xs sm:text-sm text-primary/70"
                >
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/#contact"
            className="self-start flex items-center gap-2 bg-accent text-night font-semibold text-xs sm:text-sm px-4 py-2 rounded-full hover:scale-105 active:scale-100 transition-transform duration-150 shadow-md mt-1 no-underline"
          >
            Start a project <IconArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─────────────── CATEGORY FILTER BAR ─────────────────────────

function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (c: string) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-semibold border transition-all duration-150
            ${
              active === cat
                ? "bg-accent text-night border-accent shadow"
                : "bg-white/[0.04] text-primary/60 border-white/[0.08] hover:border-accent/30 hover:text-primary/80"
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ──────────────── OVERVIEW BAR CHART ─────────────────────────

const OVERVIEW_DATA = [
  { label: "Web", count: 2, color: "#60a5fa" },
  { label: "Web3", count: 1, color: "#fbbf24" },
  { label: "Automation", count: 2, color: "#a78bfa" },
  { label: "Mobile", count: 1, color: "#34d399" },
  { label: "Backend", count: 2, color: "#22d3ee" },
  { label: "DevOps", count: 1, color: "#94a3b8" },
];

function OverviewChart({ running }: { running: boolean }) {
  const [progress, setProgress] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!running) {
      setProgress(0);
      return;
    }
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / 900, 1);
      setProgress(easeOutCubic(p));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running]);

  const max = Math.max(...OVERVIEW_DATA.map((d) => d.count));

  return (
    <div className="flex items-end gap-3 sm:gap-4 h-28 w-full px-2">
      {OVERVIEW_DATA.map((d) => (
        <div
          key={d.label}
          className="flex flex-col items-center gap-1.5 flex-1"
        >
          <span className="text-[10px] text-primary/50 font-bold">
            {d.count}
          </span>
          <div
            className="w-full bg-white/[0.05] rounded-t-md overflow-hidden"
            style={{ height: "72px" }}
          >
            <div
              className="w-full rounded-t-md transition-none"
              style={{
                height: `${(d.count / max) * 100 * progress}%`,
                background: d.color,
                marginTop: "auto",
                display: "block",
                transition: "height 900ms cubic-bezier(.2,.9,.4,1)",
              }}
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-primary/50 text-center leading-tight">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────── PAGE EXPORT ─────────────────────────

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { ref: heroRef, visible: heroVisible } = useInView(0.1);
  const { ref: chartRef, visible: chartVisible } = useInView(0.2);

  const filtered =
    activeCategory === "All"
      ? SERVICES
      : SERVICES.filter((s) => s.category === activeCategory);

  return (
    <div className="flex flex-col gap-12 sm:gap-16 py-10 sm:py-16 w-full">
      {/* ── Hero header ── */}
      <div
        ref={heroRef}
        className={`flex flex-col gap-4 transition-all duration-700 ease-out ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-accent font-semibold flex items-center gap-2">
          <IconSparkles size={12} /> What I Build
        </span>
        <h1 className="text-primary text-3xl sm:text-4xl md:text-[56px] leading-tight font-bold max-w-3xl">
          Services & Capabilities
        </h1>
        <p className="text-primary/55 max-w-2xl text-sm sm:text-base md:text-lg font-light leading-relaxed">
          Nine categories of software delivery — each with the exact tools,
          paradigms, and deliverables you can expect. Click any card to expand
          the full breakdown.
        </p>

        {/* Quick stat row */}
        <div className="flex gap-4 sm:gap-8 mt-2 flex-wrap">
          {[
            { n: "9", label: "Service types" },
            { n: "50+", label: "Technologies" },
            { n: "5+", label: "Years delivering" },
            { n: "30+", label: "Projects shipped" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="text-xl sm:text-2xl font-bold text-accent">
                {s.n}
              </span>
              <span className="text-[11px] text-primary/45 uppercase tracking-wider">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Overview bar chart ── */}
      <div
        ref={chartRef}
        className={`panel--glass rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col gap-4 transition-all duration-700 ease-out ${chartVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      >
        <div>
          <h2 className="text-primary font-bold text-base sm:text-lg">
            Service Distribution
          </h2>
          <p className="text-primary/40 text-xs sm:text-sm mt-0.5">
            Services offered per domain
          </p>
        </div>
        <OverviewChart running={chartVisible} />
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-col gap-3">
        <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
        <p className="text-primary/35 text-xs">
          Showing {filtered.length} of {SERVICES.length} services
        </p>
      </div>

      {/* ── Service cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        {filtered.map((svc, i) => (
          <ServiceCard key={svc.id} svc={svc} index={i} />
        ))}
      </div>

      {/* ── CTA bottom ── */}
      <div className="panel--glass rounded-2xl border border-white/5 p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-primary font-bold text-xl sm:text-2xl">
            Ready to build together?
          </h3>
          <p className="text-primary/50 text-sm max-w-md">
            Whether you need a quick prototype or a production-grade system,
            let&apos;s talk scope, timeline, and budget.
          </p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <Link
            href="/#contact"
            className="flex items-center gap-2 bg-accent text-night font-bold px-5 py-2.5 rounded-full text-sm hover:scale-105 active:scale-100 transition-transform duration-150 shadow-lg no-underline"
          >
            Get in touch <IconArrowUpRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="flex items-center gap-2 border border-white/10 text-primary/70 font-semibold px-5 py-2.5 rounded-full text-sm hover:border-accent/30 hover:text-primary transition-colors duration-150 no-underline"
          >
            See my projects
          </Link>
        </div>
      </div>
    </div>
  );
}
