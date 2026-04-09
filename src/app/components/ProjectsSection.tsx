// src/components/ProjectsSection.tsx
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
  technologies: string[]
}

export const ProjectsSection = () => {
  const projects: Project[] = [
    {
      id: 1,
      title: 'HowlX: AI-Powered Customer Service Platform',
      category: 'AI Application',
      description: 'Comprehensive AI-powered platform transforming customer service call recordings into actionable business intelligence. Features automated transcription with OpenAI Whisper, sentiment analysis, risk detection, RAG-based intelligent chat system, and comprehensive analytics dashboard with role-based access control for administrators, supervisors, and consultants.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['React', 'Python', 'OpenAI Whisper', 'GPT-4', 'RAG', 'Redis', 'PostgreSQL']
    },
    {
      id: 2,
      title: 'Palladium Document Management System',
      category: 'Enterprise Software',
      description: 'Secure, scalable local DMS with ACL permissions, OCR pipeline, and vector search capabilities. Features Docker deployment and industry-grade document handling.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['Django', 'React', 'PostgreSQL', 'Apache Solr', 'Docker']
    },
    {
      id: 3,
      title: 'AI Web Agency Platform',
      category: 'AI Application',
      description: 'Automated platform that crawls SMB websites, analyzes performance metrics, and generates modernized mockups with AI-powered sales outreach.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['Next.js', 'Django', 'PostgreSQL', 'OpenAI GPT-4', 'Playwright']
    },
    {
      id: 4,
      title: 'AI Transcription & Processing Tool',
      category: 'Desktop Application',
      description: 'Python desktop app with Whisper AI for audio transcription, meeting summaries, and interactive Q&A using both cloud and on-premises LLMs.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['Python', 'Tkinter', 'OpenAI API', 'Whisper AI', 'LM Studio']
    },
    {
      id: 5,
      title: 'YConecta iOS App',
      category: 'Mobile Application',
      description: 'iOS prototype connecting individuals with NGOs, facilitating communication and support with companion web platform for updates and feedback.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['Swift', 'Flask', 'MongoDB', 'iOS Development']
    },
    {
      id: 6,
      title: 'Smart Stop IoT System',
      category: 'IoT Project',
      description: 'Intelligent bus stop prototype with automated weather-responsive features to enhance passenger experience and optimize transportation efficiency.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['NodeMCU', 'MySQL', 'JavaScript', 'PHP', 'Fusion 360']
    },
    {
      id: 7,
      title: 'Industrial Safety Training Platform',
      category: 'Gamification',
      description: 'Gamified 2D simulation and web application for Regal Rexnord to improve employee safety training with analytics and user management.',
      image: howlx,
      demoLink: '#',
      githubLink: '#',
      technologies: ['Unity', 'Django', 'React', 'MySQL', 'Game Development']
    },
  ]

  const [filter, setFilter] = useState<string>('all')
  const categories = ['all', 'Enterprise Software', 'AI Application', 'Desktop Application', 'Mobile Application', 'IoT Project', 'Gamification']
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Featured Projects</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-white/70">
            A selection of projects spanning enterprise software, AI applications, and innovative solutions. 
            From academic collaborations to individual ventures, each represents unique technical challenges and real-world problem solving.
          </p>
        </div>
        
        <div className="flex justify-center mb-12 overflow-x-auto">
          <div className="flex gap-2 min-w-max px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm whitespace-nowrap ${
                  filter === category 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                    : 'bg-white/5 backdrop-blur-sm border border-white/10 text-white/80 hover:bg-white/10'
                }`}
              >
                {category === 'all' ? 'All Projects' : category}
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
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white pr-2">{project.title}</h3>
                  <span className="text-xs font-medium px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30 whitespace-nowrap">
                    {project.category}
                  </span>
                </div>
                <p className="text-white/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-1 bg-white/10 text-white/80 rounded border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            View All Projects on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}