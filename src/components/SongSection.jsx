
export default function SongSection({ song }) {
  const lines = song.lyrics.split('\n')
  return (
    <section id={song.id} className="mb-10 pt-6">
      <h2 className="text-2xl font-semibold mb-1">{song.title}</h2>
      <p className="text-sm text-gray-400 mb-4">{song.context}</p>

      <div className="space-y-2">
        {lines.map((line, idx) => {
          const highlight = song.highlightLines.includes(idx)
          return (
            <div key={idx} className={highlight ? 'sing-highlight flex items-start gap-2' : 'text-gray-300'}>
              {highlight && <span className="text-yellow-400">🎤</span>}
              <div className="whitespace-pre-wrap">{line}</div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
