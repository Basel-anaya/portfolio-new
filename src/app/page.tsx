'use client'

import Link from 'next/link'
import { personalInfo, projects, experiences, skills, blogs } from '@/data/portfolio'
import Image from 'next/image'
import { useEnhancedScrollObserver } from '@/lib/utils'

export default function Home() {
  const { sectionsRef, mounted } = useEnhancedScrollObserver({
    threshold: [0.1, 0.3, 0.6],
    rootMargin: '0px 0px -10% 0px'
  })

  if (!mounted) {
    return null
  }

  return (
    <main className="min-h-screen dot-gradient-bg text-foreground relative">
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
        
        .scroll-section-slide-left {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-section-slide-left.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-section-slide-right {
          opacity: 0;
          transform: translateX(50px);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-section-slide-right.animate-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .scroll-section-scale {
          opacity: 0;
          transform: scale(0.95);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .scroll-section-scale.animate-in {
          opacity: 1;
          transform: scale(1);
        }

        /* Staggered card animations */
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

        /* Timeline item animations */
        .timeline-item {
          opacity: 0;
          transform: translateX(-30px) scale(0.9);
          transition: all 0.7s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .timeline-item.animate-in {
          opacity: 1;
          transform: translateX(0) scale(1);
        }

        .timeline-item:nth-child(even) {
          transform: translateX(30px) scale(0.9);
        }

        .timeline-icon {
          animation: pulse 2s infinite;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timeline-icon svg {
          display: block;
          margin: auto;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Blog post animations */
        .blog-post {
          opacity: 0;
          transform: translateY(25px) rotateY(5deg);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .blog-post.animate-in {
          opacity: 1;
          transform: translateY(0) rotateY(0deg);
        }

        .blog-post:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        /* Hero profile image animation */
        .hero-image {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }

        /* Service card special effects */
        .service-card {
          position: relative;
          overflow: hidden;
        }

        .service-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.6s ease;
        }

        .service-card:hover::before {
          left: 100%;
        }

        /* Button animations */
        .btn-glow {
          position: relative;
          overflow: hidden;
        }

        .btn-glow::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s ease;
        }

        .btn-glow:hover::before {
          left: 100%;
        }

        /* Newsletter section special effect */
        .newsletter-star {
          animation: rotate 8s linear infinite;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Smooth scroll reveal for text */
        .text-reveal {
          opacity: 0;
          transform: translateY(20px);
          animation: textReveal 0.8s ease forwards;
        }

        @keyframes textReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div className="relative z-10">
      {/* Hero Section */}
              <section 
          ref={(el) => { sectionsRef.current[0] = el }}
          className="pt-24 md:pt-32 pb-20 px-6 enhanced-scroll-fade"
        >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
            {/* Profile Image */}
            <div className="flex-shrink-0 order-first md:order-none">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-700 hero-image">
                <Image
                  src="/basel.jpeg"
                  alt="Basel Anaya"
                  width={128}
                  height={128}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 text-center md:text-left order-last md:order-none">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
                Hi I'm Basel Anaya<br />
                <span className="text-gray-300 font-normal">AI Engineer</span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-6 md:mb-8 leading-relaxed max-w-3xl">
                I am an AI Engineer at Deriv with a passion for AI in Medicine & Robotics. 
                After graduating with a degree in Artificial Intelligence, I have been working 
                on cutting-edge AI solutions and machine learning applications.
              </p>
              
              <div className="flex justify-center md:justify-start items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium btn-glow text-sm md:text-base shadow-lg"
                >
                  Get in touch
                  <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
              <section 
          ref={(el) => { sectionsRef.current[1] = el }}
          className="py-20 px-6 enhanced-scroll-slide-left"
        >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              What I can offer for Your Organization
            </h2>
            <p className="text-lg text-gray-300">
              I specialize in AI engineering and machine learning solutions, helping organizations leverage cutting-edge AI technologies to drive innovation and efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Service Cards */}
            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI System Development</h3>
              <p className="text-gray-300 leading-relaxed">
                Design, develop, and deploy cutting-edge AI-powered systems that deliver customized and efficient technology solutions for your business needs.
              </p>
            </div>

            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Generative AI Applications</h3>
              <p className="text-gray-300 leading-relaxed">
                Build and deploy GenAI applications using LLMs and LangChain, creating intelligent solutions that enhance productivity and user experience.
              </p>
            </div>

            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Agentic AI Systems</h3>
              <p className="text-gray-300 leading-relaxed">
                Develop autonomous AI agents that can understand, reason, and act independently to simplify and accelerate complex task completion.
              </p>
            </div>

            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zM7 13a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Data Science & Analytics</h3>
              <p className="text-gray-300 leading-relaxed">
                Extract valuable insights from your data using advanced analytics and machine learning techniques to drive data-driven decision making.
              </p>
            </div>

            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Team Leadership</h3>
              <p className="text-gray-300 leading-relaxed">
                Lead and manage AI departments and teams, providing strategic direction for AI initiatives and fostering collaboration across global offices.
              </p>
            </div>

            <div className="text-center group stagger-item service-card">
              <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-600 transition-colors">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Strategy Consulting</h3>
              <p className="text-gray-300 leading-relaxed">
                Provide strategic guidance on AI adoption, technology selection, and implementation roadmaps to maximize your organization's AI potential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
              <section 
          ref={(el) => { sectionsRef.current[2] = el }}
          className="py-20 px-6 enhanced-scroll-zoom"
        >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 md:mb-16 text-center">My Experience</h2>
          
          <div className="relative">
            {/* Timeline line - Hidden on mobile */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gray-600"></div>
            
            <div className="space-y-8 md:space-y-12">
              {/* Experience Item 1 */}
              <div className="relative md:flex md:items-center timeline-item">
                <div className="md:flex-1 md:pr-8 md:text-right">
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-6 shadow-lg timeline-content">
                    {/* Mobile Icon - Top Right */}
                    <div className="md:hidden absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 pr-12 md:pr-0">Bachelor Graduate</h3>
                    <p className="text-base md:text-lg font-bold text-gray-200 mb-1">University of Jordan</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">Amman, Jordan</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">
                      Officially graduated with a bachelor's degree in Artificial Intelligence at the University of Jordan.
                    </p>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">Oct 2020 - July 2024</span>
                  </div>
                </div>
                
                {/* Timeline Icon - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg timeline-icon">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                  </svg>
                </div>
                
                <div className="hidden md:block md:flex-1 md:pl-8"></div>
              </div>

              {/* Experience Item 2 */}
              <div className="relative md:flex md:items-center timeline-item">
                <div className="hidden md:block md:flex-1 md:pr-8"></div>
                
                {/* Timeline Icon - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg timeline-icon">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                  </svg>
                </div>
                
                <div className="md:flex-1 md:pl-8">
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-6 shadow-lg timeline-content">
                    {/* Mobile Icon - Top Right */}
                    <div className="md:hidden absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 pr-12 md:pr-0">ML Engineer Intern</h3>
                    <p className="text-base md:text-lg font-bold text-gray-200 mb-1">Mashroona</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">Internship • Amman, Jordan • On-site</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">
                      As an ML Engineer, I have played a crucial role in designing, developing, and deploying AI-powered systems that deliver customized and efficient technology solutions to our clients.
                    </p>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">March 2024 - July 2024 · 5 mos</span>
                  </div>
                </div>
              </div>

              {/* Experience Item 3 */}
              <div className="relative md:flex md:items-center timeline-item">
                <div className="md:flex-1 md:pr-8 md:text-right">
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-6 shadow-lg timeline-content">
                    {/* Mobile Icon - Top Right */}
                    <div className="md:hidden absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 pr-12 md:pr-0">AI Engineer</h3>
                    <p className="text-base md:text-lg font-bold text-gray-200 mb-1">Barzan T.S DIG</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">Full-time • Amman, Jordan • On-site</p>
                    <ul className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 md:text-left space-y-1">
                      <li>• Managed the AI Department while also built bleeding-edge AI-powered systems.</li>
                      <li>• Lead an AI team through developing, evaluating and deploying GenAI applications.</li>
                    </ul>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">Nov 2024 - May 2025 · 7 mos</span>
                  </div>
                </div>
                
                {/* Timeline Icon - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg timeline-icon">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                  </svg>
                </div>
                
                <div className="hidden md:block md:flex-1 md:pl-8"></div>
              </div>

              {/* Experience Item 4 */}
              <div className="relative md:flex md:items-center timeline-item">
                <div className="hidden md:block md:flex-1 md:pr-8"></div>
                
                {/* Timeline Icon - Hidden on mobile */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg timeline-icon">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                  </svg>
                </div>
                
                <div className="md:flex-1 md:pl-8">
                  <div className="relative bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 p-4 md:p-6 shadow-lg timeline-content">
                    {/* Mobile Icon - Top Right */}
                    <div className="md:hidden absolute top-4 right-4 w-8 h-8 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M17 7C17 5.34315 15.6569 4 14 4H10C8.34315 4 7 5.34315 7 7H6C4.34315 7 3 8.34315 3 10V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V10C21 8.34315 19.6569 7 18 7H17ZM14 6H10C9.44772 6 9 6.44772 9 7H15C15 6.44772 14.5523 6 14 6ZM6 9H18C18.5523 9 19 9.44772 19 10V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V10C5 9.44772 5.44772 9 6 9Z"/>
                      </svg>
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2 pr-12 md:pr-0">AI Engineer</h3>
                    <p className="text-base md:text-lg font-bold text-gray-200 mb-1">Deriv</p>
                    <p className="text-sm md:text-base text-gray-300 mb-3 md:mb-4">Full-time • Amman, Jordan • On-site</p>
                    <ul className="text-sm md:text-base text-gray-300 mb-3 md:mb-4 space-y-1">
                      <li>• Currently working on agentic AI systems to simplify and accelerate task completion.</li>
                      <li>• Collaborating with teams from different offices around the globe to augment Deriv with the latest AI solutions.</li>
                    </ul>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">May 2025 - Present · 1 mo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts Section */}
              <section 
          ref={(el) => { sectionsRef.current[3] = el }}
          className="py-20 px-6 enhanced-scroll-slide-right"
        >
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">Recent Posts</h2>
          
          <div className="space-y-12">
            {/* Featured Posts */}
            {blogs.filter(blog => blog.featured).map((blog, index) => (
              <article key={blog.id} className="border-b border-gray-600 pb-12 blog-post">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-sm text-gray-300">
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      year: '2-digit', 
                      month: 'short' 
                    })}
                  </span>
                  <span className="text-sm text-gray-300">{blog.readTime}</span>
                  <span className="text-sm text-gray-300">{blog.tags[0]}</span>
                </div>
                {blog.url ? (
                  <a 
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors cursor-pointer">
                      {blog.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {blog.title}
                  </h3>
                )}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            {/* Additional Recent Posts (non-featured) */}
            {blogs.filter(blog => !blog.featured).slice(0, 2).map((blog, index) => (
              <article key={blog.id} className={`${index === blogs.filter(blog => !blog.featured).length - 1 ? '' : 'border-b border-gray-600 pb-12'} blog-post`}>
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-sm text-gray-300">
                    {new Date(blog.date).toLocaleDateString('en-US', { 
                      year: '2-digit', 
                      month: 'short' 
                    })}
                  </span>
                  <span className="text-sm text-gray-300">{blog.readTime}</span>
                  <span className="text-sm text-gray-300">{blog.tags[0]}</span>
                </div>
                {blog.url ? (
                  <a 
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-gray-300 transition-colors cursor-pointer">
                      {blog.title}
                    </h3>
                  </a>
                ) : (
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {blog.title}
                  </h3>
                )}
                <p className="text-gray-300 leading-relaxed mb-4">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {blog.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-200 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog" className="inline-flex items-center text-white hover:text-gray-300 transition-colors">
              VIEW ALL
              <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section 
        ref={(el) => { sectionsRef.current[4] = el }}
        className="py-20 px-6 scroll-section"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-black newsletter-star" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Have Something Cool in Mind?
              </h2>
              <p className="text-gray-300 mb-6">
                This can be start of something great!!
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center text-white hover:text-gray-300 transition-colors btn-glow"
              >
                Let's Talk
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="flex-1 max-w-md">
              <h3 className="text-xl font-semibold text-white mb-4">Subscribe to my newsletter</h3>
              <p className="text-gray-300 mb-6">
                Get updated when something awesome is published. Unsubscribe at any time.
              </p>
              
              <form 
                onSubmit={(e) => {
                  e.preventDefault()
                  const email = (e.target as HTMLFormElement).email.value
                  const mailtoLink = `mailto:${personalInfo.email}?subject=Newsletter Subscription&body=Hi Basel,%0D%0A%0D%0AI would like to subscribe to your newsletter.%0D%0A%0D%0AMy email: ${email}%0D%0A%0D%0AThank you!`
                  window.location.href = mailtoLink
                }}
                className="space-y-4"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                />
                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 btn-glow shadow-lg"
                >
                  Subscribe
                </button>
              </form>
              
              <p className="text-xs text-gray-400 mt-4">
                You're protected by an advanced spam protection network powered by artificial intelligence and will never receive junk email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer 
        ref={(el) => { sectionsRef.current[5] = el }}
        className="py-12 px-6 border-t border-gray-600 scroll-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 All rights reserved. Powered by Next.js
            </p>
            <div className="flex items-center space-x-8 mt-4 md:mt-0">
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms and Privacy
              </Link>
              <Link href="/rss" className="text-gray-400 hover:text-white text-sm transition-colors">
                RSS
              </Link>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </main>
  )
}
