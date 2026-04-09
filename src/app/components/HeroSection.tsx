// src/components/HeroSection.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { ChevronDownIcon, GithubIcon, LinkedinIcon, MailIcon } from 'lucide-react'

export const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-purple-400 font-medium mb-4 animate-fade-in">
            Hello, I'm
          </p>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white animate-fade-in">
            Jesús Adrián
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"></div>
          <h2 className="text-2xl md:text-3xl text-white/80 mb-8">
            Full-Stack Engineer & AI Developer
          </h2>
          <p className="text-white/70 mb-12 max-w-2xl mx-auto text-lg">
            Computer Science student and multidisciplinary engineer with 5+ years building 
            full-stack applications, AI-powered automation, and secure enterprise systems. 
            Passionate about merging business intelligence with cutting-edge technology.
          </p>
          
          <div className="flex justify-center space-x-6 mb-12">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={24} />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={24} />
            </a>
            <a
              href="mailto:jesus@adriangaona.dev"
              className="text-white/60 hover:text-white transition-colors p-3 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 hover:bg-white/10"
              aria-label="Email Contact"
            >
              <MailIcon size={24} />
            </a>
          </div>
          
          <button
            onClick={scrollToAbout}
            className="animate-bounce inline-block"
            aria-label="Scroll down"
          >
            <ChevronDownIcon size={36} className="text-white/60" />
          </button>
        </div>
      </div>
    </section>
  )
}