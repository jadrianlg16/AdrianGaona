// src/components/Header.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { MenuIcon, XIcon } from 'lucide-react'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/20 backdrop-blur-md border-b border-white/10 py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-bold text-white">
          Jesús Adrián
        </div>
        
        <nav className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-white/80 hover:text-white transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </nav>
        
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/20 backdrop-blur-md border-b border-white/10 md:hidden">
            <div className="flex flex-col p-4">
              {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="py-2 text-white/80 hover:text-white transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}