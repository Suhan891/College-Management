"use client"
import React, { useState } from "react";

import Footer from "@/pages/Home/Footer";
import Navbar from "@/pages/Home/Navbar";
import Hero from "@/pages/Home/Hero";
import Problem from "@/pages/Home/Problem";
import Solution from "@/pages/Home/Solution";
import Features from "@/pages/Home/Features";
import Vision from "@/pages/Home/Vision";

// All of them shall be separated in components later

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 scroll-smooth">
      <Navbar
        scrollToSection={scrollToSection}
        scrollToBottom={scrollToBottom}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main>
        <Hero scrollToBottom={scrollToBottom} />
        <Problem />
        <Solution />
        <Features />
        <Vision scrollToBottom={scrollToBottom} />
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}