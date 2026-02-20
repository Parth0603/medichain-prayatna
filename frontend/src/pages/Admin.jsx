import { useState } from 'react'
import { FaUserShield, FaChartBar, FaCog, FaInfoCircle } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaUserShield className="text-4xl sm:text-5xl text-blue-600" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Admin Panel
            </h1>
          </div>
          <p className="text-base sm:text-lg text-gray-600">
            System administration and monitoring
          </p>
        </motion.div>

        {/* Admin Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* System Stats Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FaChartBar className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">System Overview</h2>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-gray-700 font-medium">Blockchain Network</span>
                <span className="text-blue-600 font-semibold">Polygon Amoy</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-gray-700 font-medium">Backend Status</span>
                <span className="text-green-600 font-semibold">✓ Online</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-gray-700 font-medium">Database</span>
                <span className="text-purple-600 font-semibold">✓ Connected</span>
              </div>
            </div>
          </motion.div>

          {/* Configuration Card */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-200"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <FaCog className="text-white text-2xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Configuration</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Smart Contract</p>
                <p className="text-xs font-mono text-gray-800 break-all">
                  0x22A04097106757B5165B468818e8593beb554155
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Network</p>
                <p className="text-sm font-semibold text-gray-800">
                  Polygon Amoy Testnet (Chain ID: 80002)
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Info Box */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6"
        >
          <div className="flex items-start space-x-3 mb-4">
            <FaInfoCircle className="text-blue-600 text-2xl flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">Admin Information</h3>
              <ul className="text-blue-800 text-sm space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>All blockchain transactions are immutable and permanent</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Database stores cached data for fast queries</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Monitor system health through the Dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>View all transactions on PolygonScan explorer</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-blue-200">
            <a
              href="https://amoy.polygonscan.com/address/0x22A04097106757B5165B468818e8593beb554155"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
            >
              <span>View Contract on PolygonScan</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4"
        >
          <a
            href="/dashboard"
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all text-center border-2 border-transparent hover:border-blue-300"
          >
            <FaChartBar className="text-3xl text-blue-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Dashboard</p>
          </a>
          <a
            href="/manufacturer"
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all text-center border-2 border-transparent hover:border-blue-300"
          >
            <FaUserShield className="text-3xl text-green-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Manufacturer</p>
          </a>
          <a
            href="/shipment"
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-all text-center border-2 border-transparent hover:border-purple-300"
          >
            <FaCog className="text-3xl text-purple-600 mx-auto mb-2" />
            <p className="font-semibold text-gray-800">Shipment</p>
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Admin
