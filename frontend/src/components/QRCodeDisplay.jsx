import { QRCodeSVG } from 'qrcode.react'
import { FaDownload } from 'react-icons/fa'

function QRCodeDisplay({ batchId, size = 256 }) {
  const verifyUrl = `${window.location.origin}/verify/${batchId}`

  const downloadQR = () => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    
    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      
      const downloadLink = document.createElement('a')
      downloadLink.download = `QR-${batchId}.png`
      downloadLink.href = pngFile
      downloadLink.click()
    }
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <QRCodeSVG 
        id="qr-code"
        value={verifyUrl} 
        size={size}
        level="H"
        includeMargin={true}
      />
      <button
        onClick={downloadQR}
        className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        <FaDownload />
        <span>Download QR Code</span>
      </button>
      <p className="text-sm text-gray-600">Scan to verify: {batchId}</p>
    </div>
  )
}

export default QRCodeDisplay
