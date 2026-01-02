import { AVATAR_OPTIONS } from "@/constants/avatarOptions";
import useUserStore from "@/hooks/useUserStore";
import {
  User,
  Mail,
  Lock,
  Save,
  Globe,
  Clock,
  Bell,
  Github,
  Trash2,
  Download,
  Shield,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function ProfileSettings() {
  const [selectedAvatar, setSelectedAvatar] = useState(AVATAR_OPTIONS[0]);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [browserNotifications, setBrowserNotifications] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeFormat, setTimeFormat] = useState("12h");

  const { user } = useUserStore();

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-200 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Profile Settings
          </h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your personal information and security preferences
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 space-y-6 shadow-lg">
          {/* Profile Picture & Personal Info */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Personal Information</h2>

            {/* Avatar Selector */}
            <div className="flex items-center gap-6">
              <div className="relative">
                {/* Current Avatar Display */}
                <div
                  className={`w-24 h-24 rounded-full bg-linear-to-br ${selectedAvatar.gradient} flex items-center justify-center text-4xl cursor-pointer hover:scale-105 transition-transform`}
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                >
                  {selectedAvatar.emoji}
                </div>
                {/* Edit Badge */}
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center cursor-pointer border border-white/20 transition">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Profile Avatar</p>
                <p className="text-xs text-zinc-400">
                  Click to choose from fun avatars
                </p>
              </div>
            </div>

            {/* Avatar Picker Modal */}
            {showAvatarPicker && (
              <div className="bg-[#0E0E11] border border-white/10 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium">Choose Your Avatar</p>
                  <button
                    onClick={() => setShowAvatarPicker(false)}
                    className="text-xs text-zinc-400 hover:text-zinc-200"
                  >
                    Close
                  </button>
                </div>
                <div className="grid grid-cols-8 gap-3">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatarPicker(false);
                      }}
                      className={`relative w-12 h-12 rounded-full bg-linear-to-br ${
                        avatar.gradient
                      } flex items-center justify-center text-2xl cursor-pointer hover:scale-110 transition-transform ${
                        selectedAvatar.id === avatar.id
                          ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-[#0E0E11]"
                          : ""
                      }`}
                      title={avatar.name}
                    >
                      {avatar.emoji}
                      {selectedAvatar.id === avatar.id && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                icon={<User className="w-4 h-4" />}
                label="Full Name"
                value={user.firstName}
              />
              <Input
                icon={<User className="w-4 h-4" />}
                label="Username"
                value={user.lastName}
              />
              <Input
                icon={<Mail className="w-4 h-4" />}
                label="Email Address"
                value={user.email}
                disabled
              />
              <Input
                icon={<User className="w-4 h-4" />}
                label="Phone Number"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs text-zinc-400">Bio</label>
              <textarea
                className="w-full bg-[#0E0E11] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none placeholder-zinc-500 focus:border-white/20 transition resize-none"
                rows={3}
                placeholder="Tell us about yourself..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                icon={<Globe className="w-4 h-4" />}
                label="Location"
                options={[
                  "Singapore",
                  "United States",
                  "United Kingdom",
                  "India",
                  "Canada",
                ]}
              />
              <Select
                icon={<Clock className="w-4 h-4" />}
                label="Timezone"
                options={[
                  "Asia/Singapore (GMT+8)",
                  "America/New_York (GMT-5)",
                  "Europe/London (GMT+0)",
                ]}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Preferences */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Preferences</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RadioGroup
                label="Theme"
                options={[
                  { value: "dark", label: "Dark" },
                  { value: "light", label: "Light" },
                  { value: "auto", label: "Auto" },
                ]}
                value={theme}
                onChange={setTheme}
              />
              <RadioGroup
                label="Date Format"
                options={[
                  { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                  { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                  { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                ]}
                value={dateFormat}
                onChange={setDateFormat}
              />
              <RadioGroup
                label="Time Format"
                options={[
                  { value: "12h", label: "12-hour" },
                  { value: "24h", label: "24-hour" },
                ]}
                value={timeFormat}
                onChange={setTimeFormat}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Notifications */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </h2>

            <div className="space-y-3">
              <Toggle
                label="Email Notifications"
                description="Receive email updates about your tasks and activity"
                checked={emailNotifications}
                onChange={setEmailNotifications}
              />
              <Toggle
                label="Browser Notifications"
                description="Get push notifications in your browser"
                checked={browserNotifications}
                onChange={setBrowserNotifications}
              />
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Security */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security
            </h2>

            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm">
              <Lock className="w-4 h-4" />
              Change Password via Email
            </button>

            <div className="text-xs text-zinc-400">
              Last password changed: December 15, 2024
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Connected Accounts */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Connected Accounts</h2>

            <div className="flex items-center justify-between p-4 bg-[#0E0E11] border border-white/10 rounded-lg">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5" />
                <div>
                  <p className="text-sm font-medium">GitHub</p>
                  <p className="text-xs text-zinc-400">Not connected</p>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-xs">
                Connect
              </button>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Data & Privacy */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Data & Privacy</h2>

            <div className="space-y-3">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition text-sm w-full justify-center">
                <Download className="w-4 h-4" />
                Export All Data
              </button>

              <div className="text-xs text-zinc-400 space-y-1">
                <p>Account created: January 1, 2024</p>
                <p>Last updated: January 2, 2026</p>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition text-sm text-red-400 w-full justify-center">
                <Trash2 className="w-4 h-4" />
                Delete Account
              </button>
            </div>
          </section>

          {/* Actions */}
          <div className="flex justify-end pt-4">
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium">
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
function Input({ label, icon, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="flex items-center gap-2 bg-[#0E0E11] border border-white/10 rounded-lg px-3 py-2 focus-within:border-white/20 transition">
        <span className="text-zinc-500">{icon}</span>
        <input
          className="w-full bg-transparent outline-none text-sm placeholder-zinc-500"
          {...props}
        />
      </div>
    </div>
  );
}

function Select({ label, icon, options }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="flex items-center gap-2 bg-[#0E0E11] border border-white/10 rounded-lg px-3 py-2 focus-within:border-white/20 transition">
        <span className="text-zinc-500">{icon}</span>
        <select className="w-full bg-transparent outline-none text-sm">
          {options.map((option) => (
            <option key={option} value={option} className="bg-[#111113]">
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

function RadioGroup({ label, options, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="w-4 h-4 accent-purple-500"
            />
            <span className="text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Toggle({ label, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0E0E11] border border-white/10 rounded-lg">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && (
          <p className="text-xs text-zinc-400 mt-0.5">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition ${
          checked ? "bg-purple-500" : "bg-white/10"
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}
