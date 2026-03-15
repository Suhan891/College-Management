 "use client"

 import { GraduationCap, Plus, User, Users, X } from "lucide-react"
import { useState } from "react";

 export default function Student() {
    const [showStudentForm, setShowStudentForm] = useState(false);
      const mockClasses = [
    { name: 'CS-A', year: '2026-2027', teacher: 'Dr. Alan Turing', stream: 'CS' },
    { name: 'PHY-101', year: '2026-2027', teacher: 'Marie Curie', stream: 'PHY' },
  ];
          const mockStreams = [
    { code: 'CS', name: 'Computer Science & Engineering', course: 'BTECH-CS' },
    { code: 'IT', name: 'Information Technology', course: 'BTECH-CS' },
    { code: 'FIN', name: 'Finance', course: 'BBA' },
    { code: 'PHY', name: 'Quantum Physics', course: 'BSC-PHY' },
  ];
  const mockStudents = [
    { name: 'John Doe', email: 'john@edutrack.edu', enrollNo: 'EN2024001', roll: 'CS001', session: '2024-2028', year: '1st', semester: '1st', classRoll: '1', cls: 'CS-A' },
    { name: 'Alice Smith', email: 'alice@edutrack.edu', enrollNo: 'EN2024002', roll: 'PHY001', session: '2024-2027', year: '1st', semester: '1st', classRoll: '1', cls: 'PHY-101' },
  ];
  return (
    
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 flex items-center gap-5 min-w-[280px] shadow-sm">
                  <div className="bg-blue-500/10 p-3.5 rounded-xl border border-blue-500/20">
                    <GraduationCap className="h-7 w-7 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium mb-1">Total Students</p>
                    <h3 className="text-3xl font-bold text-white tracking-tight">2,450</h3>
                  </div>
                </div>

                <button 
                  onClick={() => setShowStudentForm(!showStudentForm)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all flex items-center gap-2 shadow-sm ${
                    showStudentForm 
                      ? 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {showStudentForm ? <X className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                  {showStudentForm ? 'Cancel Admission' : 'Add Student'}
                </button>
              </div>

              {/* Form */}
              {showStudentForm && (
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 md:p-8 animate-in slide-in-from-top-4 shadow-sm">
                  <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-blue-400" /> Student Registration
                  </h3>
                  <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Name</label>
                      <input type="text" placeholder="e.g., John Doe" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                      <input type="email" placeholder="john@edutrack.edu" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Enrollment Number</label>
                      <input type="text" placeholder="e.g., EN2024001" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Registered Roll</label>
                      <input type="text" placeholder="e.g., CS001" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Session</label>
                      <input type="text" placeholder="e.g., 2024-2028" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Current Year</label>
                      <input type="text" placeholder="e.g., 1st" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Current Semester</label>
                      <input type="text" placeholder="e.g., 1st" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Class Roll Number</label>
                      <input type="text" placeholder="e.g., 12" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-400 mb-2">Assign Class</label>
                      <select defaultValue="" className="w-full bg-[#0a0f1c] border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                        <option value="" disabled>Select Class...</option>
                        {mockClasses.map((cls, i) => (
                          <option key={i} value={cls.name}>{cls.name} ({cls.year})</option>
                        ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 lg:col-span-3 flex justify-end mt-2">
                      <button type="button" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-xl font-medium transition-all shadow-sm">
                        Admit Student
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Existing */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
                  <Users className="h-5 w-5 text-slate-400" /> Enrolled Students
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockStudents.map((student, i) => (
                    <div key={i} className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 hover:border-blue-500/30 transition-all group shadow-sm flex flex-col h-full">
                      <div className="flex justify-between items-start mb-4">
                        <div className="h-12 w-12 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                          <GraduationCap className="h-6 w-6 text-slate-400" />
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                          {student.cls}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-white mb-1">{student.name}</h4>
                      <p className="text-sm text-slate-400 mb-4">{student.email}</p>
                      
                      <div className="mt-auto pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                        <span className="font-medium">Roll: {student.classRoll}</span>
                        <span className="font-medium">Sem: {student.semester}</span>
                        <span className="font-medium text-slate-500">ID: {student.enrollNo}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
  )
 }