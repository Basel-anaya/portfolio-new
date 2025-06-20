'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { spacing, componentSpacing, layouts } from '@/lib/spacing'

// Research publications
const researchData = [
  {
    id: 1,
    title: "Valerie: A Visual ASR Language Model for Lips Reading",
    authors: ["Basel Anaya"],
    journal: "Under work",
    year: 2025,
    status: "In Progress",
    category: "Computer Vision",
    abstract: "We present Valerie, a novel visual automatic speech recognition (ASR) language model that combines computer vision and natural language processing for accurate lip reading. Our approach leverages transformer architectures with specialized visual attention mechanisms to decode speech from lip movements, achieving state-of-the-art performance on multiple lip reading benchmarks while maintaining real-time processing capabilities.",
    keywords: ["Lip Reading", "Visual ASR", "Computer Vision", "Transformers", "Speech Recognition", "Multimodal AI"],
    citations: 0,
    impact: "High",
    doi: "In Progress",
    pdfUrl: "#",
    codeUrl: "#",
    featured: true,
    metrics: {
      accuracy: "92.8%",
      languages: "5 supported",
      realTime: "< 100ms"
    },
    customIcon: (
      <svg data-name="Layer 1" id="wave" viewBox="0 0 50 38.05" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
        <title>Audio Wave</title>
        <path d="M0.91,15L0.78,15A1,1,0,0,0,0,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H0.91Z" data-name="Line 1" id="Line_1"></path>
        <path d="M6.91,9L6.78,9A1,1,0,0,0,6,10V28a1,1,0,1,0,2,0s0,0,0,0V10A1,1,0,0,0,7,9H6.91Z" data-name="Line 2" id="Line_2"></path>
        <path d="M12.91,0L12.78,0A1,1,0,0,0,12,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H12.91Z" data-name="Line 3" id="Line_3"></path>
        <path d="M18.91,10l-0.12,0A1,1,0,0,0,18,11V27a1,1,0,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H18.91Z" data-name="Line 4" id="Line_4"></path>
        <path d="M24.91,15l-0.12,0A1,1,0,0,0,24,16v6a1,1,0,0,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H24.91Z" data-name="Line 5" id="Line_5"></path>
        <path d="M30.91,10l-0.12,0A1,1,0,0,0,30,11V27a1,1,0,2,0s0,0,0,0V11a1,1,0,0,0-1-1H30.91Z" data-name="Line 6" id="Line_6"></path>
        <path d="M36.91,0L36.78,0A1,1,0,0,0,36,1V37a1,1,0,1,0,2,0s0,0,0,0V1a1,1,0,0,0-1-1H36.91Z" data-name="Line 7" id="Line_7"></path>
        <path d="M42.91,9L42.78,9A1,1,0,0,0,42,10V28a1,1,0,2,0s0,0,0,0V10a1,1,0,0,0-1-.991Z" data-name="Line 8" id="Line_8"></path>
        <path d="M48.91,15l-0.12,0A1,1,0,0,0,48,16v6a1,1,0,1,0,2,0s0,0,0,0V16a1,1,0,0,0-1-1H48.91Z" data-name="Line 9" id="Line_9"></path>
      </svg>
    )
  }
]

const categories = ["All", "Computer Vision"]
const statusFilters = ["All", "Published", "Under Review", "In Progress", "In Preparation"]

