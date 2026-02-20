import { FaBox, FaCalendar, FaUser, FaExclamationTriangle, FaCubes } from 'react-icons/fa'
import { formatAddress, formatDate } from '../utils/formatters'
import { motion } from 'framer-motion'

function BatchCard({ batch }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-gradient-to-br ${
        batch.isFlagged 
          ? 'from-red-50 to-white border-red-200' 
          : 'from-blue-50 to-white border-blue-200'
      } rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 border-2 transform hover:-translate-y-1`}
    >
      <div className="flex justify-between items-start mb-5">
        <div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-1">
            {batch.productName}
          </h3>
          <p className="text-sm text-gray-500 font-mono">{batch.batchId}</p>
        </div>
        {batch.isFlagged && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md"
          >
            <FaExclamationTriangle />
            <span>Flagged</span>
          </motion.span>
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center space-x-3 text-gray-700 bg-white bg-opacity-60 rounded-lg p-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FaCubes className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Quantity</p>
            <p className="font-semibold">{batch.quantity} units</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-700 bg-white bg-opacity-60 rounded-lg p-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <FaCalendar className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Expiry Date</p>
            <p className="font-semibold">{formatDate(batch.expiryDate)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 text-gray-700 bg-white bg-opacity-60 rounded-lg p-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Current Owner</p>
            <p className="font-semibold text-sm">{formatAddress(batch.currentOwner)}</p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
          <p className="text-xs text-gray-500 mb-1 font-semibold">Storage Requirements</p>
          <p className="text-sm text-gray-700">{batch.storageRules}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default BatchCard
