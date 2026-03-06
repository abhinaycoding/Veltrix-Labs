/* eslint-disable */
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { PerspectiveCamera, Float } from '@react-three/drei'
import * as THREE from 'three'
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'

const THEME_COLORS = ['#FFD700', '#ADFF2F', '#00CED1', '#1E90FF']

const ConstellationParticles = ({ count = 120 }) => { // Reduced count for better performance
  const pointsRef = useRef()
  const linesRef = useRef()
  const { viewport, mouse } = useThree()
  const shockwaves = useRef([])

  useEffect(() => {
    const handleClick = () => {
      shockwaves.current.push({
        x: (mouse.x * viewport.width) / 2,
        y: (mouse.y * viewport.height) / 2,
        radius: 0,
        opacity: 1,
        active: true
      })
    }
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [mouse, viewport])

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
        temp.push({
            x: THREE.MathUtils.randFloatSpread(100),
            y: THREE.MathUtils.randFloatSpread(80),
            z: THREE.MathUtils.randFloatSpread(50),
            speed: Math.random() * 0.015 + 0.005,
            phase: Math.random() * Math.PI * 2,
            baseX: 0, baseY: 0, baseZ: 0
        })
    }
    temp.forEach(p => { p.baseX = p.x; p.baseY = p.y; p.baseZ = p.z })
    return temp
  }, [count])

  const maxLines = count * 6 // Optimized limit
  const [positions, colors, linePositions, lineColors] = useMemo(() => {
    return [
      new Float32Array(count * 3),
      new Float32Array(count * 3).fill(1),
      new Float32Array(maxLines * 6),
      new Float32Array(maxLines * 6)
    ]
  }, [count, maxLines])

  useFrame((state) => {
    const clockTime = state.clock.getElapsedTime()
    const mouseX = (mouse.x * viewport.width) / 2
    const mouseY = (mouse.y * viewport.height) / 2
    const scrollOffset = window.scrollY * 0.02
    let lineIndex = 0

    shockwaves.current.forEach(wave => {
      if (wave.active) {
        wave.radius += 2.0 
        wave.opacity -= 0.02 
        if (wave.opacity <= 0) wave.active = false
      }
    })
    shockwaves.current = shockwaves.current.filter(w => w.active)

    for (let i = 0; i < count; i++) {
      const p = particles[i]
      p.x += Math.sin(clockTime * p.speed + p.phase) * 0.03
      p.y += Math.cos(clockTime * p.speed + p.phase) * 0.03
      p.x += (p.baseX - p.x) * 0.005
      p.y += (p.baseY - p.y) * 0.005

      const dx = mouseX - p.x
      const dy = mouseY - (p.y + scrollOffset)
      const distSq = dx * dx + dy * dy
      
      if (distSq < 225 && distSq > 0.01) { // 15^2
        const dist = Math.sqrt(distSq)
        const force = (15 - dist) / 15
        p.x -= (dx / dist) * force * 5
        p.y -= (dy / dist) * force * 5
      }

      positions[i * 3] = p.x
      positions[i * 3 + 1] = p.y + scrollOffset
      positions[i * 3 + 2] = p.z

      // Optimized connection check (Limited distance and max lines)
      if (lineIndex < maxLines - 1) {
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j]
          const ddx = p.x - p2.x
          const ddy = p.y - p2.y
          const ddistSq = ddx * ddx + ddy * ddy
          
          if (ddistSq < 100) { // 10^2
            const ddist = Math.sqrt(ddistSq)
            const alpha = 1.0 - (ddist / 10)
            
            linePositions[lineIndex * 3] = p.x
            linePositions[lineIndex * 3 + 1] = p.y + scrollOffset
            linePositions[lineIndex * 3 + 2] = p.z
            lineColors[lineIndex * 3] = lineColors[lineIndex * 3 + 1] = lineColors[lineIndex * 3 + 2] = 0.5 * alpha
            lineIndex++

            linePositions[lineIndex * 3] = p2.x
            linePositions[lineIndex * 3 + 1] = p2.y + scrollOffset
            linePositions[lineIndex * 3 + 2] = p2.z
            lineColors[lineIndex * 3] = lineColors[lineIndex * 3 + 1] = lineColors[lineIndex * 3 + 2] = 0.5 * alpha
            lineIndex++
            
            if (lineIndex >= maxLines) break
          }
        }
      }
    }

    if (pointsRef.current) pointsRef.current.geometry.attributes.position.needsUpdate = true
    if (linesRef.current) {
        linesRef.current.geometry.setDrawRange(0, lineIndex)
        linesRef.current.geometry.attributes.position.needsUpdate = true
        linesRef.current.geometry.attributes.color.needsUpdate = true
    }
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.25} vertexColors transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
           <bufferAttribute attach="attributes-position" count={maxLines * 2} array={linePositions} itemSize={3} />
           <bufferAttribute attach="attributes-color" count={maxLines * 2} array={lineColors} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </lineSegments>
    </group>
  )
}

function Atmosphere() {
  return (
    <>
      <ambientLight intensity={0.15} />
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
        <mesh position={[0, -45, -50]}>
          <sphereGeometry args={[40, 32, 32]} />
          <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.02} />
        </mesh>
      </Float>
    </>
  )
}

export default function ParticleBackground() {
  return (
    <div className="w-full h-full bg-black">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: false, powerPreference: "high-performance" }}>
        <PerspectiveCamera makeDefault position={[0, 0, 70]} fov={75} />
        <ConstellationParticles />
        <Atmosphere />
        <fog attach="fog" args={['#000000', 30, 150]} />
        <EffectComposer disableNormalPass multisampling={0}>
          <Bloom luminanceThreshold={0.5} intensity={0.8} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
