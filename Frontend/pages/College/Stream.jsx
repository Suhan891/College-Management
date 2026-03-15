"use client"
import { Layers, Plus, X } from "lucide-react";
import { useState } from "react";

export default function Stream() {
    const [showStreamForm, setShowStreamForm] = useState(false);
      const mockStreams = [
    { code: 'CS', name: 'Computer Science & Engineering', course: 'BTECH-CS' },
    { code: 'IT', name: 'Information Technology', course: 'BTECH-CS' },
    { code: 'FIN', name: 'Finance', course: 'BBA' },
    { code: 'PHY', name: 'Quantum Physics', course: 'BSC-PHY' },
  ];
      const mockCourses = [
    { code: 'BTECH-CS', name: 'Computer Science', duration: 4, semesters: 8, dept: 'Engineering' },
    { code: 'BBA', name: 'Business Administration', duration: 3, semesters: 6, dept: 'Management' },
    { code: 'BCA', name: 'Computer Applications', duration: 3, semesters: 6, dept: 'IT' },
    { code: 'BSC-PHY', name: 'Applied Physics', duration: 3, semesters: 6, dept: 'Science' },
    ];
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row: Stream Count & Create Button */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-purple-500/10 p-3.5 rounded-xl border border-purple-500/20">
                    <Layers className="h-7 w-7 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Streams</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">24</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setShowStreamForm(!showStreamForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showStreamForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {showStreamForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showStreamForm ? 'Cancel Creation' : 'Create Stream'}
                </button>
              </div>

              {/* The Form (Conditionally Rendered) */}
              {showStreamForm && (
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Layers className="h-5 w-5 text-purple-400" /> Stream Configuration
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Stream Name</label>
                      <input type="text" placeholder="e.g., Computer Science" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Stream Code</label>
                      <input type="text" placeholder="e.g., CS" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Select Course</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none">
                        <option value="" disabled>Select a course...</option>
                        {mockCourses.map((c, i) => (
                          <option key={i} value={c.code}>{c.code} - {c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex justify-end mt-2">
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                        Save Stream
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing Stream Cards */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-slate-400" /> Existing Streams
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockStreams.map((stream, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-purple-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-purple-500/10 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-purple-400 border border-purple-500/20">
                          {stream.code}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                          {stream.course}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">{stream.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </div>
    )
}