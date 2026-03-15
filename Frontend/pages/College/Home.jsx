
import {
  CalendarDays, 
  ClipboardList, 
  GraduationCap, 
  Megaphone, 
  BookOpen,
  User,
  Plus,
  Clock } from "lucide-react";

export default function CollegeHome() {

    const RequestType = {
    COMPLAINT: 'Formal Complaint',
    PERMISSION: 'Permissions',
    INQUIRY: 'Inquiry Desk'
  };

  const mockSubmissions = [
    { id: 'REQ-001', type: RequestType.COMPLAINT, subject: 'Lab Equipment Malfunction', date: 'Oct 24, 2026', status: 'Pending' },
    { id: 'REQ-002', type: RequestType.PERMISSION, subject: 'Leave Application - Conference', date: 'Oct 23, 2026', status: 'Resolved' },
    { id: 'REQ-003', type: RequestType.INQUIRY, subject: 'Exam Timetable Clarification', date: 'Oct 22, 2026', status: 'In-Progress' },
    { id: 'REQ-004', type: RequestType.PERMISSION, subject: 'Auditorium Booking', date: 'Oct 21, 2026', status: 'Resolved' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'In-Progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'Resolved': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case RequestType.COMPLAINT: return 'text-red-400 bg-red-400/10 border-red-400/20';
      case RequestType.PERMISSION: return 'text-purple-400 bg-purple-400/10 border-purple-400/20';
      case RequestType.INQUIRY: return 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

    return (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                    Overview
                  </h1>
                  <p className="text-slate-400 text-sm">Here's what's happening across the institution today.</p>
                </div>
                <div className="text-sm text-slate-400 bg-slate-900 border border-slate-800/60 px-4 py-2 rounded-lg flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden group hover:border-blue-500/30 transition-all shadow-sm">
                  <div className="absolute -right-6 -top-6 bg-blue-500/5 h-32 w-32 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20">
                      <GraduationCap className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">+4% this semester</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-1">2,450</h3>
                    <p className="text-sm font-medium text-slate-400">Total Enrolled Students</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-sm">
                  <div className="absolute -right-6 -top-6 bg-emerald-500/5 h-32 w-32 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <User className="h-6 w-6 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">Active Staff</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-1">124</h3>
                    <p className="text-sm font-medium text-slate-400">Total Faculty Members</p>
                  </div>
                </div>
              </div>

              {/* Campus Administration (formerly Quick Actions) */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Campus Administration</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Special Day', icon: CalendarDays, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { name: 'Make Exam', icon: BookOpen, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { name: 'Schedule Exam', icon: Clock, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { name: 'Generate Form', icon: ClipboardList, color: 'text-orange-400', bg: 'bg-orange-500/10' },
                  ].map((action, i) => (
                    <button key={i} className="flex flex-col items-center justify-center p-4 rounded-xl bg-slate-900 border border-slate-800/60 hover:bg-slate-800/50 hover:border-slate-700 transition-all group">
                      <div className={`p-3 rounded-full ${action.bg} mb-3 group-hover:scale-110 transition-transform`}>
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-300">{action.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Grid: Announcements & Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Announcements Box */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                        <Megaphone className="h-5 w-5 text-orange-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">Campus Announcements</h2>
                        <p className="text-xs text-slate-400">Latest updates broadcasted to all portals</p>
                      </div>
                    </div>
                    <button className="bg-white text-slate-950 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 shadow-sm shrink-0">
                      <Plus className="h-3 w-3" /> Create New
                    </button>
                  </div>
                  
                  <div className="divide-y divide-slate-800/60 flex-1">
                    {[
                      { title: "End Semester Exams Schedule Published", date: "Today, 10:30 AM", type: "Academic", typeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                      { title: "Annual Tech Fest Registration Open", date: "Yesterday, 04:15 PM", type: "Event", typeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
                      { title: "Server Maintenance Scheduled for Weekend", date: "Oct 24, 09:00 AM", type: "System", typeColor: "text-orange-400 bg-orange-400/10 border-orange-400/20" }
                    ].map((announcement, i) => (
                      <div key={i} className="p-5 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-start gap-4">
                           <div className="mt-1 hidden sm:block h-2 w-2 rounded-full bg-slate-700 group-hover:bg-white transition-colors"></div>
                          <div>
                            <h4 className="text-slate-200 font-medium mb-1 text-sm">{announcement.title}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" /> {announcement.date}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold border ${announcement.typeColor} whitespace-nowrap`}>
                          {announcement.type}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-950/30 border-t border-slate-800/60 text-center mt-auto">
                     <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                       View All Announcements
                     </button>
                  </div>
                </div>

                {/* Submissions & Requests Desk */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800/60 flex items-center gap-3 bg-slate-950/30">
                    <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                      <ClipboardList className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Requests & Submissions</h2>
                      <p className="text-xs text-slate-400">Manage grievances, permissions, and inquiries</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/50 border-b border-slate-800/60 text-xs uppercase tracking-wider text-slate-500">
                          <th className="p-4 font-medium">ID</th>
                          <th className="p-4 font-medium">Type</th>
                          <th className="p-4 font-medium">Subject</th>
                          <th className="p-4 font-medium">Date</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-sm">
                        {mockSubmissions.map((sub, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="p-4 text-slate-400 font-medium whitespace-nowrap">{sub.id}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold border ${getTypeColor(sub.type)} whitespace-nowrap`}>
                                {sub.type}
                              </span>
                            </td>
                            <td className="p-4 text-slate-200">{sub.subject}</td>
                            <td className="p-4 text-slate-400 whitespace-nowrap">{sub.date}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${getStatusColor(sub.status)} whitespace-nowrap`}>
                                {sub.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-slate-950/30 border-t border-slate-800/60 text-center mt-auto">
                    <button className="text-sm text-slate-400 hover:text-white font-medium transition-colors">
                      View All Requests
                    </button>
                  </div>
                </div>
              </div>

            </div>
    )
}