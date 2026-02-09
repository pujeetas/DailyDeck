import { AVATAR_OPTIONS } from "@/constants/avatarOptions";
import axios from "axios";
import { Bell, Briefcase, Check, Mail, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import Git from "./components/Git";
import { message } from "antd";
import Header from "../Header";

const mono = { fontFamily: "'JetBrains Mono', monospace" };
const serif = { fontFamily: "'Newsreader', Georgia, serif" };

export default function ProfileSettings() {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [browserNotifications, setBrowserNotifications] = useState(false);

  const [userDetails, setUserDetails] = useState({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    firstName: "",
    username: "",
    jobTitle: "",
    bio: "",
    email: "",
    gitHub: null,
  });

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/user/getUserDetails");
      setUserDetails(data);
      setFormData({
        firstName: data.firstName || "",
        username: data.userName || "",
        jobTitle: data.jobTitle || "",
        bio: data.bio || "",
        email: data.email || "",
        gitHub: data.gitHub || null,
      });
      setEmailNotifications(Boolean(data.emailNotification));
      setBrowserNotifications(Boolean(data.browserNotification));
      if (data.avatarId) {
        const avatar = AVATAR_OPTIONS.find((a) => a.id === data.avatarId);
        if (avatar) setSelectedAvatar(avatar);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveChanges = async () => {
    try {
      setSaving(true);
      await axios.patch("/api/user/updateProfile", {
        firstName: formData.firstName,
        userName: formData.username,
        jobTitle: formData.jobTitle,
        bio: formData.bio,
        emailNotification: emailNotifications,
        browserNotification: browserNotifications,
        avatarId: selectedAvatar.id,
        gitHub: formData.gitHub,
      });
      message.success("Profile updated");
      getUserDetails();
    } catch {
      message.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a08] flex items-center justify-center">
        <span className="text-[12px] text-zinc-700" style={mono}>
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a08] text-zinc-200 relative">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Header color="bg-transparent" border="border-0" margin="mb-2" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 pb-16">
        {/* Page header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber-600/50" />
            <span
              className="text-[11px] text-amber-600/80 tracking-[0.25em] uppercase"
              style={mono}
            >
              Settings
            </span>
          </div>
          <h1
            className="text-3xl font-bold text-zinc-100 tracking-[-0.02em]"
            style={serif}
          >
            Profile
          </h1>
          <p className="text-[14px] text-zinc-400 mt-1" style={serif}>
            Manage your personal information and preferences.
          </p>
        </div>

        {/* Main card */}
        <div className="border border-zinc-800/60 bg-[#0c0c0a] divide-y divide-zinc-800/50">
          {/* Section: Avatar + Personal Info */}
          <section className="p-6 md:p-8 space-y-6">
            <SectionLabel num="01" label="Personal Information" />

            {/* Avatar */}
            <div className="flex items-center gap-5">
              <div
                className={`w-16 h-16 bg-linear-to-br ${selectedAvatar.gradient}
                  flex items-center justify-center text-3xl cursor-pointer border border-zinc-800/60
                  hover:border-amber-500/30 transition-colors`}
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              >
                {selectedAvatar.emoji}
              </div>
              <div>
                <p className="text-[13px] text-zinc-300" style={mono}>
                  {formData.firstName || "Your Name"}
                </p>
                <p className="text-[11px] text-zinc-500" style={mono}>
                  Click avatar to change
                </p>
              </div>
            </div>

            {/* Avatar picker */}
            {showAvatarPicker && (
              <div className="bg-[#0a0a08] border border-zinc-800/60 p-4">
                <div className="grid grid-cols-8 gap-2">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatarPicker(false);
                      }}
                      className={`relative w-10 h-10 bg-linear-to-br ${
                        avatar.gradient
                      } flex items-center justify-center text-xl cursor-pointer transition-all ${
                        selectedAvatar.id === avatar.id
                          ? "ring-1 ring-amber-500"
                          : "hover:ring-1 hover:ring-zinc-600"
                      }`}
                    >
                      {avatar.emoji}
                      {selectedAvatar.id === avatar.id && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-[#0a0a08]" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                icon={<User className="w-3.5 h-3.5" />}
                label="Full Name"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <Input
                icon={<User className="w-3.5 h-3.5" />}
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <Input
                icon={<Mail className="w-3.5 h-3.5" />}
                label="Email"
                value={formData.email}
                readOnly
              />
              <Input
                icon={<Briefcase className="w-3.5 h-3.5" />}
                label="Job Title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>

            <div className="space-y-1.5">
              <label
                className="text-[10px] text-zinc-600 uppercase tracking-[0.15em]"
                style={mono}
              >
                Bio
              </label>
              <textarea
                className="w-full bg-[#0e0e0c] border border-zinc-800 px-4 py-3 text-[14px] text-white outline-none placeholder:text-zinc-600 focus:border-amber-500/50 transition-colors resize-none"
                rows={3}
                value={formData.bio}
                placeholder="Tell us about yourself..."
                onChange={(e) => handleInputChange("bio", e.target.value)}
                style={mono}
              />
            </div>
          </section>

          {/* Section: Notifications */}
          <section className="p-6 md:p-8 space-y-4">
            <SectionLabel num="02" label="Notifications" />
            <Toggle
              label="Email Notifications"
              checked={emailNotifications}
              onChange={setEmailNotifications}
            />
            <Toggle
              label="Browser Notifications"
              checked={browserNotifications}
              onChange={setBrowserNotifications}
            />
          </section>

          {/* Section: GitHub */}
          <section className="p-6 md:p-8">
            <SectionLabel num="03" label="GitHub Integration" />
            <div className="mt-4">
              <Git formData={formData} setFormData={setFormData} />
            </div>
          </section>

          {/* Section: Account Activity */}
          <section className="p-6 md:p-8 space-y-2">
            <SectionLabel num="04" label="Account" />
            <div className="flex flex-wrap gap-x-8 gap-y-1 mt-3">
              <span className="text-[11px] text-zinc-700" style={mono}>
                Created:{" "}
                <span className="text-zinc-500">
                  {new Date(userDetails.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </span>
              <span className="text-[11px] text-zinc-700" style={mono}>
                Updated:{" "}
                <span className="text-zinc-500">
                  {new Date(userDetails.updatedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </span>
            </div>
          </section>

          {/* Save bar */}
          <div className="p-6 md:p-8 flex justify-end">
            <button
              onClick={handleSaveChanges}
              disabled={saving}
              className="flex items-center gap-2.5 px-6 py-3 bg-amber-500 text-[#0a0a08] text-[12px] font-bold tracking-wide hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={mono}
            >
              <Save className="w-3.5 h-3.5" />
              {saving ? "SAVING..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Reusable sub-components ── */

function SectionLabel({ num, label }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[10px] text-zinc-700 tracking-wider"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {num}
      </span>
      <span
        className="text-[13px] font-medium text-zinc-300"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
    </div>
  );
}

function Input({ label, icon, readOnly = false, ...props }) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-[10px] text-zinc-400 uppercase tracking-[0.15em]"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </label>
      <div
        className={`flex items-center gap-3 bg-[#0e0e0c] border border-zinc-800 px-4 py-3 transition-colors ${
          readOnly
            ? "opacity-60 cursor-not-allowed"
            : "focus-within:border-amber-500/50"
        }`}
      >
        <span className="text-zinc-600">{icon}</span>
        <input
          className="w-full bg-transparent outline-none text-[14px] text-white placeholder:text-zinc-600"
          readOnly={readOnly}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          {...props}
        />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-4 bg-[#0e0e0c] border border-zinc-800">
      <span
        className="text-[13px] text-zinc-400"
        style={{ fontFamily: "'JetBrains Mono', monospace" }}
      >
        {label}
      </span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-5 flex items-center px-0.5 transition-colors ${
          checked ? "bg-amber-500" : "bg-zinc-800"
        }`}
      >
        <span
          className={`block w-4 h-4 bg-white transition-transform ${
            checked ? "translate-x-[18px]" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
