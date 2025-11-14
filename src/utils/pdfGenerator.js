import jsPDF from 'jspdf'
import logoImage from '../assets/Taranalogo.png'

// Load and convert logo to base64
const loadLogoAsBase64 = () => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)
      resolve(canvas.toDataURL('image/png'))
    }
    img.onerror = reject
    img.src = logoImage
  })
}

// Add logo to PDF (top right)
const addLogoToPDF = async (doc) => {
  try {
    const logoBase64 = await loadLogoAsBase64()
    // Add logo in top right corner (20mm x 20mm, positioned at x=175, y=10)
    doc.addImage(logoBase64, 'PNG', 175, 10, 20, 20)
  } catch (error) {
    console.error('Error adding logo:', error)
    // Fallback to text if image fails
    doc.setFontSize(10)
    doc.setTextColor(255, 215, 0)
    doc.text('TARANA', 180, 15)
  }
}

// Generate PDF for a single song
export const generateSongPDF = async (song) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - (margin * 2)

  // Black background
  doc.setFillColor(0, 0, 0)
  doc.rect(0, 0, pageWidth, pageHeight, 'F')

  // Add logo
  await addLogoToPDF(doc)

  // Add song title
  doc.setFontSize(28)
  doc.setTextColor(255, 215, 0) // Gold
  doc.setFont(undefined, 'bold')
  const titleLines = doc.splitTextToSize(song.title, maxWidth)
  doc.text(titleLines, pageWidth / 2, 45, { align: 'center' })

  // Add lyrics
  let yPosition = 65
  doc.setFontSize(16)
  doc.setTextColor(255, 255, 255) // White
  doc.setFont(undefined, 'normal')

  const lyricsLines = song.lyrics.split('\n')
  
  lyricsLines.forEach((line, index) => {
    // Check if we need a new page
    if (yPosition > pageHeight - margin) {
      doc.addPage()
      
      // Black background for new page
      doc.setFillColor(0, 0, 0)
      doc.rect(0, 0, pageWidth, pageHeight, 'F')
      
      // Add logo to new page
      addLogoToPDF(doc)
      
      yPosition = 35
    }

    if (line.trim() === '') {
      yPosition += 10 // Extra space for empty lines
    } else {
      // Check if it's a section header (enclosed in brackets)
      if (line.startsWith('[') && line.endsWith(']')) {
        doc.setFontSize(18)
        doc.setTextColor(255, 215, 0) // Gold for headers
        doc.setFont(undefined, 'bold')
      } else {
        doc.setFontSize(16)
        doc.setTextColor(232, 216, 195) // Light beige for regular lyrics
        doc.setFont(undefined, 'normal')
      }

      const textLines = doc.splitTextToSize(line, maxWidth)
      doc.text(textLines, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += textLines.length * 9
    }
  })

  // Save the PDF
  doc.save(`${song.title.replace(/[^a-z0-9]/gi, '_')}_lyrics.pdf`)
}

// Generate PDF for all songs
export const generateAllSongsPDF = async (songs) => {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - (margin * 2)

  let isFirstPage = true

  for (let songIndex = 0; songIndex < songs.length; songIndex++) {
    const song = songs[songIndex]

    // Add new page for each song (except first)
    if (!isFirstPage) {
      doc.addPage()
    }
    isFirstPage = false

    // Black background
    doc.setFillColor(0, 0, 0)
    doc.rect(0, 0, pageWidth, pageHeight, 'F')

    // Add logo
    await addLogoToPDF(doc)

    // Add song title
    doc.setFontSize(28)
    doc.setTextColor(255, 215, 0) // Gold
    doc.setFont(undefined, 'bold')
    const titleLines = doc.splitTextToSize(song.title, maxWidth)
    doc.text(titleLines, pageWidth / 2, 45, { align: 'center' })

    // Add lyrics
    let yPosition = 65
    doc.setFontSize(16)
    doc.setTextColor(255, 255, 255) // White
    doc.setFont(undefined, 'normal')

    const lyricsLines = song.lyrics.split('\n')

    lyricsLines.forEach((line) => {
      // Check if we need a new page
      if (yPosition > pageHeight - margin) {
        doc.addPage()

        // Black background for new page
        doc.setFillColor(0, 0, 0)
        doc.rect(0, 0, pageWidth, pageHeight, 'F')

        // Add logo to new page
        addLogoToPDF(doc)

        yPosition = 35
      }

      if (line.trim() === '') {
        yPosition += 10 // Extra space for empty lines
      } else {
        // Check if it's a section header (enclosed in brackets)
        if (line.startsWith('[') && line.endsWith(']')) {
          doc.setFontSize(18)
          doc.setTextColor(255, 215, 0) // Gold for headers
          doc.setFont(undefined, 'bold')
        } else {
          doc.setFontSize(16)
          doc.setTextColor(232, 216, 195) // Light beige for regular lyrics
          doc.setFont(undefined, 'normal')
        }

        const textLines = doc.splitTextToSize(line, maxWidth)
        doc.text(textLines, pageWidth / 2, yPosition, { align: 'center' })
        yPosition += textLines.length * 9
      }
    })
  }

  // Save the PDF
  doc.save('Tarana_All_Lyrics.pdf')
}
