import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react'
import siteConfig from '../config/site'

/**
 * OWASP A7:2017 - Missing Function Level Access Control
 * Validación de entrada del lado del cliente para mejor UX
 * La validación real debe hacerse en el servidor
 */

// Tipos para el estado del formulario
interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error'

/**
 * OWASP A1:2017 - Injection
 * Sanitización de entrada para prevenir XSS
 * También se sanitiza en el backend
 */
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remover caracteres peligrosos para HTML
    .replace(/javascript:/gi, '') // Prevenir JS injection
    .replace(/on\w+=/gi, '') // Prevenir event handlers
    .trim()
}

/**
 * Validación de email según OWASP
 */
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validación de teléfono (formato internacional básico)
 */
const isValidPhone = (phone: string): boolean => {
  if (!phone) return true // Phone es opcional
  const phoneRegex = /^\+?[\d\s\-()]{7,20}$/
  return phoneRegex.test(phone)
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  // Validar formulario
  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name || formData.name.length < 2) {
      newErrors.name = 'El nombre debe tener al menos 2 caracteres'
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre es demasiado largo'
    }

    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido'
    }

    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un número de teléfono válido'
    }

    if (!formData.subject || formData.subject.length < 3) {
      newErrors.subject = 'El asunto debe tener al menos 3 caracteres'
    } else if (formData.subject.length > 200) {
      newErrors.subject = 'El asunto es demasiado largo'
    }

    if (!formData.message || formData.message.length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
    } else if (formData.message.length > 5000) {
      newErrors.message = 'El mensaje es demasiado largo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData])

  // Manejar cambios en el formulario
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // OWASP: Limitar longitud máxima para prevenir DoS
    const maxLengths: Record<string, number> = {
      name: 100,
      email: 254,
      phone: 20,
      subject: 200,
      message: 5000
    }
    
    const truncatedValue = value.slice(0, maxLengths[name] || 5000)
    
    setFormData(prev => ({
      ...prev,
      [name]: truncatedValue
    }))
    
    // Limpiar error cuando el usuario corrige
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }, [errors])

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar antes de enviar
    if (!validateForm()) {
      return
    }

    setStatus('loading')
    setStatusMessage('')

    try {
      // OWASP: Sanitizar datos antes de enviar
      const sanitizedData = {
        nombre: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email).toLowerCase(),
        telefono: formData.phone ? sanitizeInput(formData.phone) : '',
        asunto: sanitizeInput(formData.subject),
        mensaje: sanitizeInput(formData.message)
      }

      const response = await fetch(
        `${siteConfig.api.baseUrl}${siteConfig.api.contactEndpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // OWASP: Token CSRF debería estar en cookies httpOnly
            // 'X-CSRF-Token': getCsrfToken()
          },
          credentials: 'include', // Include cookies for CSRF
          body: JSON.stringify(sanitizedData)
        }
      )

      if (!response.ok) {
        throw new Error('Error al enviar el mensaje')
      }

      setStatus('success')
      setStatusMessage('¡Mensaje enviado correctamente! Te responderé pronto.')
      
      // Limpiar formulario
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })

    } catch (error) {
      setStatus('error')
      setStatusMessage('Error al enviar el mensaje. Por favor intenta nuevamente.')
      console.error('Contact form error:', error)
    }
  }

  // Mostrar contacto info desde config
  const showContactInfo = siteConfig.email || siteConfig.phone || siteConfig.location

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Cont<span className="text-gradient">áctame</span>
            </h1>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              ¿Tienes un proyecto en mente o quieres trabajar juntos? 
              ¡Escríbeme! Estaré encantado de escuchar de ti.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-10 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            {showContactInfo && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="glass p-8 rounded-2xl mb-8">
                  <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>
                  
                  <div className="space-y-6">
                    {siteConfig.email && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-600/20 rounded-lg">
                          <Mail className="text-primary-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <a 
                            href={`mailto:${siteConfig.email}`}
                            className="text-dark-400 hover:text-primary-400 transition-colors"
                          >
                            {siteConfig.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {siteConfig.phone && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-600/20 rounded-lg">
                          <Phone className="text-primary-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Teléfono</h3>
                          <a 
                            href={`tel:${siteConfig.phone}`}
                            className="text-dark-400 hover:text-primary-400 transition-colors"
                          >
                            {siteConfig.phone}
                          </a>
                        </div>
                      </div>
                    )}

                    {siteConfig.location && (
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary-600/20 rounded-lg">
                          <MapPin className="text-primary-400" size={24} />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">Ubicación</h3>
                          <p className="text-dark-400">{siteConfig.location}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Social Links */}
                {(siteConfig.social.github || siteConfig.social.linkedin || siteConfig.social.twitter) && (
                  <div className="glass p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-6">Redes sociales</h2>
                    <div className="flex gap-4">
                      {siteConfig.social.github && (
                        <a
                          href={siteConfig.social.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="GitHub"
                          className="p-4 bg-dark-800 hover:bg-primary-600 rounded-xl transition-colors"
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
                          className="p-4 bg-dark-800 hover:bg-primary-600 rounded-xl transition-colors"
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
                          className="p-4 bg-dark-800 hover:bg-primary-600 rounded-xl transition-colors"
                        >
                          <Twitter size={24} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl" noValidate>
                <h2 className="text-2xl font-bold mb-6">Envíame un mensaje</h2>
                
                {/* Status Message */}
                {status !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                      status === 'success' 
                        ? 'bg-green-900/30 text-green-400 border border-green-700'
                        : status === 'error'
                        ? 'bg-red-900/30 text-red-400 border border-red-700'
                        : 'bg-blue-900/30 text-blue-400 border border-blue-700'
                    }`}
                  >
                    {status === 'success' && <CheckCircle size={20} />}
                    {status === 'error' && <AlertCircle size={20} />}
                    {status === 'loading' && (
                      <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full" />
                    )}
                    <span>{statusMessage || (status === 'loading' ? 'Enviando mensaje...' : '')}</span>
                  </motion.div>
                )}
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Nombre *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        minLength={2}
                        maxLength={100}
                        disabled={status === 'loading'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none transition-colors ${
                          errors.name ? 'border-red-500 focus:border-red-500' : 'border-dark-700 focus:border-primary-500'
                        }`}
                        placeholder="Daniel Tomas Sotomayor Romero"
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                          {errors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        maxLength={254}
                        disabled={status === 'loading'}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                        className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500 focus:border-red-500' : 'border-dark-700 focus:border-primary-500'
                        }`}
                        placeholder="tu@email.com"
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Teléfono (opcional)
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={20}
                        disabled={status === 'loading'}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                        aria-invalid={!!errors.phone}
                        className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-dark-700 focus:border-primary-500'
                        }`}
                        placeholder="+58 123 456 7890"
                        autoComplete="tel"
                      />
                      {errors.phone && (
                        <p id="phone-error" className="mt-1 text-sm text-red-400" role="alert">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Asunto *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        minLength={3}
                        maxLength={200}
                        disabled={status === 'loading'}
                        aria-describedby={errors.subject ? 'subject-error' : undefined}
                        aria-invalid={!!errors.subject}
                        className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none transition-colors ${
                          errors.subject ? 'border-red-500 focus:border-red-500' : 'border-dark-700 focus:border-primary-500'
                        }`}
                        placeholder="Asunto del mensaje"
                      />
                      {errors.subject && (
                        <p id="subject-error" className="mt-1 text-sm text-red-400" role="alert">
                          {errors.subject}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      minLength={10}
                      maxLength={5000}
                      disabled={status === 'loading'}
                      rows={6}
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-3 bg-dark-800 border rounded-lg focus:outline-none transition-colors resize-none ${
                        errors.message ? 'border-red-500 focus:border-red-500' : 'border-dark-700 focus:border-primary-500'
                      }`}
                      placeholder="Escribe tu mensaje aquí..."
                    />
                    {errors.message && (
                      <p id="message-error" className="mt-1 text-sm text-red-400" role="alert">
                        {errors.message}
                      </p>
                    )}
                    <p id="message-hint" className="mt-1 text-xs text-dark-500">
                      Mínimo 10 caracteres, máximo 5000
                    </p>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-primary-800 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                    whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                    whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                  >
                    {status === 'loading' ? (
                      <>
                        <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        Enviar mensaje
                      </>
                    )}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
