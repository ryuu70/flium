'use client'

import { Suspense, useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'

// カオスな粒子システム - Missionの開始部分
function ChaosParticles({ 
  scrollProgress,
  isMissionActive
}: { 
  scrollProgress: number
  isMissionActive: boolean
}) {
  const particlesRef = useRef<THREE.Points>(null!)
  const geometryRef = useRef<THREE.BufferGeometry>(null!)
  const materialRef = useRef<THREE.PointsMaterial>(null!)
  
  const particleCount = window.innerWidth > 768 ? 200 : 100 // モバイルでは粒子数を半分に
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [])

  useFrame((state) => {
    if (!isMissionActive) return
    
    const time = state.clock.elapsedTime
    const positions = geometryRef.current.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      
      if (scrollProgress < 0.3) {
        // カオス状態 - 不規則な動き
        positions[i3] += (Math.random() - 0.5) * 0.02
        positions[i3 + 1] += (Math.random() - 0.5) * 0.02
        positions[i3 + 2] += (Math.random() - 0.5) * 0.02
      } else {
        // 統率され始める - 中心に向かう力
        const centerX = 0
        const centerY = 0
        const centerZ = 0
        
        const dx = centerX - positions[i3]
        const dy = centerY - positions[i3 + 1]
        const dz = centerZ - positions[i3 + 2]
        
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)
        const force = Math.min(distance * 0.01, 0.1)
        
        positions[i3] += dx * force
        positions[i3 + 1] += dy * force
        positions[i3 + 2] += dz * force
      }
    }
    
    geometryRef.current.attributes.position.needsUpdate = true
  })

  if (!isMissionActive) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        ref={materialRef}
        size={0.05} 
        color="#00F5D4"
        transparent 
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

