import { GithubOutlined } from "@ant-design/icons";
import axios from "axios";
import {
  ArrowRight,
  Chrome,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (e) =>
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.firstName.trim().length > 4)
      e.firstName = "First name is required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required";
    if (form.password.length < 6) e.password = "Password must be ≥ 6 chars";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:3000/signup", form, {
        withCredentials: true,
      });
      console.log(response.data);
      navigate("/main");
    } catch (error) {
      setErrors(error.response.data.message);
    }
    console.log("submit", form);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl  overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left: Form */}
        <div className="p-10">
          <header className="flex items-center gap mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 font-sans">
                DailyDeck
              </h1>
              <p className="text-xs text-slate-500">
                Your daily workflow, simplified.
              </p>
            </div>
          </header>

          <h2 className="text-2xl font-semibold text-slate-900 mb-1">
            Create an account
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Unlock your streamlined workflow.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 border border-slate-200 rounded-md py-2 text-sm hover:bg-slate-100"
            >
              <Chrome size={16} className="text-slate-600" />
              Google
            </button>
            <button
              type="button"
              className="cursor-pointer flex items-center justify-center gap-2 border border-slate-200 rounded-md py-2 text-sm hover:bg-slate-100"
            >
              <GithubOutlined size={16} className="text-slate-700" />
              GitHub
            </button>
          </div>

          <div className="flex items-center text-xs text-slate-400 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="px-3">or continue with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <label className="block">
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="firstName"
                    value={form.firstName}
                    onChange={onChange}
                    placeholder="First name"
                    className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                      errors.firstName ? "border-rose-500" : "border-slate-200"
                    } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200`}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-1 text-rose-600 text-xs">
                    {errors.firstName}
                  </p>
                )}
              </label>

              {/* Last Name */}
              <label className="block">
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    name="lastName"
                    value={form.lastName}
                    onChange={onChange}
                    placeholder="Last name"
                    className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                      errors.lastName ? "border-rose-500" : "border-slate-200"
                    } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200`}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-1 text-rose-600 text-xs">
                    {errors.lastName}
                  </p>
                )}
              </label>
            </div>

            <label className="block">
              <span className="sr-only">Email</span>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  placeholder="Email address"
                  inputMode="email"
                  className={`w-full pl-10 pr-4 py-3 rounded-md border ${
                    errors.email ? "border-rose-500" : "border-slate-200"
                  } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-rose-600 text-xs">{errors.email}</p>
              )}
            </label>

            <label className="block">
              <span className="sr-only">Password</span>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  name="password"
                  value={form.password}
                  onChange={onChange}
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-3 rounded-md border ${
                    errors.password ? "border-rose-500" : "border-slate-200"
                  } bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-rose-600 text-xs">{errors.password}</p>
              )}
            </label>

            <div>
              <button
                type="submit"
                className="cursor-pointer w-full flex items-center justify-center gap-2 py-3 rounded-md bg-slate-800 text-white font-medium hover:bg-slate-900 transition"
              >
                Create account
                <ArrowRight size={16} />
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <a
              href="#"
              className="cursor-pointer text-slate-700 font-medium hover:underline"
              onClick={() => navigate("/login")}
            >
              Log in
            </a>
          </p>
        </div>

        <aside className="relative hidden md:block">
          <img
            src="/rightIllustration.png"
            alt="Workspace"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </aside>
      </div>
    </div>
  );
};

export default SignupPage;
