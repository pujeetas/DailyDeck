import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        // Server responded but with an error code
        alert(error.response.data.message || "Something went wrong.");
      } else if (error.request) {
        // Server didn't respond at all
        alert("No response from server. Check your backend.");
      } else {
        // Something else happened (network, Axios config, etc.)
        alert("Request failed: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-whitepx-4 py-10">
      <div className="bg-white w-full max-w-5xl rounded-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
        {/* Left Illustration */}
        <div className="hidden md:flex items-center justify-center bg-white p-8">
          <img
            src="https://web-app-images-cdn-store.s3.ap-southeast-2.amazonaws.com/loginIllustration.png"
            alt="Login Illustration"
            className="w-full max-w-sm object-contain"
          />
        </div>

        {/* Right Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back
          </h2>

          <p className="text-slate-600 mb-8">
            Log in to your DailyDeck workspace
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-slate-900 focus:outline-none"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 text-white rounded-lg font-medium hover:bg-black transition"
            >
              Log In
            </button>
          </form>

          <div className="text-center mt-6">
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-slate-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <div className="text-center mt-3 text-sm text-slate-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-slate-900 font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
