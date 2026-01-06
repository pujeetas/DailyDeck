import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Command } from "lucide-react"; // Using an icon for the logo

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
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-zinc-800 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <header className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto">
        {/* Logo Area */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700 group-hover:border-zinc-500 transition-colors">
            <Command className="w-4 h-4 text-zinc-300" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            DailyDeck
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            Log in
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-5 py-2 text-sm font-medium bg-white text-black rounded-lg hover:bg-zinc-200 transition-all hover:scale-105"
          >
            Sign up
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
