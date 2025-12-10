export default function FormInputGit({
  label,
  value,
  onChange,
  handleImport,
  placeholder = "",
  loading,
}) {
  const validateGitUrl = (url) => {
    if (!url || typeof url !== "string") return false;
    const pattern = new RegExp(
      "^https?://github\\.com/([^/]+)/([^/]+)/issues/(\\d+)$"
    );
    return pattern.test(url);
  };
  const isValid = validateGitUrl(value);
  return (
    <div>
      {/* Label */}
      <div className="flex justify-between items-end mb-1.5">
        <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] block">
          {label}
        </label>

        <button
          type="button"
          onClick={() => handleImport(value)}
          disabled={loading || !isValid}
          className={`
            text-[10px] font-semibold px-2 py-0.5 rounded transition-all uppercase tracking-wider
            ${
              loading || !isValid
                ? "text-zinc-600 cursor-not-allowed"
                : "text-indigo-400 hover:text-indigo-300 hover:bg-indigo-500/10 cursor-pointer"
            }
          `}
        >
          {loading ? "Loading..." : "Import"}
        </button>
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={loading}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2.5 rounded-lg bg-[#0E0E10] border border-white/10
          text-zinc-100 placeholder-zinc-500 outline-none text-sm transition-all
          focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500/40
          ${loading ? "opacity-50 cursor-wait" : ""}
        `}
      />
    </div>
  );
}
