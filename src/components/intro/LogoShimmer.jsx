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
        {/* Just the logo image - no box, no border, no highlight */}
        <motion.div
          className="w-64 h-64 md:w-96 md:h-96 relative flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          {/* Actual logo image - clean and simple */}
          <img 
            src={logoImage} 
            alt="Tarana Logo" 
            className="w-full h-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}