import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getBatch, getShipmentHistory } from '../services/api'
import BatchCard from '../components/BatchCard'
import ShipmentCard from '../components/ShipmentCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa'

function Verify() {
  const { batchId } = useParams()
  const [batchData, setBatchData] = useState(null)
  const [shipmentHistory, setShipmentHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchBatchData()
  }, [batchId])

  const fetchBatchData = async () => {
    try {
      const batch = await getBatch(batchId)
      const history = await getShipmentHistory(batchId)
      
      setBatchData(batch)
      setShipmentHistory(history)
    } catch (err) {
      setError('Batch not found or invalid')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner message="Verifying batch..." />
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Verification</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        {batchData.isFlagged ? (
          <div className="flex items-center space-x-3 text-red-600 mb-4">
            <FaExclamationTriangle className="text-3xl" />
            <div>
              <h2 className="text-xl font-bold">Warning: Product Flagged</h2>
              <p>This product has been flagged due to quality concerns</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-3 text-green-600 mb-4">
            <FaCheckCircle className="text-3xl" />
            <div>
              <h2 className="text-xl font-bold">Verified Authentic</h2>
              <p>This product is registered on the blockchain</p>
            </div>
          </div>
        )}
      </div>

      <div className="mb-6">
        <BatchCard batch={batchData} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Shipment History</h2>
        {shipmentHistory.length > 0 ? (
          <div className="space-y-4">
            {shipmentHistory.map((shipment, index) => (
              <ShipmentCard key={index} shipment={shipment} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No shipment records available</p>
        )}
      </div>
    </div>
  )
}

export default Verify
