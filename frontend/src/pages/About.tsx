/**
 * About.tsx - Página Acerca de Mí
 * 
 * Esta página muestra información sobre el desarrollador, incluyendo
 * habilidades técnicas y experiencia laboral.
 * Los datos se obtienen dinámicamente desde la API de Django.
 * 
 * @module About
 * @description Componente de la página About
 */

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Mail, Download } from 'lucide-react'
import siteConfig from '../config/site'

// Tipos para la API
interface Perfil {
  nombre_completo: string
  titulo_profesional: string
  bio_corta: string
  bio_larga: string
  email: string
  telefono: string
  ubicacion: string
  foto_perfil: string
  foto_perfil_url: string  // URL completa de la foto de perfil
  cv_pdf: string
  cv_pdf_url: string  // URL completa del CV
  redes_sociales: {
    github?: string
    linkedin?: string
    twitter?: string
  }
}

interface Habilidad {
  id: number
  nombre: string
  icono: string
  categoria: number
  categoria_nombre: string
  nivel: number
  descripcion: string
  anios_experiencia: string
  orden: number
}

interface Experiencia {
  id: number
  empresa: string
  cargo: string
  descripcion: string
  logo: string
  ubicacion: string
  url_empresa: string
  fecha_inicio: string
  fecha_fin: string | null
  actual: boolean
  orden: number
}

// Función para formatear fechas
const formatDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-VE', { month: 'short', year: 'numeric' })
}

const About = () => {
  const [habilidades, setHabilidades] = useState<Habilidad[]>([])
  const [experiencia, setExperiencia] = useState<Experiencia[]>([])
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch del perfil público
        const perfilResponse = await fetch(`${siteConfig.api.baseUrl}/perfil/public`)
        if (perfilResponse.ok) {
          const perfilData = await perfilResponse.json()
          setPerfil(perfilData)
        }
        
        // Fetch habilidades (con categorías) - la API devuelve paginación
        const habilidadesResponse = await fetch(`${siteConfig.api.baseUrl}/habilidades/`)
        const habilidadesData = await habilidadesResponse.json()
        // Extraer el array de resultados si existe paginación
        const habilidadesList = habilidadesData.results || habilidadesData
        
        // Fetch experiencia laboral
        const experienciaResponse = await fetch(`${siteConfig.api.baseUrl}/experiencia/laboral`)
        const experienciaData = await experienciaResponse.json()
        // Extraer el array de resultados si existe paginación
        const experienciaList = experienciaData.results || experienciaData
        
        setHabilidades(habilidadesList)
        setExperiencia(experienciaList)
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Agrupar habilidades por categoría
  // La API devuelve un array plano de habilidades con categoria_nombre
  const groupedSkills = habilidades.reduce((acc, h) => {
    const catName = h.categoria_nombre || 'Otros'
    if (!acc[catName]) {
      acc[catName] = []
    }
    acc[catName].push(h)
    return acc
  }, {} as Record<string, Habilidad[]>)

  // Si no hay datos de la API, usar valores por defecto para no romper el diseño
  const skillsToShow = Object.keys(groupedSkills).length > 0 ? groupedSkills : {
    frontend: ['React', 'Vue.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    backend: ['Django', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB'],
    tools: ['Git', 'Docker', 'AWS', 'Figma', 'Jest']
  }

  const experienceToShow = experiencia.length > 0 ? experiencia.map(exp => ({
    company: exp.empresa,
    role: exp.cargo,
    period: `${formatDate(exp.fecha_inicio)} - ${exp.actual ? 'Presente' : (exp.fecha_fin ? formatDate(exp.fecha_fin) : '')}`,
    description: exp.descripcion
  })) : [
    {
      company: 'TechCorp',
      role: 'Senior Full Stack Developer',
      period: '2022 - Presente',
      description: 'Liderando el desarrollo de aplicaciones web escalables.'
    },
    {
      company: 'StartupXYZ',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Desarrollo de APIs RESTful y interfaces de usuario modernas.'
    },
    {
      company: 'AgencyDigital',
      role: 'Frontend Developer',
      period: '2018 - 2020',
      description: 'Creación de sitios web responsivos y aplicaciones interactivas.'
    }
  ]

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-dark-400">Cargando información...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
                Sobre <span className="text-gradient">Mí</span>
              </h1>
              <p className="text-dark-400 text-lg mb-6">
                Soy un desarrollador full stack apasionado por crear experiencias 
                digitales extraordinarias. Con más de 5 años de experiencia, 
                me especializo en construir aplicaciones web modernas y eficientes.
              </p>
              <div className="flex flex-wrap gap-4 text-dark-300 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary-400" />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-primary-400" />
                  <span>{siteConfig.experience}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-primary-400" />
                  <span>{siteConfig.email}</span>
                </div>
              </div>
              <button 
                className="flex items-center gap-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full font-semibold transition-colors"
                onClick={() => {
                  // Usar URL completa del CV si está disponible, sinon usar el valor antiguo
                  const cvUrl = (perfil?.cv_pdf_url || perfil?.cv_pdf)?.replace(/^https?:\/\/[^/]+/, '')
                  if (cvUrl) {
                    window.open(cvUrl, '_blank')
                  }
                }}
              >
                <Download size={18} />
                Descargar CV
              </button>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass">
                <img
                  src={(perfil?.foto_perfil_url || perfil?.foto_perfil)?.replace(/^https?:\/\/[^/]+/, '')}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 glass p-6 rounded-xl">
                <div className="text-4xl font-bold text-gradient">{siteConfig.projectsCompleted}</div>
                <div className="text-dark-400">Proyectos completados</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-dark-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Habilidades
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Tecnologías con las que trabajo día a día
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(skillsToShow).map(([category, skillList], index) => (
              <motion.div
                key={category}
                className="glass p-8 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-xl font-bold mb-4 capitalize text-gradient">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {/* Si es array de strings (datos por defecto) */}
                  {Array.isArray(skillList) && typeof skillList[0] === 'string' && (skillList as string[]).map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-dark-800 rounded-lg text-dark-300"
                    >
                      {skill}
                    </span>
                  ))}
                  {/* Si es array de objetos (datos de API) */}
                  {Array.isArray(skillList) && typeof skillList[0] === 'object' && (skillList as Habilidad[]).map((skill) => (
                    <span
                      key={skill.id}
                      className="px-4 py-2 bg-dark-800 rounded-lg text-dark-300"
                    >
                      {skill.nombre}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Experiencia
            </h2>
            <p className="text-dark-400 max-w-2xl mx-auto">
              Mi trayectoria profesional
            </p>
          </motion.div>

          <div className="space-y-6">
            {experienceToShow.map((exp, index) => (
              <motion.div
                key={index}
                className="glass p-6 rounded-2xl"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="text-primary-400">{exp.period}</span>
                </div>
                <p className="text-secondary-400 mb-2">{exp.company}</p>
                <p className="text-dark-400">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
