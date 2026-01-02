import React, { useEffect, useState } from "react";
import { Github } from "lucide-react";

const Git = ({ formData, setFormData }) => {
  const [gitUsername, setGitUsername] = useState("");
  const [loadingGitHub, setLoadingGitHub] = useState(false);
  const [githubError, setGithubError] = useState("");
  const [githubData, setGithubData] = useState(null);

  useEffect(() => {
    if (formData?.gitHub) {
      setGithubData({
        login: formData.gitHub.username,
        avatar_url: formData.gitHub.avatarUrl,
        html_url: formData.gitHub.profileUrl,
        bio: formData.gitHub.bio,
        public_repos: formData.gitHub.publicRepos,
        followers: formData.gitHub.followers,
        following: formData.gitHub.following,
        public_gists: formData.gitHub.publicGists,
      });
      setGitUsername(formData.gitHub.username || "");
    }
  }, [formData?.gitHub]);

  const handleGitIntegration = async () => {
    if (!gitUsername.trim()) {
      setGithubError("Please enter a GitHub username");
      return;
    }

    setLoadingGitHub(true);
    setGithubError("");
    setGithubData(null);

    try {
      const response = await fetch(
        `https://api.github.com/users/${gitUsername}`
      );

      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setGithubData(data);

      setFormData((prev) => ({
        ...prev,
        gitHub: {
          username: data.login,
          avatarUrl: data.avatar_url,
          profileUrl: data.html_url,
          bio: data.bio || "",
          publicRepos: data.public_repos,
          followers: data.followers,
          following: data.following,
          publicGists: data.public_gists,
        },
      }));
    } catch {
      setGithubError("GitHub user not found. Please check the username.");
      setGithubData(null);
    } finally {
      setLoadingGitHub(false);
    }
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-medium flex items-center gap-2">
        <Github className="w-5 h-5" />
        Developer Tools
      </h2>

      <div className="bg-[#0E0E11] border border-white/10 rounded-lg overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5" />
            <span className="text-sm font-medium">GitHub Integration</span>
            <span
              className={`text-xs px-2 py-0.5 rounded-full ${
                githubData
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-700/50 text-zinc-400"
              }`}
            >
              {githubData ? "Connected" : "Not Connected"}
            </span>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div className="flex gap-2">
            <input
              className="flex-1 bg-[#0B0B0E] border border-white/10 rounded-lg px-3 py-2 text-sm"
              placeholder="octocat"
              value={gitUsername}
              onChange={(e) => setGitUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleGitIntegration()}
            />
            <button
              onClick={handleGitIntegration}
              disabled={!gitUsername.trim() || loadingGitHub}
              className="px-4 py-2 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-sm disabled:opacity-50"
            >
              {loadingGitHub ? "Loading..." : "Fetch"}
            </button>
          </div>

          {githubError && <p className="text-xs text-red-400">{githubError}</p>}

          {githubData && (
            <div className="flex items-start gap-4 p-3 bg-[#0B0B0E] border border-white/10 rounded-lg">
              <img
                src={githubData.avatar_url}
                alt={githubData.login}
                className="w-16 h-16 rounded-full border-2 border-purple-500/30"
              />

              <div className="flex-1">
                <h3 className="text-sm font-medium">
                  {githubData.name || githubData.login}
                </h3>
                <p className="text-xs text-zinc-400">@{githubData.login}</p>

                {githubData.bio && (
                  <p className="text-xs text-zinc-300 mt-2">{githubData.bio}</p>
                )}

                <div className="flex gap-4 mt-2 text-xs text-zinc-400">
                  <span>{githubData.public_repos} repos</span>
                  <span>{githubData.followers} followers</span>
                  <span>{githubData.following} following</span>
                </div>
              </div>

              <a
                href={githubData.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300"
              >
                View Profile
              </a>
            </div>
          )}
          {!githubData && !githubError && !loadingGitHub && (
            <div className="flex flex-col items-center justify-center gap-3 p-6 bg-[#0B0B0E] border border-white/10 rounded-lg text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Github className="w-6 h-6 text-purple-400" />
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-200">
                  GitHub not connected
                </p>
                <p className="text-xs text-zinc-400 mt-1 max-w-xs">
                  Enter your GitHub username above to connect your profile and
                  show repositories, followers, and public activity.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-zinc-500 mt-2">
                <span className="w-2 h-2 rounded-full bg-zinc-500" />
                Public data only · No login required
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Git;
