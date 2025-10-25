import { motion } from 'framer-motion'

export default function WelcomeModal({ open, onClose }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.22 }}
        className="relative z-10 max-w-md w-[92%] bg-[#0b0b0b] border border-gray-800 rounded-2xl p-6 shadow-2xl"
      >
        <h3 className="text-xl font-semibold mb-2">Hi! Welcome to Tarana — Pilot Album Live</h3>
        <p className="text-sm text-gray-300 mb-4">We made a mobile lyrics sheet so you can sing along during the show. Look for 🎤 lines — those are the parts we want you to sing with us.</p>

        <div className="flex items-center gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-md border border-gray-800">Got it</button>
        </div>
      </motion.div>
    </div>
  )
}
