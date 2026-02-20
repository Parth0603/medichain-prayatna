import { FaMapMarkerAlt, FaThermometerHalf, FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, FaIndustry, FaWarehouse, FaStore, FaUser } from 'react-icons/fa'
import { formatDate } from '../utils/formatters'
import { motion } from 'framer-motion'

function ShipmentCard({ shipment }) {
  const getEntityIcon = (type) => {
    switch(type) {
      case 'Manufacturer': return <FaIndustry className="text-blue-600" />
      case 'Warehouse': return <FaWarehouse className="text-purple-600" />
      case 'Pharmacy': return <FaStore className="text-green-600" />
      case 'Customer': return <FaUser className="text-orange-600" />
      default: return <FaMapMarkerAlt className="text-gray-600" />
    }
  }

  const getEntityColor = (type) => {
    switch(type) {
      case 'Manufacturer': return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-300'
      case 'Warehouse': return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-300'
      case 'Pharmacy': return 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
      case 'Customer': return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300'
      default: return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-5 border-l-4 ${
        shipment.isBreach || shipment.is_breach ? 'border-red-500' : 'border-green-500'
      } transform hover:-translate-y-1`}
    >
      {/* Supply Chain Flow */}
      {shipment.from_type && shipment.to_type && (
        <div className="mb-5 pb-5 border-b-2 border-gray-100">
          <div className="flex items-center justify-between gap-3">
            {/* From */}
            <div className={`flex-1 p-4 rounded-xl border-2 ${getEntityColor(shipment.from_type)} shadow-sm`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getEntityIcon(shipment.from_type)}
                </div>
                <span className="font-bold text-sm">{shipment.from_type}</span>
              </div>
              <div className="text-xs text-gray-700 space-y-1">
                <div className="font-semibold text-gray-900">{shipment.from_name}</div>
                <div className="text-gray-600">{shipment.from_address}</div>
                {shipment.from_contact && (
                  <div className="text-gray-500">{shipment.from_contact}</div>
                )}
              </div>
            </div>

            {/* Arrow */}
            <div className="px-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <FaArrowRight className="text-white text-lg" />
              </div>
            </div>

            {/* To */}
            <div className={`flex-1 p-4 rounded-xl border-2 ${getEntityColor(shipment.to_type)} shadow-sm`}>
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                  {getEntityIcon(shipment.to_type)}
                </div>
                <span className="font-bold text-sm">{shipment.to_type}</span>
              </div>
              <div className="text-xs text-gray-700 space-y-1">
                <div className="font-semibold text-gray-900">{shipment.to_name}</div>
                <div className="text-gray-600">{shipment.to_address}</div>
                {shipment.to_contact && (
                  <div className="text-gray-500">{shipment.to_contact}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status and Location */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <FaMapMarkerAlt className="text-white" />
          </div>
          <div>
            <p className="text-xs text-gray-500">Location</p>
            <p className="font-semibold text-gray-800">{shipment.location}</p>
          </div>
        </div>
        {(shipment.isBreach || shipment.is_breach) ? (
          <span className="flex items-center space-x-1 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
            <FaTimesCircle />
            <span>Breach</span>
          </span>
        ) : (
          <span className="flex items-center space-x-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-md">
            <FaCheckCircle />
            <span>Safe</span>
          </span>
        )}
      </div>
      
      {/* Temperature and Time */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 border border-orange-200">
          <div className="flex items-center space-x-2 mb-1">
            <FaThermometerHalf className="text-red-500" />
            <span className="text-xs text-gray-600 font-semibold">Temperature</span>
          </div>
          <p className={`text-lg font-bold ${
            (shipment.isBreach || shipment.is_breach) ? 'text-red-600' : 'text-green-600'
          }`}>
            {shipment.temperature}°C
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border border-blue-200">
          <div className="flex items-center space-x-2 mb-1">
            <FaClock className="text-blue-500" />
            <span className="text-xs text-gray-600 font-semibold">Timestamp</span>
          </div>
          <p className="text-xs font-medium text-gray-700">
            {formatDate(shipment.timestamp)}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default ShipmentCard
