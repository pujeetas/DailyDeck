import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ArrowRight, CheckCircle2, Mail } from "lucide-react";
import { message } from "antd";
import axios from "axios";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const inputClasses =
  "w-full pl-10 pr-4 py-3 border border-zinc-800 text-[14px] text-white placeholder:text-zinc-600 bg-[#0e0e0c] outline-none transition-all duration-200 focus:border-amber-500/50 focus:bg-[#111110]";

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
        error.response?.data?.message || "Link expired or invalid.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a08]">
        <div className="text-center">
          <h2
            className="text-2xl font-semibold text-red-400 mb-4"
            style={serif}
          >
            Invalid Reset Link
          </h2>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 transition-colors"
            style={mono}
          >
            BACK TO LOGIN
          </button>
        </div>
      </div>
    );
  }

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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-amber-500/[0.025] blur-[150px]" />
      </div>

      <div className="w-full max-w-md border border-zinc-800/60 bg-[#0c0c0a] shadow-2xl relative z-10">
        <div className="p-8 md:p-10">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-[1px] bg-amber-600/50" />
                  <span
                    className="text-[10px] text-amber-600/80 tracking-[0.25em] uppercase"
                    style={mono}
                  >
                    Security
                  </span>
                </div>
                <h2
                  className="text-2xl font-semibold text-zinc-100 tracking-[-0.02em] mb-2"
                  style={serif}
                >
                  Create new password
                </h2>
                <p className="text-[14px] text-zinc-600" style={serif}>
                  Choose a strong password you haven't used before.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div className="space-y-1.5">
                  <label
                    className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className={inputClasses}
                      style={mono}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label
                    className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                    style={mono}
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-600"
                    />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      className={inputClasses}
                      style={mono}
                      onChange={(e) =>
                        setForm({ ...form, confirmPassword: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={mono}
                >
                  {loading ? "UPDATING..." : "UPDATE PASSWORD"}
                  {!loading && <ArrowRight size={15} />}
                </button>
              </form>

              {/* Trust signal */}
              <div
                className="mt-7 pt-6 border-t border-zinc-800/50 flex items-center justify-center gap-2 text-zinc-700 text-[11px]"
                style={mono}
              >
                <Lock className="w-3 h-3" />
                <span>End-to-end encrypted reset</span>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-6">
              <div className="w-16 h-16 border border-emerald-500/30 bg-emerald-500/5 flex items-center justify-center mx-auto mb-6 text-emerald-400">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2
                className="text-2xl font-semibold text-zinc-100 tracking-[-0.02em] mb-2"
                style={serif}
              >
                All set.
              </h2>
              <p className="text-[14px] text-zinc-500 mb-8" style={serif}>
                Your password has been successfully updated.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="w-full py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 transition-colors"
                style={mono}
              >
                BACK TO LOGIN
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
