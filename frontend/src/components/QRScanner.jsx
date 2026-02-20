import { useState, useEffect, useRef } from 'react'
import { Html5Qrcode } from 'html5-qrcode'
import { FaCamera, FaKeyboard, FaTimes, FaSpinner } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

function QRScanner({ onScan }) {
  const [batchId, setBatchId] = useState('')
  const [showScanner, setShowScanner] = useState(false)
  const [scannerMode, setScannerMode] = useState('manual')
  const [error, setError] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const scannerRef = useRef(null)
  const isCleaningUp = useRef(false)

  // Cleanup scanner on unmount
  useEffect(() => {
    return () => {
      cleanupScanner()
    }
  }, [])

  const cleanupScanner = async () => {
    if (isCleaningUp.current) return
    isCleaningUp.current = true

    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop()
        }
        await scannerRef.current.clear()
      } catch (err) {
        console.error('Cleanup error:', err)
      }
      scannerRef.current = null
    }
    isCleaningUp.current = false
  }

  const startCameraScanner = async () => {
    setError(null)
    setScannerMode('camera')
    setShowScanner(true)
    setIsScanning(true)
    
    // Wait for modal and DOM to render
    setTimeout(async () => {
      try {
        // Cleanup any existing scanner
        await cleanupScanner()

        const html5QrCode = new Html5Qrcode("qr-reader")
        scannerRef.current = html5QrCode

        // Get available cameras
        const devices = await Html5Qrcode.getCameras()
        
        if (devices && devices.length > 0) {
          // Use back camera if available (better for QR scanning)
          const backCamera = devices.find(device => 
            device.label.toLowerCase().includes('back') || 
            device.label.toLowerCase().includes('rear')
          ) || devices[0]

          // Start scanning
          await html5QrCode.start(
            backCamera.id,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
              aspectRatio: 1.0
            },
            (decodedText) => {
              // Success - QR code scanned
              onScan(decodedText)
              handleCloseScanner()
            },
            (errorMessage) => {
              // Scanning error - ignore, happens frequently
            }
          )
          setIsScanning(false)
        } else {
          setError('No cameras found on this device')
          setIsScanning(false)
        }
      } catch (err) {
        console.error('Camera error:', err)
        let errorMsg = 'Failed to start camera. '
        
        if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
          errorMsg += 'Camera permission denied. Please allow camera access in your browser settings.'
        } else if (err.name === 'NotFoundError') {
          errorMsg += 'No camera found on this device.'
        } else if (err.name === 'NotReadableError') {
          errorMsg += 'Camera is already in use by another application.'
        } else if (err.name === 'OverconstrainedError') {
          errorMsg += 'Camera constraints not supported.'
        } else if (err.message) {
          errorMsg += err.message
        } else {
          errorMsg += 'Please check camera permissions and try again.'
        }
        
        setError(errorMsg)
        setIsScanning(false)
      }
    }, 500)
  }

  const handleManualSubmit = (e) => {
    e.preventDefault()
    if (batchId.trim()) {
      onScan(batchId.trim())
      setBatchId('')
      setShowScanner(false)
    }
  }

  const handleCloseScanner = async () => {
    await cleanupScanner()
    setShowScanner(false)
    setError(null)
    setIsScanning(false)
  }

  const switchToManual = async () => {
    await cleanupScanner()
    setScannerMode('manual')
    setError(null)
    setIsScanning(false)
  }

  return (
    <div className="w-full">
      {/* Scanner Mode Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <button
          onClick={startCameraScanner}
          className="flex items-center justify-center space-x-3 bg-blue-600 text-white px-6 py-4 rounded-xl hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <FaCamera className="text-2xl" />
          <span className="font-semibold text-lg">Scan QR Code</span>
        </button>

        <button
          onClick={() => {
            setScannerMode('manual')
            setShowScanner(true)
          }}
          className="flex items-center justify-center space-x-3 bg-gray-600 text-white px-6 py-4 rounded-xl hover:bg-gray-700 transition-all transform hover:scale-105 shadow-lg"
        >
          <FaKeyboard className="text-2xl" />
          <span className="font-semibold text-lg">Enter Manually</span>
        </button>
      </div>

      {/* Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
            onClick={handleCloseScanner}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleCloseScanner}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              >
                <FaTimes className="text-xl text-gray-600" />
              </button>

              {/* Scanner Content */}
              {scannerMode === 'camera' ? (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Scan QR Code
                  </h3>
                  
                  {isScanning && (
                    <div className="flex items-center justify-center py-8">
                      <FaSpinner className="text-4xl text-blue-600 animate-spin" />
                      <span className="ml-3 text-gray-600">Starting camera...</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                      <p className="text-red-800 text-sm">{error}</p>
                    </div>
                  )}
                  
                  <div id="qr-reader" className="w-full rounded-lg overflow-hidden"></div>
                  
                  {!isScanning && !error && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-500 text-center">
                        Position the QR code within the frame
                      </p>
                      <p className="text-xs text-gray-400 text-center">
                        Make sure the QR code is well-lit and in focus
                      </p>
                    </div>
                  )}

                  <button
                    onClick={switchToManual}
                    className="w-full mt-4 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 transition-all font-medium"
                  >
                    Switch to Manual Entry
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                    Enter Batch ID
                  </h3>
                  <form onSubmit={handleManualSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Batch ID
                      </label>
                      <input
                        type="text"
                        value={batchId}
                        onChange={(e) => setBatchId(e.target.value)}
                        placeholder="e.g., BATCH-001"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                        required
                        autoFocus
                      />
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-all font-semibold text-lg shadow-lg"
                    >
                      Verify Batch
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default QRScanner
