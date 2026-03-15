/**
 * Configuración del sitio - Variables de entorno
 * OWASP: Los datos sensibles deben configurarse mediante variables de entorno
 * y nunca ser hardcodeados en el código fuente.
 */

// Variables de entorno con valores por defecto seguros para desarrollo
// En producción, estas deben configurarse en el servidor/.env

interface SiteConfig {
  siteName: string
  ownerName: string
  ownerTitle: string
  email: string
  phone: string
  location: string
  experience: string
  projectsCompleted: string
  social: {
    github: string
    linkedin: string
    twitter: string
  }
  api: {
    baseUrl: string
    contactEndpoint: string
  }
}

const siteConfig: SiteConfig = {
  siteName: import.meta.env.VITE_SITE_NAME || 'DevPortfolio',
  ownerName: import.meta.env.VITE_OWNER_NAME || 'Tu Nombre',
  ownerTitle: import.meta.env.VITE_OWNER_TITLE || 'Desarrollador Full Stack',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'email@ejemplo.com',
  phone: import.meta.env.VITE_CONTACT_PHONE || '',
  location: import.meta.env.VITE_LOCATION || 'Venezuela',
  experience: import.meta.env.VITE_EXPERIENCE || '5+ años de experiencia',
  projectsCompleted: import.meta.env.VITE_PROJECTS_COMPLETED || '50+',
  social: {
    github: import.meta.env.VITE_GITHUB_URL || '',
    linkedin: import.meta.env.VITE_LINKEDIN_URL || '',
    twitter: import.meta.env.VITE_TWITTER_URL || '',
  },
  api: {
    baseUrl: import.meta.env.VITE_API_URL || '/api',
    contactEndpoint: import.meta.env.VITE_API_CONTACT_ENDPOINT || '/contacto/',
  }
}

export default siteConfig