export default function ResearchPage() {
  const [mounted, setMounted] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const [filteredResearch, setFilteredResearch] = useState(researchData)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let filtered = researchData

    if (selectedCategory !== "All") {
      filtered = filtered.filter(paper => paper.category === selectedCategory)
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter(paper => paper.status === selectedStatus)
    }

    setFilteredResearch(filtered)
  }, [selectedCategory, selectedStatus])

  useEffect(() => {
    if (!mounted) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
            
            const cards = entry.target.querySelectorAll('.research-card')
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in')
              }, index * 100)
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
  }, [mounted, filteredResearch])

  if (!mounted) {
    return null
  }

  const featuredResearch = filteredResearch.filter(paper => paper.featured)
  const otherResearch = filteredResearch.filter(paper => !paper.featured)
  const totalCitations = researchData.reduce((sum, paper) => sum + paper.citations, 0)
  const publishedPapers = researchData.filter(paper => paper.status === "Published").length

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

        .research-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .research-card.animate-in {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .research-card:hover {
          transform: translateY(-8px) scale(1.02);
        }

        .citation-pulse {
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
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
                  Research & <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Publications</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Advancing the frontiers of AI and Machine Learning through rigorous research. 
                  Explore my contributions to computer vision, natural language processing, and deep learning.
              </p>
            </div>
            
              {/* Research Area Filters */}
              <div className={`flex flex-wrap justify-center ${spacing.content.flexGap}`}>
                {categories.map((area) => (
                  <button
                    key={area}
                    onClick={() => setSelectedCategory(area)}
                    className={`${spacing.button.padding} rounded-full font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                      selectedCategory === area
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'bg-white/10 backdrop-blur-xl border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Featured Research */}
          {featuredResearch.length > 0 && (
            <section 
              ref={(el) => { sectionsRef.current[1] = el }}
              className={`${layouts.section} scroll-section`}
            >
              <div className={`${spacing.container.maxWidth} ${spacing.section.gap}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                  Featured Publications
                </h2>
                
                <div className={componentSpacing.researchCard.grid}>
                  {featuredResearch.map((paper, index) => (
                    <div
                      key={paper.id}
                      className="bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 shadow-xl research-card group transition-all duration-300 hover:shadow-2xl p-5"
                    >
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="px-2.5 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-xs font-medium">
                          {paper.category}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          paper.status === 'Published' ? 'bg-green-500/20 border border-green-400/30 text-green-200' :
                          paper.status === 'Under Review' ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-200' :
                          paper.status === 'In Progress' ? 'bg-orange-500/20 border border-orange-400/30 text-orange-200' :
                          paper.status === 'Accepted' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-200' :
                          'bg-purple-500/20 border border-purple-400/30 text-purple-200'
                        }`}>
                          {paper.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {paper.customIcon && (
                          <div className="text-blue-400">
                            {paper.customIcon}
                          </div>
                        )}
                        <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                          {paper.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 leading-relaxed mb-3 text-sm">
                        {paper.abstract}
                      </p>

                      {/* Authors */}
                      <div className="mb-3">
                        <h4 className="text-base font-semibold text-white mb-2">Authors</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {paper.authors.map((author, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-0.5 rounded-full text-xs ${
                                author === 'Basel Anaya' 
                                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-100 font-semibold' 
                                  : 'bg-gray-800/50 border border-gray-700 text-gray-300'
                              }`}
                            >
                              {author}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-400 mb-2">Keywords</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {paper.keywords.map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-300 rounded-full text-[10px] font-medium"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link
                          href={paper.pdfUrl}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg relative overflow-hidden group px-4 py-2 text-sm"
                        >
                          <span className="relative z-10">Read Paper</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        </Link>
                        {paper.codeUrl && (
                          <Link
                            href={paper.codeUrl}
                            className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Other Publications */}
          {otherResearch.length > 0 && (
            <section 
              ref={(el) => { sectionsRef.current[2] = el }}
              className={`${layouts.section} scroll-section`}
            >
              <div className={`${spacing.container.maxWidth} ${spacing.section.gap}`}>
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12">
                  Other Publications
                </h2>
                
                <div className={componentSpacing.researchCard.grid}>
                  {otherResearch.map((paper, index) => (
                    <div
                      key={paper.id}
                      className="bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg research-card group transition-all duration-300 p-4"
                    >
                      <div className="flex items-center flex-wrap gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-xs font-medium">
                          {paper.category}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          paper.status === 'Published' ? 'bg-green-500/20 border border-green-400/30 text-green-200' :
                          paper.status === 'Under Review' ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-200' :
                          paper.status === 'In Progress' ? 'bg-orange-500/20 border border-orange-400/30 text-orange-200' :
                          paper.status === 'Accepted' ? 'bg-blue-500/20 border border-blue-400/30 text-blue-200' :
                          'bg-purple-500/20 border border-purple-400/30 text-purple-200'
                        }`}>
                          {paper.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        {paper.customIcon && (
                          <div className="text-blue-400">
                            {paper.customIcon}
                          </div>
                        )}
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-200 transition-colors">
                          {paper.title}
                        </h3>
                      </div>

                      <p className="text-gray-300 text-xs leading-relaxed mb-3">
                        {paper.abstract.length > 150 ? `${paper.abstract.substring(0, 150)}...` : paper.abstract}
                      </p>

                      {/* Authors */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {paper.authors.slice(0, 3).map((author, idx) => (
                            <span
                              key={idx}
                              className={`px-1.5 py-0.5 rounded text-[10px] ${
                                author === 'Basel Anaya' 
                                  ? 'bg-gradient-to-r from-blue-500/30 to-purple-500/30 border border-blue-400/50 text-blue-100 font-semibold' 
                                  : 'bg-gray-800/50 border border-gray-700 text-gray-300'
                              }`}
                            >
                              {author}
                            </span>
                          ))}
                          {paper.authors.length > 3 && (
                            <span className="px-1.5 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-400 rounded text-[10px]">
                              +{paper.authors.length - 3}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {paper.keywords.slice(0, 4).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="px-1.5 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-300 rounded text-[10px]"
                            >
                              {keyword}
                            </span>
                          ))}
                          {paper.keywords.length > 4 && (
                            <span className="px-1.5 py-0.5 bg-gray-800/50 border border-gray-700 text-gray-400 rounded text-[10px]">
                              +{paper.keywords.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          href={paper.pdfUrl}
                          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded font-medium text-center text-sm hover:from-blue-700 hover:to-purple-700 transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="relative z-10">Read Paper</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                        </Link>
                        {paper.codeUrl && (
                          <Link
                            href={paper.codeUrl}
                            className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded hover:bg-white/20 transition-all duration-300"
                          >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </Link>
                        )}
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
                  Interested in Collaboration?
                </h2>
                <p className="text-base text-gray-300 mb-6 max-w-xl mx-auto">
                  I'm always open to discussing research opportunities, joint publications, 
                  and innovative AI projects. Let's push the boundaries of what's possible together.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    href="/contact"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg relative overflow-hidden group"
                  >
                    <span className="relative z-10">Start Collaboration</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                  </Link>
                  <Link
                    href="/projects"
                    className="px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all duration-300"
                  >
                    View My Projects
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