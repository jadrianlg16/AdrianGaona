
// src/components/ProjectsSection.tsx - ONLY Image component changes
'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { ExternalLinkIcon, GithubIcon } from 'lucide-react'
import type { StaticImageData } from 'next/image'
import howlx from '../../../public/images/howlx-intro.png'

interface Project {
  id: number
  title: string
  category: string
  description: string
  image: StaticImageData
  demoLink: string
  githubLink: string
}

export const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'E-Commerce Dashboard',
      category: 'Web Application',
      description: 'A comprehensive dashboard for managing online store inventory, sales, and customer data.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 2,
      title: 'Travel Companion App',
      category: 'Mobile App',
      description: 'An app that helps travelers plan trips, discover local attractions, and share experiences.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 3,
      title: 'Fitness Tracker',
      category: 'Web Application',
      description: 'A web app for tracking workouts, setting fitness goals, and monitoring progress over time.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
    },
    {
      id: 4,
      title: 'Recipe Finder',
      category: 'Web Application',
      description: 'A platform that helps users discover recipes based on ingredients they already have.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
    },
  ]

  const [filter, setFilter] = useState<string>('all')
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category.toLowerCase() === filter.toLowerCase())

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-white/70">
            Here's a selection of my recent work. Each project presented unique
            challenges and opportunities for creative problem-solving.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-2 justify-center">
            {['all', 'Web Application', 'Mobile App', 'UI Design'].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === category 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={800}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    <a
                      href={project.demoLink}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                      aria-label="View live demo"
                    >
                      <ExternalLinkIcon size={20} className="text-gray-800" />
                    </a>
                    <a
                      href={project.githubLink}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors"
                      aria-label="View source code"
                    >
                      <GithubIcon size={20} className="text-gray-800" />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <span className="text-xs font-medium px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
                    {project.category}
                  </span>
                </div>
                <p className="text-white/70">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

