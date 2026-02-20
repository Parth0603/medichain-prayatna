# 🚀 MediChain Setup Guide (Polygon Amoy Version)

## 🧠 Project Overview

MediChain is a prototype Blockchain-Based Healthcare Supply Chain Transparency System.

**Core Features:**
- Batch-level medicine tracking
- QR-based verification
- Ownership transfer (Manufacturer → Wholesaler → Pharmacy)
- Simulated IoT shipment data
- Consumer public verification
- Deployed on Polygon Amoy testnet

---

## ✅ Prerequisites

Make sure you have:
- Node.js (v18+ recommended)
- npm
- MetaMask browser extension
- Git (optional but recommended)

Check Node version:
```bash
node -v
npm -v
```

---

## 🏗 Project Structure

```
medichain-app/
├── contracts/          # Solidity smart contract
├── scripts/            # Deployment scripts
├── backend/            # Express API
├── frontend/           # React (Vite) app
├── hardhat.config.js
├── package.json
└── .env
```

---

## 🌐 Step 1: Setup Polygon Amoy in MetaMask

**Add Network:**

| Field | Value |
|-------|-------|
| Network Name | Polygon Amoy |
| RPC URL | https://rpc-amoy.polygon.technology/ |
| Chain ID | 80002 |
| Currency Symbol | MATIC |
| Block Explorer | https://amoy.polygonscan.com/ |

---

## 💰 Step 2: Get Free Test MATIC

Visit:
👉 **https://faucet.polygon.technology/**

**Select:**
- Network: **Polygon Amoy**
- Paste your wallet address
- Request test MATIC

⚠️ You need this for contract deployment.

---

## 🔑 Step 3: Get Alchemy API Key

1. Go to **https://alchemy.com**
2. Create account
3. Create new App:
   - Chain: **Polygon**
   - Network: **Amoy**
4. Copy your API key

---

## 🔐 Step 4: Configure Environment Variables

### 📁 Root `.env`

Create:
```bash
.env
```

Add:
```env
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

⚠️ **Important:**
- Include `0x` in `PRIVATE_KEY`
- Use a fresh wallet for hackathon
- Never push `.env` to GitHub

**How to get Private Key from MetaMask:**
1. Click MetaMask extension
2. Click three dots → Account Details
3. Click "Export Private Key"
4. Enter password
5. Copy the key (keep the `0x` prefix)

---

## ⚙️ Step 5: Hardhat Configuration

Already configured! File: `hardhat.config.js`

```javascript
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    amoy: {
      url: process.env.AMOY_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

---

## 📦 Step 6: Compile Smart Contract

```bash
npx hardhat compile
```

✅ If no errors → good to go!

---

## 🚀 Step 7: Deploy Smart Contract

```bash
npm run deploy
```

You will see:
```
✅ MediChain deployed successfully!
📍 Contract Address: 0x.....
```

📌 **SAVE THIS CONTRACT ADDRESS** - you'll need it in the next steps!

---

## 🔌 Step 8: Configure Backend

Navigate:
```bash
cd backend
```

Create:
```bash
backend/.env
```

Add:
```env
PORT=5000
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

---

## � Step 9: Configure Frontend

Navigate:
```bash
cd frontend
```

Create:
```bash
frontend/.env
```

Add:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_CONTRACT_ADDRESS
VITE_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
```

---

## ▶️ Step 10: Start Application

### Terminal 1 – Backend

```bash
cd backend
npm run dev
```

Should run on: **http://localhost:5000**

### Terminal 2 – Frontend

```bash
cd frontend
npm run dev
```

Should open: **http://localhost:5173** (or 3000 depending on config)

---

## 🧪 Step 11: Test Full Flow

1. **Connect MetaMask** (Amoy network)
2. **Register Batch** (Manufacturer page)
3. **Add Shipment Data** (Shipment page)
4. **Simulate Breach** (optional)
5. **Transfer Ownership** (Receiver page)
6. **Generate QR** (automatically generated)
7. **Verify as Consumer** (scan QR or visit /verify/:batchId)

---

## 🔎 Useful Commands

**Compile Contract:**
```bash
npx hardhat compile
```

**Deploy Contract:**
```bash
npm run deploy
```

**Start Backend:**
```bash
cd backend
npm run dev
```

**Start Frontend:**
```bash
cd frontend
npm run dev
```

---

## ❗ Troubleshooting

| Issue | Solution |
|-------|----------|
| "Insufficient funds" | Get more Amoy MATIC from faucet |
| "Cannot connect to RPC" | Check Alchemy API key in .env |
| "MetaMask not connecting" | Switch to Amoy network (Chain ID: 80002) |
| "Contract not found" | Verify CONTRACT_ADDRESS in all .env files |
| "Backend not responding" | Confirm backend is running on port 5000 |
| "Transaction failed" | Check you have enough MATIC for gas |

---

## 🛡 Security Reminder

- ❌ Never commit `.env`
- ✅ Use test wallet only
- ✅ Do not use real funds
- ✅ Do not expose private key
- ✅ Add `.env` to `.gitignore`

---

## 🎯 Final State

When setup is complete, you will have:

✔ Smart contract live on Polygon Amoy  
✔ Backend connected to blockchain  
✔ Frontend interacting with backend  
✔ QR-based verification working  
✔ Shipment tracking functional  

---

## 📋 Quick Checklist

- [ ] Node.js installed
- [ ] MetaMask installed with Amoy network
- [ ] Got test MATIC from faucet
- [ ] Got Alchemy API key
- [ ] Created root `.env` file
- [ ] Compiled contract (`npx hardhat compile`)
- [ ] Deployed contract (`npm run deploy`)
- [ ] Saved contract address
- [ ] Created `backend/.env` file
- [ ] Created `frontend/.env` file
- [ ] Started backend (`cd backend && npm run dev`)
- [ ] Started frontend (`cd frontend && npm run dev`)
- [ ] Tested full flow in browser

---

## 🚀 You Are Now Web3 Production Ready (Prototype Level)

Your hackathon prototype is ready to demo!

**Next Steps (Optional):**
- 🔥 Deploy frontend to Vercel
- 🔥 Deploy backend to Render/Railway
- 🔥 Prepare demo script
- 🔥 Create presentation slides

---

## 📞 Need Help?

If you encounter issues:
1. Check all `.env` files are configured correctly
2. Verify you're on Polygon Amoy network (Chain ID: 80002)
3. Ensure you have test MATIC in your wallet
4. Check console logs in browser and terminal

Good luck with your hackathon! 🎉
