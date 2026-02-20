import { useState } from 'react'
import { registerBatch } from '../services/api'
import QRCodeDisplay from '../components/QRCodeDisplay'
import TransactionStatus from '../components/TransactionStatus'
import LoadingSpinner from '../components/LoadingSpinner'
import { motion } from 'framer-motion'
import { FaIndustry } from 'react-icons/fa'

function Manufacturer() {
  const [formData, setFormData] = useState({
    batchId: '',
    productName: '',
    quantity: '',
    expiryDate: '',
    storageRules: ''
  })
  const [loading, setLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)
  const [registeredBatchId, setRegisteredBatchId] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTxStatus({ status: 'loading', message: 'Registering batch on blockchain...' })

    try {
      const expiryTimestamp = Math.floor(new Date(formData.expiryDate).getTime() / 1000)
      
      const result = await registerBatch({
        ...formData,
        quantity: parseInt(formData.quantity),
        expiryDate: expiryTimestamp
      })

      setTxStatus({
        status: 'success',
        message: 'Batch registered successfully!',
        txHash: result.txHash
      })
      setRegisteredBatchId(formData.batchId)
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to register batch'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaIndustry className="text-4xl sm:text-5xl text-blue-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Manufacturer Portal
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Register new batches and generate QR codes for tracking
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Registration Form */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Register New Batch</h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Batch ID
                </label>
                <input
                  type="text"
                  name="batchId"
                  value={formData.batchId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., BATCH-2024-001"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., Paracetamol 500mg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                  placeholder="Number of units"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="date"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Storage Rules
                </label>
                <textarea
                  name="storageRules"
                  value={formData.storageRules}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-base resize-none"
                  placeholder="e.g., Store at 2-8°C"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 disabled:transform-none"
              >
                {loading ? 'Registering...' : 'Register on Blockchain'}
              </button>
            </form>

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

          {/* QR Code Display */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 sm:p-8"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">QR Code</h2>
            
            {registeredBatchId ? (
              <QRCodeDisplay batchId={registeredBatchId} />
            ) : (
              <div className="flex flex-col items-center justify-center text-center text-gray-400 py-16 sm:py-24">
                <FaIndustry className="text-6xl sm:text-7xl mb-4 opacity-20" />
                <p className="text-base sm:text-lg">Register a batch to generate QR code</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Manufacturer
