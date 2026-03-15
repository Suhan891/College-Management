import { ChevronRight, GraduationCap, Layers, Rocket, ShieldAlert, Users } from 'lucide-react'
import React from 'react'

const Hero = ({scrollToBottom}) => {
  return (
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
          {/* <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-md py-6">
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
          </div> */}
        </section>
  )
}

export default Hero
