import React from "react";

const mono = { fontFamily: "'JetBrains Mono', monospace" };

const Footer = () => {
  return (
    <footer className="py-8 px-6 border-t border-zinc-800/40 bg-[#0a0a08]">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-baseline gap-2">
          <span
            className="text-[13px] font-bold text-zinc-400 tracking-tight"
            style={mono}
          >
            DailyDeck
          </span>
          <span className="text-[10px] text-zinc-700" style={mono}>
            v1.0
          </span>
        </div>
        <span className="text-[11px] text-zinc-700 tracking-wide" style={mono}>
          © {new Date().getFullYear()} · Built for builders who ship.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
