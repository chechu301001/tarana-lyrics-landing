import { motion } from 'framer-motion'
import logoImage from '../../assets/Taranalogo.png'

export default function LogoShimmer({ stage = 'intro' }) {
  return (
    <motion.div
      className="absolute"
      style={{
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
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
        className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96"
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
  )
}