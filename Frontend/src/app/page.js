import React, { useState } from "react";
import {
  GraduationCap,
  Menu,
  X,
  Rocket,
  ChevronRight,
  AlertTriangle,
  Users,
  CalendarDays,
  ShieldAlert,
  Smartphone,
  CheckCircle2,
  Layers,
  ClipboardList,
  MapPin,
  Megaphone,
  Lock,
  Twitter,
  Linkedin,
  Github,
  ArrowUp,
  LayoutDashboard,
  Settings,
  Bell,
  Search,
  BookOpen,
} from "lucide-react";
import Image from "next/image";

// All of them shall be separated in components later

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 scroll-smooth">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <GraduationCap className="h-8 w-8 text-cyan-500" />
              <span className="text-xl font-bold text-white tracking-tight">
                Edu<span className="text-cyan-500">Track</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("problem")}
                className="text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                The Problem
              </button>
              <button
                onClick={() => scrollToSection("solution")}
                className="text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("vision")}
                className="text-sm font-medium hover:text-cyan-400 transition-colors"
              >
                Vision
              </button>
            </div>

            <div className="hidden md:flex">
              <button
                onClick={scrollToBottom}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-full text-sm font-medium transition-all transform hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-300 hover:text-white"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 absolute w-full">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
              <button
                onClick={() => scrollToSection("problem")}
                className="text-left px-3 py-2 text-base font-medium hover:text-cyan-400"
              >
                The Problem
              </button>
              <button
                onClick={() => scrollToSection("solution")}
                className="text-left px-3 py-2 text-base font-medium hover:text-cyan-400"
              >
                Solution
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-left px-3 py-2 text-base font-medium hover:text-cyan-400"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("vision")}
                className="text-left px-3 py-2 text-base font-medium hover:text-cyan-400"
              >
                Vision
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  scrollToBottom();
                }}
                className="w-full text-left px-3 py-2 mt-4 text-base font-medium text-cyan-400"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section - Full Screen */}
        <section className="relative min-h-screen flex flex-col justify-center pt-20 pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[30rem] bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-8 tracking-wide uppercase">
              <Rocket className="h-4 w-4" /> The Future of Campus Management
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1]">
              A Smart Academic <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Management Platform
              </span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 mb-12 leading-relaxed">
              Transform traditional college administration into a transparent,
              automated, and data-driven digital ecosystem. Say goodbye to
              spreadsheets and manual tracking forever.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button
                onClick={scrollToBottom}
                className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 hover:scale-105 transform"
              >
                Request a Demo <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollToSection("problem")}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-10 py-4 rounded-full font-bold text-lg transition-all"
              >
                Explore the Problem
              </button>
            </div>
          </div>

          {/* Docked Social Proof */}
          <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Trusted by forward-thinking institutions
              </p>
              <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-lg font-bold">
                  <GraduationCap className="h-5 w-5" /> Tech U
                </div>
                <div className="flex items-center gap-2 text-lg font-bold">
                  <Layers className="h-5 w-5" /> State College
                </div>
                <div className="flex items-center gap-2 text-lg font-bold">
                  <Users className="h-5 w-5" /> Global Academy
                </div>
                <div className="flex items-center gap-2 text-lg font-bold">
                  <ShieldAlert className="h-5 w-5" /> Nexus Institute
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Problem Section - Full Screen */}
        <section
          id="problem"
          className="min-h-screen flex flex-col justify-center py-24 bg-slate-900 border-y border-slate-800 relative"
        >
          <div className="absolute right-0 top-1/4 w-96 h-96 bg-red-500/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="text-center mb-20">
              <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-red-500/10 mb-6 border border-red-500/20">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                The Legacy Bottleneck
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                Colleges still rely on fragmented systems, spreadsheets, and
                manual processes to manage attendance, timetables, and academic
                communication. This creates a chaotic environment for
                administrators and students alike.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: "Proxy Marking",
                  desc: "Manual attendance is slow, prone to errors, and makes proxy marking by students virtually impossible to detect or prevent.",
                },
                {
                  icon: CalendarDays,
                  title: "Calendar Chaos",
                  desc: "Sudden changes to the academic calendar cause widespread confusion due to slow, localized communication channels.",
                },
                {
                  icon: ShieldAlert,
                  title: "Data Silos",
                  desc: "Critical academic records are scattered across different departments, leading to a complete lack of transparent audit tracking.",
                },
                {
                  icon: Smartphone,
                  title: "Poor Coordination",
                  desc: "Disconnected communication between the administration, teachers, and students results in missed deadlines and frustration.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950 p-8 rounded-3xl border border-slate-800 hover:border-red-500/40 transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-black/20"
                >
                  <div className="h-14 w-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon className="h-7 w-7 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-base leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* The Solution Section - Full Screen with Detailed Mockup */}
        <section
          id="solution"
          className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-bold mb-8 uppercase tracking-wide">
                  <CheckCircle2 className="h-4 w-4" /> The EduTrack Solution
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-[1.2]">
                  Centralize your entire digital academic ecosystem
                </h2>
                <p className="text-xl text-slate-400 mb-10 leading-relaxed">
                  EduTrack completely replaces fragmented legacy tools. It
                  streamlines institutional operations under a single, highly
                  structured, and secure platform, bringing everyone onto the
                  same page.
                </p>

                <ul className="space-y-6">
                  {[
                    {
                      title: "Unified Dashboard",
                      desc: "A single pane of glass for all administrative tasks.",
                    },
                    {
                      title: "Real-time Synchronization",
                      desc: "Changes to calendars or rosters reflect instantly for everyone.",
                    },
                    {
                      title: "Automated Workflows",
                      desc: "Reduce manual data entry with smart attendance and forms.",
                    },
                    {
                      title: "Bank-grade Security",
                      desc: "Secure, audit-ready data storage with role-based access control.",
                    },
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <div className="mt-1 h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold text-lg">
                          {point.title}
                        </h4>
                        <p className="text-slate-400 mt-1">{point.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:w-1/2 w-full perspective-[2000px]">
                {/* Advanced Detailed Mockup */}
                <div className="w-full h-[600px] bg-slate-900 rounded-2xl border border-slate-700 shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col transform rotate-y-[-10deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-all duration-700 ease-out">
                  {/* Browser/Window Header */}
                  <div className="h-12 bg-slate-950 flex items-center px-4 gap-4 border-b border-slate-800 shrink-0">
                    <div className="flex gap-2">
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-700 hover:bg-red-500 transition-colors cursor-pointer"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-700 hover:bg-yellow-500 transition-colors cursor-pointer"></div>
                      <div className="w-3.5 h-3.5 rounded-full bg-slate-700 hover:bg-green-500 transition-colors cursor-pointer"></div>
                    </div>
                    <div className="bg-slate-900 text-slate-500 text-xs px-4 py-1.5 rounded-md flex-1 text-center font-mono border border-slate-800">
                      <Lock className="inline-block h-3 w-3 mr-1 text-slate-600 mb-0.5" />{" "}
                      admin.edutrack.app
                    </div>
                  </div>

                  <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-20 md:w-56 bg-slate-950 border-r border-slate-800 p-4 flex flex-col shrink-0">
                      <div className="flex items-center gap-3 mb-8 px-2">
                        <div className="h-8 w-8 bg-cyan-500 rounded-lg flex items-center justify-center shrink-0">
                          <GraduationCap className="h-5 w-5 text-slate-950" />
                        </div>
                        <span className="font-bold text-white hidden md:block">
                          EduTrack
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {[
                          {
                            icon: LayoutDashboard,
                            text: "Dashboard",
                            active: true,
                          },
                          { icon: Users, text: "Students" },
                          { icon: BookOpen, text: "Academics" },
                          { icon: CalendarDays, text: "Schedule" },
                          { icon: Settings, text: "Settings" },
                        ].map((nav, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer ${nav.active ? "bg-cyan-500/10 text-cyan-400" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"}`}
                          >
                            <nav.icon className="h-5 w-5 shrink-0" />
                            <span className="text-sm font-medium hidden md:block">
                              {nav.text}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-slate-900 flex flex-col">
                      {/* Top Nav */}
                      <div className="h-16 border-b border-slate-800 flex items-center justify-between px-6 shrink-0 bg-slate-900/50">
                        <div className="flex items-center text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 w-64">
                          <Search className="h-4 w-4 mr-2" />
                          <span className="text-sm">Search students...</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Bell className="h-5 w-5 text-slate-400 cursor-pointer" />
                          <div className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800 overflow-hidden">
                            <Image
                              src="https://i.pravatar.cc/100?img=33"
                              alt="Avatar"
                              className="w-full h-full object-cover opacity-80"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="p-6 flex-1 flex flex-col gap-6 overflow-hidden">
                        <h3 className="text-white font-semibold text-lg">
                          Overview
                        </h3>

                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 shrink-0">
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                              Total Students
                            </span>
                            <div className="text-2xl font-bold text-white mb-1">
                              2,482
                            </div>
                            <span className="text-emerald-400 text-xs text-medium">
                              ↑ 12% from last month
                            </span>
                          </div>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                              Avg Attendance
                            </span>
                            <div className="text-2xl font-bold text-white mb-1">
                              94.5%
                            </div>
                            <span className="text-emerald-400 text-xs text-medium">
                              ↑ 2.1% from last month
                            </span>
                          </div>
                          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 hidden lg:block">
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-2 block">
                              Active Staff
                            </span>
                            <div className="text-2xl font-bold text-white mb-1">
                              145
                            </div>
                            <span className="text-slate-500 text-xs text-medium">
                              No change
                            </span>
                          </div>
                        </div>

                        {/* Chart / Activity area */}
                        <div className="flex-1 flex gap-4 min-h-0">
                          {/* Main Chart */}
                          <div className="flex-[2] bg-slate-950 rounded-xl border border-slate-800 p-5 flex flex-col relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                            <h4 className="text-sm font-semibold text-white mb-6">
                              Weekly Attendance Trend
                            </h4>
                            <div className="flex-1 flex items-end gap-3 px-2 z-10">
                              {[40, 70, 45, 90, 65, 80, 55, 85, 60, 95].map(
                                (h, i) => (
                                  <div
                                    key={i}
                                    className="flex-1 relative group cursor-pointer h-full flex items-end"
                                  >
                                    <div
                                      className="w-full bg-gradient-to-t from-cyan-600/50 to-cyan-400/90 rounded-t-sm transition-all duration-300 group-hover:to-cyan-300 relative z-10"
                                      style={{ height: `${h}%` }}
                                    ></div>
                                  </div>
                                ),
                              )}
                            </div>
                            <div className="flex justify-between text-xs text-slate-500 mt-3 px-2">
                              <span>Mon</span>
                              <span>Tue</span>
                              <span>Wed</span>
                              <span>Thu</span>
                              <span>Fri</span>
                            </div>
                          </div>

                          {/* Recent Activity List */}
                          <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800 p-5 hidden sm:flex flex-col">
                            <h4 className="text-sm font-semibold text-white mb-4">
                              Recent Alerts
                            </h4>
                            <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                              {[
                                {
                                  text: "Timetable updated for CS-Dept",
                                  time: "10m ago",
                                  color: "text-cyan-400",
                                },
                                {
                                  text: "Mass absence detected in Class 104",
                                  time: "1h ago",
                                  color: "text-red-400",
                                },
                                {
                                  text: "New faculty onboarding complete",
                                  time: "2h ago",
                                  color: "text-emerald-400",
                                },
                                {
                                  text: "Holiday schedule approved",
                                  time: "5h ago",
                                  color: "text-slate-300",
                                },
                              ].map((alert, i) => (
                                <div key={i} className="flex items-start gap-3">
                                  <div className="mt-1 h-2 w-2 rounded-full bg-slate-700 shrink-0"></div>
                                  <div>
                                    <p className={`text-sm ${alert.color}`}>
                                      {alert.text}
                                    </p>
                                    <span className="text-xs text-slate-500">
                                      {alert.time}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section - Full Screen */}
        <section
          id="features"
          className="min-h-screen flex flex-col justify-center py-24 bg-slate-900 border-y border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                Powerful Built-in Features
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                We've built everything you need to run a modern, efficient
                educational institution straight into the core platform. No
                plugins required.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Users,
                  title: "Role-Based Access",
                  desc: "Dedicated, secure portals mapped directly to Admin, Staff, Teachers, and Student roles.",
                },
                {
                  icon: Layers,
                  title: "Structured Hierarchy",
                  desc: "Organize massive academic catalogs effortlessly with Course → Stream → Class mapping.",
                },
                {
                  icon: CalendarDays,
                  title: "Dynamic Calendar",
                  desc: "Live academic calendar deeply integrated with working-day logic and holidays.",
                },
                {
                  icon: ClipboardList,
                  title: "Period-Wise Tracking",
                  desc: "Granular, period-level attendance tracking to eliminate skipping and improve metrics.",
                },
                {
                  icon: MapPin,
                  title: "Geo-Fencing",
                  desc: "Location-enabled mobile attendance marking to ensure students are physically on campus.",
                },
                {
                  icon: Megaphone,
                  title: "Global Broadcasts",
                  desc: "Instant announcement system for critical notices, replacing email chains and bulletin boards.",
                },
                {
                  icon: ClipboardList,
                  title: "Digital Forms Engine",
                  desc: "Create dynamic forms for student assessments, administrative surveys, and feedback.",
                },
                {
                  icon: Lock,
                  title: "Immutable Records",
                  desc: "Tamper-proof, audit-safe digital storage ensuring the absolute integrity of sensitive data.",
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-8 rounded-3xl bg-slate-950 border border-slate-800 hover:bg-slate-800/80 transition-all duration-300 shadow-lg shadow-black/10"
                >
                  <div className="h-14 w-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all">
                    <feature.icon className="h-7 w-7 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Vision CTA Section - Full Screen */}
        <section
          id="vision"
          className="min-h-screen flex flex-col justify-center py-24 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-900/10"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center w-full">
            <div className="h-24 w-24 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.2)]">
              <Rocket className="h-12 w-12 text-cyan-400 animate-bounce" />
            </div>

            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 leading-tight">
              Join the Educational Revolution
            </h2>
            <p className="text-2xl md:text-3xl text-slate-300 font-light leading-relaxed mb-16 italic px-4">
              "To build a massively scalable, deeply intelligent infrastructure
              that permanently transforms traditional college administration
              into a completely automated, transparent digital ecosystem."
            </p>
            <button
              onClick={scrollToBottom}
              className="bg-white text-slate-950 hover:bg-slate-200 px-12 py-5 rounded-full font-extrabold text-xl transition-all shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] hover:scale-105 transform hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.6)]"
            >
              Partner With Us Today
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-slate-950 py-20 border-t border-slate-900 text-slate-400"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
            {/* Brand Column */}
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="bg-cyan-500 p-2 rounded-lg">
                  <GraduationCap className="h-7 w-7 text-slate-950" />
                </div>
                <span className="text-2xl font-black text-white tracking-widest uppercase">
                  EduTrack
                </span>
              </div>
              <p className="text-base leading-relaxed pr-4">
                Transforming traditional college administration into a
                transparent, automated, and data-driven digital ecosystem.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="h-12 w-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-12 w-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-cyan-500 hover:text-slate-950 hover:border-cyan-500 transition-all"
                >
                  <Github className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Features Column */}
            <div>
              <h3 className="text-white font-bold text-lg mb-8">
                Platform Features
              </h3>
              <ul className="space-y-5 text-base">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Attendance Tracking
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Dynamic Calendar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Digital Forms Engine
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Immutable Records
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="hover:text-cyan-400 transition-colors"
                  >
                    Global Announcements
                  </button>
                </li>
              </ul>
            </div>

            {/* Portals Column */}
            <div>
              <h3 className="text-white font-bold text-lg mb-8">
                Access Portals
              </h3>
              <ul className="space-y-5 text-base">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Administration Console
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    College Dashboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Teacher Workspace
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Student Application
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Developer API
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h3 className="text-white font-bold text-lg mb-8">
                Request Access
              </h3>
              <p className="text-base leading-relaxed mb-6">
                Ready to completely transform your campus infrastructure? Enter
                your email to begin the onboarding process.
              </p>
              <form
                className="flex flex-col gap-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Official institution email"
                  required
                  className="bg-slate-900 border border-slate-800 text-white px-5 py-4 rounded-xl focus:outline-none focus:border-cyan-500 w-full text-base placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-4 rounded-xl transition-colors text-base text-center w-full"
                >
                  Schedule Demo
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm font-medium">
              &copy; {new Date().getFullYear()} EduTrack Platform. All rights
              reserved globally.
            </div>

            <div className="flex gap-8 text-sm font-medium">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Security
              </a>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="h-12 w-12 rounded-full border border-slate-800 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
