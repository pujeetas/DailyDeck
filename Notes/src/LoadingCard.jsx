export default function LoadingCard() {
  return (
    <div className="w-full h-[140px] rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse p-5 flex flex-col justify-between">
      {/* Title line */}
      <div className="w-2/3 h-4 bg-white/5 rounded" />

      {/* Footer lines */}
      <div className="space-y-2">
        <div className="w-full h-[2px] bg-white/5 rounded" />
        <div className="w-1/2 h-[2px] bg-white/5 rounded" />
      </div>
    </div>
  );
}
