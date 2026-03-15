import { ArrowUp, Github, GraduationCap, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Footer = ({scrollToSection}) => {
  return (
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
  )
}

export default Footer
