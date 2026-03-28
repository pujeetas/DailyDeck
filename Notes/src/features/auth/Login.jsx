import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Lock, Mail, Github, Chrome } from "lucide-react";
import useUserStore from "@/hooks/useUserStore";
import { message } from "antd";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { API_BASE_URL } from "@/config/api";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);

  const { login } = useUserStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/login`,
        { email: form.email, password: form.password },
        { withCredentials: true },
      );

      const userDetailsRes = await axios.get(
        `${API_BASE_URL}/api/user/getUserDetails`,
        {
          withCredentials: true,
        },
      );
      login(userDetailsRes.data);

      setIsSuccess(true);
      message.success("Welcome back.");
      setTimeout(() => navigate("/main"), 600);
    } catch (error) {
      if (error.response) {
        message.error(error.response.data.message || "Invalid credentials.");
      } else if (error.request) {
        message.error("Server unreachable.");
      } else {
        message.error("Login failed.");
      }
      setLoading(false);
    }
  };

  const inputClasses =
    "w-full pl-10 pr-4 py-3 border border-zinc-800 text-[14px] text-white placeholder:text-zinc-600 bg-[#0e0e0c] outline-none transition-all duration-200 focus:border-amber-500/50 focus:bg-[#111110]";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a08] p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0px, transparent 1px, transparent 3px)",
            backgroundSize: "100% 3px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[400px] bg-amber-500/2.5 blur-[150px]" />
      </div>

      <AnimatePresence>
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, filter: "blur(8px)" }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-[1060px] border border-zinc-800/60 bg-[#0c0c0a] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10"
          >
            {/* LEFT — Brand panel */}
            <div className="hidden md:flex flex-col justify-between bg-[#0e0e0c] p-10 lg:p-12 relative overflow-hidden border-r border-zinc-800/60">
              <div className="absolute top-0 right-0 w-[300px] h-[300px] `bg-amber-500/4 rounded-full blur-[120px] -mr-20 -mt-20" />

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-12">
                  <span
                    className="text-[14px] font-bold text-zinc-300 tracking-tight"
                    style={mono}
                  >
                    DailyDeck
                  </span>
                  <span
                    className="text-[10px] text-amber-500/70 tracking-[0.15em] uppercase"
                    style={mono}
                  >
                    v1.0
                  </span>
                </div>

                <h2
                  className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-zinc-100 leading-[1.15] tracking-[-0.02em] mb-5"
                  style={serif}
                >
                  Turn scattered work into{" "}
                  <span className="italic text-amber-500">
                    focused execution.
                  </span>
                </h2>

                <p
                  className="text-[15px] text-zinc-500 leading-[1.7] max-w-sm"
                  style={serif}
                >
                  Your notes, tasks, and calendar — fused into one system that
                  moves at the speed of thought.
                </p>
              </div>

              <div className="relative z-10 mt-12">
                <div className="border border-zinc-800/60 bg-[#0c0c0a] p-5 flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-center text-emerald-400">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <p
                      className="text-[13px] font-semibold text-zinc-200 mb-1"
                      style={mono}
                    >
                      Command-first workflow
                    </p>
                    <p
                      className="text-[13px] text-zinc-600 leading-relaxed"
                      style={serif}
                    >
                      Keyboard-native. Zero friction input.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT — Login form */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-amber-600/50" />
                  <span
                    className="text-[10px] text-amber-600/80 tracking-[0.25em] uppercase"
                    style={mono}
                  >
                    Welcome Back
                  </span>
                </div>
                <h2
                  className="text-2xl font-semibold text-zinc-100 tracking-[-0.02em] mb-2"
                  style={serif}
                >
                  Access your workspace.
                </h2>
                <p className="text-[14px] text-zinc-600" style={serif}>
                  Enter your credentials to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href = `${API_BASE_URL}/api/auth/google`)
                    }
                    className="flex items-center justify-center gap-2.5 border border-zinc-800 py-2.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-200"
                    style={mono}
                  >
                    <Chrome size={15} />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      (window.location.href = `${API_BASE_URL}/api/auth/github`)
                    }
                    className="flex items-center justify-center gap-2.5 border border-zinc-800 py-2.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-200"
                    style={mono}
                  >
                    <Github size={15} />
                    GitHub
                  </button>
                </div>

                {/* Divider - ADD THIS */}
                <div className="relative flex items-center mb-4">
                  <div className="grow border-t border-zinc-800/60" />
                  <span
                    className="shrink-0 mx-4 text-[10px] text-zinc-700 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    Or continue with
                  </span>
                  <div className="grow border-t border-zinc-800/60" />
                </div>
                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="name@company.com"
                      className={inputClasses}
                      style={mono}
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center">
                    <label
                      className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                      style={mono}
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-[11px] text-amber-500/80 hover:text-amber-400 transition-colors"
                      style={mono}
                    >
                      Forgot?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className={inputClasses}
                      style={mono}
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={mono}
                >
                  {loading ? (
                    <span>AUTHENTICATING...</span>
                  ) : (
                    <>
                      LOG IN <ArrowRight size={15} />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <div className="mt-8 pt-7 border-t border-zinc-800/50 flex flex-col items-center gap-4">
                <div
                  className="flex items-center gap-2 text-zinc-700 text-[11px]"
                  style={mono}
                >
                  <Lock className="w-3 h-3" />
                  <span>End-to-end encrypted</span>
                </div>

                <p className="text-[13px] text-zinc-600" style={serif}>
                  Don't have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-amber-500 font-medium hover:text-amber-400 transition-colors"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {forgotPassword && (
        <ForgotPasswordModal
          forgotPassword={forgotPassword}
          setForgotPassword={setForgotPassword}
        />
      )}
    </div>
  );
}
