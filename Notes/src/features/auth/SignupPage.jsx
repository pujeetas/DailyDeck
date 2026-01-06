import axios from "axios";
import {
  ArrowRight,
  Chrome,
  Github,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ShieldCheck,
  Command,
} from "lucide-react";
import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "@/hooks/useUserStore";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const { signUp } = useUserStore();

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((s) => ({ ...s, [e.target.name]: null }));
    }
  };

  const validate = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName = "First name required";
    if (!form.lastName.trim()) e.lastName = "Last name required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Min 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await axios.post("/api/signup", form, {
        withCredentials: true,
      });
      signUp(response.data.user);

      setIsSuccess(true);
      message.success("Signup successful.");

      setTimeout(() => {
        navigate("/main");
      }, 600);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Signup failed. Try again."
      );
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
            {/* LEFT SIDE: Signup Form */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-[#121214] order-2 md:order-1">
              <header className="mb-8">
                <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
                  Create an account
                </h1>
                <p className="text-zinc-500">
                  Start your journey to clarity today.
                </p>
              </header>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-zinc-700 rounded-xl py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
                >
                  <Chrome size={18} />
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-zinc-700 rounded-xl py-2.5 text-sm font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all"
                >
                  <Github size={18} />
                  GitHub
                </button>
              </div>

              <div className="relative flex items-center mb-8">
                <div className="grow border-t border-zinc-800"></div>
                <span className="shrink-0 mx-4 text-xs font-mono-tech font-semibold text-zinc-600 uppercase tracking-wider">
                  Or continue with
                </span>
                <div className="grow border-t border-zinc-800"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name Fields Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wide">
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                      />
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder="Jane"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.firstName
                            ? "border-rose-500/50 bg-rose-500/10"
                            : "border-zinc-800 bg-[#18181b]"
                        } text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-rose-500 font-medium">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wide">
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        size={16}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                      />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder="Doe"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                          errors.lastName
                            ? "border-rose-500/50 bg-rose-500/10"
                            : "border-zinc-800 bg-[#18181b]"
                        } text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-rose-500 font-medium">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wide">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="name@work.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                        errors.email
                          ? "border-rose-500/50 bg-rose-500/10"
                          : "border-zinc-800 bg-[#18181b]"
                      } text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-500 font-medium">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono-tech text-zinc-400 uppercase tracking-wide">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={16}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      key={showPassword ? "password-text" : "password-hidden"}
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                        errors.password
                          ? "border-rose-500/50 bg-rose-500/10"
                          : "border-zinc-800 bg-[#18181b]"
                      } text-white placeholder:text-zinc-600 focus:bg-zinc-900 focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all outline-none`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 p-1 transition"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-rose-500 font-medium">
                      {errors.password}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Creating account..." : "Get Started"}
                  {!loading && <ArrowRight size={18} />}
                </button>
              </form>

              <p className="text-center text-sm text-zinc-500 mt-8">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-emerald-400 font-medium hover:text-emerald-300 hover:underline transition"
                >
                  Log in
                </button>
              </p>
            </div>

            {/* RIGHT SIDE: Brand Panel (UPDATED) */}
            <div className="hidden md:flex flex-col justify-between bg-[#18181b] p-12 text-white relative overflow-hidden border-l border-zinc-800 order-1 md:order-2">
              {/* Abstract Glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-10 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[120px] opacity-10 -ml-16 -mb-16"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 text-emerald-500 mb-6">
                  <div className="w-8 h-8 bg-zinc-800 rounded-lg flex items-center justify-center border border-zinc-700">
                    <Command className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xs font-mono-tech tracking-wider text-zinc-400">
                    JOIN DAILYDECK
                  </span>
                </div>

                {/* TIGHTER COPY */}
                <h2 className="text-4xl font-bold leading-tight tracking-tight">
                  Built for modern builders <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                    who think in systems.
                  </span>
                </h2>

                {/* CALMER SUBTEXT */}
                <p className="mt-4 text-zinc-400 text-lg leading-relaxed">
                  DailyDeck helps you regain focus in a distracted world. Join a
                  growing community of builders.
                </p>
              </div>

              <div className="relative z-10 mt-12">
                <div className="flex items-center gap-4 bg-zinc-900/50 backdrop-blur-sm p-4 rounded-2xl border border-zinc-700/50">
                  <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-white">Bank-grade Security</p>
                    <p className="text-sm text-zinc-500">
                      Your data is encrypted and safe.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignupPage;
