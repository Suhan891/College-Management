"use client"
import { BookOpen, Plus, User, Users, X } from "lucide-react"
import { useState } from "react";
export default function Class() {
    const [showClassForm, setShowClassForm] = useState(false);
  const mockClasses = [
    { name: 'CS-A', year: '2026-2027', teacher: 'Dr. Alan Turing', stream: 'CS' },
    { name: 'PHY-101', year: '2026-2027', teacher: 'Marie Curie', stream: 'PHY' },
  ];
     const mockTeachers = [
    { id: 'T001', name: 'Dr. Alan Turing', email: 'alan@edutrack.edu', batch: 'B2024', dept: 'CSE' },
    { id: 'T002', name: 'Marie Curie', email: 'marie@edutrack.edu', batch: 'B2023', dept: 'SCI' },
  ];
        const mockStreams = [
    { code: 'CS', name: 'Computer Science & Engineering', course: 'BTECH-CS' },
    { code: 'IT', name: 'Information Technology', course: 'BTECH-CS' },
    { code: 'FIN', name: 'Finance', course: 'BBA' },
    { code: 'PHY', name: 'Quantum Physics', course: 'BSC-PHY' },
  ];
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-orange-500/10 p-3.5 rounded-xl border border-orange-500/20">
                    <Users className="h-7 w-7 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Classes</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">48</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setShowClassForm(!showClassForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showClassForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {showClassForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showClassForm ? 'Cancel Creation' : 'Create Class'}
                </button>
              </div>

              {/* Form */}
              {showClassForm && (
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-400" /> Class Setup
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Class Name</label>
                      <input type="text" placeholder="e.g., CS Section A" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Academic Year</label>
                      <input type="text" placeholder="e.g., 2026-2027" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Class Teacher</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option value="" disabled>Select Teacher...</option>
                        {mockTeachers.map((t, i) => (
                          <option key={i} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Stream</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option value="" disabled>Select Stream...</option>
                        {mockStreams.map((s, i) => (
                          <option key={i} value={s.code}>{s.name} ({s.code})</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 flex justify-end mt-2">
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                        Save Class
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-slate-400" /> Active Classes
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockClasses.map((cls, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-orange-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-orange-500/10 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-orange-400 border border-orange-500/20">
                          {cls.year}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                          Stream: {cls.stream}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-white mb-2">{cls.name}</h4>
                      
                      <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm text-slate-400">
                        <span className="flex items-center gap-1.5 font-medium">
                          <User className="h-4 w-4 text-slate-500" /> {cls.teacher}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
    )
}