// src/components/ContactSection.tsx
import React from 'react'
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, GithubIcon, LinkedinIcon } from 'lucide-react'

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Get In Touch</h2>
          <div className="h-1 w-24 bg-white/20 mx-auto mb-8 rounded-full"></div>
          <p className="max-w-2xl mx-auto text-white/70">
            Interested in collaborating on a project or discussing opportunities? 
            I'm always excited to work on innovative solutions that make a real impact.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-xl font-bold mb-6 text-white">Send Me a Message</h3>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm"
                  placeholder="Project Inquiry / Collaboration"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-white/50 backdrop-blur-sm resize-none"
                  placeholder="Tell me about your project or opportunity..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all flex items-center justify-center"
              >
                Send Message
                <SendIcon size={18} className="ml-2" />
              </button>
            </form>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-white flex flex-col justify-between hover:bg-white/10 transition-all duration-300">
            <div>
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <p className="mb-8 text-white/90">
                Currently based in Nuevo León, Mexico, with native-level English and Spanish fluency. 
                Open to remote work and relocation opportunities worldwide.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <MailIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-white/80">jesus@adriangaona.dev</p>
                    <p className="text-white/80 text-sm">jadrianlg16@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <PhoneIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-white/80">+1 (210) 636-1040</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-white/20 p-3 rounded-full mr-4 backdrop-blur-sm">
                    <MapPinIcon size={20} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-white/80">Nuevo León, Mexico</p>
                    <p className="text-white/70 text-sm">Remote & relocation friendly</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/20">
              <h4 className="font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center justify-center"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon size={20} className="text-white" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/20 p-3 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm flex items-center justify-center"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon size={20} className="text-white" />
                </a>
                <a
                  href="mailto:jesus@adriangaona.dev"
                  className="bg-white/20 px-4 py-3 rounded-full hover:bg-white/30 transition-colors backdrop-blur-sm text-sm font-medium"
                >
                  Email Me
                </a>
              </div>
              
              <div className="mt-4 text-sm text-white/80">
                <p>Available for remote work</p>
                <p>Currently training for SF Half Marathon</p>
                <p>Computer Science @ Tecnológico de Monterrey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}