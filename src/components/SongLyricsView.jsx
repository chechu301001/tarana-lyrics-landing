import { motion } from 'framer-motion'
import { ArrowLeft, ArrowUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { generateSongPDF } from '../utils/pdfGenerator'

export default function SongLyricsView({ song, onBack }) {
  const [showScrollTop, setShowScrollTop] = useState(false)
  const scrollContainerRef = useRef(null)
  
  const handleDownload = async () => {
    await generateSongPDF(song)
  }
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
  
  // Debug logging - check line numbers and highlighting
  useEffect(() => {
    if (song.highlightLines && song.highlightLines.length > 0) {
      console.log('=== SONG DEBUG ===')
      console.log('Song:', song.title)
      console.log('Highlight lines array:', song.highlightLines)
      console.log('Total lines after split:', lyricsLines.length)
      console.log('Lines to highlight:')
      song.highlightLines.forEach(lineNum => {
        const line = lyricsLines[lineNum - 1]
        console.log(`  Line ${lineNum}: "${line}"`)
      })
    }
  }, [song, lyricsLines])

  // Handle scroll detection
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrolled = container.scrollTop > 200
      setShowScrollTop(scrolled)
      console.log('Scroll position:', container.scrollTop, 'Show button:', scrolled)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

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
            onClick={handleDownload}
            className="btn-primary text-xl md:text-2xl"
          >
            Download
          </motion.button>
        </div>
      </motion.div>

      {/* Main content area */}
      <div 
        ref={scrollContainerRef}
        className="pt-24 pb-24 px-6 md:px-12 lg:px-16 h-full overflow-y-auto"
      >
        <div className="max-w-5xl mx-auto text-center">
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
            
            {/* Disclaimer for highlighted lines */}
            {song.highlightLines && song.highlightLines.length > 0 && (
              <motion.div
                className="mt-8 mx-auto max-w-2xl"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <p className="text-lg md:text-xl text-yellow-300 bg-yellow-400 bg-opacity-10 rounded-full px-6 py-3 inline-block border border-yellow-400 border-opacity-30">
                  ✨ Highlighted lines are where you can sing along! ✨
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Lyrics */}
          <motion.div
            className="prose prose-lg md:prose-xl max-w-none py-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {lyricsLines.map((line, index) => {
              // Check if this line should be highlighted (index is 0-based, highlightLines is 1-based)
              const isHighlighted = song.highlightLines && song.highlightLines.includes(index + 1)
              
              // Debug log for highlighted lines
              if (isHighlighted) {
                console.log(`Line ${index + 1} is highlighted:`, line)
              }
              
              return (
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
                    ${isHighlighted ? 'relative' : ''}
                  `}
                >
                  {line.trim() === '' ? (
                    <div className="h-4" />
                  ) : (
                    <span 
                      className={`inline-block transition-all duration-300 ${
                        isHighlighted 
                          ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-white px-8 py-4 rounded-2xl border-2 border-cyan-300 shadow-2xl shadow-cyan-400/50 font-bold transform hover:scale-105' 
                          : ''
                      }`}
                      style={isHighlighted ? {
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                        animation: 'pulse-glow 2s ease-in-out infinite'
                      } : {}}
                    >
                      {line}
                    </span>
                  )}
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom spacing */}
          <div className="h-40" />
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0.8,
          y: showScrollTop ? 0 : 20
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 btn-primary rounded-full p-5 shadow-2xl"
        style={{ 
          pointerEvents: showScrollTop ? 'auto' : 'none',
          display: showScrollTop ? 'flex' : 'none',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999
        }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowUp size={32} strokeWidth={2.5} />
      </motion.button>

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