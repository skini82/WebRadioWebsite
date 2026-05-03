"use client";

import { useEffect, useRef, useState } from "react";

type LangCode = "en" | "it";

const OPTIONS: { code: LangCode; label: string; flag: React.ReactNode }[] = [
  { code: "en", label: "English", flag: <FlagGB /> },
  { code: "it", label: "Italiano", flag: <FlagIT /> },
];

type Props = {
  value: LangCode;
  onChange: (value: LangCode) => void;
};

export function LanguageSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const current = OPTIONS.find((o) => o.code === value) ?? OPTIONS[0];

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-indigo-500 hover:bg-white/10 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <span className="inline-flex shrink-0 w-5 h-[15px] overflow-hidden rounded-sm shadow-sm">
            {current.flag}
          </span>
          <span>{current.label}</span>
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          className={`text-slate-400 transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-10 left-0 right-0 mt-1 bg-slate-900 border border-white/10 rounded-lg shadow-xl overflow-hidden"
        >
          {OPTIONS.map((opt) => (
            <li
              key={opt.code}
              role="option"
              aria-selected={opt.code === value}
              onClick={() => {
                onChange(opt.code);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 px-3.5 py-2.5 text-sm cursor-pointer text-white hover:bg-indigo-600/30 ${
                opt.code === value ? "bg-indigo-600/20" : ""
              }`}
            >
              <span className="inline-flex shrink-0 w-5 h-[15px] overflow-hidden rounded-sm shadow-sm">
                {opt.flag}
              </span>
              <span>{opt.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FlagIT() {
  return (
    <svg viewBox="0 0 3 2" className="w-full h-full" preserveAspectRatio="none">
      <rect width="1" height="2" x="0" fill="#009246" />
      <rect width="1" height="2" x="1" fill="#fff" />
      <rect width="1" height="2" x="2" fill="#ce2b37" />
    </svg>
  );
}

function FlagGB() {
  return (
    <svg viewBox="0 0 60 30" className="w-full h-full" preserveAspectRatio="none">
      <clipPath id="gb-clip">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="gb-clip2">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#gb-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          clipPath="url(#gb-clip2)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}
