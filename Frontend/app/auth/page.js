import { Building, UserPlus, LogIn, Rocket } from 'lucide-react';
import Link from 'next/link';

export default function GetStartedPage() {
  return (
    //<div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-cyan-500/10 p-3 rounded-2xl border border-cyan-500/20 mb-4">
            <Rocket className="h-8 w-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Get Started</h2>
          <p className="text-slate-400 text-sm mt-2 text-center">Choose how you want to join EduTrack</p>
        </div>

        <div className="space-y-4">
          <Link href="/auth/register-college" className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="bg-slate-900 p-2 rounded-lg group-hover:text-cyan-400 text-slate-400 transition-colors">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Register College</h3>
              <p className="text-xs text-slate-500 mt-0.5">Setup a new institution workspace</p>
            </div>
          </Link>

          <a href="/auth/register-role" className="flex items-center gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-all group">
            <div className="bg-slate-900 p-2 rounded-lg group-hover:text-cyan-400 text-slate-400 transition-colors">
              <UserPlus className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Register Role</h3>
              <p className="text-xs text-slate-500 mt-0.5">Join as Staff, Teacher, or Student</p>
            </div>
          </a>

          <div className="pt-4 border-t border-slate-800">
            <Link href="/auth/login" className="flex items-center gap-4 p-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 transition-all group shadow-lg shadow-cyan-500/20">
              <div className="bg-cyan-700/50 p-2 rounded-lg text-white">
                <LogIn className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-white font-bold">Login to Account</h3>
                <p className="text-xs text-cyan-100 mt-0.5">Access your existing dashboard</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    //</div>
  );
}