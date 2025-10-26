import { useRef, useState, useEffect } from 'react'
import songsData from './data/songs'
import CinematicIntro from './components/intro/CinematicIntro'
import StarryBackground from './components/intro/StarryBackground'
import SongMenu from './components/SongMenu'
import SongLyricsView from './components/SongLyricsView'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { motion, AnimatePresence } from 'framer-motion'

export default function App() {
  const [songs] = useState(songsData)
  const [showIntro, setShowIntro] = useState(true)
  const [currentView, setCurrentView] = useState('menu') // 'menu' or 'song'
  const [selectedSong, setSelectedSong] = useState(null)
  const containerRef = useRef(null)

  // Remove the localStorage check to always show intro

  function handleDownloadPDF() {
    // capture the lyrics container and create PDF
    const element = containerRef.current
    if (!element) return

    // Expand all collapsed content (if any) before capture
    const opt = { scale: 2, useCORS: true, logging: false }
    // create image via html2canvas
    html2canvas(element, opt).then(canvas => {
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width, canvas.height]
      })

      // If content fits one page, just add
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height)
      // For download filename
      pdf.save('Tarana_Lyrics.pdf')
    }).catch(err => {
      console.error('PDF generation failed', err)
      // fallback to window.print()
      window.print()
    })
  }

  function handleCompleteIntro() {
    setShowIntro(false)
    // Remove localStorage setting
  }

  function handleSelectSong(song) {
    setSelectedSong(song)
    setCurrentView('song')
  }

  function handleBackToMenu() {
    setCurrentView('menu')
    setSelectedSong(null)
  }

  return (
    <div className="min-h-screen relative">
      {/* Static Starry Background - Always in background */}
      <StarryBackground />

      <AnimatePresence mode="wait">
        {showIntro && (
          <CinematicIntro onComplete={handleCompleteIntro} />
        )}
      </AnimatePresence>

      {!showIntro && (
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {currentView === 'menu' && (
              <motion.div
                key="menu"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <SongMenu songs={songs} onSelectSong={handleSelectSong} onDownloadAll={handleDownloadPDF} />
              </motion.div>
            )}

            {currentView === 'song' && selectedSong && (
              <motion.div
                key="song"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative z-10"
              >
                <SongLyricsView song={selectedSong} onBack={handleBackToMenu} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