// 統率された光の流れ - Missionの核心部分
function OrganizedStreams({ 
  scrollProgress,
  isMissionActive
}: { 
  scrollProgress: number
  isMissionActive: boolean
}) {
  const streamsRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!isMissionActive || scrollProgress < 0.3) return
    
    const time = state.clock.elapsedTime
    const streams = streamsRef.current
    
    if (streams) {
      streams.children.forEach((stream, index) => {
        const progress = Math.min((scrollProgress - 0.3) / 0.4, 1)
        const streamMesh = stream as THREE.Mesh
        
        // 流れの形成アニメーション
        streamMesh.scale.setScalar(progress)
        streamMesh.rotation.z = time * 0.5 + index * 0.5
        streamMesh.rotation.x = Math.sin(time * 0.3 + index) * 0.2
        streamMesh.rotation.y = Math.cos(time * 0.4 + index) * 0.2
      })
    }
  })

  if (!isMissionActive || scrollProgress < 0.3) return null

  return (
    <group ref={streamsRef}>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 4) * 2,
          Math.sin(i * Math.PI / 4) * 2,
          0
        ]}>
          <cylinderGeometry args={[0.1, 0.05, 4, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00F5D4" : "#8E94F2"}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  )
}

// 流体のコア - 液体金属のような質感と内部の光
function FlowingCore({ 
  scrollPosition, 
  mousePosition, 
  isHovered, 
  onClick,
  setIsHovered,
  scrollProgress
}: { 
  scrollPosition: { x: number, y: number }
  mousePosition: { x: number, y: number }
  isHovered: boolean
  onClick: () => void
  setIsHovered: (hovered: boolean) => void
  scrollProgress: number
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const geometryRef = useRef<THREE.SphereGeometry>(null!)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  const originalPositionsRef = useRef<Float32Array | null>(null)
  const internalLightRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    const time = state.clock.elapsedTime
    const mesh = meshRef.current
    const geometry = geometryRef.current
    const material = materialRef.current
    const internalLight = internalLightRef.current
    
    if (!geometry || !material) return
    
    // スクロールに応じたコアの変化
    const missionPhase = Math.min(scrollProgress / 0.7, 1)
    
    // マウスホバー時の引力効果（より強く、より滑らかに）
    const mouseInfluence = isHovered ? 0.8 : 0
    const mousePull = {
      x: mousePosition.x * mouseInfluence,
      y: mousePosition.y * mouseInfluence,
      z: 0
    }
    
    // 元の位置を保存（初回のみ）
    if (!originalPositionsRef.current) {
      originalPositionsRef.current = new Float32Array(geometry.attributes.position.array)
    }
    
    // 液体金属のような変形
    const positions = geometry.attributes.position.array as Float32Array
    const originalPositions = originalPositionsRef.current
    
    for (let i = 0; i < positions.length; i += 3) {
      const x = originalPositions[i]
      const y = originalPositions[i + 1]
      const z = originalPositions[i + 2]
      
      // Mission段階に応じた変形
      let wave1, wave2, wave3
      
      if (missionPhase < 0.3) {
        // カオス状態 - 不規則な変形
        wave1 = Math.sin(x * 3 + time * 0.8) * 0.1
        wave2 = Math.cos(y * 3 + time * 0.6) * 0.08
        wave3 = Math.sin(z * 3 + time * 0.7) * 0.06
      } else {
        // 統率された状態 - 滑らかな変形
        wave1 = Math.sin(x * 2 + time * 0.5) * 0.05 * (1 - missionPhase)
        wave2 = Math.cos(y * 2 + time * 0.3) * 0.04 * (1 - missionPhase)
        wave3 = Math.sin(z * 2 + time * 0.4) * 0.03 * (1 - missionPhase)
      }
      
      // マウスホバー時の隆起効果（より滑らかで自然な変形）
      const distance = Math.sqrt(x * x + y * y + z * z)
      const mouseEffect = isHovered ? Math.exp(-distance * 1.5) * 0.3 : 0
      
      // 位置の更新
      positions[i] = x + wave1 + mousePull.x * mouseEffect
      positions[i + 1] = y + wave2 + mousePull.y * mouseEffect
      positions[i + 2] = z + wave3
    }
    
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()
    
    // 滑らかな回転
    mesh.rotation.x = time * 0.1
    mesh.rotation.y = time * 0.15
    mesh.rotation.z = time * 0.05
    
    // 液体金属の質感
    material.metalness = 0.9
    material.roughness = 0.1
    material.clearcoat = 1.0
    material.clearcoatRoughness = 0.1
    material.ior = 1.5
    
    // 内部の光の脈動（Mission段階に応じて変化）
    const basePulse = Math.sin(time * 2) * 0.3 + 0.7
    const hoverPulse = isHovered ? Math.sin(time * 4) * 0.2 + 0.3 : 0
    const missionPulse = missionPhase > 0.3 ? Math.sin(time * 3) * 0.3 + 0.5 : 0
    material.emissiveIntensity = 0.1 + basePulse * 0.05 + hoverPulse + missionPulse
    
    // 内部光の回転
    if (internalLight) {
      internalLight.rotation.x = time * 0.2
      internalLight.rotation.y = time * 0.3
      internalLight.rotation.z = time * 0.1
    }
  })

  return (
    <group>
      <mesh 
        ref={meshRef} 
        position={[0, 0, 0]}
        onClick={onClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setIsHovered(true)
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setIsHovered(false)
        }}
      >
        <sphereGeometry ref={geometryRef} args={[1.5, 64, 64]} />
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#0D1B2A"
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          ior={1.5}
          emissive="#00F5D4"
          emissiveIntensity={0.1}
          transparent
          opacity={0.95}
        />
      </mesh>
      
      {/* 内部の光の筋 */}
      <group ref={internalLightRef}>
        {Array.from({ length: 6 }, (_, i) => (
          <mesh key={i} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 2.8, 8]} />
            <meshBasicMaterial 
              color={i % 2 === 0 ? "#00F5D4" : "#8E94F2"}
              transparent
              opacity={0.6}
            />
          </mesh>
        ))}
        
        {/* 内部の粒子 */}
        {Array.from({ length: 15 }, (_, i) => (
          <mesh key={`particle-${i}`} position={[
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2,
            (Math.random() - 0.5) * 2
          ]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial 
              color="#8E94F2"
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// Vision - 流体空間の変換
function FluidSpace({ 
  scrollProgress,
  isVisionActive
}: { 
  scrollProgress: number
  isVisionActive: boolean
}) {
  const fluidRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  
  useFrame((state) => {
    if (!isVisionActive) return
    
    const time = state.clock.elapsedTime
    const fluid = fluidRef.current
    const material = materialRef.current
    
    if (fluid && material) {
      // スクロール進行度に応じた流体の質感変化
      const visionPhase = Math.min((scrollProgress - 0.7) / 0.3, 1)
      
      // デジタル粒子から流体への変換
      fluid.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh
        const progress = Math.min(visionPhase * 2, 1)
        
        // 滑らかな変形
        mesh.scale.setScalar(0.5 + progress * 0.5)
        mesh.rotation.x = time * 0.1 + index * 0.2
        mesh.rotation.y = time * 0.15 + index * 0.3
        mesh.rotation.z = time * 0.05 + index * 0.1
        
        // 流体のような波打つ動き
        const wave = Math.sin(time * 0.5 + index * 0.5) * 0.1 * progress
        mesh.position.y += wave
      })
      
      // 材質の変化 - より有機的で滑らかに
      material.metalness = 0.3 + visionPhase * 0.4
      material.roughness = 0.1 + visionPhase * 0.2
      material.clearcoat = 0.8 + visionPhase * 0.2
      material.ior = 1.2 + visionPhase * 0.3
    }
  })

  if (!isVisionActive) return null

  return (
    <group ref={fluidRef}>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} position={[
          Math.cos(i * Math.PI / 6) * 3,
          Math.sin(i * Math.PI / 6) * 3,
          (Math.random() - 0.5) * 2
        ]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial 
            ref={i === 0 ? materialRef : undefined}
            color={i % 3 === 0 ? "#00F5D4" : i % 3 === 1 ? "#8E94F2" : "#F0F3F5"}
            metalness={0.3}
            roughness={0.1}
            clearcoat={0.8}
            ior={1.2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// オーロラのような光の流れ - Visionの核心
function AuroraFlow({ 
  scrollProgress,
  isVisionActive
}: { 
  scrollProgress: number
  isVisionActive: boolean
}) {
  const auroraRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!isVisionActive) return
    
    const time = state.clock.elapsedTime
    const aurora = auroraRef.current
    
    if (aurora) {
      const visionPhase = Math.min((scrollProgress - 0.7) / 0.3, 1)
      
      aurora.children.forEach((ribbon, index) => {
        const mesh = ribbon as THREE.Mesh
        const progress = Math.min(visionPhase * 1.5, 1)
        
        // オーロラのような波打つ動き
        mesh.rotation.x = time * 0.2 + index * 0.3
        mesh.rotation.y = time * 0.1 + index * 0.2
        mesh.rotation.z = Math.sin(time * 0.3 + index) * 0.3
        
        // 透明度の変化
        const material = mesh.material as THREE.MeshBasicMaterial
        material.opacity = 0.3 + Math.sin(time * 2 + index) * 0.2 * progress
        
        // スケールの変化
        mesh.scale.setScalar(0.5 + progress * 0.5)
      })
    }
  })

  if (!isVisionActive) return null

  return (
    <group ref={auroraRef}>
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <planeGeometry args={[8, 0.2, 32, 8]} />
          <meshBasicMaterial 
            color={i % 2 === 0 ? "#00F5D4" : "#8E94F2"}
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

// クリック時の光の粒子エフェクト
function ClickParticles({ 
  clickPosition, 
  isActive,
  startTime
}: { 
  clickPosition: { x: number, y: number, z: number }
  isActive: boolean
  startTime: number
}) {
  const particlesRef = useRef<THREE.Points>(null!)
  const geometryRef = useRef<THREE.BufferGeometry>(null!)
  
  const particleCount = window.innerWidth > 768 ? 50 : 25 // モバイルでは粒子数を半分に
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = clickPosition.x
      positions[i * 3 + 1] = clickPosition.y
      positions[i * 3 + 2] = clickPosition.z
    }
    return positions
  }, [clickPosition])

  useFrame((state) => {
    if (!isActive) return
    
    const time = state.clock.elapsedTime - startTime
    const positions = geometryRef.current.attributes.position.array as Float32Array
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3
      const progress = Math.min(time / 1.5, 1) // 1.5秒で完了
      
      // コアに向かって流れる（より自然な軌道）
      const direction = {
        x: -positions[i3] * 0.15 * (1 - progress),
        y: -positions[i3 + 1] * 0.15 * (1 - progress),
        z: -positions[i3 + 2] * 0.15 * (1 - progress)
      }
      
      // 波のような動きを追加
      const wave = Math.sin(time * 3 + i * 0.1) * 0.1 * (1 - progress)
      
      positions[i3] += direction.x + wave
      positions[i3 + 1] += direction.y + wave
      positions[i3 + 2] += direction.z
    }
    
    geometryRef.current.attributes.position.needsUpdate = true
  })

  if (!isActive) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.15} 
        color="#00F5D4"
        transparent 
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  )
}

