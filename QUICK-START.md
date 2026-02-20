# ⚡ MediChain Quick Start Guide

## 🎯 Complete Setup in 11 Steps

### ✅ Step 1: Add Polygon Amoy to MetaMask
- Network Name: **Polygon Amoy**
- RPC URL: `https://rpc-amoy.polygon.technology/`
- Chain ID: **80002**
- Currency: **MATIC**

### ✅ Step 2: Get Test MATIC
Visit: https://faucet.polygon.technology/
- Select: Polygon Amoy
- Enter your wallet address

### ✅ Step 3: Get Alchemy API Key
1. Go to https://alchemy.com
2. Create App → Polygon → Amoy
3. Copy API key

### ✅ Step 4: Create Root `.env`
```bash
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

### ✅ Step 5: Deploy Contract
```bash
npm run deploy
```
**SAVE THE CONTRACT ADDRESS!**

### ✅ Step 6: Create `backend/.env`
```bash
PORT=5000
AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
CONTRACT_ADDRESS=YOUR_DEPLOYED_ADDRESS
PRIVATE_KEY=0xYOUR_PRIVATE_KEY
```

### ✅ Step 7: Create `frontend/.env`
```bash
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=YOUR_DEPLOYED_ADDRESS
VITE_AMOY_RPC_URL=https://polygon-amoy.g.alchemy.com/v2/YOUR_API_KEY
```

### ✅ Step 8: Start Backend
```bash
cd backend
npm run dev
```

### ✅ Step 9: Start Frontend
```bash
cd frontend
npm run dev
```

### ✅ Step 10: Open Browser
Go to: http://localhost:5173

### ✅ Step 11: Test Flow
1. Connect MetaMask (Amoy network)
2. Register batch
3. Add shipment
4. Transfer ownership
5. Verify product

## 🎉 Done!

Your blockchain healthcare supply chain is live!

---

## 📌 Important URLs

- **Faucet:** https://faucet.polygon.technology/
- **Alchemy:** https://alchemy.com
- **Amoy Explorer:** https://amoy.polygonscan.com/
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000

---

## 🆘 Quick Fixes

**No funds?** → Get MATIC from faucet  
**Contract error?** → Check CONTRACT_ADDRESS in .env  
**MetaMask not connecting?** → Switch to Amoy (Chain ID: 80002)  
**Backend not running?** → Check port 5000 is free  

---

## 🚀 You're Ready to Demo!
