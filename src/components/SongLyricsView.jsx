import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function SongLyricsView({ song, onBack }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const lineVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      filter: "blur(5px)"
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

  const backButtonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 215, 0, 0.2)",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  // Split lyrics into lines for animation
  const lyricsLines = song.lyrics ? song.lyrics.split('\n') : []

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Header with back button */}
      <motion.div
        className="absolute top-4 left-0 right-0 z-10 p-4 md:p-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              onBack()
            }}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.95 }}
            className="back-link text-xl md:text-2xl"
          >
            <ArrowLeft size={24} />
            <span>Back to Menu</span>
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary text-xl md:text-2xl"
          >
            Download
          </motion.button>
        </div>
      </motion.div>

      {/* Main content area */}
      <div className="pt-20 pb-8 px-4 md:px-8 h-full overflow-y-auto">
        <div className="max-w-4xl mx-auto text-center">
          {/* Song Title */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-yellow-400 mb-8 text-center">
              {song.title}
            </h1>
            {song.artist && (
              <p className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-yellow-200 font-light text-center">
                by {song.artist}
              </p>
            )}
          </motion.div>

          {/* Lyrics */}
          <motion.div
            className="prose prose-lg md:prose-xl max-w-none"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lyricsLines.map((line, index) => (
              <motion.div
                key={index}
                variants={lineVariants}
                className={`
                  text-center mb-8 
                  ${line.trim() === '' ? 'mb-16' : ''}
                  ${line.startsWith('[') && line.endsWith(']') 
                    ? 'text-yellow-300 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-12' 
                    : 'text-yellow-100 text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-relaxed'
                  }
                `}
              >
                {line.trim() === '' ? (
                  <div className="h-4" />
                ) : (
                  <span className="inline-block">
                    {line}
                  </span>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-32" />
        </div>
      </div>

      {/* Floating elements */}
      <motion.div
        className="absolute top-1/3 left-12 w-2 h-2 bg-yellow-400 rounded-full"
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
        className="absolute bottom-1/3 right-12 w-1 h-1 bg-yellow-300 rounded-full"
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
  )
}