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

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Github, FileText, X, ArrowRight, ArrowLeft } from 'lucide-react'
import siteConfig from '../config/site'

// Tipo para proyecto de la API
interface Proyecto {
  id: number
  titulo: string
  slug: string
  descripcion_corta: string
  descripcion_larga: string
  imagen: string
  categorias: Categoria[]
  tecnologias: string[]
  caracteristicas: string[]
  fecha_inicio: string
  fecha_fin: string | null
  en_progreso: boolean
  destacado: boolean
  url_demo?: string
  url_codigo?: string
  url_documentacion?: string
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
  const [selectedProject, setSelectedProject] = useState<Proyecto | null>(null)

  // Función para cerrar el modal
  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  // Efecto para cerrar modal con tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProject) {
        closeModal()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProject, closeModal])

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
                className="glass rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
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

      {/* Modal de Detalle de Proyecto */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
            
            {/* Contenido del Modal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glass rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón de cerrar */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 z-10 p-2 bg-dark-900/80 rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={24} className="text-white" />
              </button>

              {/* Imagen */}
              <div className="relative h-64 md:h-96">
                <img
                  src={selectedProject.imagen}
                  alt={selectedProject.titulo}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                  {selectedProject.titulo}
                </h2>

                {/* Categorías */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.categorias?.map((cat) => (
                    <span
                      key={cat.id}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ backgroundColor: cat.color || '#6366f1', color: '#fff' }}
                    >
                      {cat.nombre}
                    </span>
                  ))}
                </div>

                {/* Descripción larga */}
                <p className="text-dark-300 mb-6">
                  {selectedProject.descripcion_larga || selectedProject.descripcion_corta}
                </p>

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-white">Tecnologías</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tecnologias?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-dark-800 text-dark-300 rounded-lg"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Características */}
                {selectedProject.caracteristicas && selectedProject.caracteristicas.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-white">Características</h3>
                    <ul className="space-y-2">
                      {selectedProject.caracteristicas.map((caract, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-dark-300">
                          <span className="w-2 h-2 bg-primary-500 rounded-full" />
                          {caract}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fechas */}
                <div className="mb-6 text-dark-400">
                  <span>
                    {selectedProject.en_progreso 
                      ? `Desde ${selectedProject.fecha_inicio} - En progreso`
                      : selectedProject.fecha_fin 
                        ? `${selectedProject.fecha_inicio} - ${selectedProject.fecha_fin}`
                        : selectedProject.fecha_inicio
                    }
                  </span>
                </div>

                {/* Botones de navegación */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.url_demo && (
                    <a
                      href={selectedProject.url_demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-semibold transition-colors"
                    >
                      <ExternalLink size={20} />
                      Live Demo
                    </a>
                  )}
                  {selectedProject.url_codigo && (
                    <a
                      href={selectedProject.url_codigo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-full font-semibold transition-colors border border-dark-600"
                    >
                      <Github size={20} />
                      Código Fuente
                    </a>
                  )}
                  {selectedProject.url_documentacion && (
                    <a
                      href={selectedProject.url_documentacion}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-colors"
                    >
                      <FileText size={20} />
                      Documentación
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Projects
