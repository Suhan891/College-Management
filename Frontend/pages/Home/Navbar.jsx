import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import React from "react";

const Navbar = ({
  scrollToSection,
  scrollToBottom,
  setIsMobileMenuOpen,
  isMobileMenuOpen,
}) => {
  return (
    <nav className="fixed w-full top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20 md:h-24 transition-all">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <GraduationCap className="h-10 w-10 text-cyan-500" />
            <span className="text-2xl font-extrabold text-white tracking-tight">
              Edu<span className="text-cyan-500">Track</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-16">
            <button
              onClick={() => scrollToSection("problem")}
              className="text-xl font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Problems
            </button>
            <button
              onClick={() => scrollToSection("solution")}
              className="text-xl font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Solution
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-xl font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("vision")}
              className="text-xl font-semibold text-slate-300 hover:text-cyan-400 transition-colors"
            >
              Vision
            </button>
          </div>

          <div className="hidden md:flex">
            <button
              // onClick={scrollToBottom}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full text-base font-bold transition-all transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              <Link href={"/auth"}> Get Started</Link>
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
  );
};

export default Navbar;
