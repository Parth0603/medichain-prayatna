import { Link } from 'react-router-dom'
import { FaIndustry, FaTruck, FaStore, FaQrcode, FaShieldAlt, FaClock, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function Home() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [featuresRef, featuresInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const features = [
    {
      icon: FaIndustry,
      title: 'Manufacturer',
      description: 'Register new batches and generate QR codes',
      link: '/manufacturer',
      color: 'blue',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: FaTruck,
      title: 'Shipment',
      description: 'Track location and temperature data',
      link: '/shipment',
      color: 'green',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: FaStore,
      title: 'Receiver',
      description: 'Scan QR and accept ownership',
      link: '/receiver',
      color: 'purple',
      gradient: 'from-purple-500 to-purple-600'
    },
    {
      icon: FaQrcode,
      title: 'Consumer',
      description: 'Verify product authenticity',
      link: '/receiver',
      color: 'orange',
      gradient: 'from-orange-500 to-orange-600'
    }
  ]

  const steps = [
    {
      number: '01',
      title: 'Register Batch',
      description: 'Manufacturer registers a batch and generates a unique QR code'
    },
    {
      number: '02',
      title: 'Track Shipment',
      description: 'Location and temperature data is recorded during transport'
    },
    {
      number: '03',
      title: 'Transfer Ownership',
      description: 'Wholesaler/Pharmacy scans QR and accepts ownership'
    },
    {
      number: '04',
      title: 'Verify Authenticity',
      description: 'Consumers verify product authenticity by scanning QR code'
    }
  ]

  const stats = [
    { icon: FaShieldAlt, value: 'Blockchain', label: 'Secured' },
    { icon: FaClock, value: 'Real-time', label: 'Tracking' },
    { icon: FaCheckCircle, value: '100%', label: 'Transparent' }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        initial={{ opacity: 0, y: 20 }}
        animate={heroInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={heroInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MediChain
                </span>
              </h1>
              <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-4 sm:mb-6 font-semibold px-4">
                Blockchain-Based Healthcare Supply Chain
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
                Track pharmaceutical products from manufacturer to consumer with complete transparency, security, and trust powered by blockchain technology
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={heroInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            >
              <Link
                to="/manufacturer"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <span>Get Started</span>
                <FaArrowRight />
              </Link>
              <Link
                to="/about"
                className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all border-2 border-blue-600 flex items-center justify-center"
              >
                Learn More
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        ref={statsRef}
        initial={{ opacity: 0 }}
        animate={statsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-16 bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={statsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all"
                >
                  <Icon className="text-4xl sm:text-5xl text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-base sm:text-lg text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        ref={featuresRef}
        initial={{ opacity: 0 }}
        animate={featuresInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Supply Chain Modules
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Complete ecosystem for pharmaceutical supply chain management
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={featuresInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={feature.link}
                    className="block bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all transform hover:-translate-y-2 h-full"
                  >
                    <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                      <Icon className="text-3xl sm:text-4xl text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-center text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        ref={howItWorksRef}
        initial={{ opacity: 0 }}
        animate={howItWorksInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-12 sm:py-20 bg-white px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Simple four-step process for complete supply chain transparency
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                animate={howItWorksInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 sm:p-8 h-full border-2 border-blue-100 hover:border-blue-300 transition-all">
                  <div className="text-5xl sm:text-6xl font-bold text-blue-200 mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {step.description}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <FaArrowRight className="text-3xl text-blue-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-12">
            Join the future of pharmaceutical supply chain management
          </p>
          <Link
            to="/manufacturer"
            className="inline-block bg-white text-blue-600 px-8 sm:px-12 py-4 rounded-xl font-bold text-lg sm:text-xl hover:bg-gray-100 transition-all transform hover:scale-105 shadow-2xl"
          >
            Start Tracking Now
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
