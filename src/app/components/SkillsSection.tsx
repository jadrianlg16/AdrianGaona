// src/components/SkillsSection.tsx
import React from 'react'

interface Skill {
  name: string
  level: number
  category: string
}

export const SkillsSection = () => {
  const skills: Skill[] = [
    { name: 'Python', level: 95, category: 'Programming' },
    { name: 'TypeScript/JavaScript', level: 90, category: 'Programming' },
    { name: 'React/Next.js', level: 88, category: 'Frontend' },
    { name: 'Django/FastAPI', level: 85, category: 'Backend' },
    { name: 'PostgreSQL/MongoDB', level: 82, category: 'Database' },
    { name: 'Docker/Kubernetes', level: 80, category: 'DevOps' },
    { name: 'LangChain/OpenAI', level: 85, category: 'AI/ML' },
    { name: 'Apache Solr/Elasticsearch', level: 78, category: 'Search' },
    { name: 'Git/GitHub Actions', level: 88, category: 'DevOps' },
    { name: 'Swift/iOS Development', level: 75, category: 'Mobile' },
    { name: 'Unity/Game Development', level: 70, category: 'Specialized' },
    { name: 'Financial Systems', level: 85, category: 'Domain' },
  ]

  const categories = ['Programming', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Database', 'Search', 'Mobile', 'Specialized', 'Domain']

  return (
    <section id="skills" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Technical Skills</h2>
          <div className="h-1 w-24 bg-white/20 mx-auto mb-8 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-white/70">
            Five years of hands-on experience across full-stack development, AI/ML systems, 
            and enterprise automation. Continuously learning and adapting to new technologies.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto mb-16 p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
          {/* Ambient background glows for the cloud effect */}
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-wrap justify-center items-center gap-4 md:gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className={`group relative px-5 py-2.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/15 hover:border-white/30 transition-all duration-300 cursor-help
                  hover:-translate-y-2 hover:scale-105 hover:shadow-[0_10px_20px_rgba(255,255,255,0.05)]
                  ${skill.level >= 90 ? 'text-lg font-medium text-white px-6 py-3' : skill.level >= 80 ? 'text-base text-white/90' : 'text-sm text-white/70'}`}
              >
                {skill.name}
                
                {/* Tooltip on hover */}
                <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black/80 border border-white/20 rounded text-xs text-white/90 whitespace-nowrap pointer-events-none">
                  Category: {skill.category}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white">
              Core Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'Python', 'TypeScript', 'JavaScript', 'Swift', 'C++', 'HTML/CSS',
                'React', 'Next.js', 'Django', 'FastAPI', 'Flask', 'Unity',
                'PostgreSQL', 'MongoDB', 'MySQL', 'Apache Solr', 'Elasticsearch',
                'Docker', 'GitHub Actions', 'OCI', 'AWS'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6 text-white">
              AI & Automation Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                'LangChain', 'LangGraph', 'OpenAI API', 'Whisper AI', 'LM Studio',
                'PyTorch', 'Transformers', 'FAISS', 'Pinecone', 'RAG Pipelines',
                'Vector Databases', 'Prompt Engineering', 'Fine-tuning', 'OCR',
                'Computer Vision', 'NLP'
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white/80 hover:bg-white/20 hover:text-white transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-white hover:bg-white/10 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Professional Expertise
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Full-Stack Development</h4>
              <p className="text-white/90 text-sm">End-to-end application development from conception to deployment</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">AI/ML Integration</h4>
              <p className="text-white/90 text-sm">LLM deployment, RAG systems, and intelligent automation</p>
            </div>
            <div className="text-center">
              <h4 className="text-lg font-semibold mb-2">Enterprise Systems</h4>
              <p className="text-white/90 text-sm">Secure, scalable solutions for business-critical applications</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}