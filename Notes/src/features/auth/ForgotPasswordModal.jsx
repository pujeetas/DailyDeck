import React, { useState } from "react";
import { Loader2, ArrowLeft, Mail } from "lucide-react";
import axios from "axios";
import { message } from "antd";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

const ForgotPasswordModal = ({
  forgotPassword,
  setForgotPassword,
  loading,
}) => {
  if (!forgotPassword) return null;

  const [email, setEmail] = useState("");

  async function handleForgotPassword(e) {
    e.preventDefault();
    if (!email) {
      return message.error("Please enter your email address to continue.");
    }
    try {
      await axios.post(
        "/api/forgotPassword",
        { email },
        { withCredentials: true },
      );
      message.success("Reset link sent if email exists.");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Password Reset failed. Try again.",
      );
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
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
            <div className="w-8 h-[1px] bg-amber-600/50" />
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
                className="w-full pl-10 pr-4 py-3 border border-zinc-800 text-[14px] text-white placeholder:text-zinc-600 bg-[#0e0e0c] outline-none transition-all duration-200 focus:border-amber-500/50 focus:bg-[#111110]"
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
