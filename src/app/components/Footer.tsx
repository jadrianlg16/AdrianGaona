// src/components/Footer.tsx
'use client'
import React from 'react'
import { ArrowUpIcon } from 'lucide-react'

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold text-white">
              Jesús Adrián López Gaona
            </div>
            <p className="text-white/60 mt-2">
              Building innovative solutions with AI and full-stack expertise.
            </p>
          </div>
          
          <div className="flex space-x-8">
            {['home', 'about', 'projects', 'skills', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="text-white/60 hover:text-white transition-colors capitalize text-sm"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Jesús Adrián López Gaona. All rights reserved.
            </p>
            <p className="text-white/40 text-xs mt-1">
              Computer Science Student @ Tecnológico de Monterrey • Nuevo León, Mexico
            </p>
          </div>
          <button
            onClick={scrollToTop}
            className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20"
            aria-label="Scroll to top"
          >
            <ArrowUpIcon size={20} className="text-white" />
          </button>
        </div>
      </div>
    </footer>
  )
}