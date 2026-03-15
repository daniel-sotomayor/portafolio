import { useRef, useMemo } from 'react'
import { Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const Hero3D = () => {
  const groupRef = useRef<THREE.Group>(null)
  
  // Geometries positions - Using tuple type for Three.js Vector3 compatibility
  const positions = useMemo(() => ({
    sphere1: [-3, 1, -2] as [number, number, number],
    sphere2: [3, -1, -3] as [number, number, number],
    torus1: [-2, -2, -1] as [number, number, number],
    torus2: [2.5, 2, -2] as [number, number, number],
    box1: [0, 2, -3] as [number, number, number],
    box2: [-3.5, -1, -4] as [number, number, number],
    box3: [4, 0, -4] as [number, number, number]
  }), [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Floating Sphere 1 */}
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <mesh position={positions.sphere1}>
          <sphereGeometry args={[0.8, 32, 32]} />
          <MeshDistortMaterial
            color="#6366f1"
            attach="material"
            distort={0.4}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Floating Sphere 2 */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <mesh position={positions.sphere2}>
          <sphereGeometry args={[0.6, 32, 32]} />
          <meshStandardMaterial
            color="#ec4899"
            roughness={0.1}
            metalness={0.9}
            emissive="#ec4899"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>

      {/* Torus 1 */}
      <Float speed={1} rotationIntensity={2} floatIntensity={0.5}>
        <mesh position={positions.torus1} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
          <torusGeometry args={[0.5, 0.2, 16, 100]} />
          <MeshWobbleMaterial
            color="#6366f1"
            attach="material"
            factor={0.3}
            speed={1}
          />
        </mesh>
      </Float>

      {/* Torus 2 */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <mesh position={positions.torus2}>
          <torusGeometry args={[0.4, 0.15, 16, 100]} />
          <meshStandardMaterial
            color="#ec4899"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Boxes */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={1}>
        <mesh position={positions.box1}>
          <boxGeometry args={[0.5, 0.5, 0.5]} />
          <meshStandardMaterial
            color="#6366f1"
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.8}>
        <mesh position={positions.box2}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.7}
            transparent
            opacity={0.8}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={positions.box3}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial
            color="#ec4899"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Ambient particles */}
      <Points count={200} />
    </group>
  )
}

// Particle system
const Points = ({ count }: { count: number }) => {
  const points = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return positions
  }, [count])

  const pointsRef = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#6366f1"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default Hero3D