// Values - 本質と洗練 (Essence & Simplicity)
function EssenceRefinement({ 
  scrollProgress,
  isValuesActive
}: { 
  scrollProgress: number
  isValuesActive: boolean
}) {
  const crystalRef = useRef<THREE.Group>(null!)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null!)
  
  useFrame((state) => {
    if (!isValuesActive) return
    
    const time = state.clock.elapsedTime
    const crystal = crystalRef.current
    const material = materialRef.current
    
    if (crystal && material) {
      const valuesPhase = Math.min((scrollProgress - 1.0) / 0.3, 1)
      
      // 複雑な多面体から完璧な球体への変化
      crystal.children.forEach((child, index) => {
        const mesh = child as THREE.Mesh
        const progress = Math.min(valuesPhase * 2, 1)
        
        if (index < crystal.children.length - 1) {
          // 外層の剥がれ落ち
          mesh.scale.setScalar(1 - progress)
          mesh.position.y -= progress * 0.1
          const childMaterial = mesh.material as THREE.MeshBasicMaterial
          childMaterial.opacity = 1 - progress
        } else {
          // 中心の完璧な球体
          mesh.scale.setScalar(progress)
          mesh.rotation.x = time * 0.1
          mesh.rotation.y = time * 0.15
        }
      })
      
      // 材質の洗練
      material.metalness = 0.9
      material.roughness = 0.05 + valuesPhase * 0.05
      material.clearcoat = 1.0
      material.clearcoatRoughness = 0.1
    }
  })

  if (!isValuesActive) return null

  return (
    <group ref={crystalRef} position={[0, 0, 0]}>
      {/* 複雑な多面体の外層 */}
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <octahedronGeometry args={[1.5 + i * 0.2, 0]} />
          <meshBasicMaterial 
            color="#8E94F2"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
      
      {/* 中心の完璧な球体 */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.8, 64, 64]} />
        <meshPhysicalMaterial 
          ref={materialRef}
          color="#00F5D4"
          metalness={0.9}
          roughness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          emissive="#00F5D4"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  )
}

