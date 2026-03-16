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
    <div className="min-h-screen pt-20 bg-dark-950">
      {/* Botón de volver */}
      <div className="max-w-3xl mx-auto px-4 pt-8 pb-2">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center gap-2 text-dark-400 hover:text-primary-400 transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Volver al Blog
        </button>
      </div>

      {/* Artículo */}
      <article className="max-w-3xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Imagen hero */}
          <div className="relative h-64 md:h-[420px] rounded-2xl overflow-hidden my-8">
            <img
              src={(articulo.imagen_url || articulo.imagen)?.replace(/^https?:\/\/[^/]+/, '')}
              alt={articulo.titulo}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/30 to-transparent" />
            {articulo.categoria && (
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-primary-600/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                  {articulo.categoria.nombre}
                </span>
              </div>
            )}
          </div>

          {/* Cabecera */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-white leading-tight">
            {articulo.titulo}
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-dark-400 mb-8 pb-8 border-b border-dark-800">
            <div className="flex items-center gap-2">
              <Calendar size={15} className="text-primary-400" />
              <span>{formatDate(articulo.fecha_publicacion)}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={15} className="text-primary-400" />
              <span>{articulo.autor_nombre || 'Autor'}</span>
            </div>
            {articulo.etiquetas && articulo.etiquetas.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <Tag size={15} className="text-primary-400" />
                {articulo.etiquetas.map((etiqueta, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-dark-800 text-dark-300 text-xs rounded-full">
                    {etiqueta}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Resumen destacado */}
          <div className="border-l-4 border-primary-500 pl-5 mb-10">
            <p className="text-dark-200 text-lg leading-relaxed italic">{articulo.resumen}</p>
          </div>

          {/* Contenido */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-display prose-headings:text-white
              prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
              prose-p:text-dark-300 prose-p:leading-relaxed
              prose-a:text-primary-400 prose-a:no-underline hover:prose-a:text-primary-300
              prose-strong:text-white
              prose-code:text-primary-300 prose-code:bg-dark-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
              prose-pre:bg-dark-800 prose-pre:border prose-pre:border-dark-700 prose-pre:rounded-xl
              prose-blockquote:border-primary-500 prose-blockquote:text-dark-300 prose-blockquote:bg-dark-800/50 prose-blockquote:rounded-r-lg prose-blockquote:py-1
              prose-img:rounded-xl prose-img:shadow-lg
              prose-ul:text-dark-300 prose-ol:text-dark-300
              prose-li:marker:text-primary-400
              prose-hr:border-dark-700"
            dangerouslySetInnerHTML={{ __html: articulo.contenido }}
          />
        </motion.div>

        {/* Footer del artículo */}
        <div className="mt-16 pt-8 border-t border-dark-800 flex items-center justify-between">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 px-5 py-2.5 bg-dark-800 hover:bg-dark-700 text-white rounded-full text-sm font-semibold transition-colors border border-dark-700"
          >
            <ArrowLeft size={16} />
            Volver al Blog
          </button>
        </div>
      </article>
    </div>
  )
}

export default BlogDetail
