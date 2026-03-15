/**
 * BlogDetail.tsx - Página de Detalle de Artículo
 * 
 * Esta página muestra el contenido completo de un artículo del blog.
 * Los datos se obtienen dinámicamente desde la API de Django usando el slug.
 * 
 * @module BlogDetail
 * @description Componente de la página de detalle de artículo
 */

import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import siteConfig from '../config/site'

// Interfaz para el artículo completo
interface Articulo {
  id: number
  titulo: string
  slug: string
  resumen: string
  contenido: string
  imagen: string
  imagen_url: string  // URL completa de la imagen
  categoria: Categoria | null
  autor: number | null
  autor_nombre: string
  etiquetas: string[]
  meta_titulo: string
  meta_descripcion: string
  publicado: boolean
  featured: boolean
  fecha_publicacion: string
  creado: string
  actualizado: string
}

interface Categoria {
  id: number
  nombre: string
  slug: string
  descripcion: string
}

/**
 * Convierte una fecha en formato ISO a una cadena legible en español
 */
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-VE', { day: 'numeric', month: 'long', year: 'numeric' })
}

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [articulo, setArticulo] = useState<Articulo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticulo = async () => {
      if (!slug) {
        setError('Artículo no encontrado')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`${siteConfig.api.baseUrl}/blog/${slug}`)
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Artículo no encontrado')
          }
          throw new Error('Error al cargar el artículo')
        }
        const data = await response.json()
        setArticulo(data)
      } catch (err) {
        console.error('Error fetching article:', err)
        setError(err instanceof Error ? err.message : 'Error al cargar el artículo')
      } finally {
        setLoading(false)
      }
    }

    fetchArticulo()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-400">Cargando artículo...</p>
        </div>
      </div>
    )
  }

  if (error || !articulo) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || 'Artículo no encontrado'}</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg"
          >
            Volver al Blog
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Botón de volver */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
        >
          <ArrowLeft size={20} />
          Volver al Blog
        </button>
      </div>

      {/* Artículo */}
      <article className="max-w-4xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Imagen */}
          <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={articulo.imagen_url || articulo.imagen}
              alt={articulo.titulo}
              className="w-full h-full object-cover"
              loading="lazy"
              onLoad={(e) => {
                console.log('BlogDetail image loaded:', articulo.titulo)
                const target = e.target as HTMLImageElement
                target.style.opacity = '1'
              }}
              onError={(e) => {
                console.error('BlogDetail image failed:', articulo.titulo, articulo.imagen_url || articulo.imagen)
                const target = e.target as HTMLImageElement
                target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
              }}
              style={{ opacity: 0, transition: 'opacity 0.3s ease-in-out' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60" />
            
            {/* Categoría */}
            {articulo.categoria && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                  {articulo.categoria.nombre}
                </span>
              </div>
            )}
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
            {articulo.titulo}
          </h1>

          {/* Meta información */}
          <div className="flex flex-wrap items-center gap-6 text-dark-400 mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-primary-400" />
              <span>{formatDate(articulo.fecha_publicacion)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={18} className="text-primary-400" />
              <span>{articulo.autor_nombre || 'Autor'}</span>
            </div>
          </div>

          {/* Resumen */}
          <div className="glass p-6 rounded-2xl mb-8">
            <p className="text-dark-300 text-lg">{articulo.resumen}</p>
          </div>

          {/* Etiquetas */}
          {articulo.etiquetas && articulo.etiquetas.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag size={18} className="text-dark-400 mr-2" />
              {articulo.etiquetas.map((etiqueta, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-dark-800 text-dark-300 text-sm rounded-full"
                >
                  {etiqueta}
                </span>
              ))}
            </div>
          )}

          {/* Contenido - Renderizado como HTML */}
          <div 
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />
        </motion.div>

        {/* Navegación entre artículos */}
        <div className="mt-12 pt-8 border-t border-dark-800">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Volver al Blog
          </button>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
