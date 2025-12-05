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
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    // Clear error when user types
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
      const response = await axios.post("http://localhost:3000/signup", form, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/main");
    } catch (error) {
      setErrors({
        email: error.response?.data?.message || "Signup failed. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-slate-100">
        {/* LEFT SIDE: Signup Form */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white order-2 md:order-1">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-slate-500">
              Start your journey to clarity today.
            </p>
          </header>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Chrome size={18} />
              Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              <Github size={18} />
              GitHub
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink-0 mx-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Or continue with
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name Fields Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  First Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="Jane"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.firstName
                        ? "border-rose-500 bg-rose-50"
                        : "border-slate-200 bg-slate-50"
                    } text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none`}
                  />
                </div>
                {errors.firstName && (
                  <p className="text-xs text-rose-500 font-medium">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Last Name
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Doe"
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                      errors.lastName
                        ? "border-rose-500 bg-rose-50"
                        : "border-slate-200 bg-slate-50"
                    } text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none`}
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
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="name@work.com"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-rose-500 bg-rose-50"
                      : "border-slate-200 bg-slate-50"
                  } text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none`}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 font-medium">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
                    errors.password
                      ? "border-rose-500 bg-rose-50"
                      : "border-slate-200 bg-slate-50"
                  } text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
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
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Creating account..." : "Get Started"}
              {!loading && <ArrowRight size={18} />}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-8">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition"
            >
              Log in
            </button>
          </p>
        </div>

        {/* RIGHT SIDE: Brand Panel (Dark Mode Vibe) */}
        <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden order-1 md:order-2">
          {/* Abstract Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-mono tracking-wide uppercase">
                Join the community
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Built for builders, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                designers, and thinkers.
              </span>
            </h2>
            <p className="mt-4 text-slate-400 text-lg leading-relaxed">
              DailyDeck helps you regain focus in a distracted world. Join
              thousands of users today.
            </p>
          </div>

          <div className="relative z-10 mt-12">
            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
              <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-white">Bank-grade Security</p>
                <p className="text-sm text-slate-400">
                  Your data is encrypted and safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
