import { Link } from 'react-router-dom'
import { useState, useCallback } from 'react'
import { Menu, X, Github, Linkedin, Twitter } from 'lucide-react'
import siteConfig from '../../config/site'

interface NavbarProps {
  textEnter: () => void
  textLeave: () => void
}

const Navbar = ({ textEnter, textLeave }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Sobre Mí', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contacto', path: '/contact' },
  ]

  // OWASP: Prevenir XSS usando Link de react-router-dom en lugar de <a> interno
  // Los enlaces externos usan <a> con rel="noopener noreferrer"

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark" role="navigation" aria-label="Navegación principal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-display font-bold text-gradient"
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            aria-label={`Ir a inicio - ${siteConfig.siteName}`}
          >
            {siteConfig.siteName}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-dark-300 hover:text-primary-400 transition-colors duration-300"
                onMouseEnter={textEnter}
                onMouseLeave={textLeave}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Social Links - Solo mostrar si están configurados */}
            {(siteConfig.social.github || siteConfig.social.linkedin || siteConfig.social.twitter) && (
              <div className="flex items-center space-x-4 ml-4">
                {siteConfig.social.github && (
                  <a
                    href={siteConfig.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    <Github size={20} />
                  </a>
                )}
                {siteConfig.social.linkedin && (
                  <a
                    href={siteConfig.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {siteConfig.social.twitter && (
                  <a
                    href={siteConfig.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Twitter"
                    className="text-dark-400 hover:text-primary-400 transition-colors"
                    onMouseEnter={textEnter}
                    onMouseLeave={textLeave}
                  >
                    <Twitter size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark-300"
            onClick={toggleMenu}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden glass-dark">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="block px-4 py-2 text-dark-300 hover:text-primary-400 hover:bg-dark-800 rounded-lg transition-colors"
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
