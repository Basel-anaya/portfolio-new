import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { useEffect, useRef, useState } from "react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// Enhanced scroll observer hook
export function useEnhancedScrollObserver(options?: IntersectionObserverInit) {
  const [mounted, setMounted] = useState(false)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const defaultOptions: IntersectionObserverInit = {
      threshold: [0.1, 0.3, 0.6],
      rootMargin: '0px 0px -10% 0px',
      ...options
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement
          
          if (entry.isIntersecting) {
            // Add enhanced scroll animations
            target.classList.add('animate-in')
            
            // Handle different animation types
            if (target.classList.contains('enhanced-scroll-fade')) {
              target.classList.add('animate-in')
            }
            if (target.classList.contains('enhanced-scroll-slide-left')) {
              target.classList.add('animate-in')
            }
            if (target.classList.contains('enhanced-scroll-slide-right')) {
              target.classList.add('animate-in')
            }
            if (target.classList.contains('enhanced-scroll-zoom')) {
              target.classList.add('animate-in')
            }
            
            // Staggered animations for child elements
            const staggerItems = target.querySelectorAll('.stagger-item')
            staggerItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in')
              }, index * 100)
            })

            // Enhanced staggered animations
            const enhancedStaggerItems = target.querySelectorAll('.enhanced-stagger')
            enhancedStaggerItems.forEach((item, index) => {
              const delay = index * 150
              setTimeout(() => {
                item.classList.add('animate-in')
              }, delay)
            })

            // Text reveal animations
            const textRevealItems = target.querySelectorAll('.scroll-text-reveal')
            textRevealItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in')
              }, index * 200)
            })

            // Character-by-character text animation
            const textCharItems = target.querySelectorAll('.scroll-text-char')
            textCharItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in')
              }, index * 50)
            })

            // Timeline items special animation
            const timelineItems = target.querySelectorAll('.timeline-item')
            timelineItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('animate-in')
              }, index * 250)
            })

            // Blog posts staggered animation
            const blogPosts = target.querySelectorAll('.blog-post')
            blogPosts.forEach((post, index) => {
              setTimeout(() => {
                post.classList.add('animate-in')
              }, index * 150)
            })

            // Project cards with enhanced animations
            const projectCards = target.querySelectorAll('.project-card')
            projectCards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add('animate-in')
              }, index * 200)
            })
          }
        })
      },
      defaultOptions
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [mounted, options])

  return { sectionsRef, mounted }
}

// Smooth scroll to element with enhanced behavior
export function smoothScrollToElement(elementId: string, offset: number = 100) {
  const element = document.getElementById(elementId)
  if (!element) return

  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

// Parallax scroll effect
export function useParallaxScroll(speed: number = 0.5) {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.pageYOffset * speed)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return offset
}

// Scroll direction detection
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const updateScrollDirection = () => {
      const scrollY = window.scrollY
      const direction = scrollY > lastScrollY ? 'down' : 'up'
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction)
      }
      setLastScrollY(scrollY > 0 ? scrollY : 0)
    }

    window.addEventListener('scroll', updateScrollDirection, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollDirection)
  }, [scrollDirection, lastScrollY])

  return scrollDirection
}

// Enhanced scroll progress
export function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollProgress = (scrollTop / docHeight) * 100
      setProgress(Math.min(scrollProgress, 100))
    }

    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    return () => window.removeEventListener('scroll', updateScrollProgress)
  }, [])

  return progress
} 