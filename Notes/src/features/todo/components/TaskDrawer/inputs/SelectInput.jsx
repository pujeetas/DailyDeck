export default function SelectInput({ label, value, onChange, options }) {
  return (
    <div>
      <label className="text-[11px] font-medium text-zinc-400 uppercase tracking-[0.14em] mb-1.5 block">
        {label}
      </label>

      <select
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2.5 rounded-lg bg-[#0E0E10] border border-white/10 
          text-zinc-100 outline-none text-sm focus:border-neutral-500"
      >
        {options.map(([val, text]) => (
          <option key={val} value={val}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}
