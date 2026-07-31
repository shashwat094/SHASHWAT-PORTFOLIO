import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function useDeviceQuality() {
  const [quality, setQuality] = useState<'low' | 'high'>('high')

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const small = window.matchMedia('(max-width: 768px)').matches
    setQuality(small || reducedMotion ? 'low' : 'high')
  }, [])

  return quality
}

function ParticleField({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40
      arr[i * 3 + 1] = (Math.random() - 0.5) * 40
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015
    pointsRef.current.rotation.x = state.clock.elapsedTime * 0.006
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8ca8f0"
        transparent
        opacity={0.32}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function WireGlobe({ detail }: { detail: [number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.15
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.05
    }
  })

  return (
    <group position={[0, 0, -6]}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[4.2, detail[0]]} />
        <meshBasicMaterial color="#6fd1c8" wireframe transparent opacity={0.09} />
      </mesh>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[3.1, detail[1]]} />
        <meshBasicMaterial color="#8ca8f0" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

function MouseParallaxRig() {
  const { camera, pointer } = useThree()
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Background3D() {
  const quality = useDeviceQuality()
  const isLow = quality === 'low'

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 55 }}
        dpr={isLow ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
      >
        <ParticleField count={isLow ? 550 : 1400} />
        <WireGlobe detail={isLow ? [0, 0] : [2, 1]} />
        <MouseParallaxRig />
      </Canvas>
    </div>
  )
}
