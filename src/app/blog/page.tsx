'use client'

import Link from 'next/link'
import { blogs } from '@/data/portfolio'
import { useEffect, useRef, useState } from 'react'

export default function BlogPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([])
  const [mounted, setMounted] = useState(false)
  
  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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

  useEffect(() => {
    // Add custom styles to document head
    const style = document.createElement('style')
    style.textContent = `
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
      
      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(1deg); }
      }
      
      .animate-float {
        animation: float 6s ease-in-out infinite;
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      
      .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen dot-gradient-bg text-foreground relative">
      <div className="relative z-10">
        <div className="container mx-auto px-6 pt-32 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section */}
            <div 
              ref={(el) => { sectionsRef.current[0] = el }}
              className="scroll-section text-center mb-20"
            >
              <div className="inline-block mb-6">
                <div className="relative">
                  <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6 tracking-tight">
                    Blog
                  </h1>
                  <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-2xl rounded-full"></div>
                </div>
              </div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Insights and thoughts on AI, Machine Learning, and emerging technologies from the frontlines of innovation
              </p>
            </div>
            
            {/* Featured Articles */}
            <div 
              ref={(el) => { sectionsRef.current[1] = el }}
              className="scroll-section mb-20"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">Featured Articles</h2>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-8">
                {sortedBlogs.filter(blog => blog.featured).map((blog, index) => (
                  <div 
                    key={blog.id} 
                    className="stagger-item group relative"
                  >
                    {/* Glassmorphic Card */}
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10">
                      {/* Glow Effect */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      {/* Content */}
                      <div className="relative">
                        {/* Date and Read Time */}
                        <div className="flex items-center gap-3 text-sm text-gray-300 mb-6">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                          </div>
                          <span className="text-gray-500">•</span>
                          <span>{blog.readTime}</span>
                        </div>
                        
                        {/* Title */}
                        <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-blue-300 transition-colors duration-300 leading-tight">
                          {blog.title}
                        </h3>
                        
                        {/* Description */}
                        <p className="text-gray-300 mb-8 line-clamp-3 leading-relaxed">
                          {blog.description}
                        </p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {blog.tags.map((tag) => (
                            <span 
                              key={tag}
                              className="px-3 py-1.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium backdrop-blur-sm hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* CTA Button */}
                        {blog.url ? (
                          <a 
                            href={blog.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                          >
                            Read on Medium
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <span className="inline-flex items-center gap-2 px-6 py-3 bg-gray-500/20 border border-gray-400/30 text-gray-400 rounded-xl font-medium backdrop-blur-sm">
                            Coming Soon
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All Articles */}
            <div 
              ref={(el) => { sectionsRef.current[2] = el }}
              className="scroll-section"
            >
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-white">All Articles</h2>
              </div>
              
              <div className="space-y-6">
                {sortedBlogs.map((blog, index) => (
                  <div 
                    key={blog.id} 
                    className="stagger-item group relative"
                  >
                    {/* Glassmorphic List Item */}
                    <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
                      {/* Subtle Glow */}
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div className="flex-1">
                          {/* Meta Info */}
                          <div className="flex items-center gap-3 text-sm text-gray-400 mb-3">
                            <span>{new Date(blog.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}</span>
                            <span>•</span>
                            <span>{blog.readTime}</span>
                            {blog.featured && (
                              <>
                                <span>•</span>
                                <span className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-300 rounded-full text-xs font-medium">
                                  Featured
                                </span>
                              </>
                            )}
                          </div>
                          
                          {/* Title */}
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                            {blog.title}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-gray-300 mb-4 line-clamp-2 leading-relaxed">
                            {blog.description}
                          </p>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {blog.tags.slice(0, 3).map((tag) => (
                              <span 
                                key={tag}
                                className="px-2.5 py-1 bg-gray-700/50 border border-gray-600/50 text-gray-300 rounded-lg text-sm backdrop-blur-sm"
                              >
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 3 && (
                              <span className="px-2.5 py-1 text-gray-400 text-sm">
                                +{blog.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                        
                        {/* CTA Button */}
                        <div className="flex-shrink-0">
                          {blog.url ? (
                            <a 
                              href={blog.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105 backdrop-blur-sm"
                            >
                              Read Article
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          ) : (
                            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-600/30 border border-gray-500/30 text-gray-400 rounded-xl font-medium backdrop-blur-sm">
                              Coming Soon
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-20">
              <div className="relative bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-xl border border-white/20 rounded-3xl p-12 text-center">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur opacity-50"></div>
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/25">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
                  <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Get notified when I publish new articles about AI, Machine Learning, and emerging technologies.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105"
                  >
                    Subscribe to Updates
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 