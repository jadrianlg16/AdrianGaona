// SkillsSection.tsx
import React from 'react'

interface Skill {
  name: string
  level: number
  category: string
}

export const SkillsSection = () => {
  const skills: Skill[] = [
    { name: 'JavaScript', level: 90, category: 'Frontend' },
    { name: 'React', level: 85, category: 'Frontend' },
    { name: 'TypeScript', level: 80, category: 'Frontend' },
    { name: 'HTML/CSS', level: 95, category: 'Frontend' },
    { name: 'Node.js', level: 75, category: 'Backend' },
    { name: 'Express', level: 70, category: 'Backend' },
    { name: 'MongoDB', level: 65, category: 'Backend' },
    { name: 'UI/UX Design', level: 80, category: 'Design' },
    { name: 'Figma', level: 85, category: 'Design' },
    { name: 'Responsive Design', level: 90, category: 'Design' },
  ]

  const categories = ['Frontend', 'Backend', 'Design']

  return (
    <section id="skills" className="py-20 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">My Skills</h2>
          <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-8"></div>
          <p className="max-w-2xl mx-auto text-white/70">
            I've developed expertise in various technologies and tools through
            years of practice and continuous learning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {categories.map((category) => (
            <div key={category} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <h3 className="text-xl font-bold mb-6 text-center text-white">{category}</h3>
              <div className="space-y-6">
                {skills
                  .filter((skill) => skill.category === category)
                  .map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-white">{skill.name}</span>
                        <span className="text-sm text-white/60">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
          <h3 className="text-2xl font-bold mb-6 text-center text-white">
            Technologies I Work With
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              'JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'MongoDB',
              'HTML5', 'CSS3', 'Tailwind CSS', 'Git', 'Figma', 'Adobe XD',
              'Responsive Design', 'RESTful APIs',
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
    </section>
  )
}
