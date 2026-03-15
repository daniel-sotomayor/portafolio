import { useState, useEffect, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ArrowDown, Mail } from 'lucide-react'
import Hero3D from '../components/3d/Hero3D'
import siteConfig from '../config/site'

// Tipo para el perfil de la API
interface Perfil {
  nombre_completo: string
  titulo_profesional: string
  bio_corta: string
  bio_larga: string
  email: string
  telefono: string
  ubicacion: string
  foto_perfil: string
  cv_pdf: string
  redes_sociales: {
    github?: string
    linkedin?: string
    twitter?: string
  }
  color_primario: string
  color_secundario: string
  color_oscuro: string
  color_claro: string
}

const Home = () => {
  const [text, setText] = useState('')
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  
  // Usar valores por defecto del config
  const fullText = perfil?.titulo_profesional || siteConfig.ownerTitle
  const ownerName = perfil?.nombre_completo || siteConfig.ownerName
  
  // Typewriter effect
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText(fullText.slice(0, index + 1))
        index++
      } else {
        clearInterval(interval)
      }
    }, 100)
    return () => clearInterval(interval)
  }, [fullText])

  // Fetch del perfil público
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const response = await fetch(`${siteConfig.api.baseUrl}/perfil/public`)
        if (response.ok) {
          const data = await response.json()
          setPerfil(data)
        }
      } catch (err) {
        console.error('Error fetching perfil:', err)
        // Si falla, usamos los valores por defecto
      }
    }

    fetchPerfil()
  }, [])

  // OWASP: Remover autoRotate para prevenir motion sickness
  // Los usuarios pueden controlar manualmente la rotación si desean

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
            {/* OWASP: Removido autoRotate para prevenir mareo */}
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-900/50 to-dark-900 z-10" aria-hidden="true" />

        {/* Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl md:text-2xl text-primary-400 mb-4">
              Hola, soy
            </h2>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-4">
              <span className="text-gradient">{ownerName}</span>
            </h1>
            <p className="text-2xl md:text-3xl text-dark-300 mb-8 h-10" aria-label={`Título: ${text}`}>
              {text}<span className="animate-pulse" aria-hidden="true">|</span>
            </p>
            <p className="text-dark-400 text-lg mb-8 max-w-2xl mx-auto">
              {perfil?.bio_corta || 'Creo experiencias digitales innovadoras y funcionales con las tecnologías más modernas del desarrollo web.'}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/projects"
                  className="inline-block px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
                >
                  Ver Proyectos
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contact"
                  className="inline-block px-8 py-3 border-2 border-primary-500 text-primary-400 hover:bg-primary-500/10 rounded-full font-semibold transition-colors"
                >
                  Contactar
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          aria-hidden="true"
        >
          <ArrowDown className="text-dark-400" size={32} />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-dark-900" aria-labelledby="features-heading">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 id="features-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Qué hago?
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Desarrollo soluciones web completas, desde el diseño hasta la implementación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Desarrollo Frontend',
                description: 'Interfaces de usuario modernas y responsivas con React, Vue o Angular.',
                icon: '🎨'
              },
              {
                title: 'Desarrollo Backend',
                description: 'APIs robustas y escalables con Django, Node.js o Ruby on Rails.',
                icon: '⚙️'
              },
              {
                title: 'Base de Datos',
                description: 'Diseño y optimización de bases de datos PostgreSQL, MySQL o MongoDB.',
                icon: '🗄️'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="text-4xl mb-4" aria-hidden="true">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-dark-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4" aria-labelledby="cta-heading">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass p-12 rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-display font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-dark-400 mb-8">
              Estoy disponible para trabajar en proyectos emocionantes. ¡Hablemos!
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-secondary-600 hover:bg-secondary-700 text-white rounded-full font-semibold transition-colors"
              >
                <Mail size={20} />
                Contactar Ahora
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
