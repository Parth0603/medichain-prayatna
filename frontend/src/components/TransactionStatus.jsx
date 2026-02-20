import { FaCheckCircle, FaSpinner, FaExternalLinkAlt, FaTimesCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

function TransactionStatus({ txHash, status, message }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50',
          border: 'border-green-400',
          text: 'text-green-800',
          icon: <FaCheckCircle className="text-green-500 text-xl" />
        }
      case 'loading':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50',
          border: 'border-blue-400',
          text: 'text-blue-800',
          icon: <FaSpinner className="animate-spin text-blue-500 text-xl" />
        }
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50',
          border: 'border-red-400',
          text: 'text-red-800',
          icon: <FaTimesCircle className="text-red-500 text-xl" />
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-400',
          text: 'text-gray-800',
          icon: null
        }
    }
  }

  const styles = getStatusStyles()

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`border-2 ${styles.border} ${styles.bg} px-5 py-4 rounded-xl shadow-lg`}
      >
        <div className="flex items-center space-x-3">
          {styles.icon}
          <span className={`font-semibold ${styles.text} text-base`}>{message}</span>
        </div>
        
        {txHash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 pl-8"
          >
            <a
              href={`https://amoy.polygonscan.com/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-sm text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            >
              <span className="font-medium">View on PolygonScan</span>
              <FaExternalLinkAlt className="text-xs" />
            </a>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default TransactionStatus
