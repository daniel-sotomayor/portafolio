import { motion } from 'framer-motion'
import { ExternalLink, Github, ArrowRight } from 'lucide-react'

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
      tags: ['React', 'Django', 'PostgreSQL', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Aplicación de gestión de tareas con autenticación, tableros Kanban y colaboración en tiempo real.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800',
      tags: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io'],
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      description: 'Dashboard de analytics para redes sociales con visualizaciones de datos y reportes automáticos.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      tags: ['React', 'TypeScript', 'D3.js', 'Firebase'],
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'Portfolio Generator',
      description: 'Herramienta para generar portafolios personalizados con múltiples plantillas y exportación a PDF.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
      tags: ['Next.js', 'Tailwind', 'Prisma', 'Vercel'],
      github: '#',
      demo: '#'
    }
  ]

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
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 to-transparent opacity-60" />
                  
                  {/* Links overlay */}
                  <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.github}
                      className="p-3 bg-dark-900/80 rounded-full hover:bg-primary-600 transition-colors"
                    >
                      <Github size={24} />
                    </a>
                    <a
                      href={project.demo}
                      className="p-3 bg-primary-600 rounded-full hover:bg-primary-700 transition-colors"
                    >
                      <ExternalLink size={24} />
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-sm bg-dark-800 text-dark-300 rounded-full"
                      >
                        {tag}
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
