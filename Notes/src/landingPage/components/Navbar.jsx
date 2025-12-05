import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll to toggle transparency
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <header className="flex justify-between items-center px-8 max-w-7xl mx-auto">
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-slate-900 tracking-tight cursor-pointer"
        >
          DailyDeck
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer px-4 py-2 text-slate-700 hover:text-black hover:bg-black/5 rounded-lg transition font-medium"
          >
            Log in
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="cursor-pointer px-5 py-2.5 bg-slate-900 text-white rounded-xl hover:bg-black hover:scale-105 transition-all shadow-lg shadow-slate-900/20 font-medium"
          >
            Sign up
          </button>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
