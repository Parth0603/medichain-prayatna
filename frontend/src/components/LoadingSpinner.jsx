import { FaSpinner } from 'react-icons/fa'

function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <FaSpinner className="text-4xl text-blue-600 animate-spin mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  )
}

export default LoadingSpinner
