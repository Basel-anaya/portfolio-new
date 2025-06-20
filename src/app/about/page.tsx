'use client'

import { useEffect, useRef, useState } from 'react'
import { personalInfo } from '@/data/portfolio'

export default function AboutPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            
            // Staggered animations for child elements
            const cards = entry.target.querySelectorAll('.stagger-item')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in')
              }, index * 150)
            })
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [mounted])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen dot-gradient-bg text-foreground relative">
      <style jsx global>{`
        .scroll-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-section.animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .stagger-item {
          opacity: 0;
          transform: translateY(40px) rotateX(10deg);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .stagger-item.animate-in {
          opacity: 1;
          transform: translateY(0) rotateX(0deg);
        }

        .stagger-item:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
      `}</style>

      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div 
              ref={(el) => { sectionsRef.current[0] = el }}
              className="scroll-section text-center mb-20"
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
                About Me
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">
                  AI Engineer passionate about creating innovative solutions at the intersection of AI, Medicine & Robotics
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
              </div>
            </div>
            
            {/* Main Bio Section */}
            <div 
              ref={(el) => { sectionsRef.current[1] = el }}
              className="scroll-section mb-16"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-2xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Who I Am</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {personalInfo.bio}
                </p>
              </div>
            </div>

            {/* Specialties Section */}
            <div 
              ref={(el) => { sectionsRef.current[2] = el }}
              className="scroll-section mb-16"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">My Specialties</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {personalInfo.specialties.map((specialty, index) => (
                    <div key={index} className="stagger-item bg-white/10 rounded-lg p-4 text-center border border-white/10 hover:bg-white/15 transition-all duration-300">
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto mb-3"></div>
                      <span className="text-gray-300 font-medium">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Currently Learning Section */}
            <div 
              ref={(el) => { sectionsRef.current[3] = el }}
              className="scroll-section mb-16"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Currently Learning</h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {personalInfo.currentlyLearning.map((item, index) => (
                    <div key={index} className="stagger-item bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-full px-6 py-3 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300">
                      <span className="text-white font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Interests Section */}
            <div 
              ref={(el) => { sectionsRef.current[4] = el }}
              className="scroll-section mb-16"
            >
              <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 md:p-12 shadow-2xl text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">When I'm Not Coding</h2>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
                  {personalInfo.interests}
                </p>
              </div>
            </div>

            {/* Contact Section - Enhanced */}
            <div 
              ref={(el) => { sectionsRef.current[5] = el }}
              className="scroll-section mb-16"
            >
              <div className="text-center mb-12">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
                  I'm always open to discussing new opportunities, collaborations, and innovative AI projects. Let's connect!
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Form */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
                  
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.target as HTMLFormElement)
                      const name = formData.get('name')
                      const email = formData.get('email')
                      const subject = formData.get('subject')
                      const message = formData.get('message')
                      
                      const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject as string || 'Contact from Portfolio')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`
                      window.location.href = mailtoLink
                    }}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                        placeholder="Project Collaboration"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 resize-none"
                        placeholder="Tell me about your project or idea..."
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Contact Information & Quick Actions */}
                <div className="space-y-8">
                  {/* Contact Info */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Email</h4>
                          <a href={`mailto:${personalInfo.email}`} className="text-gray-300 hover:text-blue-400 transition-colors">
                            {personalInfo.email}
                          </a>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Location</h4>
                          <p className="text-gray-300">{personalInfo.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V19C3 20.1 3.9 21 5 21H11V19H5V3H13V9H21Z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Current Role</h4>
                          <p className="text-gray-300">{personalInfo.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Contact Methods */}
                  <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6">Quick Connect</h3>
                    
                    <div className="space-y-4">
                      <a
                        href={`mailto:${personalInfo.email}?subject=Professional Inquiry&body=Hi Basel,%0D%0A%0D%0AI'd like to connect professionally to discuss...`}
                        className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-blue-600/20 rounded-full flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Professional Email</h4>
                          <p className="text-gray-300 text-sm">For work inquiries</p>
                        </div>
                      </a>
                      
                      <a
                        href={`mailto:${personalInfo.email}?subject=Research Collaboration&body=Hi Basel,%0D%0A%0D%0AI'm interested in discussing research collaboration in...`}
                        className="flex items-center gap-4 p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 group"
                      >
                        <div className="w-10 h-10 bg-purple-600/20 rounded-full flex items-center justify-center group-hover:bg-purple-600/30 transition-colors">
                          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">Research Collaboration</h4>
                          <p className="text-gray-300 text-sm">Discuss AI research</p>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-white/20 p-8 shadow-2xl text-center">
                    <h3 className="text-xl font-bold text-white mb-4">Let's Collaborate!</h3>
                    <p className="text-gray-300 mb-6 text-sm">
                      Whether it's a new project, research collaboration, or just a chat about AI - I'm always excited to connect with fellow innovators.
                    </p>
                    <a
                      href={`mailto:${personalInfo.email}?subject=Let's Collaborate!&body=Hi Basel,%0D%0A%0D%0AI'd love to discuss...`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg"
                    >
                      Start Collaboration
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 