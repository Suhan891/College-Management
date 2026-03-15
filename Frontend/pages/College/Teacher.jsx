"use client"

import { Plus, User, Users, X } from "lucide-react"
import { useState } from "react";

export default function Teacher() {

    const [showTeacherForm, setShowTeacherForm] = useState(false)
      const mockDepartments = [
    { name: 'Computer Science & Engineering', code: 'CSE', stream: 'CS' },
    { name: 'Business Management', code: 'MGT', stream: 'FIN' },
    { name: 'Information Technology', code: 'IT', stream: 'IT' },
    { name: 'Applied Sciences', code: 'SCI', stream: 'PHY' },
  ];
   const mockTeachers = [
    { id: 'T001', name: 'Dr. Alan Turing', email: 'alan@edutrack.edu', batch: 'B2024', dept: 'CSE' },
    { id: 'T002', name: 'Marie Curie', email: 'marie@edutrack.edu', batch: 'B2023', dept: 'SCI' },
  ];
    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-emerald-500/10 p-3.5 rounded-xl border border-emerald-500/20">
                    <User className="h-7 w-7 text-emerald-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Teachers</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">124</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setShowTeacherForm(!showTeacherForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showTeacherForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  {showTeacherForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showTeacherForm ? 'Cancel Creation' : 'Add Teacher'}
                </button>
              </div>

              {/* Form */}
              {showTeacherForm && (
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <User className="h-5 w-5 text-emerald-400" /> Teacher Registration
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                      <input type="text" placeholder="e.g., Jane Doe" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                      <input type="email" placeholder="jane@edutrack.edu" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Batch Number</label>
                      <input type="text" placeholder="e.g., B2026" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Department</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors appearance-none">
                        <option value="" disabled>Select Department...</option>
                        {mockDepartments.map((dept, i) => (
                          <option key={i} value={dept.code}>{dept.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="lg:col-span-4 flex justify-end mt-2">
                      <button type="button" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                        Save Teacher
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-400" /> Faculty Members
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockTeachers.map((teacher, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                          <User className="h-6 w-6 text-slate-400" />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                          {teacher.dept}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">{teacher.name}</h4>
                      <p className="text-sm text-emerald-400 mb-4">{teacher.email}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between text-sm text-slate-400">
                        <span className="font-medium">Batch: {teacher.batch}</span>
                        <span className="font-medium text-slate-500">ID: {teacher.id}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
    )
 }