// Values - 動的な調和 (Dynamic Harmony)
function DynamicHarmony({ 
  scrollProgress,
  isValuesActive,
  mousePosition
}: { 
  scrollProgress: number
  isValuesActive: boolean
  mousePosition: { x: number, y: number }
}) {
  const harmonyRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (!isValuesActive) return
    
    const time = state.clock.elapsedTime
    const harmony = harmonyRef.current
    
    if (harmony) {
      const valuesPhase = Math.min((scrollProgress - 1.3) / 0.3, 1)
      
      harmony.children.forEach((orb, index) => {
        const mesh = orb as THREE.Mesh
        const progress = Math.min(valuesPhase * 1.5, 1)
        
        // 軌道運動
        const radius = 2 + index * 0.5
        const angle = time * 0.5 + index * Math.PI / 3
        const mouseInfluence = mousePosition.x * 0.5 + mousePosition.y * 0.3
        
        mesh.position.x = Math.cos(angle + mouseInfluence) * radius * progress
        mesh.position.y = Math.sin(angle + mouseInfluence) * radius * progress
        mesh.position.z = Math.sin(time * 0.3 + index) * 0.5 * progress
        
        // スケールの変化
        mesh.scale.setScalar(0.5 + progress * 0.5)
        
        // 色の変化
        const material = mesh.material as THREE.MeshBasicMaterial
        const hue = (index * 60 + time * 20) % 360
        material.color.setHSL(hue / 360, 0.8, 0.6)
      })
    }
  })

  if (!isValuesActive) return null

  return (
    <group ref={harmonyRef}>
      {Array.from({ length: 3 }, (_, i) => (
        <mesh key={i} position={[0, 0, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshBasicMaterial 
            color={i === 0 ? "#00F5D4" : i === 1 ? "#8E94F2" : "#F0F3F5"}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Values - 大胆な探究 (Fearless Exploration)
function FearlessExploration({ 
  scrollProgress,
  isValuesActive
}: { 
  scrollProgress: number
  isValuesActive: boolean
}) {
  const explorationRef = useRef<THREE.Group>(null!)
  const lightRef = useRef<THREE.DirectionalLight>(null!)
  
  useFrame((state) => {
    if (!isValuesActive) return
    
    const time = state.clock.elapsedTime
    const exploration = explorationRef.current
    const light = lightRef.current
    
    if (exploration && light) {
      const valuesPhase = Math.min((scrollProgress - 1.6) / 0.4, 1)
      
      // カメラの後退と前進
      if (valuesPhase < 0.5) {
        // 後退フェーズ
        const retreatProgress = valuesPhase * 2
        exploration.position.z = 5 + retreatProgress * 10
        exploration.scale.setScalar(1 + retreatProgress * 2)
      } else {
        // 前進フェーズ
        const advanceProgress = (valuesPhase - 0.5) * 2
        exploration.position.z = 15 - advanceProgress * 20
        exploration.scale.setScalar(3 - advanceProgress * 2)
      }
      
      // 光の強度変化
      light.intensity = 0.5 + Math.sin(time * 2) * 0.3 * valuesPhase
      
      // 回転
      exploration.rotation.x = time * 0.1
      exploration.rotation.y = time * 0.15
    }
  })

  if (!isValuesActive) return null

  return (
    <group ref={explorationRef} position={[0, 0, 5]}>
      <directionalLight ref={lightRef} position={[0, 0, 0]} intensity={0.5} color="#00F5D4" />
      
      {/* 未知の構造体 */}
      {Array.from({ length: 20 }, (_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        ]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial 
            color="#8E94F2"
            transparent
            opacity={0.3}
          />
        </mesh>
      ))}
      
      {/* 光の筋 - ユーザー自身の光 */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 20, 8]} />
        <meshBasicMaterial 
          color="#00F5D4"
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// スクロール位置を追跡するコンポーネント
function ScrollTracker() {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [smoothScrollPosition, setSmoothScrollPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0, z: 0 })
  const [isClickActive, setIsClickActive] = useState(false)
  const [clickStartTime, setClickStartTime] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const { viewport, camera } = useThree()

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / maxScroll, 1)
      
      setScrollProgress(progress)
      
      // スクロール進行度を-1から1の範囲にマッピング
      const x = Math.sin(progress * Math.PI * 2) * 0.5
      const y = Math.cos(progress * Math.PI * 2) * 0.5
      
      setScrollPosition({ x, y })
    }

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    const handleClick = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      setClickPosition({ x: x * 5, y: y * 5, z: 0 })
      setIsClickActive(true)
      setClickStartTime(Date.now())
      setTimeout(() => setIsClickActive(false), 2000)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  // スムーズなスクロール位置の補間
  useFrame(() => {
    setSmoothScrollPosition(prev => ({
      x: prev.x + (scrollPosition.x - prev.x) * 0.05,
      y: prev.y + (scrollPosition.y - prev.y) * 0.05
    }))
    
    // スクロールに応じたカメラの動き
    if (scrollProgress < 0.7) {
      // Mission段階 - コアの内部に吸い込まれる
      const missionPhase = scrollProgress / 0.7
      camera.position.x = Math.sin(missionPhase * Math.PI) * 2
      camera.position.y = Math.cos(missionPhase * Math.PI) * 1.5
      camera.position.z = 8 - missionPhase * 6
    } else if (scrollProgress < 1.0) {
      // Vision段階 - 流体空間の周りを回る
      const visionPhase = (scrollProgress - 0.7) / 0.3
      camera.position.x = Math.sin(visionPhase * Math.PI * 2) * 4
      camera.position.y = Math.cos(visionPhase * Math.PI * 2) * 3
      camera.position.z = 2 + visionPhase * 3
    } else {
      // Values段階 - 3つのValuesを順番に見る
      const valuesPhase = (scrollProgress - 1.0) / 1.0
      if (valuesPhase < 0.3) {
        // 本質と洗練
        camera.position.x = 0
        camera.position.y = 0
        camera.position.z = 5
      } else if (valuesPhase < 0.6) {
        // 動的な調和
        camera.position.x = Math.sin(valuesPhase * Math.PI * 2) * 3
        camera.position.y = Math.cos(valuesPhase * Math.PI * 2) * 2
        camera.position.z = 4
      } else {
        // 大胆な探究 - 後退と前進
        const explorationPhase = (valuesPhase - 0.6) / 0.4
        if (explorationPhase < 0.5) {
          // 後退
          camera.position.x = 0
          camera.position.y = 0
          camera.position.z = 5 + explorationPhase * 20
        } else {
          // 前進
          camera.position.x = 0
          camera.position.y = 0
          camera.position.z = 15 - (explorationPhase - 0.5) * 30
        }
      }
    }
    
    camera.lookAt(0, 0, 0)
  })

  // 各段階のアクティブ状態を計算
  const isMissionActive = scrollProgress < 0.7
  const isVisionActive = scrollProgress >= 0.7 && scrollProgress < 1.0
  const isValuesActive = scrollProgress >= 1.0

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={75} />
      
      {/* ライティング */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <pointLight position={[0, 0, 0]} intensity={2.0} color="#00F5D4" />
      <pointLight position={[-3, 3, 3]} intensity={0.5} color="#8E94F2" />
      
      {/* Mission段階のアニメーション */}
      {isMissionActive && (
        <>
          <ChaosParticles 
            scrollProgress={scrollProgress}
            isMissionActive={isMissionActive}
          />
          <OrganizedStreams 
            scrollProgress={scrollProgress}
            isMissionActive={isMissionActive}
          />
        </>
      )}
      
      {/* Vision段階のアニメーション */}
      {isVisionActive && (
        <>
          <FluidSpace 
            scrollProgress={scrollProgress}
            isVisionActive={isVisionActive}
          />
          <AuroraFlow 
            scrollProgress={scrollProgress}
            isVisionActive={isVisionActive}
          />
        </>
      )}
      
      {/* Values段階のアニメーション */}
      {isValuesActive && (
        <>
          <EssenceRefinement 
            scrollProgress={scrollProgress}
            isValuesActive={isValuesActive}
          />
          <DynamicHarmony 
            scrollProgress={scrollProgress}
            isValuesActive={isValuesActive}
            mousePosition={mousePosition}
          />
          <FearlessExploration 
            scrollProgress={scrollProgress}
            isValuesActive={isValuesActive}
          />
        </>
      )}
      
      {/* メインビジュアル: 流体のコア */}
      <FlowingCore 
        scrollPosition={smoothScrollPosition}
        mousePosition={mousePosition}
        isHovered={isHovered}
        onClick={() => {}}
        setIsHovered={setIsHovered}
        scrollProgress={scrollProgress}
      />
      
      {/* クリック時の光の粒子 */}
      <ClickParticles 
        clickPosition={clickPosition}
        isActive={isClickActive}
        startTime={clickStartTime}
      />
      
      {/* マウス操作は無効化（インタラクティブ性は独自実装） */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate={false}
      />
    </>
  )
}

function SceneContent() {
  return <ScrollTracker />
}

export default function Scene3D() {
  const [isClient, setIsClient] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    // WebGLコンテキストの損失を監視
    const handleContextLost = (event: Event) => {
      event.preventDefault()
      console.warn('WebGL context lost, attempting to restore...')
      setHasError(true)
    }

    const handleContextRestored = () => {
      console.log('WebGL context restored')
      setHasError(false)
    }

    window.addEventListener('webglcontextlost', handleContextLost)
    window.addEventListener('webglcontextrestored', handleContextRestored)

    return () => {
      window.removeEventListener('webglcontextlost', handleContextLost)
      window.removeEventListener('webglcontextrestored', handleContextRestored)
    }
  }, [])

  if (!isClient || hasError) {
    return (
      <div style={{ 
        width: '100%', 
        height: '100vh', 
        background: '#0D1B2A',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            border: '2px solid rgba(255,255,255,0.3)', 
            borderTop: '2px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p>{hasError ? '3Dシーンの読み込みに失敗しました' : '3Dシーンを読み込み中...'}</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: '#0D1B2A',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1
    }}>
      <Canvas
        gl={{ 
          antialias: window.innerWidth > 768, // モバイルではアンチエイリアスを無効化
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: true
        }}
        dpr={window.innerWidth > 768 ? [1, 2] : [1, 1]} // モバイルでは低いDPR
        performance={{ min: window.innerWidth > 768 ? 0.5 : 0.2 }} // モバイルではより低いパフォーマンス閾値
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault()
            setHasError(true)
          })
        }}
      >
        <Suspense fallback={
          <div style={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            color: 'white',
            textAlign: 'center'
          }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              border: '2px solid rgba(255,255,255,0.3)', 
              borderTop: '2px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 16px'
            }}></div>
            <p>3Dシーンを読み込み中...</p>
          </div>
        }>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  )
}