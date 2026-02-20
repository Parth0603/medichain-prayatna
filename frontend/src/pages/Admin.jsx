import { useState } from 'react'
import { deleteAllData } from '../services/api'
import { FaTrash, FaExclamationTriangle, FaUserShield, FaDatabase, FaInfoCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Admin() {
  const [loading, setLoading] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [message, setMessage] = useState(null)

  const handleDeleteAll = async () => {
    setLoading(true)
    setMessage(null)

    try {
      const result = await deleteAllData()
      
      setMessage({
        type: 'success',
        text: 'All data deleted successfully from database!'
      })
      
      setShowConfirm(false)
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete data'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaUserShield className="text-4xl sm:text-5xl text-red-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Admin Panel
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Manage system data and configurations
          </p>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-red-200"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-white text-2xl" />
            </div>
            <h2 className="text-2xl font-bold text-red-600">Danger Zone</h2>
          </div>
          
          <div className="bg-red-50 rounded-xl p-4 mb-6 border border-red-200">
            <p className="text-gray-700 text-sm sm:text-base">
              This action will permanently delete all batches and shipments from the database. 
              Blockchain data will remain immutable and cannot be deleted.
            </p>
          </div>

          {!showConfirm ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-4 rounded-xl hover:from-red-700 hover:to-red-800 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <FaTrash />
              <span>Delete All Data</span>
            </button>
          ) : (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-br from-red-100 to-red-50 border-2 border-red-300 rounded-xl p-6"
            >
              <p className="text-red-900 font-bold mb-6 text-center text-lg">
                ⚠️ Are you sure? This action cannot be undone!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDeleteAll}
                  disabled={loading}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold shadow-lg transform hover:scale-105 disabled:transform-none"
                >
                  {loading ? 'Deleting...' : 'Yes, Delete All'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={loading}
                  className="bg-gray-200 text-gray-700 px-4 py-3 rounded-xl hover:bg-gray-300 disabled:bg-gray-100 transition-all font-semibold"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl border-2 ${
                message.type === 'success' 
                  ? 'bg-green-50 border-green-300 text-green-800' 
                  : 'bg-red-50 border-red-300 text-red-800'
              }`}
            >
              <p className="font-semibold">{message.text}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 mt-6"
        >
          <div className="flex items-start space-x-3 mb-4">
            <FaInfoCircle className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
            <h3 className="font-bold text-blue-900 text-lg">Important Information</h3>
          </div>
          <ul className="text-blue-800 text-sm space-y-2 ml-9">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Database deletion only removes data from PostgreSQL</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Blockchain records remain immutable and permanent</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use this feature for testing and development only</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>All stakeholders will lose access to deleted records</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
