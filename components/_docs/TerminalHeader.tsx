/** Dark header bar with 3 decorative dots, used above terminal/code preview panels. */
export default function TerminalHeader() {
  const dot = { width: 11, height: 11, backgroundColor: 'rgba(255,255,255,0.18)' };
  return (
    <div className="bg-[#0a2540] px-5 py-3 h-10 flex items-center gap-1.5">
      <span className="rounded-full" style={dot} />
      <span className="rounded-full" style={dot} />
      <span className="rounded-full" style={dot} />
    </div>
  );
}
