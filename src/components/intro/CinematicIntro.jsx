import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import StarryBackground from './StarryBackground'
import LogoShimmer from './LogoShimmer'
import TextReveal from './TextReveal'

export default function CinematicIntro({ onComplete }) {
  const [currentStage, setCurrentStage] = useState('loading')
  // Stages: 'loading' -> 'logo' -> 'text' -> 'transitioning'

  useEffect(() => {
    // Automatically progress through stages
    const timer1 = setTimeout(() => {
      setCurrentStage('logo')
    }, 1000) // Show stars for 1 second

    const timer2 = setTimeout(() => {
      setCurrentStage('text')
    }, 3500) // Show logo for 2.5 seconds

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  const handleNext = () => {
    setCurrentStage('transitioning')
    
    // Transition to main app
    setTimeout(() => {
      onComplete()
    }, 1000)
  }

  const fadeVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  }

  return (
    <motion.div
      className="fixed inset-0 z-50 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Stage-based Content */}
      <AnimatePresence mode="wait">
        {currentStage === 'loading' && (
          <motion.div
            key="loading"
            className="absolute inset-0 flex items-center justify-center"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
          </motion.div>
        )}

        {currentStage === 'logo' && (
          <motion.div
            key="logo"
            className="absolute inset-0 flex items-center justify-center"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <LogoShimmer stage="intro" />
          </motion.div>
        )}

        {currentStage === 'text' && (
          <motion.div
            key="text"
            className="absolute inset-0 flex items-center justify-center"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.8 }}
          >
            <TextReveal onNext={handleNext} />
          </motion.div>
        )}

        {currentStage === 'transitioning' && (
          <motion.div
            key="transitioning"
            className="absolute inset-0 flex items-center justify-center"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {/* Logo shrinks and moves to corner during transition */}
            <motion.div
              className="absolute top-8 left-8"
              initial={{ 
                scale: 1, 
                x: 'calc(50vw - 50%)', 
                y: 'calc(50vh - 50%)' 
              }}
              animate={{ 
                scale: 0.3, 
                x: 0, 
                y: 0 
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <LogoShimmer stage="header" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}