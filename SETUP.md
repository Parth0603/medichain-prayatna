# MediChain Setup Guide

Complete step-by-step guide to set up MediChain on your local machine.

## Prerequisites Checklist

- [ ] Node.js v16+ installed ([Download](https://nodejs.org/))
- [ ] npm or yarn package manager
- [ ] Git installed
- [ ] MetaMask browser extension ([Install](https://metamask.io/))
- [ ] Polygon Amoy testnet configured in MetaMask
- [ ] POL tokens from faucet ([Get tokens](https://faucet.polygon.technology/))
- [ ] PostgreSQL database or Supabase account

## Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/medichain.git
cd medichain
```

## Step 2: Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..

# Install frontend dependencies
cd frontend
npm install
cd ..
```

## Step 3: Configure MetaMask

### Add Polygon Amoy Network

1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Enter details:
   - **Network Name**: Polygon Amoy Testnet
   - **RPC URL**: `https://rpc-amoy.polygon.technology/`
   - **Chain ID**: `80002`
   - **Currency Symbol**: `POL`
   - **Block Explorer**: `https://amoy.polygonscan.com/`

### Get Test Tokens

1. Visit [Polygon Faucet](https://faucet.polygon.technology/)
2. Select "Polygon Amoy"
3. Enter your wallet address
4. Complete captcha
5. Wait for tokens (usually instant)

## Step 4: Setup Database

### Option A: Supabase (Recommended)

1. Go to [Supabase](https://supabase.com/)
2. Create new project
3. Go to Settings → Database
4. Copy connection string (Session Pooler)
5. Use format: `postgresql://postgres.xxx:password@host:6543/postgres`

### Option B: Local PostgreSQL

1. Install PostgreSQL
2. Create database: `createdb medichain`
3. Use connection string: `postgresql://username:password@localhost:5432/medichain`

## Step 5: Environment Variables

### Root `.env`

```bash
cp .env.example .env
```

Edit `.env`:
```env
AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
PRIVATE_KEY=0xyour_metamask_private_key
CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
```

**Get Private Key:**
1. Open MetaMask
2. Click three dots → Account Details
3. Click "Export Private Key"
4. Enter password
5. Copy private key (starts with 0x)

### Backend `.env`

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
PRIVATE_KEY=0xyour_metamask_private_key
AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
DATABASE_URL=your_postgresql_connection_string
```

### Frontend `.env`

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
```

## Step 6: Verify Setup

### Check Wallet Balance

```bash
node check-balance.js
```

Expected output:
```
Wallet Address: 0x37A823...
Balance: 1.5 POL
```

### Test Database Connection

```bash
cd backend
node test-db-connection.js
```

Expected output:
```
✓ Database connected successfully
✓ Tables created
```

## Step 7: Start Application

### Option A: Start All Services

```bash
npm start
```

This starts both backend and frontend simultaneously.

### Option B: Start Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## Step 8: Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/

## Step 9: Test Functionality

### 1. Register a Batch

1. Go to http://localhost:3000/manufacturer
2. Fill in batch details:
   - Batch ID: `BATCH-001`
   - Product Name: `Paracetamol 500mg`
   - Quantity: `1000`
   - Expiry Date: (future date)
   - Storage Rules: `Store at 2-8°C`
3. Click "Register on Blockchain"
4. Wait for transaction confirmation
5. Download QR code

### 2. Add Shipment

1. Go to http://localhost:3000/shipment
2. Enter Batch ID: `BATCH-001`
3. Fill shipment details
4. Click "Add Shipment Record"

### 3. Transfer Ownership

1. Go to http://localhost:3000/receiver
2. Scan QR code or enter Batch ID
3. Enter new owner address
4. Click "Accept & Transfer"

### 4. View Dashboard

1. Go to http://localhost:3000/dashboard
2. Enable "Auto-Refresh"
3. View real-time statistics

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
npx kill-port 5000

# Kill process on port 3000
npx kill-port 3000
```

### Database Connection Failed

- Check DATABASE_URL format
- Verify database is running
- Check firewall settings
- Try Session Pooler (port 6543) instead of Direct (port 5432)

### Transaction Failed

- Check wallet has POL tokens
- Verify private key is correct
- Check network is Polygon Amoy
- Wait and retry (network congestion)

### Module Not Found

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error

- Verify backend is running on port 5000
- Check VITE_API_URL in frontend/.env
- Clear browser cache

## Next Steps

- [ ] Test all features
- [ ] Customize for your use case
- [ ] Deploy to production
- [ ] Add authentication
- [ ] Implement additional features

## Support

Need help? 
- Check [README.md](./README.md)
- Review [TECHNICAL.md](./TECHNICAL.md)
- Open an issue on GitHub
- Contact: your.email@example.com

---

**Happy Building! 🚀**
