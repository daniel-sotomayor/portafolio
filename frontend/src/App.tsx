import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Cursor from './components/ui/Cursor'

// Pages
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

// Tipo para el variant del cursor
type CursorVariant = 'default' | 'text'

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorVariant, setCursorVariant] = useState<CursorVariant>('default')

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', mouseMove)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
    }
  }, [])

  const textEnter = () => setCursorVariant('text')
  const textLeave = () => setCursorVariant('default')

  return (
    <div className="min-h-screen bg-dark-900 text-dark-50">
      <Cursor mousePosition={mousePosition} cursorVariant={cursorVariant} />
      <Navbar 
        textEnter={textEnter} 
        textLeave={textLeave} 
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
