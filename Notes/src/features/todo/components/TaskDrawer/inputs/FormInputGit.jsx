const mono = { fontFamily: "'JetBrains Mono', monospace" };

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
    return /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/issues\/(\d+)$/.test(
      url,
    );
  };
  const isValid = validateGitUrl(value);

  return (
    <div>
      <div className="flex justify-between items-end mb-1.5">
        <label
          className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] block"
          style={mono}
        >
          {label}
        </label>
        <button
          type="button"
          onClick={() => handleImport(value)}
          disabled={loading || !isValid}
          className={`text-[10px] font-bold px-2 py-0.5 tracking-wider uppercase transition-colors ${
            loading || !isValid
              ? "text-zinc-700 cursor-not-allowed"
              : "text-amber-500 hover:text-amber-400 cursor-pointer"
          }`}
          style={mono}
        >
          {loading ? "LOADING..." : "IMPORT"}
        </button>
      </div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        disabled={loading}
        placeholder={placeholder}
        className={`w-full px-3 py-2.5 bg-[#0e0e0c] border border-zinc-800 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500/50 transition-colors ${
          loading ? "opacity-50 cursor-wait" : ""
        }`}
        style={mono}
      />
    </div>
  );
}
