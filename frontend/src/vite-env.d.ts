/// <reference types="vite/client" />

/**
 * Definición de tipos para variables de entorno de Vite
 * OWASP: Las variables de entorno que empiezan con VITE_ son públicas y accesibles en el cliente
 * Las que no empiezan con VITE_ solo están disponibles en el servidor (no se exponen al cliente)
 */
interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string
  readonly VITE_OWNER_NAME: string
  readonly VITE_OWNER_TITLE: string
  readonly VITE_CONTACT_EMAIL: string
  readonly VITE_CONTACT_PHONE: string
  readonly VITE_LOCATION: string
  readonly VITE_EXPERIENCE: string
  readonly VITE_PROJECTS_COMPLETED: string
  readonly VITE_GITHUB_URL: string
  readonly VITE_LINKEDIN_URL: string
  readonly VITE_TWITTER_URL: string
  readonly VITE_API_URL: string
  readonly VITE_API_CONTACT_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
