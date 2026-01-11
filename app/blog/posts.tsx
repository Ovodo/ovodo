import Image from "next/image";
import React from "react";
import { CodeBlock } from "@/components/CodeBlock";

export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  category: string;
  readTime: string;
  body: () => React.JSX.Element;
};

export const posts: BlogPost[] = [
  {
    slug: "trading-uis-for-beginners",
    title: "Trading UI's for Beginners",
    date: "2026-01-11",
    tags: [
      "trading",
      "frontend",
      "react",
      "nextjs",
      "realtime",
      "websockets",
      "performance",
      "ux",
      "systems",
    ],
    summary:
      "A practical, no-fluff checklist for building trading UIs: real-time data architecture, correctness, latency, failure modes, and the UX details that make users trust the screen.",
    category: "Trading UI",
    readTime: "10 min read",
    image: "/images/trading-ui-beginners.webp",
    body: () => {
      return (
        <>
          <p className="mb-6 text-lg text-muted-foreground">
            Trading UIs look like dashboards, but they behave like real-time
            systems. The hard part isn&apos;t drawing tables and
            charts—it&apos;s keeping the UI correct and responsive while
            thousands of updates arrive per minute.
          </p>

          <div className="relative mb-8 h-[320px] w-[85vw] lg:w-[700px] mx-auto overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/60">
            <Image
              src={"/images/trading-ui-beginners.webp"}
              className="object-cover object-center"
              alt="Trading UI architecture cover"
              fill
              priority
            />
          </div>

          <div className="mb-8 rounded-2xl border border-border/60 bg-card/60 p-4 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70 mb-2">
              TL;DR
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                Separate <strong>raw stream</strong> → <strong>store</strong> →
                <strong>selectors</strong> → <strong>components</strong>.
              </li>
              <li>
                Optimize for <strong>latency</strong> and{" "}
                <strong>stability</strong>: throttle rendering, batch updates,
                virtualize lists.
              </li>
              <li>
                Treat the backend as <strong>authoritative</strong>: optimistic
                UI is fine, but reconcile aggressively.
              </li>
              <li>
                Financial apps require <strong>precision</strong> and clear
                failure states (disconnects, stale data, partial books).
              </li>
            </ul>
          </div>

          <h2 className="mt-0 text-2xl font-bold text-primary">
            What makes a trading UI different?
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Most apps are request/response: user clicks, app fetches, UI
            updates. Trading is the opposite: the world changes constantly, and
            the user is trying to act inside a moving stream.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Real-time load:</strong> order books, trades, tickers, and
              positions update continuously.
            </li>
            <li>
              <strong>Correctness pressure:</strong> a rounding bug or stale
              state costs money (and trust).
            </li>
            <li>
              <strong>Perceived latency:</strong> 100ms of UI lag feels
              “broken”.
            </li>
            <li>
              <strong>Failure is normal:</strong> sockets drop, partial data
              arrives, and servers correct state.
            </li>
          </ul>

          <h2 className="mt-10 text-2xl font-bold text-primary">
            The architecture you want (and why)
          </h2>

          <CodeBlock
            language="text"
            title="The correct layering"
            code={`WebSocket/Stream (raw events)
  → Normalization layer (parse/validate)
  → External store (Zustand/Redux/RxJS)
  → Selectors (derived state, memoized)
  → React components (render only what changed)`}
          />

          <p className="mt-4 leading-relaxed text-muted-foreground">
            The key move:{" "}
            <strong>don&apos;t put raw stream events in React state</strong>.
            React is great at rendering, not at absorbing high-frequency
            updates. You keep a fast external store, and React subscribes to
            tiny slices.
          </p>

          <CodeBlock
            language="ts"
            title="A practical WebSocket manager (reconnect + heartbeat)"
            code={`type Status = "connecting" | "connected" | "reconnecting" | "disconnected";

class WSManager {
  private ws?: WebSocket;
  private reconnectAttempt = 0;
  private heartbeatTimer?: number;
  private lastMessageAt = 0;

  constructor(private url: string, private onStatus: (s: Status) => void) {}

  connect() {
    this.onStatus("connecting");
    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectAttempt = 0;
      this.onStatus("connected");
      this.startHeartbeat();
    };

    this.ws.onmessage = (evt) => {
      this.lastMessageAt = Date.now();
      const msg = JSON.parse(String(evt.data));
      if (msg.event === "pong") return;
      // route msg to store(s)
    };

    this.ws.onclose = () => this.reconnect();
  }

  private reconnect() {
    this.stopHeartbeat();
    this.onStatus("reconnecting");
    const delay = Math.min(1000 * 2 ** this.reconnectAttempt++, 30_000);
    setTimeout(() => this.connect(), delay);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.lastMessageAt = Date.now();
    this.heartbeatTimer = window.setInterval(() => {
      if (Date.now() - this.lastMessageAt > 40_000) this.reconnect();
      this.ws?.send(JSON.stringify({ event: "ping" }));
    }, 30_000);
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) window.clearInterval(this.heartbeatTimer);
  }
}`}
          />

          <CodeBlock
            language="tsx"
            title="Pattern: store-first, selector-driven UI"
            code={`// WebSocket handler (outside React)
ws.on("orderbook:update", (delta) => {
  orderBookStore.getState().applyDelta(delta)
})

// Component (React)
const bestBid = useOrderBookStore(s => s.bids[0])
const bestAsk = useOrderBookStore(s => s.asks[0])`}
          />

          <p className="mt-4 leading-relaxed text-muted-foreground">
            The mental model: your store is the “truthy model” of the market. It
            handles normalization (sorting, aggregation, totals). Components are
            just views that subscribe to <strong>tiny slices</strong>.
          </p>

          <CodeBlock
            language="ts"
            title="Store principle: normalize first, render later"
            code={`type Level = { price: string; qty: string };

type OrderBookState = {
  bids: Level[]; // sorted desc
  asks: Level[]; // sorted asc
  applyDelta: (delta: { bids: Level[]; asks: Level[] }) => void;
};

// React should NOT subscribe to the entire store:
//   const state = useOrderBookStore(s => s) // ❌ too many re-renders
// Prefer slices:
//   const bestBid = useOrderBookStore(s => s.bids[0]) // ✅`}
          />

          <h2 className="mt-10 text-2xl font-bold text-primary">
            Performance: the boring details that matter
          </h2>

          <div className="mt-4 grid gap-3 rounded-xl border border-border/60 bg-card/60 p-4 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70">
              Performance checklist
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Throttle rendering:</strong> users can&apos;t perceive
                100 UI updates/sec; render at 10–20 FPS.
              </li>
              <li>
                <strong>Batch socket updates:</strong> apply deltas in batches
                (e.g. per animation frame) rather than per message.
              </li>
              <li>
                <strong>Virtualize lists:</strong> order book rows and trades
                feeds should render only visible rows.
              </li>
              <li>
                <strong>Minimize re-renders:</strong> selector-based
                subscriptions + memoized derived state.
              </li>
              <li>
                <strong>Mobile-first discipline:</strong> reduce shadows, avoid
                layout thrash, keep DOM small.
              </li>
            </ul>
          </div>

          <CodeBlock
            language="tsx"
            title="Throttle visual updates (keep store hot, UI cool)"
            code={`function useThrottle<T>(value: T, fps = 12) {
  const [v, setV] = React.useState(value);
  const last = React.useRef(0);
  const interval = 1000 / fps;

  React.useEffect(() => {
    const now = Date.now();
    const dueIn = Math.max(0, interval - (now - last.current));
    const id = window.setTimeout(() => {
      last.current = Date.now();
      setV(value);
    }, dueIn);
    return () => window.clearTimeout(id);
  }, [value, interval]);

  return v;
}

const bestBid = useOrderBookStore((s) => s.bids[0]);
const smoothBestBid = useThrottle(bestBid, 10); // 10 FPS`}
          />

          <h2 className="mt-10 text-2xl font-bold text-primary">
            Correctness: decimals, tick sizes, and “truth”
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            In finance, you treat numbers like data—not floats. Prices and sizes
            should be normalized to <strong>tick size</strong> and{" "}
            <strong>step size</strong>, and calculations should use decimal math
            (or integer base units).
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Never rely on JS floats</strong> for order totals, PnL, or
              fee math.
            </li>
            <li>
              <strong>Format consistently</strong> (e.g. always 2 decimals for
              price, 4 for size) to avoid “duplicate” levels like 50000 vs
              50000.00.
            </li>
            <li>
              <strong>Backend is authoritative:</strong> optimistic UI is
              allowed, but you must reconcile with server confirmations.
            </li>
          </ul>

          <CodeBlock
            language="ts"
            title="Normalize prices to tick size (avoid duplicate levels)"
            code={`// If your feed sometimes sends "50000" and sometimes "50000.00",
// you can accidentally create duplicate levels. Normalize and format.
function normalizePrice(price: string, tick = 0.01) {
  const p = Number(price);
  const snapped = Math.round(p / tick) * tick;
  return snapped.toFixed(2);
}`}
          />

          <h2 className="mt-10 text-2xl font-bold text-primary">
            UX: trust is the product
          </h2>

          <p className="mt-3 leading-relaxed text-muted-foreground">
            A trading UI is a trust machine. Even if the backend is perfect,
            users judge you by what they see.
          </p>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              Show <strong>connection status</strong> and{" "}
              <strong>staleness</strong>
              (e.g. “Last update 2s ago”).
            </li>
            <li>
              Make <strong>pending states</strong> explicit (order submitted vs
              accepted vs filled vs rejected).
            </li>
            <li>
              Validate inputs aggressively (min size, max leverage, balance,
              slippage, price band).
            </li>
            <li>
              Prefer clarity over cleverness: consistent colors, stable columns,
              and readable number formatting.
            </li>
          </ul>

          <CodeBlock
            language="tsx"
            title="Show staleness (users trust timestamps)"
            code={`function StaleBadge({ lastUpdateAt }: { lastUpdateAt: number }) {
  const [now, setNow] = React.useState(Date.now());
  React.useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  const ageSec = Math.floor((now - lastUpdateAt) / 1000);
  const stale = ageSec >= 3;
  return (
    <span className={stale ? "text-red-400" : "text-muted-foreground"}>
      {stale ? "Stale (" + ageSec + "s)" : "Live (" + ageSec + "s)"}
    </span>
  );
}`}
          />

          <CodeBlock
            language="ts"
            title="Order submission: optimistic UI + server reconciliation"
            code={`// 1) User clicks Buy
const tempId = crypto.randomUUID();
ordersStore.add({ id: tempId, status: "pending", side: "buy", price, size });

// 2) Submit to backend
try {
  const res = await api.placeOrder({ side: "buy", price, size });
  // 3) Replace pending with server ID/status
  ordersStore.replace(tempId, { id: res.id, status: res.status });
} catch {
  // 4) Roll back and show error
  ordersStore.remove(tempId);
  toast.error("Order rejected");
}`}
          />

          <h2 className="mt-10 text-2xl font-bold text-primary">
            Failure modes you must design for
          </h2>

          <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Socket disconnects:</strong> show a banner, pause certain
              actions, and resync via REST snapshot.
            </li>
            <li>
              <strong>Out-of-order events:</strong> use sequence numbers where
              possible; otherwise detect drift and resnapshot.
            </li>
            <li>
              <strong>Partial data:</strong> you might have a ticker but no
              book, or positions but stale balances—handle gracefully.
            </li>
          </ul>

          <CodeBlock
            language="ts"
            title="Out-of-order events: detect gaps and resync"
            code={`// Many venues include a sequence number (seq). If you can:
// - drop stale events
// - detect gaps
let lastSeq = 0;

function onDelta(delta: { seq: number }) {
  if (delta.seq <= lastSeq) return; // stale
  if (delta.seq !== lastSeq + 1) {
    // gap detected → fetch snapshot and reset lastSeq
    return resyncSnapshot();
  }

  lastSeq = delta.seq;
  // applyDelta(delta)
}`}
          />

          <div className="mt-8 rounded-2xl border border-border/60 bg-card/60 p-5 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70">
              Starter project idea
            </div>
            <p className="mt-2 text-muted-foreground">
              Build a single page with a mock WebSocket feed: ticker + trades +
              order book. Then add: throttling, reconnection, snapshot resync,
              and an order form with optimistic pending orders.
            </p>
          </div>
        </>
      );
    },
  },
  {
    slug: "web3-nutshell-01-shillers-yappers-mods",
    title: "Web3 in a Nutshell #01: Shillers, Yappers, Moderators",
    date: "2026-01-04",
    tags: ["web3", "community", "growth", "moderation", "discord", "marketing"],
    summary:
      "A 7-minute primer on the three roles that shape every crypto community: who they are, how to harness them, and how to stop them from wrecking trust.",
    category: "Web3 in a Nutshell",
    readTime: "7 min read",
    image: "/web3/trinity.png",
    body: () => {
      return (
        <>
          <p className="mb-6 text-lg text-muted-foreground">
            This is Episode 01 of <strong>Web3 in a Nutshell</strong>—short,
            practical breakdowns for founders, PMs, and community leads. Today:
            the three characters that decide whether your community feels alive
            or unbearable.
          </p>

          <div className="relative mb-8 h-[320px] w-[85vw] lg:w-[700px] mx-auto overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/60">
            <Image
              src={"/web3/trinity.png"}
              className="object-cover object-center"
              alt="Shillers, yappers, and moderators in a Web3 community"
              fill
            />
          </div>

          <div className="mb-8 rounded-2xl border border-border/60 bg-card/60 p-4 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70 mb-2">
              Episode TL;DR
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Shillers</strong> amplify hype; give them disclosures,
                links, and bounds.
              </li>
              <li>
                <strong>Yappers</strong> create constant chatter; channel it
                into feedback and FAQs.
              </li>
              <li>
                <strong>Moderators</strong> set tone and safety; define
                escalation and SLAs.
              </li>
            </ul>
          </div>

          <h2 className="mt-0 text-2xl font-bold text-primary">
            Scene: a pre-mint Discord
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            It is 48 hours to mint. One channel is a waterfall of moon emojis
            (shillers). Another is debating tax law (yappers). A moderator is
            closing tickets at 1 a.m. Which of these three actually moves the
            needle—and how do you keep the chaos productive?
          </p>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            1) The Shillers — hype engines
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            They post threads, spin narratives, and jump on spaces. Done right,
            they accelerate discovery. Done wrong, they overpromise and set you
            up for churn.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Give them disclosure rules:</strong> #ad/#sponsored in
              tweets; no fabricated numbers.
            </li>
            <li>
              <strong>Hand them trackable links:</strong> UTM links or ref codes
              so you see who actually converts.
            </li>
            <li>
              <strong>Bound the claims:</strong> A two-line “what we are / what
              we are not” script.
            </li>
            <li>
              <strong>Reward on outcomes, not volume:</strong> conversions,
              activated wallets, retained users.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            2) The Yappers — ambient energy
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            They talk all day, ask half-formed questions, and derail threads.
            They are also free market research if you funnel them well.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Create “daily prompt” rituals:</strong> one pinned
              question; synthesize answers weekly.
            </li>
            <li>
              <strong>AMA cadence:</strong> 30 minutes weekly with prepared
              FAQs. Record and timestamp.
            </li>
            <li>
              <strong>Feedback lanes:</strong> dedicated #bugs and #ideas with
              forms; close the loop visibly.
            </li>
            <li>
              <strong>Noise guardrails:</strong> slowmode during launches;
              emoji-only cooldowns for raids.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            3) Moderators — guardrails and tone
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Mods decide whether newcomers feel safe. They are the first
            responders and the last line before chaos.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Escalation map:</strong> what gets muted, what gets
              ticketed, what pings founders.
            </li>
            <li>
              <strong>Response SLAs:</strong> e.g., 10 minutes for wallet help
              during mint windows.
            </li>
            <li>
              <strong>Tone guide:</strong> concise, patient, never sarcastic.
              One-line macros for common issues.
            </li>
            <li>
              <strong>Wellness:</strong> staggered shifts; backup mod for long
              events; rotate to avoid burnout.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            A simple flywheel
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Shillers bring newcomers → Yappers surface objections → Mods resolve
            and document → You ship fixes/content → Shillers get a better story.
            Close this loop weekly.
          </p>

          <div className="mt-6 grid gap-3 rounded-xl border border-border/60 bg-card/60 p-4 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70">
              Playbook: set this up before launch
            </div>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                One-page <strong>disclosure + claims</strong> doc for shillers
                (with approved metrics).
              </li>
              <li>
                <strong>Attribution links</strong> per shiller; a simple
                dashboard (clicks → signups → retained users).
              </li>
              <li>
                <strong>Macro library</strong> for mods (wallet help, delays,
                refunds, safety tips).
              </li>
              <li>
                <strong>Two channels</strong> for yappers: #ideas (triaged
                weekly) and #offtopic (rate limited).
              </li>
              <li>
                <strong>Escalation tree</strong>: who to ping for security,
                payments, downtime.
              </li>
            </ul>
          </div>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            Metrics that matter
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Activation:</strong> new joiners who connect a wallet or
              complete first action within 24h.
            </li>
            <li>
              <strong>Retention:</strong> 7/30-day returning users, not just DAU
              spikes. (DAU = daily active users)
            </li>
            <li>
              <strong>Support health:</strong> median ticket time, CSAT after
              mod interactions. (CSAT = customer satisfaction score)
            </li>
            <li>
              <strong>Referral quality:</strong> shiller-specific conversion vs.
              churn.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            Red flags & fixes
          </h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-muted-foreground">
            <li>
              <strong>Astroturfed hype:</strong> require screenshots or proofs
              for big claims; prune fake volume quickly.
            </li>
            <li>
              <strong>Overbearing mods:</strong> if deletes exceed welcomes,
              retrain tone; post public mod reports.
            </li>
            <li>
              <strong>Raid fatigue:</strong> use slowmode + staged
              announcements; recap in one pinned post.
            </li>
            <li>
              <strong>Yapper fatigue:</strong> harvest questions into a living
              FAQ; reward good reports.
            </li>
          </ul>

          <h3 className="mt-8 text-xl font-semibold text-primary">
            If you only do three things
          </h3>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-muted-foreground">
            <li>
              Ship a one-pager for shillers: claims, links, disclosures, and
              what “success” means.
            </li>
            <li>
              Give mods macros, SLAs, and an escalation tree. Publish it
              internally. (SLA = service level agreement)
            </li>
            <li>
              Collect yappers’ noise into weekly insights and show you acted on
              at least one.
            </li>
          </ol>

          <div className="mt-8 rounded-2xl border border-border/60 bg-card/60 p-5 text-sm text-muted-foreground">
            <div className="text-xs uppercase tracking-[0.22em] text-primary/70">
              Up next
            </div>
            <p className="mt-2 text-muted-foreground">
              Episode 02 (teaser):{" "}
              <strong>Smart Contracts or Dumb Contracts</strong> — basics,
              common flaws, and why correctness matters.
            </p>
          </div>
        </>
      );
    },
  },
  {
    slug: "database-design-chat-apps-beginners",
    title: "Database Design for Chat Applications: A Complete Beginner's Guide",
    date: "2025-11-18",
    tags: ["database", "postgresql", "mongodb", "chat", "beginner"],
    summary:
      "Learn how to structure your database for chat applications with users, conversations, and messages. Step-by-step guide with real code examples.",
    category: "Database Design",
    readTime: "8 min read",
    image: "/images/sql.png",
    body: () => {
      return (
        <>
          <p className="mb-6 text-lg text-muted-foreground">
            Building a chat application? This guide will teach you how to design
            your database from scratch. We&apos;ll cover users, conversations,
            and messages with clear examples you can use right away.
          </p>

          <div className="relative mb-8 h-[350px] w-[85vw] lg:w-[700px] mx-auto overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/60">
            <Image
              src={"/images/sql.png"}
              className="object-contain lg:object-cover object-center"
              alt="Database structure for chat applications"
              fill
            />
          </div>

          <div>
            <h2 className="mt-0 text-2xl font-bold text-primary">
              Understanding the Three Core Tables
            </h2>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Every chat application needs three main pieces of data:
            </p>
            <ul className="mt-2 list-decimal space-y-1 pl-6 text-muted-foreground">
              <li>
                <strong>Users</strong> - The people using your app
              </li>
              <li>
                <strong>Conversations</strong> - Chat sessions or threads
              </li>
              <li>
                <strong>Messages</strong> - The actual chat messages
              </li>
            </ul>

            <p className="mt-4 leading-relaxed text-muted-foreground">
              Think of it like this: A <strong>user</strong> can have many{" "}
              <strong>conversations</strong>, and each{" "}
              <strong>conversation</strong> can have many{" "}
              <strong>messages</strong>.
            </p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Step 1: The Users Table
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                This is the simplest table. It stores information about each
                person using your app.
              </p>

              <CodeBlock
                language="sql"
                title="PostgreSQL - Users Table"
                code={`CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
              />

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>What each field means:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <code>id</code> - A unique identifier for each user (like a
                  serial number)
                </li>
                <li>
                  <code>email</code> - User&apos;s email (must be unique)
                </li>
                <li>
                  <code>name</code> - User&apos;s display name
                </li>
                <li>
                  <code>password_hash</code> - Encrypted password (never store
                  plain passwords!)
                </li>
                <li>
                  <code>created_at</code> - When the user signed up
                </li>
                <li>
                  <code>updated_at</code> - Last time user info was updated
                </li>
              </ul>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>Example data:</strong>
              </p>

              <CodeBlock
                language="sql"
                title="Sample Users"
                code={`-- Insert a user
INSERT INTO users (email, name, password_hash) 
VALUES ('john@example.com', 'John Doe', '$2b$10$...');

-- Result in table:
-- id: '550e8400-e29b-41d4-a716-446655440000'
-- email: 'john@example.com'
-- name: 'John Doe'
-- created_at: '2024-11-18 10:00:00'`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Step 2: The Conversations Table
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                This table stores each chat session. Each conversation belongs
                to one user.
              </p>

              <CodeBlock
                language="sql"
                title="PostgreSQL - Conversations Table"
                code={`CREATE TABLE conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX idx_conversations_user ON conversations(user_id);`}
              />

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>What each field means:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <code>id</code> - Unique identifier for this conversation
                </li>
                <li>
                  <code>user_id</code> - Which user owns this conversation
                  (links to users table)
                </li>
                <li>
                  <code>title</code> - A name for the conversation (e.g.,
                  &quot;Project Planning&quot;)
                </li>
                <li>
                  <code>created_at</code> - When the conversation started
                </li>
                <li>
                  <code>updated_at</code> - Last message time
                </li>
              </ul>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>The important part:</strong>{" "}
                <code>REFERENCES users(id)</code> means this conversation MUST
                belong to a user that exists. If you delete a user,{" "}
                <code>ON DELETE CASCADE</code> automatically deletes all their
                conversations too.
              </p>

              <CodeBlock
                language="sql"
                title="Sample Conversations"
                code={`-- Create a conversation for John
INSERT INTO conversations (user_id, title)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'My First Chat');

-- Result:
-- id: '660e8400-e29b-41d4-a716-446655440001'
-- user_id: '550e8400-e29b-41d4-a716-446655440000' (John's ID)
-- title: 'My First Chat'`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Step 3: The Messages Table
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                This is where the actual chat messages are stored. Each message
                belongs to one conversation.
              </p>

              <CodeBlock
                language="sql"
                title="PostgreSQL - Messages Table"
                code={`CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sequence_number INTEGER NOT NULL
);

-- Index for faster queries (very important!)
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sequence_number);`}
              />

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>What each field means:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-2 pl-6 text-muted-foreground">
                <li>
                  <code>id</code> - Unique identifier for this message
                </li>
                <li>
                  <code>conversation_id</code> - Which conversation this message
                  belongs to
                </li>
                <li>
                  <code>role</code> - Who sent it: &apos;user&apos; (human),
                  &apos;assistant&apos; (AI), or &apos;system&apos; (app)
                </li>
                <li>
                  <code>content</code> - The actual message text
                </li>
                <li>
                  <code>created_at</code> - When the message was sent
                </li>
                <li>
                  <code>sequence_number</code> - Message order (1, 2, 3, ...)
                </li>
              </ul>

              <CodeBlock
                language="sql"
                title="Sample Messages"
                code={`-- User sends a message
INSERT INTO messages (conversation_id, role, content, sequence_number)
VALUES ('660e8400-e29b-41d4-a716-446655440001', 'user', 'Hello! How are you?', 1);

-- AI responds
INSERT INTO messages (conversation_id, role, content, sequence_number)
VALUES ('660e8400-e29b-41d4-a716-446655440001', 'assistant', 'I am doing well! How can I help you today?', 2);

-- User responds
INSERT INTO messages (conversation_id, role, content, sequence_number)
VALUES ('660e8400-e29b-41d4-a716-446655440001', 'user', 'Can you explain databases?', 3);`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                How They Connect: The Relationships
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Here&apos;s how the tables link together:
              </p>

              <CodeBlock
                language="text"
                title="Relationship Diagram"
                code={`Users
  ↓ (one user has many conversations)
Conversations
  ↓ (one conversation has many messages)
Messages

Real example:
- John (user)
  - "Project Planning" (conversation)
    - "Let's discuss the timeline" (message 1)
    - "Sure, when should we start?" (message 2)
    - "Next Monday works" (message 3)
  - "Weekend Chat" (conversation)
    - "What are you doing this weekend?" (message 1)
    - "Going hiking!" (message 2)`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Common Queries You&apos;ll Need
              </h3>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-foreground">
                  1. Get all conversations for a user
                </h4>
                <CodeBlock
                  language="sql"
                  title="List User's Conversations"
                  code={`SELECT * FROM conversations 
WHERE user_id = '550e8400-e29b-41d4-a716-446655440000'
ORDER BY updated_at DESC;

-- Returns all of John's conversations, newest first`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  2. Get all messages in a conversation
                </h4>
                <CodeBlock
                  language="sql"
                  title="Load Conversation Messages"
                  code={`SELECT * FROM messages
WHERE conversation_id = '660e8400-e29b-41d4-a716-446655440001'
ORDER BY sequence_number ASC;

-- Returns all messages in order (1, 2, 3, ...)`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  3. Get conversation with all messages (JOIN)
                </h4>
                <CodeBlock
                  language="sql"
                  title="Complete Conversation"
                  code={`SELECT 
  c.id as conversation_id,
  c.title,
  c.created_at as conversation_created,
  m.id as message_id,
  m.role,
  m.content,
  m.created_at as message_created
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id
WHERE c.id = '660e8400-e29b-41d4-a716-446655440001'
ORDER BY m.sequence_number ASC;

-- Returns conversation info + all messages in one query`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  4. Create a new conversation with first message
                </h4>
                <CodeBlock
                  language="sql"
                  title="New Conversation"
                  code={`-- Step 1: Create the conversation
INSERT INTO conversations (user_id, title)
VALUES ('550e8400-e29b-41d4-a716-446655440000', 'New Chat')
RETURNING id;
-- Returns: '770e8400-e29b-41d4-a716-446655440002'

-- Step 2: Add first message
INSERT INTO messages (conversation_id, role, content, sequence_number)
VALUES ('770e8400-e29b-41d4-a716-446655440002', 'user', 'Hello!', 1);`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  5. Add a new message to existing conversation
                </h4>
                <CodeBlock
                  language="sql"
                  title="Add Message"
                  code={`-- Get the next sequence number
SELECT MAX(sequence_number) FROM messages 
WHERE conversation_id = '660e8400-e29b-41d4-a716-446655440001';
-- Returns: 3

-- Insert new message with sequence_number = 4
INSERT INTO messages (conversation_id, role, content, sequence_number)
VALUES ('660e8400-e29b-41d4-a716-446655440001', 'assistant', 'Great question!', 4);

-- Update conversation timestamp
UPDATE conversations 
SET updated_at = NOW() 
WHERE id = '660e8400-e29b-41d4-a716-446655440001';`}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                MongoDB Version (Document Database)
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                With MongoDB, you can store conversations differently - all
                messages inside the conversation document:
              </p>

              <CodeBlock
                language="javascript"
                title="MongoDB - Users Collection"
                code={`// Users collection
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "john@example.com",
  name: "John Doe",
  passwordHash: "$2b$10$...",
  createdAt: ISODate("2024-11-18T10:00:00Z")
}`}
              />

              <CodeBlock
                language="javascript"
                title="MongoDB - Conversations Collection (with embedded messages)"
                code={`// Conversations collection
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  title: "My First Chat",
  messages: [
    {
      _id: ObjectId("507f1f77bcf86cd799439013"),
      role: "user",
      content: "Hello! How are you?",
      createdAt: ISODate("2024-11-18T10:05:00Z"),
      sequenceNumber: 1
    },
    {
      _id: ObjectId("507f1f77bcf86cd799439014"),
      role: "assistant",
      content: "I'm doing well! How can I help?",
      createdAt: ISODate("2024-11-18T10:05:15Z"),
      sequenceNumber: 2
    },
    {
      _id: ObjectId("507f1f77bcf86cd799439015"),
      role: "user",
      content: "Can you explain databases?",
      createdAt: ISODate("2024-11-18T10:06:00Z"),
      sequenceNumber: 3
    }
  ],
  createdAt: ISODate("2024-11-18T10:05:00Z"),
  updatedAt: ISODate("2024-11-18T10:06:00Z")
}`}
              />

              <p className="mt-4 leading-relaxed text-muted-foreground">
                <strong>MongoDB Queries:</strong>
              </p>

              <CodeBlock
                language="javascript"
                title="Common MongoDB Operations"
                code={`// Get all conversations for a user
db.conversations.find({ 
  userId: ObjectId("507f1f77bcf86cd799439011") 
}).sort({ updatedAt: -1 });

// Get one conversation with all messages
db.conversations.findOne({ 
  _id: ObjectId("507f1f77bcf86cd799439012") 
});

// Add a new message to conversation
db.conversations.updateOne(
  { _id: ObjectId("507f1f77bcf86cd799439012") },
  { 
    $push: { 
      messages: {
        _id: ObjectId(),
        role: "assistant",
        content: "Great question!",
        createdAt: new Date(),
        sequenceNumber: 4
      }
    },
    $set: { updatedAt: new Date() }
  }
);

// Create new conversation
db.conversations.insertOne({
  userId: ObjectId("507f1f77bcf86cd799439011"),
  title: "New Chat",
  messages: [
    {
      _id: ObjectId(),
      role: "user",
      content: "Hello!",
      createdAt: new Date(),
      sequenceNumber: 1
    }
  ],
  createdAt: new Date(),
  updatedAt: new Date()
});`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                SQL vs MongoDB: Which Should You Use?
              </h3>

              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="font-semibold text-foreground">
                  Choose PostgreSQL (SQL) if:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                  <li>
                    You&apos;re new to databases (SQL is more standard and
                    easier to learn)
                  </li>
                  <li>
                    You need complex queries (analytics, reports, user stats)
                  </li>
                  <li>Conversations might have thousands of messages</li>
                  <li>
                    You want strong data integrity (relationships are enforced)
                  </li>
                  <li>
                    You might add features like shared conversations, teams,
                    etc.
                  </li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-border">
                <p className="font-semibold text-foreground">
                  Choose MongoDB if:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                  <li>
                    You want faster development (no schema to define upfront)
                  </li>
                  <li>Most conversations will be under 1,000 messages</li>
                  <li>You mainly fetch entire conversations at once</li>
                  <li>You&apos;re comfortable with JavaScript/JSON</li>
                  <li>You might need to scale to millions of users later</li>
                </ul>
              </div>

              <div className="mt-4 p-4 bg-primary/10 rounded-lg border-2 border-primary/30">
                <p className="font-semibold text-foreground">
                  My Recommendation for Beginners:
                </p>
                <p className="mt-2 text-muted-foreground">
                  <strong>Start with PostgreSQL.</strong> It&apos;s more
                  structured, teaches you proper database design, and you
                  won&apos;t hit limitations as your app grows. Plus, every
                  developer should know SQL - it&apos;s been around for 50 years
                  and will be around for 50 more.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Complete Working Example (Node.js + PostgreSQL)
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                Here&apos;s a complete example you can copy and use:
              </p>

              <CodeBlock
                language="javascript"
                title="database.js - Database Connection"
                code={`const { Pool } = require('pg');

// Create connection pool
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'chatapp',
  password: 'your_password',
  port: 5432,
});

module.exports = { pool };`}
              />

              <CodeBlock
                language="javascript"
                title="chatService.js - Chat Functions"
                code={`const { pool } = require('./database');

// Get all conversations for a user
async function getUserConversations(userId) {
  const result = await pool.query(
    'SELECT * FROM conversations WHERE user_id = $1 ORDER BY updated_at DESC',
    [userId]
  );
  return result.rows;
}

// Get conversation with all messages
async function getConversation(conversationId) {
  const result = await pool.query(
    \`SELECT 
      c.id, c.title, c.created_at, c.updated_at,
      json_agg(
        json_build_object(
          'id', m.id,
          'role', m.role,
          'content', m.content,
          'created_at', m.created_at
        ) ORDER BY m.sequence_number
      ) as messages
    FROM conversations c
    LEFT JOIN messages m ON c.id = m.conversation_id
    WHERE c.id = $1
    GROUP BY c.id\`,
    [conversationId]
  );
  return result.rows[0];
}

// Create new conversation
async function createConversation(userId, title, firstMessage) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Create conversation
    const convResult = await client.query(
      'INSERT INTO conversations (user_id, title) VALUES ($1, $2) RETURNING *',
      [userId, title]
    );
    const conversation = convResult.rows[0];
    
    // Add first message
    await client.query(
      'INSERT INTO messages (conversation_id, role, content, sequence_number) VALUES ($1, $2, $3, $4)',
      [conversation.id, 'user', firstMessage, 1]
    );
    
    await client.query('COMMIT');
    return conversation;
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

// Add message to conversation
async function addMessage(conversationId, role, content) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Get next sequence number
    const seqResult = await client.query(
      'SELECT COALESCE(MAX(sequence_number), 0) + 1 as next_seq FROM messages WHERE conversation_id = $1',
      [conversationId]
    );
    const nextSeq = seqResult.rows[0].next_seq;
    
    // Insert message
    const msgResult = await client.query(
      'INSERT INTO messages (conversation_id, role, content, sequence_number) VALUES ($1, $2, $3, $4) RETURNING *',
      [conversationId, role, content, nextSeq]
    );
    
    // Update conversation timestamp
    await client.query(
      'UPDATE conversations SET updated_at = NOW() WHERE id = $1',
      [conversationId]
    );
    
    await client.query('COMMIT');
    return msgResult.rows[0];
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}

module.exports = {
  getUserConversations,
  getConversation,
  createConversation,
  addMessage
};`}
              />

              <CodeBlock
                language="javascript"
                title="app.js - Using the Functions"
                code={`const {
  getUserConversations,
  getConversation,
  createConversation,
  addMessage
} = require('./chatService');

async function demo() {
  const userId = '550e8400-e29b-41d4-a716-446655440000';
  
  // Create a new conversation
  console.log('Creating conversation...');
  const conv = await createConversation(
    userId,
    'Learning Databases',
    'Can you help me understand databases?'
  );
  console.log('Created:', conv);
  
  // Add AI response
  console.log('Adding AI response...');
  await addMessage(
    conv.id,
    'assistant',
    'Of course! Let me explain step by step...'
  );
  
  // Get full conversation
  console.log('Loading conversation...');
  const full = await getConversation(conv.id);
  console.log('Full conversation:', JSON.stringify(full, null, 2));
  
  // List all user conversations
  console.log('All conversations:');
  const all = await getUserConversations(userId);
  console.log(all);
}

demo().catch(console.error);`}
              />
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Best Practices & Tips
              </h3>

              <div className="mt-4">
                <h4 className="text-lg font-semibold text-foreground">
                  1. Always use indexes
                </h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Indexes make queries fast. Without them, your app will be
                  slow.
                </p>
                <CodeBlock
                  language="sql"
                  code={`-- These indexes are CRITICAL for performance
CREATE INDEX idx_conversations_user ON conversations(user_id);
CREATE INDEX idx_messages_conversation ON messages(conversation_id, sequence_number);`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  2. Use transactions for related operations
                </h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  When creating a conversation + first message, wrap in a
                  transaction so if one fails, both are rolled back.
                </p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  3. Add pagination for long conversations
                </h4>
                <CodeBlock
                  language="sql"
                  title="Load Messages in Batches"
                  code={`-- Get last 50 messages
SELECT * FROM messages
WHERE conversation_id = $1
ORDER BY sequence_number DESC
LIMIT 50;

-- Get messages 51-100 (for infinite scroll)
SELECT * FROM messages
WHERE conversation_id = $1
ORDER BY sequence_number DESC
LIMIT 50 OFFSET 50;`}
                />
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-foreground">
                  4. Consider soft deletes
                </h4>
                <p className="mt-2 leading-relaxed text-muted-foreground">
                  Instead of actually deleting data, mark it as deleted:
                </p>
                <CodeBlock
                  language="sql"
                  code={`-- Add deleted_at column
ALTER TABLE conversations ADD COLUMN deleted_at TIMESTAMPTZ;
ALTER TABLE messages ADD COLUMN deleted_at TIMESTAMPTZ;

-- "Delete" a conversation
UPDATE conversations SET deleted_at = NOW() WHERE id = $1;

-- Only show non-deleted conversations
SELECT * FROM conversations 
WHERE user_id = $1 AND deleted_at IS NULL;`}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">
                Common Mistakes to Avoid
              </h3>

              <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="font-semibold text-foreground">
                  ❌ Storing all messages in one TEXT field
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Don&apos;t store all messages as JSON in a single column. Use
                  proper tables!
                </p>
              </div>

              <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="font-semibold text-foreground">
                  ❌ Not using foreign keys
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Always use REFERENCES to link tables. It prevents orphaned
                  data.
                </p>
              </div>

              <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="font-semibold text-foreground">
                  ❌ Fetching all messages every time
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use LIMIT and OFFSET to paginate. Don&apos;t load 10,000
                  messages at once!
                </p>
              </div>

              <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <p className="font-semibold text-foreground">
                  ❌ Storing passwords in plain text
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Always hash passwords with bcrypt before storing. Never store
                  them plain!
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">Next Steps</h3>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                You now understand the core database structure! Here&apos;s what
                to learn next:
              </p>

              <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground">
                <li>
                  <strong>Add authentication</strong> - Learn about JWT tokens,
                  sessions, password hashing
                </li>
                <li>
                  <strong>Add file uploads</strong> - Store images/files that
                  users send in chat
                </li>
                <li>
                  <strong>Add search</strong> - Let users search their message
                  history
                </li>
                <li>
                  <strong>Add real-time updates</strong> - Use WebSockets so
                  messages appear instantly
                </li>
              </ol>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold text-primary">Resources</h3>
              <ul className="mt-2 space-y-2 text-muted-foreground">
                <li>
                  •{" "}
                  <a
                    href="https://www.postgresql.org/docs/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PostgreSQL Official Documentation
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://www.mongodb.com/docs/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MongoDB Official Documentation
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://node-postgres.com/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    node-postgres (pg) Library
                  </a>
                </li>
                <li>
                  •{" "}
                  <a
                    href="https://www.prisma.io/"
                    className="text-primary hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Prisma ORM (Easier than raw SQL)
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </>
      );
    },
  },
  {
    slug: "solidity-bitmap-gas-optimizations",
    title: "Advanced Gas Optimizations in Solidity: Bitmaps for Boolean Flags",
    date: "2025-11-15",
    tags: ["solidity", "gas", "evm", "optimization", "bitmap"],
    summary:
      "Using bitmaps to pack many boolean flags into a single storage slot and dramatically reduce SSTORE costs.",
    category: "Solidity / Gas Optimizations",
    readTime: "12 min read",
    image: "/images/gas2.png",
    body: () => {
      return (
        <>
          <p className="mb-6 text-lg text-muted-foreground">
            In this post we will take a very common pattern in Solidity (many
            boolean flags) and see how we can store them much more efficiently
            using a simple idea: treat a <code>uint256</code> as 256 on/off
            switches (bits).
          </p>

          <div className="relative mb-8 h-[350px] w-[85vw] lg:w-[700px]  mx-auto overflow-hidden rounded-2xl borde border-dashed border-border/60 bg-card/60">
            <Image
              src={"/images/gas2.png"}
              className="object-contain lg:object-cover object-center"
              alt="Gas optimization illustration"
              fill
            />
          </div>

          <div>
            <div className="flex flex-col gap-2">
              <h2 className="mt-0 text-xl font-semibold text-primary">
                1. Why many <code>bool</code> flags get expensive
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                In Solidity, contract storage is split into 32-byte (256-bit)
                slots. A <code>bool</code> is only 1 byte, but the EVM reads and
                writes whole 32-byte words. If you store each flag separately,
                over time you end up touching many different storage slots, and
                each <code>SSTORE</code> is one of the most expensive operations
                in the EVM.
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                A typical naive approach to flags might look like this:
              </p>
              <CodeBlock
                language="solidity"
                title="Naive: one bool per key"
                code={`// BAD: Each bool can end up in its own storage slot
mapping(uint256 => bool) public boolFlags;

function setBoolFlagBad(uint256 index, bool value) public {
    boolFlags[index] = value; // One SSTORE per flag
}`}
              />
              <p className="mt-2 leading-relaxed text-muted-foreground">
                If you have hundreds of flags, this pattern means a lot of
                separate storage writes over the lifetime of the contract.
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                2. What is a bitmap?
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                A <strong>bitmap</strong> is just an integer where each bit (at
                some <strong>bit index</strong>) represents a boolean value. In
                Solidity, a <code>uint256</code> has 256 bits, so we can store
                256 boolean flags in a single number:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>Bit index 0 → flag #0</li>
                <li>Bit index 1 → flag #1</li>
                <li>…</li>
                <li>Bit index 255 → flag #255</li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                You can think of this like an array of flags where the bit index
                plays the role of an array index: instead of
                <code>flags[7] = true</code> you flip &quot;bit index 7&quot; on
                inside a single <code>uint256</code>. Instead of storing
                <code>bool</code> values in separate storage slots, we store a
                single <code>uint256</code> and turn individual bits on or off.
                This lines up perfectly with how the EVM already handles 256-bit
                storage words.
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                3. A small Bitmap library
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                To keep the code readable, we can wrap the bit operations in a
                tiny library. Don&apos;t worry if bitwise operators feel new –
                we will walk through them step by step below.
              </p>
              <CodeBlock
                language="solidity"
                title="Bitmap.sol"
                code={
                  `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library Bitmap {
    // Check whether bit at position ` +
                  "`index`" +
                  ` is 1 (true)
    function isSet(uint256 bitmap, uint256 index) internal pure returns (bool) {
        return (bitmap & (1 << index)) != 0;
    }

    // Return a new bitmap with bit at ` +
                  "`index`" +
                  ` set to 1
    function set(uint256 bitmap, uint256 index) internal pure returns (uint256) {
        return bitmap | (1 << index);
    }

    // Return a new bitmap with bit at ` +
                  "`index`" +
                  ` cleared to 0
    function clear(uint256 bitmap, uint256 index) internal pure returns (uint256) {
        return bitmap & ~(1 << index);
    }
}`
                }
              />
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                4. Example: user feature flags
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Now let&apos;s use this library in a simple contract. Each user
                gets a single <code>uint256</code> that stores multiple feature
                flags: can mint, can burn, is admin, is whitelisted, and so on.
              </p>
              <CodeBlock
                language="solidity"
                title="UserFeatures.sol"
                code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Bitmap.sol";

contract UserFeatures {
    using Bitmap for uint256;

    // Each address maps to one uint256 bitmap
    mapping(address => uint256) private _features;

    // Bit positions for our flags
    uint256 constant FEATURE_CAN_MINT    = 0;
    uint256 constant FEATURE_CAN_BURN    = 1;
    uint256 constant FEATURE_IS_ADMIN    = 2;
    uint256 constant FEATURE_WHITELISTED = 3;

    function enableFeature(address user, uint256 featureIndex) external {
        _features[user] = _features[user].set(featureIndex);
    }

    function disableFeature(address user, uint256 featureIndex) external {
        _features[user] = _features[user].clear(featureIndex);
    }

    function hasFeature(address user, uint256 featureIndex) external view returns (bool) {
        return _features[user].isSet(featureIndex);
    }
}`}
              />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                All of a user&apos;s features now live in a single storage slot
                (their <code>uint256</code>). Instead of many separate booleans,
                you get up to 256 flags for the storage cost of one word.
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                The line <code>using Bitmap for uint256;</code> is a Solidity
                directive that lets you call library functions as if they were
                methods on a <code>uint256</code>. Under the hood, the compiler
                rewrites calls like{" "}
                <code>_features[user].set(featureIndex)</code>
                to <code>Bitmap.set(_features[user], featureIndex)</code>,
                automatically passing the bitmap as the first argument.
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                5. How the bit operations actually work
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Let&apos;s zoom in on a single bitmap and a single flag. Suppose
                we want to work with <code>FEATURE_IS_ADMIN = 2</code> (bit
                position 2).
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Remember that a <code>uint256</code> is 256 bits wide, so we can
                think of it as 256 tiny on/off switches:
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  <code>uint256</code>: 256 bits → 256 boolean flags
                </li>
                <li>
                  Example bitmap: <code>00000000...00101001</code>
                  <br />
                  Positions 0, 3, and 5 are <strong>TRUE</strong> (bit = 1), all
                  others are <strong>FALSE</strong> (bit = 0).
                </li>
              </ul>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  <strong>Step 1 &mdash; Create a mask:</strong>
                  <br />A <strong>mask</strong> is a number with exactly one bit
                  set to 1. We create it using the left-shift operator{" "}
                  <code>&lt;&lt;</code>:
                  <br />
                  <code>1 &lt;&lt; 0 = 00000001</code> (decimal 1)
                  <br />
                  <code>1 &lt;&lt; 2 = 00000100</code> (decimal 4)
                  <br />
                  <code>1 &lt;&lt; 3 = 00001000</code> (decimal 8)
                  <br />
                  This mask tells us which single bit we want to work with in
                  the next steps.
                </li>
                <li>
                  <strong>Step 2 &mdash; Set the bit (turn it ON):</strong>
                  <br />
                  <code>1 &lt;&lt; position</code> creates a number with only
                  that bit set:
                  <br />
                  <code>1 &lt;&lt; 0 = 00000001</code> (1)
                  <br />
                  <code>1 &lt;&lt; 3 = 00001000</code> (8)
                  <br />
                  <code>1 &lt;&lt; 5 = 00100000</code> (32)
                  <br />
                  Then <code>bitmap |= (1 &lt;&lt; position)</code> uses OR to
                  turn that bit ON without touching the others.
                  <br />
                  Concrete example:
                  <br />
                  <code>Current: 00000101</code> (bits 0 and 2 are on)
                  <br />
                  <code>Set bit 3: 00001000</code> (<code>1 &lt;&lt; 3</code>)
                  <br />
                  <code>Result: 00001101</code> (OR combines them – bit 3 is now
                  on too!).
                </li>
                <li>
                  <strong>Step 3 &mdash; Clear the bit (turn it OFF):</strong>
                  <br />
                  <code>1 &lt;&lt; position</code> gives the mask for that bit,
                  e.g. <code>00001000</code> for position 3.
                  <br />
                  <code>~(1 &lt;&lt; position)</code> inverts it:
                  <code>11110111</code> (all bits 1 except the one we want to
                  clear).
                  <br />
                  Then <code>bitmap &amp;= ~(1 &lt;&lt; position)</code> uses
                  AND to turn that bit OFF while keeping all other bits as they
                  were.
                  <br />
                  Concrete example:
                  <br />
                  <code>Current: 00001101</code> (bits 0, 2, 3 are on)
                  <br />
                  <code>Clear bit 3: 11110111</code> (
                  <code>~(1 &lt;&lt; 3)</code>)
                  <br />
                  <code>Result: 00000101</code> (AND clears bit 3, keeps
                  others).
                </li>
                <li>
                  <strong>
                    Step 4 &mdash; Read the bit (check if it&apos;s ON):
                  </strong>
                  <br />
                  To check if a specific bit is set, we use the mask again with
                  AND:
                  <code>(bitmap &amp; (1 &lt;&lt; position)) != 0</code>
                  <br />
                  The AND operation isolates that one bit. If the result is
                  non-zero, the bit was on.
                  <br />
                  Concrete example:
                  <br />
                  <code>Bitmap: 00001101</code> (bits 0, 2, 3 are on)
                  <br />
                  <code>Check bit 3: 00001000</code> (<code>1 &lt;&lt; 3</code>)
                  <br />
                  <code>AND result: 00001000</code> (non-zero → bit 3 is ON ✓)
                  <br />
                  <code>Check bit 1: 00000010</code> (<code>1 &lt;&lt; 1</code>)
                  <br />
                  <code>AND result: 00000000</code> (zero → bit 1 is OFF ✗)
                </li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                The key idea is: we never modify the whole number directly by
                hand. We always build a small mask that affects exactly one bit,
                and then combine it with the existing bitmap using bitwise OR (
                <code>|</code>) or AND (<code>&amp;</code>).
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                6. Gas intuition: why this is cheaper
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                The EVM charges most of the cost per storage slot touched, not
                per bit. With naive mappings, many flags over time can mean many
                different storage slots are written to. With bitmaps, up to 256
                flags share the same slot, so enabling or disabling a feature
                often just updates the same 32-byte word.
              </p>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <strong>Concrete example:</strong> Suppose you need to store 256
                boolean flags.
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  <strong>Bad way</strong> (256 separate <code>bool</code>{" "}
                  storage slots):
                  <br />
                  256 slots × ~20,000 gas per <code>SSTORE</code> ={" "}
                  <strong>~5,120,000 gas</strong>
                </li>
                <li>
                  <strong>Good way</strong> (1 <code>uint256</code> bitmap):
                  <br />1 slot × ~20,000 gas = <strong>~20,000 gas</strong>
                </li>
                <li>
                  <strong>Savings: ~99.6%</strong> 🎉
                </li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                In write-heavy code paths (like minting, role changes, or
                complex workflows), this can translate to dramatically lower gas
                bills, especially on chains where gas is expensive.
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                7. Scaling beyond 256 flags
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                A single <code>uint256</code> gives you 256 flags. If you ever
                need more than that per user, you can use multiple words and
                index them by &quot;bucket&quot;:
              </p>
              <CodeBlock
                language="solidity"
                title="Multiple bitmaps per user"
                code={`mapping(address => mapping(uint256 => uint256)) private _bitmaps;

// wordIndex = flagIndex / 256
// bitIndex  = flagIndex % 256`}
              />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                Most applications don&apos;t need thousands of independent
                flags. Often, a small set of well-named feature bits (plus roles
                or enums) is enough and keeps the code easy to reason about.
              </p>
            </div>

            <div>
              <h2 className="mt-8 text-xl font-semibold text-primary">
                8. Practical tips and summary
              </h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <strong>✅ When to use bitmaps:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>You have many (10+) related boolean flags per entity</li>
                <li>Flags are frequently written together in transactions</li>
                <li>Gas optimization is important for your use case</li>
                <li>
                  Examples: permissions, feature toggles, completed steps in a
                  workflow
                </li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <strong>❌ When NOT to use bitmaps:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  You only have 2-3 flags (the complexity isn&apos;t worth it)
                </li>
                <li>Flags are rarely updated after initialization</li>
                <li>
                  Readability is more important than gas savings for your team
                </li>
                <li>
                  You&apos;re still prototyping and the data model is changing
                </li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <strong>Best practices:</strong>
              </p>
              <ul className="mt-2 list-disc space-y-1 pl-6 text-muted-foreground">
                <li>
                  Keep all your <code>FEATURE_*</code> constants in one place
                  and treat their bit positions as part of your public API.
                </li>
                <li>
                  Avoid magic numbers like <code>1 &lt;&lt; 7</code> scattered
                  in the code; always use named constants.
                </li>
                <li>
                  Wrap bit operations in a small library (like
                  <code>Bitmap</code>) so your contracts read like high-level
                  intent: <code>set</code>, <code>clear</code>,
                  <code>isSet</code>.
                </li>
                <li>
                  Document your bitmap layout clearly in comments – future you
                  will thank you!
                </li>
              </ul>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                <strong>Summary:</strong> Bitmaps are a powerful pattern when
                you have many boolean flags. They let you pack up to 256 of them
                into a single storage slot, reducing storage costs by up to 99%
                compared to naive <code>bool</code>-based designs. Start with
                clear and simple state while prototyping, then introduce bitmaps
                on write-heavy paths once your data model stabilizes and gas
                costs matter.
              </p>
            </div>
          </div>
        </>
      );
    },
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((post) => post.slug === slug);
}
