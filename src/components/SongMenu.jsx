import { motion } from 'framer-motion'

export default function SongMenu({ songs, onSelectSong, onDownloadAll }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "rgba(255, 215, 0, 0.1)",
      borderColor: "rgba(255, 215, 0, 0.8)",
      boxShadow: "0 0 30px rgba(255, 215, 0, 0.3)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  }

  return (
    <div className="fixed inset-0 h-screen flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto h-full flex flex-col items-center justify-center px-4">
        {/* Menu Title */}
        <motion.div
          className="text-center mb-8 flex-shrink-0"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold text-yellow-400 mb-8 text-center">
            Song Menu
          </h1>
          <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-yellow-200 font-light text-center">
            Choose a song to begin the journey
          </p>
        </motion.div>

        {/* Scrollable Song List - Simple vertical list */}
        <motion.div
          className="flex-1 max-h-96 overflow-y-auto scrollbar-hide flex flex-col justify-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="space-y-6 md:space-y-8">
            {songs.map((song, index) => (
              <motion.div
                key={song.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, color: "#FDE047" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectSong(song)}
                className="text-center cursor-pointer transition-all duration-300 group"
              >
                
                {/* Song Title */}
                <h3 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-yellow-300 group-hover:text-yellow-200 transition-colors duration-300 text-center leading-tight mb-2">
                  {song.title}
                </h3>
                
                {/* Artist/Additional Info */}
                {song.artist && (
                  <p className="text-yellow-200 text-2xl md:text-3xl lg:text-4xl opacity-80 text-center mt-3">
                    by {song.artist}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Download All Button */}
        <motion.div
          className="text-center mt-8 flex-shrink-0"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(255, 215, 0, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownloadAll}
            className="btn-primary text-xl md:text-2xl px-8 py-4"
          >
            Download All Lyrics
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 bg-yellow-400 rounded-full"
        animate={{
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.5, 1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: 0.5
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-1 h-1 bg-yellow-300 rounded-full"
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: 1.5
        }}
      />
    </div>
  )
}