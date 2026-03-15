/// <reference types="vite/client" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        // OWASP: Limitar proxy solo a endpoints necesarios
        configure: (proxy, options) => {
          proxy.on('error', (err, req, res) => {
            console.log('Proxy error:', err)
          })
        },
      },
      // Proxy para archivos media (imágenes cargadas desde admin)
      '/media': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
    // OWASP A6:2017 - Security Misconfiguration
    // Configurar headers de seguridad
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // React y Three.js necesitan eval
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data: https: blob:",
        "font-src 'self' data:",
        "connect-src 'self' http://localhost:8000 https: wss:", // Allow localhost for API
        "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; '),
    },
  },
  // OWASP A9:2017 - Using Components with Known Vulnerabilities
  // Vulnerable dependencies will be flagged by npm audit
  build: {
    // No sourcemaps in production for security
    sourcemap: false,
    // Minificar para reducir superficie de ataque
    minify: 'esbuild',
    // Rollup options para tree shaking
    rollupOptions: {
      output: {
        // PrevenirInjection: nombres de archivos sin información sensible
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
  },
  // OWASP: Configuración de optimizeDeps
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
