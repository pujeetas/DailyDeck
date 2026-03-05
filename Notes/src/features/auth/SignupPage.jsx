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
} from "lucide-react";
import { message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import useUserStore from "@/hooks/useUserStore";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

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

  const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

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
      setTimeout(() => navigate("/main"), 600);
    } catch (error) {
      message.error(
        error.response?.data?.message || "Signup failed. Try again.",
      );
      setLoading(false);
    }
  };

  const inputClasses = (fieldName) =>
    `w-full pl-10 pr-4 py-3 border text-[14px] text-white placeholder:text-zinc-600 bg-[#0e0e0c] outline-none transition-all duration-200 ${
      errors[fieldName]
        ? "border-red-500/50 bg-red-500/5"
        : "border-zinc-800 focus:border-amber-500/50 focus:bg-[#111110]"
    }`;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("oauth") === "success") {
      axios
        .get(`${API}/api/verify`, { withCredentials: true })
        .then((res) => {
          signUp(res.data.user);
          navigate("/main");
        })
        .catch(() => navigate("/login"));
    }
  }, [navigate, signUp]);

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
        <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-blue-500/2 blur-[120px]" />
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
            {/* LEFT — Form */}
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-px bg-amber-600/50" />
                  <span
                    className="text-[10px] text-amber-600/80 tracking-[0.25em] uppercase"
                    style={mono}
                  >
                    New Account
                  </span>
                </div>
                <h1
                  className="text-3xl font-semibold text-zinc-100 tracking-[-0.02em] mb-2"
                  style={serif}
                >
                  Create your workspace
                </h1>
                <p className="text-[14px] text-zinc-600" style={serif}>
                  Start your journey to clarity today.
                </p>
              </div>

              {/* Social buttons */}
              <div className="grid grid-cols-2 gap-3 mb-7">
                <button
                  type="button"
                  onClick={() =>
                    (window.location.href = `${API}/api/auth/google`)
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
                    (window.location.href = `${API}/api/auth/github`)
                  }
                  className="flex items-center justify-center gap-2.5 border border-zinc-800 py-2.5 text-[12px] font-medium text-zinc-500 hover:text-zinc-200 hover:border-zinc-600 hover:bg-zinc-900/30 transition-all duration-200"
                  style={mono}
                >
                  <Github size={15} />
                  GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center mb-7">
                <div className="grow border-t border-zinc-800/60" />
                <span
                  className="shrink-0 mx-4 text-[10px] text-zinc-700 uppercase tracking-[0.15em]"
                  style={mono}
                >
                  Or continue with
                </span>
                <div className="grow border-t border-zinc-800/60" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Name row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label
                      className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                      style={mono}
                    >
                      First Name
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={onChange}
                        placeholder="Jane"
                        className={inputClasses("firstName")}
                        style={mono}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-[11px] text-red-400" style={mono}>
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label
                      className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                      style={mono}
                    >
                      Last Name
                    </label>
                    <div className="relative">
                      <User
                        size={14}
                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                      />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={onChange}
                        placeholder="Doe"
                        className={inputClasses("lastName")}
                        style={mono}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-[11px] text-red-400" style={mono}>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label
                    className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      placeholder="name@work.com"
                      className={inputClasses("email")}
                      style={mono}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-[11px] text-red-400" style={mono}>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      name="password"
                      value={form.password}
                      onChange={onChange}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`${inputClasses("password")} pr-10`}
                      style={mono}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[11px] text-red-400" style={mono}>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={mono}
                >
                  {loading ? "CREATING ACCOUNT..." : "GET STARTED"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              <p
                className="text-center text-[13px] text-zinc-600 mt-7"
                style={serif}
              >
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-amber-500 font-medium hover:text-amber-400 transition-colors"
                >
                  Log in
                </button>
              </p>
            </div>

            {/* RIGHT — Brand panel */}
            <div className="hidden md:flex flex-col justify-between bg-[#0e0e0c] p-10 lg:p-12 relative overflow-hidden border-l border-zinc-800/60 order-1 md:order-2">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/4 rounded-full blur-[120px] -mr-20 -mt-20" />

              <div className="relative z-10">
                {/* Brand */}
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

                {/* Headline */}
                <h2
                  className="text-[clamp(1.8rem,3vw,2.5rem)] font-semibold text-zinc-100 leading-[1.15] tracking-[-0.02em] mb-5"
                  style={serif}
                >
                  Built for builders{" "}
                  <span className="italic text-amber-500">
                    who think in systems.
                  </span>
                </h2>

                <p
                  className="text-[15px] text-zinc-500 leading-[1.7] max-w-sm"
                  style={serif}
                >
                  Regain focus in a distracted world. Join a growing community
                  of developers, founders, and PMs shipping with clarity.
                </p>
              </div>

              {/* Bottom trust signal */}
              <div className="relative z-10 mt-12">
                <div className="border border-zinc-800/60 bg-[#0c0c0a] p-5 flex items-start gap-4">
                  <div className="shrink-0 w-9 h-9 border border-blue-500/20 bg-blue-500/5 flex items-center justify-center text-blue-400">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p
                      className="text-[13px] font-semibold text-zinc-200 mb-1"
                      style={mono}
                    >
                      Bank-grade Security
                    </p>
                    <p
                      className="text-[13px] text-zinc-600 leading-relaxed"
                      style={serif}
                    >
                      End-to-end encryption. Your data stays yours.
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
