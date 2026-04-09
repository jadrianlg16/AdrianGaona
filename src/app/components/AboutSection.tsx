// src/components/AboutSection.tsx
'use client'
import React from 'react'
import Image from 'next/image'
import { CodeIcon, BrainIcon, UsersIcon } from 'lucide-react'
import pfp from '../../../public/images/pfp.png'

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">About Me</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg absolute inset-0 transform translate-x-3 translate-y-3"></div>
            <Image
              src={pfp}
              alt="Jesús Adrián López García"
              width={800}
              height={600}
              className="rounded-lg shadow-2xl relative z-10 w-full h-auto border-4 border-white/20"
            />
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-6 text-white">Who am I?</h3>
            <p className="text-white/80 mb-6 leading-relaxed">
              I'm a multidisciplinary engineer, accountant, and entrepreneur from Nuevo León, Mexico, 
              with five years of hands-on experience crafting full-stack web applications, AI-powered 
              automation pipelines, and secure back-office systems. Currently pursuing Computer Science 
              at Tecnológico de Monterrey with a 93 average.
            </p>
            <p className="text-white/80 mb-8 leading-relaxed">
              I thrive in fast-moving, ambiguity-heavy environments and enjoy leading projects end-to-end: 
              from ideation to architecture to deployment. When I'm not coding, you'll find me training for 
              my next half marathon, planning my artisanal panadería, or exploring new cities through 
              immersive cultural experiences.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="bg-purple-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <CodeIcon size={24} className="text-purple-400" />
                </div>
                <h4 className="font-bold mb-2 text-white">Full-Stack Development</h4>
                <p className="text-sm text-white/70">
                  React, Django, FastAPI, and modern cloud architectures
                </p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="bg-pink-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <BrainIcon size={24} className="text-pink-400" />
                </div>
                <h4 className="font-bold mb-2 text-white">AI & Automation</h4>
                <p className="text-sm text-white/70">
                  LangChain, RAG pipelines, and on-premises LLM deployments
                </p>
              </div>
              
              <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="bg-yellow-500/20 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <UsersIcon size={24} className="text-yellow-400" />
                </div>
                <h4 className="font-bold mb-2 text-white">Business Leadership</h4>
                <p className="text-sm text-white/70">
                  Project management, stakeholder comms, and team coordination
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}