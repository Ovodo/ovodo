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
  body: () => React.JSX.Element;
};

export const posts: BlogPost[] = [
  {
    slug: "solidity-bitmap-gas-optimizations",
    title: "Advanced Gas Optimizations in Solidity: Bitmaps for Boolean Flags",
    date: "2025-11-15",
    tags: ["solidity", "gas", "evm", "optimization", "bitmap"],
    summary:
      "Using bitmaps to pack many boolean flags into a single storage slot and dramatically reduce SSTORE costs.",
    category: "Solidity / Gas Optimizations",
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

          <div className="relative mb-8 h-[350px] w-[700px]  mx-auto overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/60">
            <Image
              src={"/images/gas2.png"}
              className="object-cover object-center"
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
