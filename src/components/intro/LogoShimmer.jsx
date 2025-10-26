import { motion } from 'framer-motion'
import logoImage from '../../assets/Taranalogo.png'

export default function LogoShimmer({ stage = 'intro' }) {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="relative"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: stage === 'intro' ? 1 : 0.6,
          opacity: 1 
        }}
        transition={{ 
          duration: 1.5, 
          ease: "easeOut",
          delay: stage === 'intro' ? 0.5 : 0
        }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-30 -skew-x-12"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
            ease: "easeInOut"
          }}
        />
        
        {/* Logo container - with actual logo */}
        <motion.div
          className="w-32 h-32 md:w-48 md:h-48 relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-2xl flex items-center justify-center"
          animate={{
            boxShadow: [
              "0 0 20px rgba(255, 215, 0, 0.3)",
              "0 0 40px rgba(255, 215, 0, 0.6)",
              "0 0 20px rgba(255, 215, 0, 0.3)"
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Actual logo image */}
          <img 
            src={logoImage} 
            alt="Tarana Logo" 
            className="w-full h-full object-contain p-2"
          />
          
          {/* Pulsing glow effect */}
          <motion.div
            className="absolute inset-0 bg-yellow-300 opacity-20 rounded-2xl"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Outer glow ring */}
        <motion.div
          className="absolute -inset-4 border-2 border-yellow-400 rounded-3xl opacity-50"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  )
}