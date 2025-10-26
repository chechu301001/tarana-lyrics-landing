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
    <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8">
      <div className="text-center max-w-6xl mx-auto flex flex-col items-center justify-center">
        {/* Main Title */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] font-bold text-yellow-400 mb-20 leading-tight text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {title.split(' ').map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-4"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-yellow-200 mb-24 leading-relaxed font-light text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {subtitle.split(' ').map((word, index) => (
            <motion.span
              key={index}
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
              className="inline-block mr-3"
            >
              {word}
            </motion.span>
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
          className="btn-primary text-xl md:text-2xl xl:text-3xl px-16 py-4"
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