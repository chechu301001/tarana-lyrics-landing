import { useRef, useState, useEffect } from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import SongSection from './components/SongSection'
import songsData from './data/songs'
import WelcomeModal from './components/WelcomeModal'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
// import { motion } from 'framer-motion'

export default function App() {
  const [songs] = useState(songsData)
  const [activeId, setActiveId] = useState(songs[0].id)
  const [menuOpen, setMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(true)
  const containerRef = useRef(null)

  useEffect(() => {
    // Optionally, only show modal on first visit by checking localStorage
    const seen = localStorage.getItem('tarana_seen_modal')
    if (seen) setModalOpen(false)
  }, [])

  function openMenu() { setMenuOpen(true) }
  function closeMenu() { setMenuOpen(false) }

  function handleClickSong(id) {
    setActiveId(id)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

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

  function handleCloseModal() {
    setModalOpen(false)
    localStorage.setItem('tarana_seen_modal', '1')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        eventName="Tarana — Pilot Album Live"
        date="15th November 2025"
        venue="Fandom at Gilly's Redefined"
        onDownload={handleDownloadPDF}
        onOpenMenu={openMenu}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar songs={songs} activeId={activeId} onClickSong={handleClickSong} isOpen={menuOpen} onClose={closeMenu} />

        <main className="flex-1 overflow-auto p-4 md:p-8" ref={containerRef}>
          <div className="md:hidden mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Songs</div>
            <div className="text-xs text-gray-400">Tap to jump</div>
          </div>

          {/* Intro + controls */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <h1 className="text-lg md:text-2xl font-semibold">Hi! So glad you are a part of this beautiful journey.</h1>
              <p className="text-sm text-gray-300 mt-1">We made a mobile lyrics sheet so you can sing along during the show.</p>
            </div>

            <div className="ml-auto flex items-center gap-2 no-print">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-3 py-2 rounded border border-gray-800">Top</button>
              <button onClick={() => { /* focus mode optional */ }} className="px-3 py-2 rounded border border-gray-800">Focus</button>
            </div>
          </div>

          {/* Song list (rendered) */}
          <div>
            {songs.map(s => (
              <SongSection key={s.id} song={s} />
            ))}
          </div>

          <footer className="mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-400">
            <div>Tarana — Pilot Album Live • 15th November 2025 • Fandom at Gilly's Redefined</div>
            <div className="mt-2">Tag us on Instagram @tarana • Use #TaranaLive</div>
          </footer>
        </main>
      </div>

      <WelcomeModal open={modalOpen} onClose={handleCloseModal} />
    </div>
  )
}
