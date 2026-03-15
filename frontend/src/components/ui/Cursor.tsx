import { useEffect, useState, useCallback } from 'react'

type CursorVariant = 'default' | 'text'

interface CursorProps {
  mousePosition: { x: number; y: number }
  cursorVariant: CursorVariant
}

const Cursor = ({ mousePosition, cursorVariant }: CursorProps) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleMouseEnter = useCallback(() => setIsVisible(true), [])
  const handleMouseLeave = useCallback(() => setIsVisible(false), [])

  useEffect(() => {
    // OWASP: Use passive listeners for better performance
    const options: AddEventListenerOptions = { passive: true }
    
    document.body.addEventListener('mouseenter', handleMouseEnter, options)
    document.body.addEventListener('mouseleave', handleMouseLeave, options)

    // Fallback: show cursor after first mouse move if body events don't fire
    const handleMouseMove = () => {
      if (!isVisible) setIsVisible(true)
    }
    window.addEventListener('mousemove', handleMouseMove, options)

    return () => {
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleMouseEnter, handleMouseLeave, isVisible])

  if (!isVisible) return null

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)'
        }}
      />
      <div
        className="cursor-outline"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          width: cursorVariant === 'text' ? '80px' : '40px',
          height: cursorVariant === 'text' ? '80px' : '40px'
        }}
      />
    </>
  )
}

export default Cursor
