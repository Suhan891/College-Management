import Header from '@/pages/College/Header'
import SideBar from '@/pages/College/SideBar'
import React from 'react'
//    <div className="flex h-screen bg-[#0a0f1c] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">

export default function CollegeLayout({children}){
    return (
        <div className="flex h-screen bg-[#0a0f1c] text-slate-300 font-sans overflow-hidden selection:bg-blue-500/30">
            <SideBar />
            <main className="flex-1 flex flex-col h-full relative overflow-hidden">
                <Header />
                <div className="flex-1 overflow-y-auto p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}