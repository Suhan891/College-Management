"use client"
import { useUIStore } from "@/store/UIStore";
import { Bell, ChevronRight, GraduationCap, User } from "lucide-react";

export default function Header() {
    // Later all the data will be fetched from zustand
    const activeTab = useUIStore(state => state.activeTab)
    return (
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
                <p className="text-sm font-medium text-white">Admin User</p>
                <p className="text-xs text-slate-500">College Portal</p>
              </div>
              <div className="h-9 w-9 bg-gradient-to-tr from-blue-600 to-cyan-500 rounded-full p-[2px]">
                <div className="h-full w-full bg-slate-900 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
              </div>
            </div>
          </div>
        </header>
    )
}