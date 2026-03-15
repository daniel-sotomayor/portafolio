import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Cómo construir una API REST con Django',
      excerpt: 'Aprende a crear una API REST robusta y escalable usando Django REST Framework.',
      date: '15 Marzo, 2024',
      author: 'Tu Nombre',
      category: 'Backend',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800'
    },
    {
      id: 2,
      title: 'Introducción a React 18 con TypeScript',
      excerpt: 'Una guía completa para empezar a usar React 18 con TypeScript en tus proyectos.',
      date: '10 Marzo, 2024',
      author: 'Tu Nombre',
      category: 'Frontend',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800'
    },
    {
      id: 3,
      title: 'Optimización de rendimiento en aplicaciones web',
      excerpt: 'Técnicas y mejores prácticas para mejorar el rendimiento de tu sitio web.',
      date: '5 Marzo, 2024',
      author: 'Tu Nombre',
      category: 'Rendimiento',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800'
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
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-600 text-white text-sm rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary-400 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-dark-400 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-dark-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                  </div>

                  <a
                    href="#"
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
