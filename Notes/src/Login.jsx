import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckSquare, Sparkles, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          email: form.email,
          password: form.password,
        },
        { withCredentials: true }
      );

      navigate("/main");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        alert("No response from server. Check your backend.");
      } else {
        alert("Request failed: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Grid Pattern (Matches Hero) */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl shadow-slate-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-slate-100">
        {/* LEFT SIDE: Brand Panel (Dark Mode Vibe) */}
        <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
          {/* Abstract Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 -ml-16 -mb-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-mono tracking-wide uppercase">
                DailyDeck v2.0
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight tracking-tight">
              Turn your chaos into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                structured clarity.
              </span>
            </h2>
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <CheckSquare className="w-6 h-6" />
              </div>
              <div>
                <p className="font-medium text-white">Focus Mode</p>
                <p className="text-sm text-slate-400">
                  Get 3x more done today.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Login Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          <div className="text-center md:text-left mb-10">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">
              Welcome back
            </h2>
            <p className="text-slate-500">
              Log in to your intelligent workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                placeholder="name@company.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-sm text-emerald-600 font-medium hover:text-emerald-700 hover:underline"
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
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-xl shadow-slate-900/10 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Log In"}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="text-center mt-8 pt-8 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition"
              >
                Create free account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
