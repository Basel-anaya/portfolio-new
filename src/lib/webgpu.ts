import { useState, useEffect } from 'react'

// WebGPU utility library for enhanced rendering performance
export class WebGPURenderer {
  private device: GPUDevice | null = null
  private adapter: GPUAdapter | null = null
  private canvas: HTMLCanvasElement | null = null
  private context: GPUCanvasContext | null = null
  private renderPipeline: GPURenderPipeline | null = null
  private uniformBuffer: GPUBuffer | null = null
  private isInitialized = false

  // Shaders for enhanced visual effects
  private static readonly vertexShaderSource = `
    struct VertexInput {
      @location(0) position: vec2<f32>,
      @location(1) uv: vec2<f32>,
    }

    struct VertexOutput {
      @builtin(position) position: vec4<f32>,
      @location(0) uv: vec2<f32>,
    }

    struct Uniforms {
      time: f32,
      resolution: vec2<f32>,
      scrollOffset: f32,
      mousePosition: vec2<f32>,
    }

    @group(0) @binding(0) var<uniform> uniforms: Uniforms;

    @vertex
    fn vs_main(input: VertexInput) -> VertexOutput {
      var output: VertexOutput;
      output.position = vec4<f32>(input.position, 0.0, 1.0);
      output.uv = input.uv;
      return output;
    }
  `

  private static readonly fragmentShaderSource = `
    struct VertexOutput {
      @builtin(position) position: vec4<f32>,
      @location(0) uv: vec2<f32>,
    }

    struct Uniforms {
      time: f32,
      resolution: vec2<f32>,
      scrollOffset: f32,
      mousePosition: vec2<f32>,
    }

    @group(0) @binding(0) var<uniform> uniforms: Uniforms;

    // Enhanced dot pattern with parallax and mouse interaction
    fn dotPattern(uv: vec2<f32>, time: f32, scroll: f32) -> f32 {
      let parallax = scroll * 0.1;
      let adjustedUv = uv + vec2<f32>(0.0, parallax);
      let grid = fract(adjustedUv * 20.0 + sin(time * 0.5) * 0.1);
      let dots = smoothstep(0.8, 0.9, max(grid.x, grid.y));
      return dots;
    }

    // Gradient background with mouse interaction
    fn gradientBackground(uv: vec2<f32>, mouse: vec2<f32>, time: f32) -> vec3<f32> {
      let mouseInfluence = 1.0 - length(uv - mouse) * 0.5;
      let gradient = mix(
        vec3<f32>(0.05, 0.05, 0.1),
        vec3<f32>(0.1, 0.05, 0.15),
        uv.y + sin(time * 0.3) * 0.1
      );
      return gradient + mouseInfluence * vec3<f32>(0.1, 0.05, 0.2);
    }

    // Glass morphism effect
    fn glassMorphism(uv: vec2<f32>, time: f32) -> vec3<f32> {
      let noise = sin(uv.x * 10.0 + time) * sin(uv.y * 10.0 + time) * 0.1;
      let glass = vec3<f32>(1.0, 1.0, 1.0) * (0.1 + noise * 0.05);
      return glass;
    }

    @fragment
    fn fs_main(input: VertexOutput) -> @location(0) vec4<f32> {
      let uv = input.uv;
      let time = uniforms.time;
      let mouse = uniforms.mousePosition / uniforms.resolution;
      let scroll = uniforms.scrollOffset;
      
      // Base background
      var color = gradientBackground(uv, mouse, time);
      
      // Add dot pattern
      let dots = dotPattern(uv, time, scroll);
      color += dots * vec3<f32>(0.15, 0.15, 0.15);
      
      // Add glass morphism effect in corners
      let cornerDistance = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
      if (cornerDistance < 0.1) {
        color += glassMorphism(uv, time) * (0.1 - cornerDistance) * 10.0;
      }
      
      return vec4<f32>(color, 1.0);
    }
  `

