"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
import { 
  CalendarDays, 
  ChevronRight, 
  ClipboardList, 
  GraduationCap, 
  LayoutDashboard,
  BookOpen,
  Book,
  User,
  Plus,
  Bell,
  LogOut,
  Clock,
  FileText,
  CheckSquare,
  TrendingUp,
  CreditCard,
  Download,
  Library,
  MessageSquare,
  Send,
  X
} from 'lucide-react';

const StudentDashboard = () => {
  const router = useRouter();
//   const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState('Home');
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  
  // New State for toggling the request form
  const [isRequestFormOpen, setIsRequestFormOpen] = useState(false);
  
  const RequestType = {
    COMPLAINT: 'Complaint',
    PERMISSION: 'Permission',
    INQUIRY: 'Inquiry'
  };

  // Updated mock data with Teacher/Reviewer feedback
  const [myRequests, setMyRequests] = useState([
    { id: 'REQ-001', type: RequestType.PERMISSION, subject: 'Leave Application - Sick Leave', date: 'Oct 25, 2026', status: 'Pending', reviewer: 'Awaiting Assignment' },
    { id: 'REQ-002', type: RequestType.INQUIRY, subject: 'Library Fine Clarification', date: 'Oct 20, 2026', status: 'Accepted', reviewer: 'Prof. Davis' },
    { id: 'REQ-003', type: RequestType.COMPLAINT, subject: 'Lab PC Malfunction', date: 'Oct 15, 2026', status: 'Rejected', reviewer: 'IT Admin' },
  ]);

  const getRequestStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case 'Accepted': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Rejected': return 'text-red-400 bg-red-400/10 border-red-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const AssignmentStatus = {
    PENDING: 'Pending',
    SUBMITTED: 'Submitted',
    GRADED: 'Graded'
  };

  const mockAssignments = [
    { id: 'CS301-A2', course: 'Data Structures', title: 'Binary Trees Implementation', due: 'Oct 26, 2026', status: AssignmentStatus.PENDING },
    { id: 'MA204-A1', course: 'Linear Algebra', title: 'Matrix Transformations', due: 'Oct 22, 2026', status: AssignmentStatus.GRADED },
    { id: 'CS305-P1', course: 'Web Dev', title: 'React Portfolio', due: 'Oct 24, 2026', status: AssignmentStatus.SUBMITTED },
    { id: 'PH102-L3', course: 'Physics Lab', title: 'Optics Experiment Report', due: 'Oct 20, 2026', status: AssignmentStatus.GRADED },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case AssignmentStatus.PENDING: return 'text-orange-400 bg-orange-400/10 border-orange-400/20';
      case AssignmentStatus.SUBMITTED: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case AssignmentStatus.GRADED: return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const sidebarLinks = [
    { name: 'Home', icon: LayoutDashboard },
    { name: 'My Courses', icon: BookOpen },
    { name: 'Assignments', icon: CheckSquare },
    { name: 'Grades', icon: TrendingUp },
    { name: 'Timetable', icon: CalendarDays },
    { name: 'Library', icon: Library },
    { name: 'Requests', icon: MessageSquare },
    { name: 'Profile', icon: User },
  ];

//   const handleLogout = () => {
//     logout();
//     setShowLogoutMsg(true);
//     setTimeout(() => {
//       setShowLogoutMsg(false);
//       router.push('/auth/login');
//     }, 700);
//   };

  return (
    <div className="flex h-screen bg-[#0a0f1c] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Logout Toast */}
      {showLogoutMsg && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-800 text-white px-6 py-3 rounded-full border border-slate-700 shadow-xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <LogOut className="h-4 w-4 text-blue-400" />
          <span className="text-sm font-medium">Logout initiated safely.</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800/60 hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60 mt-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EduTrack</span>
        </div>
        <div className="px-4 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Student Portal
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = activeTab === link.name;
            return (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive 
                    ? 'bg-blue-500/10 text-blue-400' 
                    : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
                }`}
              >
                <link.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {link.name}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800/60">
          <button 
            // onClick={handleLogout} 
            className="flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors px-3 py-2.5 rounded-lg w-full text-sm font-medium"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-8 z-10">
          <div className="flex items-center md:hidden gap-3">
             <div className="bg-blue-600 p-1 rounded-md">
                <GraduationCap className="h-5 w-5 text-white" />
             </div>
            <span className="text-lg font-bold text-white">EduTrack</span>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span>Dashboard</span>
            <ChevronRight className="h-4 w-4 text-slate-600" />
            <span className="text-slate-200 font-medium">{activeTab}</span>
          </div>
          
          <div className="flex items-center gap-5 ml-auto">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-[#0a0f1c]"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-800/60">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Alex Carter</p>
                <p className="text-xs text-slate-500">Computer Science, Yr 3</p>
              </div>
              <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full p-[2px]">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          {activeTab === 'Home' ? (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                    Welcome back, Alex!
                  </h1>
                  <p className="text-slate-400 text-sm">You have 1 pending assignment due this week.</p>
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
                      <TrendingUp className="h-6 w-6 text-blue-400" />
                    </div>
                    <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">Top 10%</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-1">3.84</h3>
                    <p className="text-sm font-medium text-slate-400">Current Cumulative GPA</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-sm">
                  <div className="absolute -right-6 -top-6 bg-emerald-500/5 h-32 w-32 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20">
                      <Clock className="h-6 w-6 text-emerald-400" />
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-800 px-2.5 py-1 rounded-full">All clear</span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-4xl font-bold text-white tracking-tight mb-1">92%</h3>
                    <p className="text-sm font-medium text-slate-400">Overall Attendance</p>
                  </div>
                </div>
              </div>

              {/* Student Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Submit Work', icon: FileText, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                    { name: 'Download ID', icon: Download, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                    { name: 'Pay Fees', icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                    { name: 'View Syllabus', icon: Book, color: 'text-orange-400', bg: 'bg-orange-500/10' },
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

              {/* Bottom Grid: Classes & Assignments */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Upcoming Classes */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-950/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-500/10 p-2 rounded-lg border border-purple-500/20">
                        <CalendarDays className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">Today&apos;s Classes</h2>
                        <p className="text-xs text-slate-400">Your schedule for {new Date().toLocaleDateString('en-US', { weekday: 'short' })}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="divide-y divide-slate-800/60 flex-1">
                    {[
                      { title: "Data Structures & Algo", time: "10:30 AM - 11:30 AM", room: "Room 402", typeColor: "text-blue-400 bg-blue-400/10 border-blue-400/20" },
                      { title: "Linear Algebra", time: "11:45 AM - 12:45 PM", room: "Room 310", typeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20" },
                      { title: "Web Development Lab", time: "02:00 PM - 04:00 PM", room: "Computer Lab B", typeColor: "text-orange-400 bg-orange-400/10 border-orange-400/20" }
                    ].map((cls, i) => (
                      <div key={i} className="p-5 hover:bg-slate-800/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
                        <div className="flex items-start gap-4">
                           <div className="mt-1 hidden sm:block h-2 w-2 rounded-full bg-slate-700 group-hover:bg-white transition-colors"></div>
                          <div>
                            <h4 className="text-slate-200 font-medium mb-1 text-sm">{cls.title}</h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5" /> {cls.time}
                            </p>
                          </div>
                        </div>
                        <span className={`inline-flex px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-semibold border ${cls.typeColor} whitespace-nowrap`}>
                          {cls.room}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 bg-slate-950/30 border-t border-slate-800/60 text-center mt-auto">
                     <button className="text-sm text-blue-400 hover:text-blue-300 font-medium transition-colors">
                       View Full Timetable
                     </button>
                  </div>
                </div>

                {/* Assignments Desk */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col h-full">
                  <div className="p-6 border-b border-slate-800/60 flex items-center gap-3 bg-slate-950/30">
                    <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                      <ClipboardList className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">Recent Assignments</h2>
                      <p className="text-xs text-slate-400">Track your coursework and submissions</p>
                    </div>
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/50 border-b border-slate-800/60 text-xs uppercase tracking-wider text-slate-500">
                          <th className="p-4 font-medium">Course</th>
                          <th className="p-4 font-medium">Title</th>
                          <th className="p-4 font-medium">Due/Submitted</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-sm">
                        {mockAssignments.map((assignment, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="p-4 text-slate-400 font-medium whitespace-nowrap">{assignment.course}</td>
                            <td className="p-4 text-slate-200">{assignment.title}</td>
                            <td className="p-4 text-slate-400 whitespace-nowrap">{assignment.due}</td>
                            <td className="p-4">
                              <span className={`inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${getStatusColor(assignment.status)} whitespace-nowrap`}>
                                {assignment.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="p-4 bg-slate-950/30 border-t border-slate-800/60 text-center mt-auto">
                    <button className="text-sm text-slate-400 hover:text-white font-medium transition-colors">
                      View All Assignments
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ) : activeTab === 'Requests' ? (
            <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-1">
                    Help Desk & Requests
                  </h1>
                  <p className="text-slate-400 text-sm">Submit inquiries, leave applications, or complaints to the administration.</p>
                </div>
                
                {/* NEW TOGGLE BUTTON */}
                <button 
                  onClick={() => setIsRequestFormOpen(!isRequestFormOpen)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isRequestFormOpen 
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700' 
                      : 'bg-blue-600 hover:bg-blue-500 text-white'
                  }`}
                >
                  {isRequestFormOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {isRequestFormOpen ? 'Close Form' : 'New Request'}
                </button>
              </div>

              <div className="space-y-8">
                {/* EXPANDABLE FORM SECTION */}
                {isRequestFormOpen && (
                  <div className="bg-slate-900 border border-slate-800/60 rounded-2xl p-6 shadow-sm animate-in slide-in-from-top-4 fade-in duration-300">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                        <MessageSquare className="h-5 w-5 text-blue-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-white">Create a New Request</h2>
                    </div>
                    
                    <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setIsRequestFormOpen(false); }}>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Request Type</label>
                        <select className="w-full bg-slate-950 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors">
                          {Object.values(RequestType).map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Subject</label>
                        <input type="text" placeholder="Brief subject..." className="w-full bg-slate-950 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-slate-600" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-xs font-medium text-slate-400 mb-1.5">Description</label>
                        <textarea rows="3" placeholder="Detail your request here..." className="w-full bg-slate-950 border border-slate-800/60 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50 transition-colors placeholder:text-slate-600 resize-none"></textarea>
                      </div>
                      <div className="md:col-span-2 flex justify-end mt-2">
                        <button type="submit" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-colors">
                          <Send className="h-4 w-4" /> Submit Request
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* FULL WIDTH REQUEST HISTORY */}
                <div className="bg-slate-900 border border-slate-800/60 rounded-2xl overflow-hidden shadow-sm flex flex-col">
                  <div className="p-6 border-b border-slate-800/60 bg-slate-950/30">
                    <h2 className="text-lg font-semibold text-white">My Request History</h2>
                    <p className="text-xs text-slate-400 mt-1">Track the status and teacher feedback of your past submissions</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-950/50 border-b border-slate-800/60 text-xs uppercase tracking-wider text-slate-500">
                          <th className="p-4 font-medium">ID</th>
                          <th className="p-4 font-medium">Type & Subject</th>
                          <th className="p-4 font-medium">Date</th>
                          <th className="p-4 font-medium">Reviewer</th>
                          <th className="p-4 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-sm">
                        {myRequests.map((req, i) => (
                          <tr key={i} className="hover:bg-slate-800/30 transition-colors group">
                            <td className="p-4 text-slate-400 font-medium whitespace-nowrap">{req.id}</td>
                            <td className="p-4">
                              <p className="text-slate-200 mb-0.5 font-medium">{req.subject}</p>
                              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{req.type}</p>
                            </td>
                            <td className="p-4 text-slate-400 whitespace-nowrap">{req.date}</td>
                            
                            {/* NEW REVIEWER COLUMN */}
                            <td className="p-4">
                              <span className="flex items-center gap-2 text-slate-300">
                                <User className="h-3.5 w-3.5 text-slate-500" />
                                {req.reviewer}
                              </span>
                            </td>

                            <td className="p-4">
                              <span className={`inline-flex px-2 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold border ${getRequestStatusColor(req.status)} whitespace-nowrap`}>
                                {req.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500 animate-in fade-in duration-500">
              <div className="bg-slate-900 border border-slate-800/60 p-6 rounded-2xl flex flex-col items-center max-w-sm text-center">
                <div className="bg-slate-800/50 p-4 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-white mb-2">{activeTab} Module</h3>
                <p className="text-sm">Your {activeTab.toLowerCase()} data is currently syncing. Please check back later.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const App = () => {
  return <StudentDashboard />;
};

export default App;