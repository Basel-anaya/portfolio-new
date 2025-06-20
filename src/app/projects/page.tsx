'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { spacing, componentSpacing, layouts } from '@/lib/spacing'
import { projects } from '@/data/portfolio'

// Transform projects data to match component structure
const transformedProjects = projects.map((project, index) => ({
  id: index + 1,
  title: project.title,
  description: project.description,
  category: project.id === 'medformer' ? 'Medical AI' :
            project.id === 'loreweaver' ? 'Generative AI' :
            project.id === 'oculus' ? 'Computer Vision' :
            project.id === 'valerie' ? 'Computer Vision' : 'AI',
  status: 'Production',
  technologies: project.technologies,
  features: project.id === 'medformer' ? [
    "Multi-modal input processing (text, images, lab results)",
    "Real-time diagnosis suggestions with confidence scores",
    "Integration with hospital management systems",
    "HIPAA-compliant data handling"
  ] : project.id === 'loreweaver' ? [
    "Multi-domain content generation",
    "Context-aware writing assistance", 
    "Text-to-speech capabilities",
    "Text-to-image story visualization"
  ] : project.id === 'oculus' ? [
    "Travel recommendation engine",
    "Natural language query interface",
    "Real-time API integration",
    "Personalized travel planning"
  ] : project.id === 'valerie' ? [
    "Real-time lip reading with high accuracy",
    "Multi-language support capabilities",
    "Transformer-based architecture",
    "Visual attention mechanisms"
  ] : ["Advanced AI capabilities"],
  metrics: project.id === 'valerie' ? {
    accuracy: "92.8%",
    languages: "5 supported", 
    realTime: "< 100ms"
  } : project.id === 'medformer' ? {
    accuracy: "94.2%",
    processingTime: "< 2 seconds",
    supportedConditions: "150+"
  } : project.id === 'loreweaver' ? {
    users: "Open Source",
    contentGenerated: "Novel Generation",
    satisfaction: "Multimodal"
  } : {
    fps: "Real-time",
    accuracy: "Travel Planning",
    latency: "RAG System"
  },
  demoUrl: project.id === 'medformer' ? "https://github.com/Basel-anaya/MedFormer/blob/main/MedFormer.mp4" : "#",
  githubUrl: project.id === 'medformer' ? "https://github.com/Basel-anaya/MedFormer" :
             project.id === 'loreweaver' ? "https://github.com/Basel-anaya/LoreWeaver" :
             project.id === 'oculus' ? "https://github.com/Basel-anaya/Oculus" : "#",
  featured: project.featured
}))

const projectsData = transformedProjects

const categories = ["All", "Medical AI", "Generative AI", "Computer Vision"]

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredProjects, setFilteredProjects] = useState(projectsData)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(projectsData)
    } else {
      setFilteredProjects(projectsData.filter(project => project.category === selectedCategory))
    }
  }, [selectedCategory])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            
            const cards = entry.target.querySelectorAll('.project-card')
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
  }, [mounted, filteredProjects])

  if (!mounted) {
    return null
  }

  const featuredProjects = filteredProjects.filter(project => project.featured)
  const otherProjects = filteredProjects.filter(project => !project.featured)

  return (
    <>
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

        .project-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .project-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .project-card:hover {
          transform: translateY(-8px) scale(1.02);
        }


        .tech-tag:nth-child(even) {
          animation-delay: -1.5s;
        }

          50% { transform: translateY(-3px); }
        }


        .status-badge::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s ease;
        }

        .status-badge:hover::before {
          left: 100%;
        }
      `}</style>

      <main className="min-h-screen dot-gradient-bg text-foreground relative">
      <div className="relative z-10">
          {/* Hero Section */}
          <section 
            ref={(el) => { sectionsRef.current[0] = el }}
            className={`${layouts.hero} scroll-section`}
          >
            <div className={`${spacing.container.maxWidth} ${spacing.hero.gap}`}>
              <div className="text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4 sm:mb-6">
                  Featured <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Projects</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Innovative AI and Machine Learning solutions that push the boundaries of technology. 
                  From medical diagnosis to creative content generation, explore my journey in building intelligent systems.
              </p>
            </div>
            
              {/* Category Filters */}
              <div className={`flex flex-wrap justify-center ${spacing.content.flexGap}`}>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`${spacing.button.padding} rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          {featuredProjects.length > 0 && (
            <section 
              ref={(el) => { sectionsRef.current[1] = el }}
              className={`${layouts.section} scroll-section`}
            >
              <div className={`${spacing.container.maxWidth} ${spacing.section.gap}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                  Featured Projects
                </h2>
                
                <div className={componentSpacing.projectCard.featuredGrid}>
                  {featuredProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl project-card group transition-all duration-300 hover:shadow-2xl p-5"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center flex-wrap gap-2 mb-2">
                            <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-xs font-medium">
                              {project.category}
                            </span>
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                              project.status === 'Production' ? 'bg-green-500/20 border border-green-400/30 text-green-200' :
                              project.status === 'In Development' ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-200' :
                              project.status === 'Beta' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-200' :
                              'bg-purple-500/20 border border-purple-400/30 text-purple-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors mb-2">
                            {project.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                        {project.description}
                      </p>

                      {/* Key Features */}
                      <div className="mb-3">
                        <h4 className="text-base font-semibold text-white mb-2">Key Features</h4>
                        <ul className="space-y-1.5">
                          {project.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                              <svg className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-xs">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>



                      {/* Technologies */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">Technologies Used</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-[10px] font-medium"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={project.demoUrl}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg relative overflow-hidden group px-4 py-2 text-sm"
                        >
                          <span className="relative z-10">View Demo</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        </Link>
                        <Link
                          href={project.githubUrl}
                          className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Other Projects */}
          {otherProjects.length > 0 && (
            <section 
              ref={(el) => { sectionsRef.current[2] = el }}
              className={`${layouts.section} scroll-section`}
            >
              <div className={`${spacing.container.maxWidth} ${spacing.section.gap}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                  Other Projects
                </h2>
                
                <div className={componentSpacing.researchCard.grid}>
                  {otherProjects.map((project, index) => (
                    <div
                      key={project.id}
                      className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg project-card group transition-all duration-300 p-4"
                    >
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-xs font-medium">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          project.status === 'Production' ? 'bg-green-500/20 border border-green-400/30 text-green-200' :
                          project.status === 'In Development' ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-200' :
                          project.status === 'Beta' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-200' :
                          'bg-purple-500/20 border border-purple-400/30 text-purple-200'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-xs leading-relaxed mb-3">
                        {project.description}
                      </p>



                      {/* Technologies */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-300 rounded text-[10px]"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-1.5 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-400 rounded text-[10px]">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={project.demoUrl}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded font-medium text-center text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="relative z-10">View Demo</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        </Link>
                        <Link
                          href={project.githubUrl}
                          className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-all duration-300"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Call to Action */}
          <section 
            ref={(el) => { sectionsRef.current[3] = el }}
            className={`${layouts.section} scroll-section`}
          >
            <div className="flex justify-center">
              <div className="max-w-2xl w-full bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-xl rounded-2xl border border-white/20 text-center shadow-2xl p-6 sm:p-8">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Have a Project in Mind?
                </h2>
                <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto">
                  Let's collaborate on building the next generation of AI-powered solutions. 
                  From concept to deployment, I'm here to bring your ideas to life.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10">Start a Project</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </Link>
                  <Link
                    href="/about"
                    className="px-5 py-2.5 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    Learn More About Me
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  )
} 