  // Initialize WebGPU
  async initialize(canvas: HTMLCanvasElement): Promise<boolean> {
    try {
      // Check WebGPU support
      if (!navigator.gpu) {
        console.warn('WebGPU not supported, falling back to CSS rendering')
        return false
      }

      this.canvas = canvas
      this.adapter = await navigator.gpu.requestAdapter({
        powerPreference: 'high-performance'
      })

      if (!this.adapter) {
        console.warn('No WebGPU adapter found')
        return false
      }

      this.device = await this.adapter.requestDevice()
      this.context = canvas.getContext('webgpu')

      if (!this.context) {
        console.warn('WebGPU context not available')
        return false
      }

      // Configure canvas
      const canvasFormat = navigator.gpu.getPreferredCanvasFormat()
      this.context.configure({
        device: this.device,
        format: canvasFormat,
        alphaMode: 'premultiplied'
      })

      await this.createRenderPipeline()
      this.createBuffers()
      
      this.isInitialized = true
      console.log('WebGPU initialized successfully')
      return true

    } catch (error) {
      console.warn('WebGPU initialization failed:', error)
      return false
    }
  }

  private async createRenderPipeline() {
    if (!this.device) return

    const vertexShader = this.device.createShaderModule({
      code: WebGPURenderer.vertexShaderSource
    })

    const fragmentShader = this.device.createShaderModule({
      code: WebGPURenderer.fragmentShaderSource
    })

    // Create bind group layout
    const bindGroupLayout = this.device.createBindGroupLayout({
      entries: [{
        binding: 0,
        visibility: GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform' }
      }]
    })

    // Create pipeline layout
    const pipelineLayout = this.device.createPipelineLayout({
      bindGroupLayouts: [bindGroupLayout]
    })

    // Create render pipeline
    this.renderPipeline = this.device.createRenderPipeline({
      layout: pipelineLayout,
      vertex: {
        module: vertexShader,
        entryPoint: 'vs_main',
        buffers: [{
          arrayStride: 16, // 4 floats * 4 bytes
          attributes: [
            { format: 'float32x2', offset: 0, shaderLocation: 0 }, // position
            { format: 'float32x2', offset: 8, shaderLocation: 1 }  // uv
          ]
        }]
      },
      fragment: {
        module: fragmentShader,
        entryPoint: 'fs_main',
        targets: [{
          format: navigator.gpu?.getPreferredCanvasFormat() || 'bgra8unorm'
        }]
      },
      primitive: {
        topology: 'triangle-list'
      }
    })
  }

  private createBuffers() {
    if (!this.device) return

    // Create vertex buffer (full screen quad)
    const vertices = new Float32Array([
      -1, -1, 0, 1, // bottom-left
       1, -1, 1, 1, // bottom-right
      -1,  1, 0, 0, // top-left
       1,  1, 1, 0, // top-right
      -1,  1, 0, 0, // top-left
       1, -1, 1, 1  // bottom-right
    ])

    const vertexBuffer = this.device.createBuffer({
      size: vertices.byteLength,
      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST
    })

    this.device.queue.writeBuffer(vertexBuffer, 0, vertices)

    // Create uniform buffer
    this.uniformBuffer = this.device.createBuffer({
      size: 32, // 4 floats * 4 bytes + 2 floats * 4 bytes + 1 float * 4 bytes + 1 float * 4 bytes + padding
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
    })

    // Store vertex buffer reference
    this.vertexBuffer = vertexBuffer
  }

  private vertexBuffer: GPUBuffer | null = null
  private bindGroup: GPUBindGroup | null = null

