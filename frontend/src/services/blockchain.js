import { ethers } from 'ethers'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from '../config/contract'

let provider
let signer
let contract

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error('MetaMask not installed')
  }

  provider = new ethers.BrowserProvider(window.ethereum)
  await provider.send('eth_requestAccounts', [])
  signer = await provider.getSigner()
  contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer)

  return await signer.getAddress()
}

export async function getContract() {
  if (!contract) {
    await connectWallet()
  }
  return contract
}

export async function getReadOnlyContract() {
  const rpcUrl = import.meta.env.VITE_AMOY_RPC_URL
  const readProvider = new ethers.JsonRpcProvider(rpcUrl)
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, readProvider)
}
