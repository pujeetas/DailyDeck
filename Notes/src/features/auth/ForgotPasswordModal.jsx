import React, { useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import axios from "axios";
import { message } from "antd";

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
        { withCredentials: true }
      );

      message.success("Reset link sent if email exists.");
    } catch (error) {
      message.error(
        error.response?.data?.message || "Password Reset failed. Try again."
      );
    }
  }

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60"
        onClick={() => setForgotPassword(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-3xl p-8">
        <h3 className="text-2xl font-bold mb-2">Reset Password</h3>
        <p className="text-slate-500 mb-6">
          Enter your email to receive a reset link.
        </p>

        <form onSubmit={handleForgotPassword} className="space-y-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@company.com"
            className="w-full px-4 py-3 border rounded-xl"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white rounded-xl"
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : (
              "Send Reset Link"
            )}
          </button>

          <button
            type="button"
            onClick={() => setForgotPassword(false)}
            className="w-full text-sm text-slate-500"
          >
            <ArrowLeft className="inline w-4 h-4" /> Back to login
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
