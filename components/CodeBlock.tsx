"use client";

import React from "react";
import { Highlight, themes, type Language } from "prism-react-renderer";

type CodeBlockProps = {
  code: string;
  language?: Language;
  title?: string;
};

export function CodeBlock({ code, language = "tsx", title }: CodeBlockProps) {
  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-[#020617] shadow-sm shadow-black/40">
      <div className="flex items-center justify-between border-b border-white/5 bg-[#020617]/80 px-3 py-1.5 text-xs text-zinc-400">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
        </div>
        {title ? (
          <span className="truncate text-[10px] text-zinc-400">{title}</span>
        ) : null}
        <span className="text-[10px] uppercase tracking-wide text-zinc-500">
          {language}
        </span>
      </div>
      <Highlight code={code.trim()} language={language} theme={themes.vsDark}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} m-0 max-h-[460px] overflow-auto bg-transparent px-4 py-3 text-xs leading-relaxed`}
            style={style}
          >
            {tokens.map((line, i) => {
              const { ...lineProps } = getLineProps({ line, key: i });
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, j) => {
                    const { ...tokenProps } = getTokenProps({
                      token,
                      key: j,
                    });
                    return <span key={j} {...tokenProps} />;
                  })}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
