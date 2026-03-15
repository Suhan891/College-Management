import { Rocket } from 'lucide-react'
import React from 'react'

const Vision = ({scrollToBottom}) => {
  return (
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
              &quot;To build a massively scalable, deeply intelligent infrastructure
              that permanently transforms traditional college administration
              into a completely automated, transparent digital ecosystem.&quot;
            </p>
            <button
              onClick={scrollToBottom}
              className="bg-white text-slate-950 hover:bg-slate-200 px-12 py-5 rounded-full font-extrabold text-xl transition-all shadow-[0_0_60px_-10px_rgba(255,255,255,0.4)] hover:scale-105 transform hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.6)]"
            >
              Partner With Us Today
            </button>
          </div>
        </section>
  )
}

export default Vision
