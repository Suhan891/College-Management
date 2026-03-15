"use client"
import Link from 'next/link';
import { Book, BookOpen, Building2, GraduationCap, Layers, LayoutDashboard, LogOut, User, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react'
import { useUIStore } from '@/store/UIStore';

export default function SideBar (){
    const pathName = usePathname()
  const setActiveTab = useUIStore(state => state.setActiveTab)
    const isActive = (path) =>path === pathName
    const sidebarLinks = [
    { name: 'Home', icon: LayoutDashboard, href: '/' },
    { name: 'Course', icon: BookOpen, href: '/course' },
    { name: 'Departments', icon: Building2, href: '/departments' },
    { name: 'Stream', icon: Layers, href: '/stream' },
    { name: 'Class', icon: Users, href: '/class' },
    { name: 'Student', icon: GraduationCap, href: '/student' },
    { name: 'Teacher', icon: User, href: '/teacher' },
   // { name: 'Subjects', icon: Book, href: '/subjects' },
    // { name: 'Profile', icon: User, href: '/profile' },
  ];
  return (
          <aside className="w-64 bg-slate-950 border-r border-slate-800/60 hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center gap-3 px-6 border-b border-slate-800/60 mt-2">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">EduTrack</span>
        </div>
        <div className="px-4 py-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Main Menu
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {sidebarLinks.map((link) => {          
          return (
            <Link
              key={link.name}
              href={`/dashboard/college${link.href}`}
              onClick={()=> setActiveTab(link.name)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive(`/dashboard/college${link.href}`)
                  ? 'bg-blue-500/10 text-blue-400' 
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <link.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
              {link.name}
            </Link>
          );
        })}
        </nav>
        <div className="p-4 border-t border-slate-800/60">
          <button 
            type="button"
            // onClick={handleLogout} 
            className="flex items-center gap-3 text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors px-3 py-2.5 rounded-lg w-full text-sm font-medium"
          >
            <LogOut className="h-5 w-5" /> Sign Out
          </button>
        </div>
      </aside>
  )
}