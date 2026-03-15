import { AlertTriangle } from 'lucide-react'
import React from 'react'

import { Users, CalendarDays, ShieldAlert,Smartphone  } from 'lucide-react';

const Problem = () => {
  return (
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
  )
}

export default Problem
