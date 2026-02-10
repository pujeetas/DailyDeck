const mono = { fontFamily: "'JetBrains Mono', monospace" };

export default function FormInput({
  label,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label
        className="text-[10px] text-zinc-600 uppercase tracking-[0.15em] mb-1.5 block"
        style={mono}
      >
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 bg-[#0e0e0c] border border-zinc-800 text-[13px] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-amber-500/50 transition-colors"
        style={mono}
      />
    </div>
  );
}
