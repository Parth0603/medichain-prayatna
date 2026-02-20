import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const registerBatch = async (batchData) => {
  const response = await api.post('/batch/register', batchData)
  return response.data
}

export const getBatch = async (batchId) => {
  const response = await api.get(`/batch/${batchId}`)
  return response.data
}

export const transferOwnership = async (batchId, newOwner) => {
  const response = await api.post('/batch/transfer', { batchId, newOwner })
  return response.data
}

export const flagBatch = async (batchId) => {
  const response = await api.post('/batch/flag', { batchId })
  return response.data
}

export const addShipment = async (batchId, location, temperature, fromType, fromName, fromAddress, fromContact, toType, toName, toAddress, toContact) => {
  const response = await api.post('/shipment/add', { 
    batchId, 
    location, 
    temperature,
    fromType,
    fromName,
    fromAddress,
    fromContact,
    toType,
    toName,
    toAddress,
    toContact
  })
  return response.data
}

export const getShipmentHistory = async (batchId) => {
  const response = await api.get(`/shipment/history/${batchId}`)
  return response.data
}

export const simulateBreach = async (batchId, temperature) => {
  const response = await api.post('/shipment/simulate-breach', { batchId, temperature })
  return response.data
}

export const deleteAllData = async () => {
  const response = await api.post('/admin/delete-all')
  return response.data
}

export default api
