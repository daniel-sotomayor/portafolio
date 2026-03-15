import { Link } from 'react-router-dom'
import { Github, Linkedin, Twitter, Mail } from 'lucide-react'
import siteConfig from '../../config/site'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contact' },
  ]

  return (
    <footer className="bg-dark-950 border-t border-dark-800" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-display font-bold text-gradient mb-4">
              {siteConfig.siteName}
            </h3>
            <p className="text-dark-400">
              {siteConfig.ownerTitle} especializado en crear experiencias 
              digitales innovadoras y funcionales.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="flex space-x-4">
              {siteConfig.social.github && (
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Github size={24} />
                </a>
              )}
              {siteConfig.social.linkedin && (
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              )}
              {siteConfig.social.twitter && (
                <a
                  href={siteConfig.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Twitter size={24} />
                </a>
              )}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  aria-label="Email"
                  className="text-dark-400 hover:text-primary-400 transition-colors"
                >
                  <Mail size={24} />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-dark-800 text-center text-dark-500">
          <p>© {currentYear} {siteConfig.siteName}. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
