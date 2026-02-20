import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Manufacturer from './pages/Manufacturer'
import Shipment from './pages/Shipment'
import Receiver from './pages/Receiver'
import Verify from './pages/Verify'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/manufacturer" element={<Manufacturer />} />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/receiver" element={<Receiver />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/verify/:batchId" element={<Verify />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