  // Render frame with enhanced effects
  render(time: number, scrollOffset: number, mouseX: number, mouseY: number) {
    if (!this.isInitialized || !this.device || !this.context || !this.renderPipeline || !this.uniformBuffer) {
      return
    }

    // Update uniforms
    const uniforms = new Float32Array([
      time * 0.001, // time in seconds
      this.canvas!.width, this.canvas!.height, // resolution
      scrollOffset * 0.001, // scroll offset
      mouseX, mouseY, // mouse position
      0, 0 // padding
    ])

    this.device.queue.writeBuffer(this.uniformBuffer, 0, uniforms)

    // Create bind group if not exists
    if (!this.bindGroup) {
      this.bindGroup = this.device.createBindGroup({
        layout: this.renderPipeline.getBindGroupLayout(0),
        entries: [{
          binding: 0,
          resource: { buffer: this.uniformBuffer }
        }]
      })
    }

    // Create command encoder
    const commandEncoder = this.device.createCommandEncoder()
    
    // Begin render pass
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: this.context.getCurrentTexture().createView(),
        clearValue: { r: 0.04, g: 0.04, b: 0.04, a: 1.0 },
        loadOp: 'clear',
        storeOp: 'store'
      }]
    })

    // Set pipeline and draw
    renderPass.setPipeline(this.renderPipeline)
    renderPass.setBindGroup(0, this.bindGroup)
    renderPass.setVertexBuffer(0, this.vertexBuffer!)
    renderPass.draw(6) // 6 vertices for 2 triangles (quad)
    renderPass.end()

    // Submit commands
    this.device.queue.submit([commandEncoder.finish()])
  }

  // Cleanup resources
  cleanup() {
    if (this.vertexBuffer) {
      this.vertexBuffer.destroy()
    }
    if (this.uniformBuffer) {
      this.uniformBuffer.destroy()
    }
    this.device = null
    this.adapter = null
    this.canvas = null
    this.context = null
    this.renderPipeline = null
    this.isInitialized = false
  }

  // Check if WebGPU is supported
  static isSupported(): boolean {
    return 'gpu' in navigator
  }

  // Get WebGPU info for debugging
  async getInfo(): Promise<{
    adapter: string
    device: string
    limits: GPUSupportedLimits | null
  } | null> {
    if (!this.adapter || !this.device) return null

    try {
      const adapterInfo = await this.adapter.requestAdapterInfo?.()
      return {
        adapter: adapterInfo?.vendor || 'Unknown',
        device: adapterInfo?.device || 'Unknown',
        limits: this.device.limits
      }
    } catch {
      return {
        adapter: 'Unknown',
        device: 'Unknown',
        limits: this.device.limits
      }
    }
  }
}

// React hook for WebGPU rendering
export function useWebGPU(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const [renderer, setRenderer] = useState<WebGPURenderer | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    setIsSupported(WebGPURenderer.isSupported())
  }, [])

  useEffect(() => {
    if (!isSupported || !canvasRef.current) return

    const webgpuRenderer = new WebGPURenderer()
    
    webgpuRenderer.initialize(canvasRef.current).then((success) => {
      if (success) {
        setRenderer(webgpuRenderer)
        setIsInitialized(true)
      }
    })

    return () => {
      webgpuRenderer.cleanup()
    }
  }, [isSupported, canvasRef])

  return {
    renderer,
    isSupported,
    isInitialized
  }
}

// Performance monitoring for WebGPU
export class WebGPUPerformanceMonitor {
  private frameCount = 0
  private lastTime = 0
  private fps = 0
  private renderTimes: number[] = []

  updateFPS(currentTime: number) {
    this.frameCount++
    
    if (currentTime - this.lastTime >= 1000) {
      this.fps = this.frameCount
      this.frameCount = 0
      this.lastTime = currentTime
    }
  }

  addRenderTime(time: number) {
    this.renderTimes.push(time)
    if (this.renderTimes.length > 60) {
      this.renderTimes.shift()
    }
  }

  getAverageRenderTime(): number {
    if (this.renderTimes.length === 0) return 0
    return this.renderTimes.reduce((a, b) => a + b, 0) / this.renderTimes.length
  }

  getFPS(): number {
    return this.fps
  }

  getPerformanceInfo() {
    return {
      fps: this.fps,
      averageRenderTime: this.getAverageRenderTime(),
      frameCount: this.frameCount
    }
  }
} 