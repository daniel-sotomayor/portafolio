/**
 * Blog.tsx - Página de Blog
 * 
 * Esta página muestra una lista de artículos publicados en el blog.
 * Los datos se obtienen dinámicamente desde la API de Django.
 * 
 * @module Blog
 * @description Componente principal de la página de blog
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import siteConfig from '../config/site'

/**
 * Interfaz que define la estructura de un artículo del blog
 * obtenida desde la API de Django
 */
interface Articulo {
  id: number
  titulo: string
  slug: string
  resumen: string
  imagen: string
  imagen_url: string  // URL completa de la imagen
  categoria: Categoria | null
  autor_nombre: string
  etiquetas: string[]
  featured: boolean
  fecha_publicacion: string
}

// Interfaz para categorías de blog
interface Categoria {
  id: number
  nombre: string
  slug: string
}

/**
 * Convierte una fecha en formato ISO a una cadena legible en español
 * @param dateString - Fecha en formato ISO 8601
 * @returns Fecha formateada en español (ej: "15 de marzo de 2026")
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })
}

/**
 * Componente principal de la página de Blog
 * Maneja la carga de artículos desde la API y su renderizado
 */
const Blog = () => {
  // Estado para almacenar los artículos obtenidos de la API
  const [posts, setPosts] = useState<Articulo[]>([])
  // Estado para indicar si la carga está en proceso
  const [loading, setLoading] = useState(true)
  // Estado para almacenar mensajes de error
  const [error, setError] = useState<string | null>(null)

  // Efecto que se ejecuta al montar el componente
  // Realiza la petición a la API para obtener los artículos
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching from:', `${siteConfig.api.baseUrl}/blog/`)
        const response = await fetch(`${siteConfig.api.baseUrl}/blog/`)
        console.log('Response status:', response.status)
        if (!response.ok) {
          throw new Error('Error al cargar artículos')
        }
        const data = await response.json()
        console.log('Blog data:', data)
        // Extraer el array de resultados si existe paginación
        setPosts(data.results || data)
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError('No se pudieron cargar los artículos')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-400">Cargando artículos...</p>
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

  // Si no hay posts, mostrar mensaje
  if (posts.length === 0) {
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
                <span className="text-gradient">Blog</span>
              </h1>
              <p className="text-dark-400 text-lg max-w-2xl">
                Artículos sobre desarrollo web, tecnología y mejores prácticas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mensaje cuando no hay artículos */}
        <section className="py-20 px-4 pb-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="glass p-12 rounded-3xl">
              <p className="text-dark-400 text-lg">
                No hay artículos publicados aún. ¡Vuelve pronto!
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
              <span className="text-gradient">Blog</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl">
              Artículos sobre desarrollo web, tecnología y mejores prácticas.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                className="glass rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={(post.imagen_url || post.imagen)?.replace(/^https?:\/\/[^/]+/, '')}
                    alt={post.titulo}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                      {post.categoria?.nombre || 'General'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {post.titulo}
                  </h2>
                  <p className="text-dark-400 mb-4 line-clamp-2">
                    {post.resumen}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-dark-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{formatDate(post.fecha_publicacion)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.autor_nombre || 'Autor'}</span>
                    </div>
                  </div>

                  <a
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 mt-4 text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Leer más
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Blog
