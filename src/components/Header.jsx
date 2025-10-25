import { Download } from 'lucide-react'

export default function Header({ eventName, date, venue, onDownload, onOpenMenu }) {
  return (
    <header className="w-full px-4 md:px-6 py-3 border-b border-gray-800 flex items-center justify-between no-print">
      <div className="flex items-center gap-3">
        <img src="/src/assets/logo-placeholder.svg" alt="Tarana logo" className="w-28 h-auto" />
        <div>
          <div className="text-lg md:text-xl font-semibold tracking-tight">{eventName}</div>
          <div className="text-xs text-gray-300">{date} • {venue}</div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onDownload}
          className="flex items-center gap-2 px-3 py-2 rounded-md border border-gray-800 hover:bg-gray-900 transition"
          title="Download lyrics as PDF"
        >
          <Download size={16} /> <span className="text-sm">Download PDF</span>
        </button>

        {/* Mobile menu icon */}
        <button onClick={onOpenMenu} className="md:hidden px-2 py-2 rounded-md border border-gray-800">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="18" height="2" rx="1" fill="#E8D8C3"/><rect y="5" width="18" height="2" rx="1" fill="#E8D8C3"/><rect y="10" width="18" height="2" rx="1" fill="#E8D8C3"/></svg>
        </button>
      </div>
    </header>
  )
}
