import { useState } from 'react'
import { addShipment, simulateBreach } from '../services/api'
import TransactionStatus from '../components/TransactionStatus'
import { motion } from 'framer-motion'
import { FaTruck, FaThermometerHalf } from 'react-icons/fa'

function Shipment() {
  const [batchId, setBatchId] = useState('')
  const [location, setLocation] = useState('')
  const [temperature, setTemperature] = useState('')
  const [fromType, setFromType] = useState('Manufacturer')
  const [fromName, setFromName] = useState('')
  const [fromAddress, setFromAddress] = useState('')
  const [fromContact, setFromContact] = useState('')
  const [toType, setToType] = useState('Warehouse')
  const [toName, setToName] = useState('')
  const [toAddress, setToAddress] = useState('')
  const [toContact, setToContact] = useState('')
  const [loading, setLoading] = useState(false)
  const [txStatus, setTxStatus] = useState(null)

  const handleAddShipment = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTxStatus({ status: 'loading', message: 'Adding shipment data...' })

    try {
      const result = await addShipment(
        batchId, 
        location || `${toName}, ${toAddress}`, 
        parseInt(temperature),
        fromType,
        fromName,
        fromAddress,
        fromContact,
        toType,
        toName,
        toAddress,
        toContact
      )
      
      setTxStatus({
        status: 'success',
        message: 'Shipment data added successfully!',
        txHash: result.txHash
      })
      
      // Reset form
      setLocation('')
      setTemperature('')
      setFromName('')
      setFromAddress('')
      setFromContact('')
      setToName('')
      setToAddress('')
      setToContact('')
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to add shipment data'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSimulateBreach = async () => {
    if (!batchId) {
      alert('Please enter a Batch ID')
      return
    }

    if (!temperature) {
      alert('Please enter a temperature')
      return
    }

    const temp = parseInt(temperature)
    if (temp >= 2 && temp <= 8) {
      alert('Temperature must be outside safe range (2-8°C)')
      return
    }

    setLoading(true)
    setTxStatus({ status: 'loading', message: 'Simulating temperature breach...' })

    try {
      const result = await simulateBreach(batchId, temp)
      
      setTxStatus({
        status: 'success',
        message: 'Temperature breach simulated! New shipment added.',
        txHash: result.txHash
      })
    } catch (error) {
      setTxStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to simulate breach'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaTruck className="text-4xl sm:text-5xl text-green-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Shipment Tracking
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            Add shipment data and track supply chain movement
          </p>
        </motion.div>

        {/* Add Shipment Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-6 lg:mb-8"
        >
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add Shipment Data</h2>
          
          <form onSubmit={handleAddShipment} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID
              </label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                placeholder="Enter batch ID"
              />
            </div>

            {/* From Section */}
            <div className="border-t-2 pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">From</span>
                Sender Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entity Type
                  </label>
                  <select
                    value={fromType}
                    onChange={(e) => setFromType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="Manufacturer">Manufacturer</option>
                    <option value="Warehouse">Warehouse</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={fromName}
                    onChange={(e) => setFromName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                    placeholder="e.g., ABC Pharma Ltd"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={fromAddress}
                  onChange={(e) => setFromAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., 123 Industrial Area, Mumbai"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact (Optional)
                </label>
                <input
                  type="text"
                  value={fromContact}
                  onChange={(e) => setFromContact(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., +91 9876543210"
                />
              </div>
            </div>

            {/* To Section */}
            <div className="border-t-2 pt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center mr-2 text-sm">To</span>
                Receiver Details
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Entity Type
                  </label>
                  <select
                    value={toType}
                    onChange={(e) => setToType(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  >
                    <option value="Warehouse">Warehouse</option>
                    <option value="Pharmacy">Pharmacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={toName}
                    onChange={(e) => setToName(e.target.value)}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                    placeholder="e.g., XYZ Warehouse"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  value={toAddress}
                  onChange={(e) => setToAddress(e.target.value)}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., 456 Storage Complex, Delhi"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contact (Optional)
                </label>
                <input
                  type="text"
                  value={toContact}
                  onChange={(e) => setToContact(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                  placeholder="e.g., +91 9876543210"
                />
              </div>
            </div>

            {/* Temperature */}
            <div className="border-t-2 pt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FaThermometerHalf className="mr-2 text-red-500" />
                Temperature (°C)
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-base"
                placeholder="e.g., 5"
              />
              <p className="text-sm text-gray-500 mt-2">Safe range: 2-8°C</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 disabled:transform-none"
            >
              {loading ? 'Adding...' : 'Add Shipment Record'}
            </button>
          </form>
        </motion.div>

        {/* Simulate Breach */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border-2 border-red-200"
        >
          <h2 className="text-2xl font-semibold mb-4 text-red-600 flex items-center">
            <FaThermometerHalf className="mr-3" />
            Simulate Temperature Breach
          </h2>
          <p className="text-gray-600 mb-6 text-sm sm:text-base">
            This will create a new shipment record with breach temperature for any batch
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch ID
              </label>
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-base"
                placeholder="Enter batch ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temperature (°C)
              </label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-base"
                placeholder="e.g., 15"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">Enter temperature outside safe range (2-8°C)</p>
          
          <button
            onClick={handleSimulateBreach}
            disabled={loading || !batchId || !temperature}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-4 rounded-xl hover:from-red-700 hover:to-red-800 disabled:from-gray-400 disabled:to-gray-400 transition-all font-semibold text-lg shadow-lg transform hover:scale-105 disabled:transform-none"
          >
            Simulate Breach
          </button>
        </motion.div>

        {txStatus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <TransactionStatus {...txStatus} />
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Shipment
