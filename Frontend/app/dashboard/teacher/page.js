"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  BookOpen,
  CheckCircle2,
  ClipboardList,
  User,
  Bell,
  ChevronRight,
  GraduationCap,
  LogOut,
  ArrowUp,
  Clock,
  Megaphone,
  Plus,
  Menu,
} from "lucide-react";

// --- Lightweight Shadcn-style UI Components ---

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-slate-900 border border-slate-800 text-slate-100 rounded-xl shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>{children}</div>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-slate-800 text-slate-100 hover:bg-slate-700/80",
    primary: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    warning: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
    destructive: "bg-red-500/10 text-red-400 border border-red-500/20",
    purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

const Button = ({
  children,
  variant = "default",
  className = "",
  ...props
}) => {
  const variants = {
    default: "bg-slate-50 text-slate-900 hover:bg-slate-200 shadow-sm",
    ghost: "hover:bg-slate-800 hover:text-slate-50 text-slate-400",
    outline:
      "border border-slate-800 bg-transparent hover:bg-slate-800 text-slate-300",
  };
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-9 px-4 py-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Main Dashboard Component ---

const TeacherDashboard = () => {
  const router = useRouter();
//   const { logout } = useAuth();

  const [activeTab, setActiveTab] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const handleLogout = () => {
//     logout();
//     router.push("/auth/login");
//   };

  const RequestType = {
    HOMEWORK: "Homework",
    PROJECT: "Project",
    QUIZ: "Quiz",
  };

  const mockSubmissions = [
    {
      id: "HW-102",
      type: RequestType.HOMEWORK,
      subject: "Physics Ch. 4 Dynamics",
      date: "Oct 24, 2026",
      status: "Needs Grading",
    },
    {
      id: "PRJ-04",
      type: RequestType.PROJECT,
      subject: "Thermodynamics Model",
      date: "Oct 23, 2026",
      status: "Graded",
    },
    {
      id: "QZ-09",
      type: RequestType.QUIZ,
      subject: "Kinematics Pop Quiz",
      date: "Oct 22, 2026",
      status: "Graded",
    },
    {
      id: "HW-103",
      type: RequestType.HOMEWORK,
      subject: "Lab Report - Friction",
      date: "Oct 21, 2026",
      status: "Needs Grading",
    },
  ];

  const getStatusVariant = (status) => {
    switch (status) {
      case "Needs Grading":
        return "warning";
      case "Graded":
        return "success";
      default:
        return "default";
    }
  };

  const getTypeVariant = (type) => {
    switch (type) {
      case RequestType.HOMEWORK:
        return "primary";
      case RequestType.PROJECT:
        return "purple";
      case RequestType.QUIZ:
        return "destructive";
      default:
        return "default";
    }
  };

  const sidebarLinks = [
    { name: "Home", icon: LayoutDashboard },
    { name: "My Classes", icon: Users },
    { name: "Schedule", icon: CalendarDays },
    { name: "Assignments", icon: BookOpen },
    { name: "Grading", icon: CheckCircle2 },
    { name: "Attendance", icon: ClipboardList },
    { name: "Profile", icon: User },
  ];

  return (
    <div className="flex h-screen bg-[#0a0f1c] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
      {/* Sidebar - Desktop */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800/60 hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            EduTrack
          </span>
        </div>

        <div className="px-4 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Faculty Portal
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
                    ? "bg-blue-500/10 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
                }`}
              >
                <link.icon
                  className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-500"}`}
                />
                {link.name}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/60">
          <Button
            type="button"
            // onClick={handleLogout}
            variant="ghost"
            className="w-full justify-start text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="h-4 w-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-[#0a0f1c]/80 backdrop-blur-md border-b border-slate-800/60 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
          <div className="flex items-center gap-3 md:hidden">
            <Button
              variant="ghost"
              className="p-2 h-auto"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="bg-blue-600 p-1 rounded-md">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-sm text-slate-400">
            <span>Faculty Portal</span>
            <ChevronRight className="h-4 w-4 text-slate-600" />
            <span className="text-slate-200 font-medium">{activeTab}</span>
          </div>

          <div className="flex items-center gap-5 ml-auto">
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-blue-500 rounded-full border-2 border-[#0a0f1c]"></span>
            </button>
            <div className="flex items-center gap-3 pl-5 border-l border-slate-800/60">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">Prof. John Doe</p>
                <p className="text-xs text-slate-500">Department of Physics</p>
              </div>
              <div className="h-9 w-9 bg-slate-800 border border-slate-700 rounded-full flex items-center justify-center overflow-hidden">
                <User className="h-5 w-5 text-slate-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === "Home" ? (
            <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
              {/* Welcome Section */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-50 tracking-tight mb-1">
                    Good Morning, John
                  </h1>
                  <p className="text-slate-400 text-sm">
                    Here is an overview of your classes and tasks for today.
                  </p>
                </div>
                <div className="text-sm text-slate-300 bg-slate-900 border border-slate-800/60 px-4 py-2 rounded-lg flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-blue-400" />
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="relative overflow-hidden group hover:border-blue-500/30 transition-all">
                  <div className="absolute -right-6 -top-6 bg-blue-500/5 h-32 w-32 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-all"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-400">
                      Total Students Taught
                    </CardTitle>
                    <Users className="h-5 w-5 text-blue-400" />
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-slate-50">145</div>
                    <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <ArrowUp className="h-3 w-3" />
                      Across 4 active sections
                    </p>
                  </CardContent>
                </Card>

                <Card className="relative overflow-hidden group hover:border-emerald-500/30 transition-all">
                  <div className="absolute -right-6 -top-6 bg-emerald-500/5 h-32 w-32 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all"></div>
                  <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
                    <CardTitle className="text-sm font-medium text-slate-400">
                      Pending Assignments
                    </CardTitle>
                    <ClipboardList className="h-5 w-5 text-emerald-400" />
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="text-3xl font-bold text-slate-50">38</div>
                    <p className="text-xs text-slate-500 mt-1">
                      Requires grading this week
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <h2 className="text-lg font-semibold text-slate-50 mb-4">
                  Quick Actions
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    {
                      name: "Take Attendance",
                      icon: Users,
                      color: "text-blue-400",
                      bg: "bg-blue-500/10",
                    },
                    {
                      name: "New Assignment",
                      icon: BookOpen,
                      color: "text-emerald-400",
                      bg: "bg-emerald-500/10",
                    },
                    {
                      name: "Upload Grades",
                      icon: ArrowUp,
                      color: "text-purple-400",
                      bg: "bg-purple-500/10",
                    },
                    {
                      name: "View Schedule",
                      icon: Clock,
                      color: "text-orange-400",
                      bg: "bg-orange-500/10",
                    },
                  ].map((action, i) => (
                    <button
                      key={i}
                      className="flex flex-col items-center justify-center p-5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800/80 hover:border-slate-700 transition-all group shadow-sm"
                    >
                      <div
                        className={`p-3 rounded-full ${action.bg} mb-3 group-hover:scale-110 transition-transform`}
                      >
                        <action.icon className={`h-6 w-6 ${action.color}`} />
                      </div>
                      <span className="text-sm font-medium text-slate-300">
                        {action.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Bottom Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Announcements */}
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex flex-row justify-between items-center border-b border-slate-800 bg-slate-950/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-500/10 p-2 rounded-lg border border-orange-500/20">
                        <Megaphone className="h-4 w-4 text-orange-400" />
                      </div>
                      <CardTitle>Class Announcements</CardTitle>
                    </div>
                    <Button variant="outline" className="h-8 px-3 text-xs">
                      <Plus className="h-3 w-3 mr-1" /> New
                    </Button>
                  </CardHeader>
                  <CardContent className="p-0 flex-1">
                    <div className="divide-y divide-slate-800">
                      {[
                        {
                          title: "Midterm Exam Syllabus Updated",
                          class: "Physics 101",
                          date: "Today, 10:30 AM",
                        },
                        {
                          title: "Lab Reports Due Extension",
                          class: "Advanced Mechanics",
                          date: "Yesterday, 04:15 PM",
                        },
                      ].map((announcement, i) => (
                        <div
                          key={i}
                          className="p-5 hover:bg-slate-800/30 transition-colors flex justify-between gap-4 group cursor-pointer"
                        >
                          <div>
                            <h4 className="text-slate-200 font-medium text-sm mb-1">
                              {announcement.title}
                            </h4>
                            <p className="text-xs text-slate-500 flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5" />{" "}
                              {announcement.date}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className="h-fit whitespace-nowrap"
                          >
                            {announcement.class}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Submissions */}
                <Card className="flex flex-col h-full">
                  <CardHeader className="flex flex-row justify-between items-center border-b border-slate-800 bg-slate-950/30">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                        <ClipboardList className="h-4 w-4 text-blue-400" />
                      </div>
                      <CardTitle>Recent Student Submissions</CardTitle>
                    </div>
                  </CardHeader>
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                      <thead>
                        <tr className="border-b border-slate-800 text-xs text-slate-400 bg-slate-950/30">
                          <th className="p-4 font-medium">Assignment</th>
                          <th className="p-4 font-medium">Type</th>
                          <th className="p-4 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {mockSubmissions.map((sub, i) => (
                          <tr
                            key={i}
                            className="hover:bg-slate-800/30 transition-colors"
                          >
                            <td className="p-4">
                              <div className="font-medium text-slate-200">
                                {sub.subject}
                              </div>
                              <div className="text-xs text-slate-500 mt-0.5">
                                {sub.id} • {sub.date}
                              </div>
                            </td>
                            <td className="p-4">
                              <Badge variant={getTypeVariant(sub.type)}>
                                {sub.type}
                              </Badge>
                            </td>
                            <td className="p-4 text-right">
                              <Badge variant={getStatusVariant(sub.status)}>
                                {sub.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-slate-500 animate-in fade-in duration-500">
              <Card className="flex flex-col items-center max-w-sm text-center p-8 bg-slate-900/50">
                <div className="bg-slate-800/80 p-4 rounded-full mb-4">
                  <BookOpen className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-50 mb-2">
                  {activeTab} Module
                </h3>
                <p className="text-sm">
                  This module is currently being integrated into your faculty
                  portal.
                </p>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default function App() {
  return <TeacherDashboard />;
}
