import { AVATAR_OPTIONS } from "@/constants/avatarOptions";
import axios from "axios";
import { Bell, Briefcase, Check, Mail, Save, User } from "lucide-react";
import { useEffect, useState } from "react";
import Git from "./components/Git";
import { message } from "antd";

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
      message.success("ProfileUpdated");
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
    return <div className="text-zinc-400">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-200 px-6 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Manage your personal information and security preferences
          </p>
        </div>

        <div className="bg-[#111113] border border-white/10 rounded-2xl p-6 space-y-6">
          {/* Personal Information */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium">Personal Information</h2>

            <div className="flex items-center gap-6">
              <div className="relative">
                <div
                  className={`w-24 h-24 rounded-full bg-linear-to-br ${selectedAvatar.gradient}
                  flex items-center justify-center text-4xl cursor-pointer`}
                  onClick={() => setShowAvatarPicker(!showAvatarPicker)}
                >
                  {selectedAvatar.emoji}
                </div>
              </div>
            </div>

            {showAvatarPicker && (
              <div className="bg-[#0E0E11] border border-white/10 rounded-xl p-4">
                <div className="grid grid-cols-8 gap-3">
                  {AVATAR_OPTIONS.map((avatar) => (
                    <div
                      key={avatar.id}
                      onClick={() => {
                        setSelectedAvatar(avatar);
                        setShowAvatarPicker(false);
                      }}
                      className={`w-12 h-12 rounded-full bg-linear-to-br ${
                        avatar.gradient
                      } flex items-center justify-center text-2xl cursor-pointer ${
                        selectedAvatar.id === avatar.id
                          ? "ring-2 ring-purple-500"
                          : ""
                      }`}
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
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
              />
              <Input
                icon={<User className="w-4 h-4" />}
                label="Username"
                value={formData.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
              />
              <Input
                icon={<Mail className="w-4 h-4" />}
                label="Email Address"
                value={formData.email}
                readOnly
              />
              <Input
                icon={<Briefcase className="w-4 h-4" />}
                label="Job Title"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>

            <textarea
              className="w-full bg-[#0E0E11] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none placeholder-zinc-500 focus:border-white/20 transition resize-none"
              rows={3}
              value={formData.bio}
              placeholder="Tell us about yourself..."
              onChange={(e) => handleInputChange("bio", e.target.value)}
            />
          </section>

          <div className="h-px bg-white/10" />

          {/* Notifications */}
          <section className="space-y-4">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Bell className="w-5 h-5" /> Notifications
            </h2>

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

          <div className="h-px bg-white/10" />

          {/* Account Activity */}
          <section className="space-y-2 text-xs text-zinc-400">
            <p>
              Account created:{" "}
              {new Date(userDetails.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <p>
              Last updated:{" "}
              {new Date(userDetails.updatedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </section>

          <div className="h-px bg-white/10" />

          <Git formData={formData} setFormData={setFormData} />

          <div className="h-px bg-white/10" />

          <div className="flex justify-end">
            <button
              onClick={handleSaveChanges}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, icon, readOnly = false, ...props }) {
  return (
    <div className="space-y-1">
      <label className="text-xs text-zinc-400">{label}</label>
      <div className="flex items-center gap-2 bg-[#0E0E11] border border-white/10 rounded-lg px-3 py-2">
        {icon}
        <input
          className="w-full bg-transparent outline-none text-sm"
          readOnly={readOnly}
          {...props}
        />
      </div>
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex items-center justify-between p-3 bg-[#0E0E11] border border-white/10 rounded-lg">
      <span className="text-sm">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`w-11 h-6 rounded-full ${
          checked ? "bg-purple-500" : "bg-white/10"
        }`}
      >
        <span
          className={`block w-4 h-4 bg-white rounded-full transform transition ${
            checked ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
