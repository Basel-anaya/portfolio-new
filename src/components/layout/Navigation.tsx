'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Research', href: '/research' },
  { name: 'Blog', href: '/blog' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
    // Force dark mode on mount
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      const body = window.document.body
      root.classList.add('dark')
      body.classList.add('dark')
    }
  }, [])

  // Handle scroll progress
  useEffect(() => {
    if (!mounted) return

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(progress, 100))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [mounted])

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (!mounted) return // Don't run on server
    
    if (mobileMenuOpen) {
      // Store current scroll position
      const scrollY = window.scrollY
      
      // Apply styles to prevent scrolling
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.left = '0'
      document.body.style.right = '0'
      document.body.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
      document.documentElement.style.overflow = 'hidden'
      
      // Add class for additional CSS targeting
      document.body.classList.add('menu-open')
      
      // Store scroll position for restoration
      document.body.setAttribute('data-scroll-y', scrollY.toString())
    } else {
      // Restore scroll position and remove restrictions
      const scrollY = document.body.getAttribute('data-scroll-y')
      
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      
      document.body.classList.remove('menu-open')
      document.body.removeAttribute('data-scroll-y')
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY))
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
      document.documentElement.style.overflow = ''
      document.body.classList.remove('menu-open')
      document.body.removeAttribute('data-scroll-y')
    }
  }, [mobileMenuOpen, mounted])

  // Status indicators with social links
  const statusIndicators = [
    {
      name: 'GitHub',
      color: 'bg-green-500',
      shadowColor: 'shadow-green-500/50',
      url: 'https://github.com/baselanaya',
      isOnline: true
    },
    {
      name: 'Hugging Face',
      color: 'bg-yellow-500',
      shadowColor: 'shadow-yellow-500/50',
      url: 'https://huggingface.co/baselanaya',
      isOnline: true
    },
    {
      name: 'LinkedIn',
      color: 'bg-blue-600',
      shadowColor: 'shadow-blue-600/50',
      url: 'https://linkedin.com/in/baselanaya',
      isOnline: true
    }
  ]

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <>
        {/* Desktop Navigation Skeleton */}
        <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-white/5 px-8 py-4 relative overflow-hidden">
            <div className="relative flex items-center justify-between gap-8">
              <div className="text-white font-bold text-xl">Basel</div>
              <div className="flex items-center space-x-6 flex-1">
                {navigation.map((item) => (
                  <div key={item.name} className="text-sm font-medium px-3 py-2 rounded-lg">
                    {item.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Navigation Skeleton */}
        <div className="md:hidden">
          <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="text-white font-bold text-xl">Basel</div>
              <div className="p-2 text-gray-300">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Scroll Progress Indicator */}
      <div 
        className="scroll-progress" 
        style={{ width: `${scrollProgress}%` }}
        aria-label={`Page scroll progress: ${Math.round(scrollProgress)}%`}
      />
      
      {/* Desktop Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden md:block">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-white/5 px-8 py-4 relative overflow-hidden">
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-2xl"></div>
          
          <div className="relative flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-xl hover:text-gray-200 transition-colors flex-shrink-0">
              Basel
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6 flex-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-all duration-200 px-3 py-2 rounded-lg backdrop-blur-sm',
                    pathname === item.href
                      ? 'text-white bg-white/20 shadow-sm border border-white/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Status Indicators Only */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Status Indicators */}
              <div className="hidden lg:flex items-center space-x-3">
                {statusIndicators.map((indicator) => (
                  <a
                    key={indicator.name}
                    href={indicator.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 group transition-all duration-200 hover:scale-105"
                    title={`Visit ${indicator.name} profile`}
                  >
                    <div className={cn(
                      'w-3 h-3 rounded-full shadow-lg transition-all duration-200',
                      indicator.color,
                      indicator.shadowColor,
                      indicator.isOnline ? 'animate-pulse' : 'opacity-60'
                    )}></div>
                    <span className="text-xs text-gray-300 group-hover:text-white transition-colors">
                      {indicator.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-xl border-b border-white/10">
          <div className="flex items-center justify-between px-6 py-4">
            {/* Logo */}
            <Link href="/" className="text-white font-bold text-xl">
              Basel
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-300 hover:text-white transition-colors"
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu Panel */}
        <div className={cn(
          'fixed top-0 right-0 h-full w-full max-w-xs bg-black/95 backdrop-blur-xl border-l border-white/10 z-50 transform transition-transform duration-300 ease-in-out overflow-hidden',
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
          <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10 flex-shrink-0">
              <span className="text-lg font-semibold text-white">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-300 hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-4 py-6 overflow-y-auto">
              <nav className="space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200',
                      pathname === item.href
                        ? 'text-white bg-white/20 shadow-sm border border-white/30'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-sm font-medium text-white mb-4">Connect</h3>
                <div className="space-y-2">
                  {statusIndicators.map((indicator) => (
                    <a
                      key={indicator.name}
                      href={indicator.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-200"
                    >
                      <div className={cn(
                        'w-3 h-3 rounded-full flex-shrink-0',
                        indicator.color,
                        indicator.isOnline ? 'animate-pulse' : 'opacity-60'
                      )}></div>
                      <span className="text-sm font-medium truncate">{indicator.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 