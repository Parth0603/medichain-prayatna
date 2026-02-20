import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaIndustry, FaTruck, FaStore, FaChartBar, FaUserShield, FaBars, FaTimes, FaInfoCircle } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', icon: FaHome, label: 'Home' },
    { to: '/about', icon: FaInfoCircle, label: 'About' },
    { to: '/manufacturer', icon: FaIndustry, label: 'Manufacturer' },
    { to: '/shipment', icon: FaTruck, label: 'Shipment' },
    { to: '/receiver', icon: FaStore, label: 'Receiver' },
    { to: '/dashboard', icon: FaChartBar, label: 'Dashboard' },
    { to: '/admin', icon: FaUserShield, label: 'Admin', color: 'text-red-600' }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl sm:text-3xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            MediChain
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive(link.to)
                      ? 'bg-blue-50 text-blue-600'
                      : link.color || 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="text-lg" />
                  <span className="font-medium">{link.label}</span>
                </Link>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      isActive(link.to)
                        ? 'bg-blue-50 text-blue-600'
                        : link.color || 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="text-xl" />
                    <span className="font-medium text-lg">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
