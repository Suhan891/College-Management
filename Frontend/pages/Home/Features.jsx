import React from 'react'

import { Users, CalendarDays, Layers,Settings, LayoutDashboard, ClipboardList, MapPin, Megaphone, Lock  } from 'lucide-react';

const Features = () => {
  return (
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
                We&apos;ve built everything you need to run a modern, efficient
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
  )
}

export default Features
