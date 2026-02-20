import { useState, useEffect } from 'react'
import axios from 'axios'
import { FaBox, FaExclamationTriangle, FaCheckCircle, FaTruck, FaThermometerHalf, FaCalendarTimes, FaSync, FaEye } from 'react-icons/fa'
import LoadingSpinner from '../components/LoadingSpinner'
import { motion } from 'framer-motion'

const API_URL = import.meta.env.VITE_API_URL

function Dashboard() {
  const [stats, setStats] = useState(null)
  const [batches, setBatches] = useState([])
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  useEffect(() => {
    let interval
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchDashboardData()
      }, 5000) // Refresh every 5 seconds
    }
    return () => clearInterval(interval)
  }, [autoRefresh])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, batchesRes, activityRes] = await Promise.all([
        axios.get(`${API_URL}/dashboard/stats`),
        axios.get(`${API_URL}/dashboard/batches`),
        axios.get(`${API_URL}/dashboard/activity?limit=15`)
      ])

      setStats(statsRes.data)
      setBatches(Array.isArray(batchesRes.data) ? batchesRes.data : [])
      setActivity(Array.isArray(activityRes.data) ? activityRes.data : [])
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      // Set empty arrays on error to prevent crashes
      setBatches([])
      setActivity([])
      setStats({
        totalBatches: 0,
        activeBatches: 0,
        flaggedBatches: 0,
        expiredBatches: 0,
        totalShipments: 0,
        temperatureBreaches: 0
      })
    } finally {
      setLoading(false)
    }
  }

  const getExpiryStatus = (expiryTimestamp) => {
    const now = Math.floor(Date.now() / 1000)
    const daysUntilExpiry = Math.floor((expiryTimestamp - now) / (24 * 60 * 60))
    
    if (daysUntilExpiry < 0) return { status: 'expired', text: 'Expired', color: 'text-red-600' }
    if (daysUntilExpiry <= 7) return { status: 'expiring-soon', text: `${daysUntilExpiry}d left`, color: 'text-orange-600' }
    return { status: 'valid', text: `${daysUntilExpiry}d left`, color: 'text-green-600' }
  }

  const getActivityIcon = (activityType) => {
    switch(activityType) {
      case 'batch_registered': return '📦'
      case 'shipment_added': return '🚚'
      case 'temperature_breach': return '🌡️'
      case 'ownership_transferred': return '👤'
      default: return '📋'
    }
  }

  const getActivityText = (item) => {
    switch(item.activity_type) {
      case 'batch_registered':
        return 'Batch Registered'
      case 'shipment_added':
        return item.from_type && item.to_type 
          ? `${item.from_type} → ${item.to_type}` 
          : 'Shipment Added'
      case 'temperature_breach':
        return '⚠️ Temperature Breach'
      default:
        return 'Activity'
    }
  }

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batch_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    
    if (filterStatus === 'all') return matchesSearch
    if (filterStatus === 'active') return matchesSearch && !batch.is_flagged
    if (filterStatus === 'flagged') return matchesSearch && batch.is_flagged
    if (filterStatus === 'expired') {
      const now = Math.floor(Date.now() / 1000)
      return matchesSearch && batch.expiry_date < now
    }
    
    return matchesSearch
  })

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." />
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600">Real-time supply chain analytics and monitoring</p>
        </div>
        <button
          onClick={() => setAutoRefresh(!autoRefresh)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-semibold transition-all ${
            autoRefresh 
              ? 'bg-green-500 text-white shadow-lg' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <FaSync className={autoRefresh ? 'animate-spin' : ''} />
          <span>{autoRefresh ? 'Auto-Refresh ON' : 'Auto-Refresh OFF'}</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-100 mb-1">Total Batches</p>
              <p className="text-4xl font-bold">{stats?.totalBatches || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaBox className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-100 mb-1">Active Batches</p>
              <p className="text-4xl font-bold">{stats?.activeBatches || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaCheckCircle className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-100 mb-1">Flagged</p>
              <p className="text-4xl font-bold">{stats?.flaggedBatches || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaExclamationTriangle className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-100 mb-1">Expired</p>
              <p className="text-4xl font-bold">{stats?.expiredBatches || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaCalendarTimes className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-100 mb-1">Shipments</p>
              <p className="text-4xl font-bold">{stats?.totalShipments || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaTruck className="text-3xl" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 text-white transform hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-100 mb-1">Breaches</p>
              <p className="text-4xl font-bold">{stats?.temperatureBreaches || 0}</p>
            </div>
            <div className="w-14 h-14 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
              <FaThermometerHalf className="text-3xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Batches List */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All Batches</h2>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by Batch ID or Product Name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active Only</option>
              <option value="flagged">Flagged Only</option>
              <option value="expired">Expired Only</option>
            </select>
          </div>

          {/* Batches Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Batch ID</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Product</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Owner</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Expiry</th>
                  <th className="px-4 py-3 text-left text-sm font-bold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBatches.length > 0 ? (
                  filteredBatches.map((batch) => {
                    const expiryStatus = getExpiryStatus(batch.expiry_date)
                    return (
                      <tr key={batch.batch_id} className="border-t hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-4 text-sm font-mono text-gray-700">{batch.batch_id}</td>
                        <td className="px-4 py-4 text-sm font-medium text-gray-800">{batch.product_name}</td>
                        <td className="px-4 py-4 text-xs font-mono text-gray-600">
                          {batch.current_owner ? `${batch.current_owner.slice(0, 6)}...${batch.current_owner.slice(-4)}` : 'N/A'}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          <span className={`font-semibold ${expiryStatus.color}`}>
                            {expiryStatus.text}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {batch.is_flagged ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white shadow-sm">
                              <FaExclamationTriangle className="mr-1" /> Flagged
                            </span>
                          ) : expiryStatus.status === 'expired' ? (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-gray-500 to-gray-600 text-white shadow-sm">
                              <FaCalendarTimes className="mr-1" /> Expired
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-green-600 text-white shadow-sm">
                              <FaCheckCircle className="mr-1" /> Active
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-4 py-12 text-center text-gray-500">
                      <FaBox className="text-5xl mx-auto mb-3 text-gray-300" />
                      <p>No batches found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Live Activity</h2>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto">
            {activity.length > 0 ? (
              activity.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`border-l-4 rounded-r-xl pl-4 pr-3 py-3 hover:shadow-md transition-all ${
                    item.activity_type === 'temperature_breach' 
                      ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-500'
                      : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-500'
                  }`}
                >
                  <p className="text-sm font-bold text-gray-800 mb-1">{item.product_name}</p>
                  <p className="text-xs text-gray-600 font-mono mb-1">{item.batch_id}</p>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs font-semibold ${
                      item.activity_type === 'temperature_breach' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {getActivityIcon(item.activity_type)} {getActivityText(item)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(item.created_at).toLocaleTimeString()}
                    </p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8">
                <FaTruck className="text-5xl mx-auto mb-3 text-gray-300" />
                <p className="text-sm text-gray-500">No recent activity</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
