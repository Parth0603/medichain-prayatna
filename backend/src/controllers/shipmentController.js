import {
  addShipmentOnChain,
  getShipmentHistoryFromChain
} from '../services/blockchainService.js'
import { simulateTemperatureBreach } from '../services/iotSimulator.js'
import { saveShipment, flagBatchInDB } from '../services/databaseService.js'

export async function addShipment(req, res) {
  try {
    const { 
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
    } = req.body
    
    const txHash = await addShipmentOnChain(batchId, location, temperature)

    // Check for breach
    const isBreach = temperature < 2 || temperature > 8
    
    // Save to database with supply chain info
    await saveShipment({
      batchId,
      location,
      temperature,
      isBreach,
      timestamp: Math.floor(Date.now() / 1000),
      txHash,
      fromType,
      fromName,
      fromAddress,
      fromContact,
      toType,
      toName,
      toAddress,
      toContact
    })

    // Flag batch if breach
    if (isBreach) {
      await flagBatchInDB(batchId)
    }

    res.json({
      success: true,
      txHash,
      message: 'Shipment data added successfully'
    })
  } catch (error) {
    console.error('Error adding shipment:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function getShipmentHistory(req, res) {
  try {
    const { batchId } = req.params
    const history = await getShipmentHistoryFromChain(batchId)

    res.json(history)
  } catch (error) {
    console.error('Error fetching shipment history:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function simulateBreach(req, res) {
  try {
    const { batchId, temperature } = req.body
    
    // Check if batch exists in database
    const { getBatchById } = await import('../services/databaseService.js')
    const batch = await getBatchById(batchId)
    
    if (!batch) {
      return res.status(404).json({
        success: false,
        error: `Batch ID "${batchId}" not found. Please register the batch first.`
      })
    }
    
    // Check if temperature is breach
    const isBreach = temperature < 2 || temperature > 8
    
    if (!isBreach) {
      return res.status(400).json({
        success: false,
        error: 'Temperature must be outside safe range (2-8°C) to simulate breach'
      })
    }

    // Generate simulated location
    const location = 'Simulated Breach Location'
    
    // Add shipment to blockchain
    const txHash = await addShipmentOnChain(batchId, location, temperature)

    // Save to database
    await saveShipment({
      batchId,
      location,
      temperature,
      isBreach: true,
      timestamp: Math.floor(Date.now() / 1000),
      txHash
    })

    // Flag batch
    await flagBatchInDB(batchId)

    res.json({
      success: true,
      txHash,
      message: `Temperature breach simulated for batch "${batchId}"`,
      temperature,
      batchId
    })
  } catch (error) {
    console.error('Error simulating breach:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
