import { MESSAGES } from "@/config/constants";
import { ENDPOINTS } from "@/config/endpoints";
import { inputClasses, mono, serif } from "@/config/theme";
import { message } from "antd";
import axios from "axios";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { useState } from "react";

const ForgotPasswordModal = ({ forgotPassword, setForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (!forgotPassword) return null;

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!email) {
      return message.error(MESSAGES.EMAIL_REQUIRED);
    }
    setLoading(true);
    try {
      await axios.post(
        ENDPOINTS.FORGOT_PASSWORD,
        { email },
        { withCredentials: true },
      );
      message.success(MESSAGES.RESET_PASSWORD_SUCCESS);
      setForgotPassword(false);
    } catch (error) {
      message.error(
        error.response?.data?.message || MESSAGES.RESET_PASSWORD_ERROR,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0a08]/80 backdrop-blur-sm"
        onClick={() => setForgotPassword(false)}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md border border-zinc-800/60 bg-[#0c0c0a] shadow-2xl p-8">
        {/* Header */}
        <div className="mb-7">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-amber-600/50" />
            <span
              className="text-[10px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              Account Recovery
            </span>
          </div>
          <h3
            className="text-xl font-semibold text-zinc-100 tracking-[-0.02em] mb-2"
            style={serif}
          >
            Reset your password
          </h3>
          <p className="text-[14px] text-zinc-600" style={serif}>
            Enter your email to receive a reset link.
          </p>
        </div>

        <form onSubmit={handleForgotPassword} className="space-y-4">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className={inputClasses}
                style={mono}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-amber-500 text-[#0a0a08] text-[13px] font-bold tracking-wide hover:bg-amber-400 active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={mono}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              "SEND RESET LINK"
            )}
          </button>

          <button
            type="button"
            onClick={() => setForgotPassword(false)}
            className="w-full flex items-center justify-center gap-2 py-2 text-[12px] text-zinc-600 hover:text-zinc-400 transition-colors"
            style={mono}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
