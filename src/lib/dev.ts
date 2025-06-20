// Development utilities for debugging and performance monitoring
export const isDevelopment = process.env.NODE_ENV === 'development'

// Enable WebGPU performance monitoring in development
export const enableWebGPUPerformance = isDevelopment || 
  (typeof window !== 'undefined' && window.location.search.includes('webgpu-debug'))

// Console utilities for WebGPU debugging
export const webgpuLog = {
  info: (message: string, ...args: any[]) => {
    if (enableWebGPUPerformance) {
      console.log(`🔧 WebGPU: ${message}`, ...args)
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (enableWebGPUPerformance) {
      console.warn(`⚠️ WebGPU: ${message}`, ...args)
    }
  },
  error: (message: string, ...args: any[]) => {
    if (enableWebGPUPerformance) {
      console.error(`❌ WebGPU: ${message}`, ...args)
    }
  }
}

// Performance thresholds for monitoring
export const performanceThresholds = {
  targetFPS: 60,
  maxRenderTime: 16.67, // 60 FPS = ~16.67ms per frame
  lowFPSThreshold: 30,
  highRenderTimeThreshold: 33.33 // 30 FPS = ~33.33ms per frame
}

// Feature flags for WebGPU
export const webgpuFeatures = {
  enableMouseInteraction: true,
  enableScrollParallax: true,
  enablePerformanceMonitoring: enableWebGPUPerformance,
  enableFallbackTransition: true,
  enableDebugOverlay: enableWebGPUPerformance
} 