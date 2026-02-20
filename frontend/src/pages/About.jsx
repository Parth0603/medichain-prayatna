import { FaShieldAlt, FaCube, FaLeaf, FaUsers, FaGithub, FaLinkedin } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function About() {
  const [missionRef, missionInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [techRef, techInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [benefitsRef, benefitsInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const technologies = [
    { name: 'Solidity', description: 'Smart Contract Development', color: 'from-gray-600 to-gray-700' },
    { name: 'Polygon Amoy', description: 'Blockchain Network', color: 'from-purple-600 to-purple-700' },
    { name: 'React', description: 'Frontend Framework', color: 'from-blue-500 to-blue-600' },
    { name: 'Node.js', description: 'Backend Runtime', color: 'from-green-600 to-green-700' },
    { name: 'PostgreSQL', description: 'Database', color: 'from-blue-700 to-blue-800' },
    { name: 'Ethers.js', description: 'Blockchain Integration', color: 'from-indigo-600 to-indigo-700' }
  ]

  const benefits = [
    {
      icon: FaShieldAlt,
      title: 'Immutable Records',
      description: 'Blockchain ensures data cannot be tampered with, providing complete trust and transparency'
    },
    {
      icon: FaCube,
      title: 'Real-time Tracking',
      description: 'Track products at every stage from manufacturer to consumer with live updates'
    },
    {
      icon: FaLeaf,
      title: 'Temperature Monitoring',
      description: 'Automatic breach detection ensures product quality and safety throughout the supply chain'
    },
    {
      icon: FaUsers,
      title: 'Multi-stakeholder',
      description: 'Connects manufacturers, warehouses, pharmacies, and consumers in one ecosystem'
    }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-purple-600 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About MediChain
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl text-blue-100"
          >
            Revolutionizing pharmaceutical supply chain management with blockchain technology
          </motion.p>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        ref={missionRef}
        initial={{ opacity: 0 }}
        animate={missionInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Mission
          </h2>
          <div className="prose prose-lg max-w-none text-gray-600 space-y-4 text-base sm:text-lg">
            <p>
              MediChain is a blockchain-based healthcare supply chain tracking system designed to bring transparency, 
              security, and trust to pharmaceutical distribution. Our platform ensures that every medicine reaches 
              consumers safely and authentically.
            </p>
            <p>
              By leveraging blockchain technology, we create an immutable record of every transaction and movement 
              in the supply chain. This eliminates counterfeit drugs, ensures proper storage conditions, and provides 
              complete visibility to all stakeholders.
            </p>
            <p>
              Built as a hackathon prototype, MediChain demonstrates the potential of blockchain technology to solve 
              real-world problems in healthcare logistics and supply chain management.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        ref={benefitsRef}
        initial={{ opacity: 0 }}
        animate={benefitsInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div
                  key={index}
                  initial={{ y: 50, opacity: 0 }}
                  animate={benefitsInView ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Icon className="text-2xl sm:text-3xl text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.section>

      {/* Technology Stack Section */}
      <motion.section
        ref={techRef}
        initial={{ opacity: 0 }}
        animate={techInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Technology Stack
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={techInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-gradient-to-br ${tech.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
              >
                <h3 className="text-xl sm:text-2xl font-bold mb-2">{tech.name}</h3>
                <p className="text-sm sm:text-base opacity-90">{tech.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Project Info Section */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Hackathon Prototype
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            This project was built as a prototype to demonstrate the potential of blockchain technology 
            in healthcare supply chain management. It showcases core functionality including batch registration, 
            shipment tracking, ownership transfer, and consumer verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-all"
            >
              <FaGithub className="text-xl" />
              <span>View on GitHub</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all"
            >
              <FaLinkedin className="text-xl" />
              <span>Connect with Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
