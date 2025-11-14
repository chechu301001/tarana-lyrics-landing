import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function StarryBackground() {
  const [stars, setStars] = useState([])

  useEffect(() => {
    // Generate random stars with varied colors and sizes
    const generateStars = () => {
      const starArray = []
      const colors = [
        '#FFD700', // Gold
        '#FFA500', // Orange
        '#FFFF00', // Yellow
        '#FFFFFF', // White
        '#87CEEB', // Sky Blue
        '#DDA0DD', // Plum
        '#F0E68C', // Khaki
        '#FFE4B5'  // Moccasin
      ]
      
      for (let i = 0; i < 120; i++) {
        starArray.push({
          id: i,
          x: Math.random() * 100, // 0-100% across full width
          y: Math.random() * 100, // 0-100% across full height
          size: Math.random() * 1.5 + 0.5, // Tiny dots: 0.5-2px
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.5 + 0.2,
          delay: Math.random() * 5,
          duration: Math.random() * 3 + 2 // 2-5 second animations
        })
      }
      setStars(starArray)
    }

    generateStars()
  }, [])

  return (
    <div 
      className="starry-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Deep space gradient background */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Animated stars */}
      <div 
        className="absolute inset-0"
        style={{ width: '100%', height: '100%' }}
      >
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              position: 'absolute',
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: star.color,
              boxShadow: `0 0 ${star.size * 2}px ${star.color}`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
              scale: [0.8, 1.4, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              delay: star.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Subtle nebula effect */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{ width: '100%', height: '100%' }}
      >
        <motion.div 
          className="absolute bg-purple-500 rounded-full blur-3xl"
          style={{
            top: '25%',
            left: '25%',
            width: '384px',
            height: '384px'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bg-blue-500 rounded-full blur-3xl"
          style={{
            bottom: '25%',
            right: '25%',
            width: '256px',
            height: '256px'
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.25, 0.1]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute bg-yellow-500 rounded-full blur-3xl"
          style={{
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '320px'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.2, 0.05]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>
    </div>
  )
}