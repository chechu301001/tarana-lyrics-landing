import React from 'react'
import { motion } from 'framer-motion'

export default function TextReveal({ onNext }) {
  const title = "Hi! So glad you are a part of this beautiful journey."
  const subtitle = "We made a mobile lyrics sheet so you can sing along during the show."

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 2.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(255, 215, 0, 0.4)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8">
      <div className="text-center max-w-6xl flex flex-col items-center justify-center gap-8 md:gap-12">
        {/* Main Title */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-yellow-400 leading-tight text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              <motion.span
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
              {index < title.split(' ').length - 1 && ' '}
            </React.Fragment>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-yellow-200 leading-relaxed font-light text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitle.split(' ').map((word, index) => (
            <React.Fragment key={index}>
              <motion.span
                variants={{
                  ...wordVariants,
                  visible: {
                    ...wordVariants.visible,
                    transition: {
                      ...wordVariants.visible.transition,
                      delay: 1.2 + index * 0.1
                    }
                  }
                }}
                className="inline-block"
              >
                {word}
              </motion.span>
              {index < subtitle.split(' ').length - 1 && ' '}
            </React.Fragment>
          ))}
        </motion.p>

        {/* Next Button */}
        <motion.button
          variants={buttonVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          whileTap="tap"
          onClick={onNext}
          className="btn-primary text-lg md:text-xl xl:text-2xl px-12 py-3 mt-4"
        >
          Enter Experience
        </motion.button>

        {/* Decorative elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full"
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-yellow-300 rounded-full"
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 2, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 2
          }}
        />
      </div>
    </div>
  )
}