import { Link } from 'react-router-dom'
import { FaGithub, FaLinkedin, FaTwitter, FaShieldAlt } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 text-white mt-auto border-t border-blue-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <FaShieldAlt className="text-2xl text-blue-400" />
            <div>
              <h3 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                MediChain
              </h3>
              <p className="text-xs text-gray-400">Blockchain Supply Chain</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6 text-sm">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link to="/dashboard" className="text-gray-300 hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
          </div>

          {/* Social & Copyright */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110"
                aria-label="GitHub"
              >
                <FaGithub className="text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="text-sm" />
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all transform hover:scale-110"
                aria-label="Twitter"
              >
                <FaTwitter className="text-sm" />
              </a>
            </div>
            <div className="text-xs text-gray-400 hidden md:block">
              © 2024 MediChain
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
