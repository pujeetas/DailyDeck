export default function FormInput({
  label,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 rounded-lg bg-[#0E0E10] border border-white/10
        text-zinc-100 placeholder-zinc-500 outline-none text-sm
        focus:border-neutral-500 focus:ring-1 focus:ring-neutral-500/40"
      />
    </div>
  );
}
