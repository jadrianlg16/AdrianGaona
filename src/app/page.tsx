// src/app/page.tsx
import { Header } from './components/Header'
import { HeroSection } from './components/HeroSection'
import { AboutSection } from './components/AboutSection'
import { ProjectsSection } from './components/ProjectsSection'
import { SkillsSection } from './components/SkillsSection'
import { ContactSection } from './components/ContactSection'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
    // <div className="min-h-screen bg-[#0f172a] text-white"> {/* Tailwind's slate-900 */}
    // <div className="min-h-screen bg-[#31363b] text-white"> {/* Custom steel grey */}
    <div className="min-h-screen bg-[#31363b] text-white"> {/* Custom steel grey */}



    <Header />
      <main className="w-full">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
