import { Bell, CheckCircle2, GraduationCap, Lock, Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import { Users, CalendarDays, BookOpen,Settings, LayoutDashboard  } from 'lucide-react';

const Solution = () => {
  return (
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
                              width={25}
                              height={25}
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
  )
}

export default Solution
