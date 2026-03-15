export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-cyan-500/30 gap-8">
      <h1 className="text-5xl font-bold text-white tracking-tight">EduTrack</h1>
      {children}
    </div>
  );
}
