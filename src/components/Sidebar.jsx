import { motion } from 'framer-motion'

export default function Sidebar({ songs, activeId, onClickSong, isOpen, onClose }) {
  // For mobile, isOpen toggles panel
  return (
    <>
      {/* Desktop sticky sidebar */}
      <aside className="hidden md:block w-64 sticky top-0 h-screen pt-6 pr-4">
        <div className="px-2">
          <h4 className="text-sm font-medium mb-3">Songs</h4>
          <nav className="space-y-2">
            {songs.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onClickSong(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all ${activeId === s.id ? 'bg-gray-900 border border-gray-800' : 'hover:bg-gray-900'}`}
              >
                <div className="text-sm font-medium">{i + 1}. {s.title}</div>
                <div className="text-xs text-gray-400">{s.context}</div>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Mobile slide-over */}
      <motion.aside
        initial={{ x: '100%' }}
        animate={isOpen ? { x: 0 } : { x: '100%' }}
        transition={{ type: 'tween', duration: 0.22 }}
        className={`fixed top-0 right-0 bottom-0 z-50 w-80 bg-[color:var(--tarana-black)] border-l border-gray-900 p-4 md:hidden`}
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Songs</h4>
          <button onClick={onClose} className="px-2 py-1 rounded border border-gray-800">Close</button>
        </div>

        <nav className="space-y-2">
          {songs.map((s, i) => (
            <button key={s.id} onClick={() => { onClickSong(s.id); onClose(); }}
                    className={`w-full text-left px-3 py-2 rounded-lg ${activeId === s.id ? 'bg-gray-900' : 'hover:bg-gray-900'}`}>
              <div className="text-sm font-medium">{i+1}. {s.title}</div>
              <div className="text-xs text-gray-400">{s.context}</div>
            </button>
          ))}
        </nav>
      </motion.aside>
    </>
  )
}
