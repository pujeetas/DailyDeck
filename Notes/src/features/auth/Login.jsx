import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Lock, Command } from "lucide-react"; // Changed CheckSquare to Terminal
import useUserStore from "@/hooks/useUserStore";
import { message } from "antd";
import ForgotPasswordModal from "./ForgotPasswordModal";

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
        "/api/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      const userDetailsRes = await axios.get("/api/user/getUserDetails", {
        withCredentials: true,
      });
      console.log(userDetailsRes);
      login(userDetailsRes.data);

      setIsSuccess(true);
      message.success("Welcome back.");

      setTimeout(() => {
        navigate("/main");
      }, 600);
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-[0.1] pointer-events-none" />

      <AnimatePresence>
        {!isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-[#121214] border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10"
          >
            {/* LEFT SIDE: Brand Panel (Product Focused) */}
            <div className="hidden md:flex flex-col justify-between bg-[#18181b] p-12 text-white relative overflow-hidden border-r border-zinc-800">
              {/* Abstract Glows */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-10 -ml-16 -mb-16"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-500 mb-8">
                  <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                    <Command className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-mono-tech tracking-wider text-zinc-400">
                    DAILYDECK OS
                  </span>
                </div>
                <h2 className="text-4xl font-bold leading-tight tracking-tight mb-4">
                  Turn scattered work into <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    focused execution.
                  </span>
                </h2>
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm p-4 rounded-xl border border-zinc-700/50">
                  <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-500">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-white text-sm">
                      Command-first workflow
                    </p>
                    <p className="text-xs text-zinc-500">
                      Move at the speed of thought.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Login Form */}
            <div className="p-8 md:p-16 flex flex-col justify-center bg-[#121214]">
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
                  Access your workspace.
                </h2>
                <p className="text-zinc-500 text-sm">
                  Enter your credentials to continue.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-mono-tech text-zinc-400 mb-2 uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-zinc-800 rounded-xl bg-[#18181b] text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-mono-tech text-zinc-400 uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotPassword(true)}
                      className="text-xs text-emerald-500 hover:text-emerald-400 transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-zinc-800 rounded-xl bg-[#18181b] text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none"
                    placeholder="••••••••"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                >
                  {loading ? (
                    <span className="animate-pulse">Authenticating...</span>
                  ) : (
                    <>
                      Log In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Trust Signal */}
              <div className="mt-8 pt-8 border-t border-zinc-800 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-zinc-600 text-xs">
                  <Lock className="w-3 h-3" />
                  <span>Your data is end-to-end encrypted.</span>
                </div>

                <p className="text-sm text-zinc-500">
                  Don’t have an account?{" "}
                  <button
                    onClick={() => navigate("/signup")}
                    className="text-white font-medium hover:underline transition"
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
