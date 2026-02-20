import { ethers } from 'ethers'
import dotenv from 'dotenv'

dotenv.config()

const provider = new ethers.JsonRpcProvider(process.env.AMOY_RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

export { provider, wallet }
