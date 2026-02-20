import { useState } from 'react'
import { getBatch, getShipmentHistory, transferOwnership, flagBatch } from '../services/api'
import QRScanner from '../components/QRScanner'
import BatchCard from '../components/BatchCard'
import ShipmentCard from '../components/ShipmentCard'
import LoadingSpinner from '../components/LoadingSpinner'
import TransactionStatus from '../components/TransactionStatus'
import { motion } from 'framer-motion'
import { FaStore, FaQrcode, FaCheckCircle, FaTimesCircle } from 'react-icons/fa'

function Receiver() {
  const [batchData, setBatchData] = useState(null)
  const [shipmentHistory, setShipmentHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)
  const [newOwnerAddress, setNewOwnerAddress] = useState('')

  const handleScan = async (batchId) => {
    setLoading(true)
    try {
      const batch = await getBatch(batchId)
      const history = await getShipmentHistory(batchId)
      
      setBatchData(batch)
      setShipmentHistory(history)
    } catch (error) {
      alert('Failed to fetch batch data')
    } finally {
      setLoading(false)
    }
  }

  const handleAccept = async () => {
    if (!newOwnerAddress) {
      alert('Please enter new owner address')
      return
    }

    setLoading(true)
    setTxStatus({ status: 'loading', message: 'Transferring ownership...' })

    try {
      const result = await transferOwnership(batchData.batchId, newOwnerAddress)
      
      setTxStatus({
        status: 'success',
        message: 'Ownership transferred successfully!',
        txHash: result.txHash
      })
      
      setBatchData({ ...batchData, currentOwner: newOwnerAddress })
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to transfer ownership'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleReject = async () => {
    setLoading(true)
    setTxStatus({ status: 'loading', message: 'Flagging batch...' })

    try {
      const result = await flagBatch(batchData.batchId)
      
      setTxStatus({
        status: 'success',
        message: 'Batch flagged successfully!',
        txHash: result.txHash
      })
      
      setBatchData({ ...batchData, isFlagged: true })
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to flag batch'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaStore className="text-4xl sm:text-5xl text-purple-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Receiver Portal
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Scan QR codes to verify and accept product ownership
          </p>
        </motion.div>

        {/* QR Scanner */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-gray-100"
        >
          <div className="flex items-center space-x-2 mb-6">
            <FaQrcode className="text-2xl text-purple-600" />
            <h2 className="text-2xl font-semibold text-gray-800">Scan QR Code</h2>
          </div>
          <QRScanner onScan={handleScan} />
        </motion.div>

        {loading && <LoadingSpinner message="Loading batch data..." />}

        {batchData && !loading && (
          <>
            {/* Batch Details */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <BatchCard batch={batchData} />
            </motion.div>

            {/* Shipment History */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipment History</h2>
              {shipmentHistory.length > 0 ? (
                <div className="space-y-4">
                  {shipmentHistory.map((shipment, index) => (
                    <ShipmentCard key={index} shipment={shipment} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FaQrcode className="text-5xl mx-auto mb-3 text-gray-300" />
                  <p>No shipment records yet</p>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100"
            >
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Actions</h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Owner Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newOwnerAddress}
                      onChange={(e) => setNewOwnerAddress(e.target.value)}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-base font-mono"
                      placeholder="0x..."
                    />
                    <button
                      type="button"
                      onClick={() => setNewOwnerAddress('0x37A823a1E3d80A53a7478F2Be74D2013Ec6836dA')}
                      className="px-4 py-3 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-all font-semibold text-sm whitespace-nowrap"
                    >
                      Use My Wallet
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Enter the wallet address of the new owner, or click "Use My Wallet" to accept ownership yourself
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleAccept}
                    disabled={loading}
                    className="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <FaCheckCircle />
                    <span>Accept & Transfer</span>
                  </button>
                  
                  <button
                    onClick={handleReject}
                    disabled={loading}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    <FaTimesCircle />
                    <span>Reject & Flag</span>
                  </button>
                </div>
              </div>

              {txStatus && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <TransactionStatus {...txStatus} />
                </motion.div>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}

export default Receiver
