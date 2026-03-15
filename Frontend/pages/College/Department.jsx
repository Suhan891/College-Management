"use client"
import { Building2, Plus, User, X } from "lucide-react";
import { useState } from "react";

 export default function Department() {

    const [showDepartmentForm, setShowDepartmentForm] = useState(false);
          const mockStreams = [
    { code: 'CS', name: 'Computer Science & Engineering', course: 'BTECH-CS' },
    { code: 'IT', name: 'Information Technology', course: 'BTECH-CS' },
    { code: 'FIN', name: 'Finance', course: 'BBA' },
    { code: 'PHY', name: 'Quantum Physics', course: 'BSC-PHY' },
  ];
  const mockDepartments = [
    { name: 'Computer Science & Engineering', code: 'CSE', stream: 'CS' },
    { name: 'Business Management', code: 'MGT', stream: 'FIN' },
    { name: 'Information Technology', code: 'IT', stream: 'IT' },
    { name: 'Applied Sciences', code: 'SCI', stream: 'PHY' },
  ];

    return (
         <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/20">
                    <Building2 className="h-7 w-7 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Departments</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">12</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setShowDepartmentForm(!showDepartmentForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showDepartmentForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-cyan-600 text-white hover:bg-cyan-700'
                  }`}
                >
                  {showDepartmentForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showDepartmentForm ? 'Cancel Creation' : 'Create Department'}
                </button>
              </div>

              {/* Form */}
              {showDepartmentForm && (
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-cyan-400" /> Department Setup
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Department Name</label>
                      <input type="text" placeholder="e.g., Computer Science" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Department Code</label>
                      <input type="text" placeholder="e.g., CSE" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Assign Stream</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none">
                        <option value="" disabled>Select Stream...</option>
                        {mockStreams.map((s, i) => (
                          <option key={i} value={s.code}>{s.name} ({s.code})</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-3 flex justify-end mt-2">
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                        Save Department
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing Departments */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-slate-400" /> Existing Departments
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {mockDepartments.map((dept, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-cyan-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-6">
                        <div className="bg-cyan-500/10 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide text-cyan-400 border border-cyan-500/20">
                          {dept.code}
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                          Stream: {dept.stream}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-2 line-clamp-2">{dept.name}</h4>
                    </div>
                  ))}
                </div>
              </div>

            </div>
    )
 }