"use client";
import React, { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
};

const Reveal: React.FC<RevealProps> = ({
  children,
  className = "",
  once = true,
  rootMargin = "0px 0px -10% 0px",
  threshold = 0.12,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && observer) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { root: null, rootMargin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return (
    <div
      ref={ref}
      className={`${className} reveal ${visible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

export default Reveal;
