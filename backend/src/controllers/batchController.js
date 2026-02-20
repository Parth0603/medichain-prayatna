import {
  registerBatchOnChain,
  transferOwnershipOnChain,
  flagBatchOnChain,
  getBatchFromChain
} from '../services/blockchainService.js'
import {
  saveBatch,
  updateBatchOwner,
  flagBatchInDB
} from '../services/databaseService.js'

export async function registerBatch(req, res) {
  try {
    const { batchId, productName, quantity, expiryDate, storageRules } = req.body

    const txHash = await registerBatchOnChain({
      batchId,
      productName,
      quantity,
      expiryDate,
      storageRules
    })

    // Save to database
    await saveBatch({
      batchId,
      productName,
      quantity,
      expiryDate,
      storageRules,
      currentOwner: process.env.PRIVATE_KEY ? '0x37A823a1E3d80A53a7478F2Be74D2013Ec6836dA' : 'unknown',
      txHash
    })

    res.json({
      success: true,
      txHash,
      message: 'Batch registered successfully'
    })
  } catch (error) {
    console.error('Error registering batch:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function getBatch(req, res) {
  try {
    const { batchId } = req.params
    const batch = await getBatchFromChain(batchId)

    res.json(batch)
  } catch (error) {
    console.error('Error fetching batch:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function transferOwnership(req, res) {
  try {
    const { batchId, newOwner } = req.body
    const txHash = await transferOwnershipOnChain(batchId, newOwner)

    // Update in database
    await updateBatchOwner(batchId, newOwner)

    res.json({
      success: true,
      txHash,
      message: 'Ownership transferred successfully'
    })
  } catch (error) {
    console.error('Error transferring ownership:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export async function flagBatch(req, res) {
  try {
    const { batchId } = req.body
    const txHash = await flagBatchOnChain(batchId)

    // Update in database
    await flagBatchInDB(batchId)

    res.json({
      success: true,
      txHash,
      message: 'Batch flagged successfully'
    })
  } catch (error) {
    console.error('Error flagging batch:', error)
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
