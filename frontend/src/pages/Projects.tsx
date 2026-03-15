/**
 * Projects.tsx - Página de Proyectos
 * 
 * Esta página muestra una lista de proyectos del portafolio.
 * Los datos se obtienen dinámicamente desde la API de Django.
 * Cada proyecto puede tener enlaces a demo y código fuente.
 * 
 * @module Projects
 * @description Componente principal de la página de proyectos
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'
import siteConfig from '../config/site'

// Tipo para proyecto de la API
interface Proyecto {
  id: number
  titulo: string
  slug: string
  descripcion_corta: string
  imagen: string
  categorias: Categoria[]
  tecnologias: string[]
  fecha_inicio: string
  en_progreso: boolean
  destacado: boolean
  url_demo?: string
  url_codigo?: string
}

interface Categoria {
  id: number
  nombre: string
  slug: string
  color: string
}

const Projects = () => {
  const [projects, setProjects] = useState<Proyecto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        console.log('Fetching from:', `${siteConfig.api.baseUrl}/proyectos/`)
        console.log('API URL config:', siteConfig.api)
        const response = await fetch(`${siteConfig.api.baseUrl}/proyectos/`)
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error('Error al cargar proyectos')
        }
        const data = await response.json()
        console.log('Projects data:', data)
        // Extraer el array de resultados si existe paginación
        setProjects(data.results || data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('No se pudieron cargar los proyectos')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-400">Cargando proyectos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            Reintentar
          </button>
        </div>
      </div>
    )
  }

  // Si no hay proyectos, mostrar mensaje
  if (projects.length === 0) {
    return (
      <div className="min-h-screen pt-20">
        {/* Header */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Mis <span className="text-gradient">Proyectos</span>
              </h1>
              <p className="text-dark-400 text-lg max-w-2xl">
                Una selección de proyectos en los que he trabajado. Cada uno representa 
                un desafío único y una oportunidad de aprendizaje.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mensaje cuando no hay proyectos */}
        <section className="py-20 px-4 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="glass p-12 rounded-3xl">
              <p className="text-dark-400 text-lg">
                No hay proyectos publicados aún. ¡Vuelve pronto!
              </p>
            </div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Mis <span className="text-gradient">Proyectos</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl">
              Una selección de proyectos en los que he trabajado. Cada uno representa 
              un desafío único y una oportunidad de aprendizaje.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.imagen}
                    alt={project.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      // Imagen por defecto si falla la carga
                      const target = e.target as HTMLImageElement
                      target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60" />
                  
                  {/* Links overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {project.url_codigo && (
                      <a
                        href={project.url_codigo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-900/80 rounded-full hover:bg-primary-600 transition-colors"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {project.url_demo && (
                      <a
                        href={project.url_demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors"
                      >
                        <ExternalLink size={24} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {project.titulo}
                  </h3>
                  <p className="text-dark-400 mb-4">
                    {project.descripcion_corta}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tecnologias && project.tecnologias.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 text-sm bg-dark-800 text-dark-300 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="glass p-12 rounded-3xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-display font-bold mb-4">
              ¿Tienes un proyecto en mente?
            </h2>
            <p className="text-dark-400 mb-8">
              Estoy interesado en escuchar sobre tu proyecto y cómo puedo ayudarte.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
            >
              Hablemos
              <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Projects
