"use client";

import React, { useEffect, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SubscribeButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-primary/90 transition hover:border-accent/50 hover:text-accent"
    >
      Subscribe for new posts
    </button>
  );
}

export default function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!open) {
      setEmail("");
      setStatus("idle");
      setMessage("");
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    if (!emailRegex.test(email.trim())) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        setMessage(data?.message || "Something went wrong. Try again.");
        setStatus("error");
        return;
      }
      setMessage(data.message || "Subscribed!");
      setStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err: unknown) {
      console.error(err);
      setMessage("Something went wrong. Try again.");
      setStatus("error");
    }
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-[90vw] max-w-md rounded-2xl border border-white/10 bg-[#0b0f0e] p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-accent/80">
                  Subscribe
                </p>
                <h3 className="mt-2 text-xl font-semibold text-primary">
                  Get the next drop
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Join the list for new posts, deep dives, and product notes.
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-muted-foreground transition hover:text-primary"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-5 space-y-3">
              <label className="block text-sm text-muted-foreground">
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-primary/90 placeholder:text-muted-foreground/60 outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/30"
                  placeholder="you@example.com"
                  required
                />
              </label>

              {message && (
                <p
                  className={`text-sm ${
                    status === "success" ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {message}
                </p>
              )}

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="flex-1 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-night shadow-[0_10px_40px_rgba(255,212,0,0.35)] transition hover:shadow-[0_12px_50px_rgba(255,212,0,0.42)] disabled:opacity-60"
                >
                  {status === "submitting" ? "Subscribing..." : "Subscribe"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-4 py-2 text-sm font-semibold text-muted-foreground transition hover:text-primary"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
