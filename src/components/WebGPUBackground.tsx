'use client'

import React, { useRef, useEffect, useState } from 'react'
import { useWebGPU } from '@/lib/webgpu'
import { webgpuFeatures, webgpuLog } from '@/lib/dev'

interface WebGPUBackgroundProps {
  className?: string
  showDebugInfo?: boolean
}

export default function WebGPUBackground({ 
  className = '', 
  showDebugInfo = webgpuFeatures.enableDebugOverlay 
}: WebGPUBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { renderer, isSupported, isInitialized } = useWebGPU(canvasRef)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationFrameRef = useRef<number | undefined>(undefined)

  // Handle mouse movement for interactive effects
  useEffect(() => {
    if (!webgpuFeatures.enableMouseInteraction) return

    const handleMouseMove = (e: MouseEvent) => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Handle canvas resizing
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const rect = canvasRef.current.getBoundingClientRect()
        const width = rect.width * window.devicePixelRatio
        const height = rect.height * window.devicePixelRatio
        
        setDimensions({ width, height })
        
        // Update canvas size
        canvasRef.current.width = width
        canvasRef.current.height = height
        canvasRef.current.style.width = `${rect.width}px`
        canvasRef.current.style.height = `${rect.height}px`
      }
    }

    window.addEventListener('resize', handleResize, { passive: true })
    
    // Initial resize
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Animation loop
  useEffect(() => {
    if (!renderer || !isInitialized) return

    webgpuLog.info('Starting WebGPU render loop')

    const animate = (time: number) => {
      // Render frame with current state
      const scrollOffset = webgpuFeatures.enableScrollParallax ? (window.pageYOffset || 0) : 0
      renderer.render(time, scrollOffset, mousePosition.x, mousePosition.y)
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [renderer, isInitialized, mousePosition])

  // Log WebGPU status
  useEffect(() => {
    if (isSupported) {
      webgpuLog.info('WebGPU supported')
    } else {
      webgpuLog.warn('WebGPU not supported, falling back to CSS')
    }
  }, [isSupported])

  useEffect(() => {
    if (isInitialized) {
      webgpuLog.info('WebGPU initialized successfully')
    }
  }, [isInitialized])

  // Fallback to CSS background if WebGPU is not supported
  if (!isSupported) {
    return (
      <div 
        className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${className}`}
        style={{
          background: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      >
        {showDebugInfo && (
          <div className="fixed top-4 right-4 bg-black/50 text-white p-2 rounded text-xs">
            WebGPU not supported - Using CSS fallback
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`fixed inset-0 -z-10 transition-opacity duration-1000 ${
          isInitialized ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        style={{
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none'
        }}
      />
      
      {/* CSS fallback while WebGPU initializes */}
      <div 
        className={`fixed inset-0 -z-20 transition-opacity duration-1000 ${
          isInitialized ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Debug info overlay */}
      {showDebugInfo && isInitialized && (
        <div className="fixed top-4 right-4 bg-black/80 backdrop-blur-sm text-white p-3 rounded-lg text-xs font-mono space-y-1 z-50">
          <div className="text-green-400 font-semibold">WebGPU Active</div>
          <div>Resolution: <span className="text-yellow-400">{dimensions.width}×{dimensions.height}</span></div>
          <div className="text-gray-400 text-[10px]">
            Mouse: {mousePosition.x.toFixed(0)}, {mousePosition.y.toFixed(0)}
          </div>
          <div className="text-gray-400 text-[10px]">
            Press Ctrl+Shift+P to toggle
          </div>
        </div>
      )}
    </>
  )
}

// Hook for enabling WebGPU background with keyboard shortcuts
export function useWebGPUBackground(enabled: boolean = true) {
  const [showDebugInfo, setShowDebugInfo] = useState(webgpuFeatures.enableDebugOverlay)
  
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Toggle debug info with Ctrl+Shift+P
      if (e.ctrlKey && e.shiftKey && e.key === 'P') {
        e.preventDefault()
        setShowDebugInfo(prev => !prev)
        webgpuLog.info(`Debug overlay ${!showDebugInfo ? 'enabled' : 'disabled'}`)
      }
    }

    if (enabled) {
      window.addEventListener('keydown', handleKeyPress)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [enabled, showDebugInfo])

  return {
    showDebugInfo,
    setShowDebugInfo
  }
} 