import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a08]/90 backdrop-blur-md border-b border-zinc-800/50"
          : "bg-transparent"
      }`}
    >
      <header className="flex justify-between items-center px-6 md:px-10 py-5 max-w-[1400px] mx-auto">
        {/* Logo — typographic, no icon */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-baseline gap-2"
        >
          <span
            className="text-[15px] font-bold text-zinc-100 tracking-tight"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            DailyDeck
          </span>
          <span
            className="text-[10px] text-amber-500/70 tracking-[0.15em] uppercase font-medium"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            v1.0
          </span>
        </div>

        {/* Center nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {["Features", "Workflow", "Use Cases", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(" ", "-")}`}
              className="text-[12px] text-zinc-500 tracking-[0.08em] uppercase hover:text-zinc-200 transition-colors duration-200"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block text-[12px] text-zinc-500 hover:text-zinc-200 transition-colors px-4 py-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Log in
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="text-[12px] font-bold text-[#0a0a08] bg-amber-500 hover:bg-amber-400 px-5 py-2.5 transition-colors duration-200"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            GET STARTED
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
