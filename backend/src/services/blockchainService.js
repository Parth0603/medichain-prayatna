import contract from '../config/contract.js'

export async function registerBatchOnChain(batchData) {
  const { batchId, productName, quantity, expiryDate, storageRules } = batchData
  
  const tx = await contract.registerBatch(
    batchId,
    productName,
    quantity,
    expiryDate,
    storageRules
  )
  
  const receipt = await tx.wait()
  return receipt.hash
}

export async function transferOwnershipOnChain(batchId, newOwner) {
  const tx = await contract.transferOwnership(batchId, newOwner)
  const receipt = await tx.wait()
  return receipt.hash
}

export async function addShipmentOnChain(batchId, location, temperature) {
  const tx = await contract.addShipmentData(batchId, location, temperature)
  const receipt = await tx.wait()
  return receipt.hash
}

export async function flagBatchOnChain(batchId) {
  const tx = await contract.flagBatch(batchId)
  const receipt = await tx.wait()
  return receipt.hash
}

export async function getBatchFromChain(batchId) {
  const result = await contract.getBatch(batchId)
  
  return {
    batchId: result[0],
    productName: result[1],
    quantity: Number(result[2]),
    expiryDate: Number(result[3]),
    storageRules: result[4],
    currentOwner: result[5],
    isFlagged: result[6]
  }
}

export async function getShipmentHistoryFromChain(batchId) {
  const history = await contract.getShipmentHistory(batchId)
  
  return history.map(shipment => ({
    timestamp: Number(shipment[0]),
    location: shipment[1],
    temperature: Number(shipment[2]),
    isBreach: shipment[3]
  }))
}
