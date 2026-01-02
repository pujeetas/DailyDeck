import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sparkles, Lock, ArrowRight, CheckCircle2 } from "lucide-react";
import { message } from "antd";
import axios from "axios";

export default function ResetPassword() {
  const { userId, token } = useParams();

  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !token) {
      message.error("Invalid or expired reset link");
      return;
    }
    if (form.password !== form.confirmPassword) {
      return message.error("Passwords do not match!");
    }

    setLoading(true);
    try {
      await axios.post(`/api/reset-password/${userId}/${token}`, {
        password: form.password,
      });
      setIsSuccess(true);
      message.success("Password updated successfully!");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Link expired or invalid."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600">
            Invalid Reset Link
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-lg"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

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
      />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative z-10 border border-slate-100">
        {/* LEFT SIDE: Brand Panel (Identical to Login) */}
        <div className="hidden md:flex flex-col justify-between bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500 rounded-full blur-[100px] opacity-20 -mr-16 -mt-16" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-emerald-400 mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="text-sm font-mono tracking-wide uppercase">
                DailyDeck Security
              </span>
            </div>
            <h2 className="text-4xl font-bold leading-tight">
              Secure your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 to-blue-500">
                workspace.
              </span>
            </h2>
          </div>
          <div className="relative z-10 bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10 flex items-center gap-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <p className="font-medium">Encrypted Reset</p>
              <p className="text-sm text-slate-400">
                Your security is our priority.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Reset Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
          {!isSuccess ? (
            <>
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  Create new password
                </h2>
                <p className="text-slate-500">
                  Please choose a strong password you haven't used before.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none"
                    placeholder="••••••••"
                    onChange={(e) =>
                      setForm({ ...form, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Updating..." : "Update Password"}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">
                All set!
              </h2>
              <p className="text-slate-500 mb-8">
                Your password has been successfully updated.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 bg-slate-900 text-white rounded-xl font-medium hover:bg-black transition-all"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
