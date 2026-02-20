# MediChain - Blockchain-Based Healthcare Supply Chain

![MediChain](https://img.shields.io/badge/Blockchain-Polygon%20Amoy-8247E5)
![License](https://img.shields.io/badge/License-MIT-green)
![Status](https://img.shields.io/badge/Status-Hackathon%20Prototype-orange)

A decentralized pharmaceutical supply chain tracking system built on Polygon blockchain. Track medicines from manufacturer to consumer with complete transparency, temperature monitoring, and counterfeit prevention.

## 🌟 Features

- **Batch Registration** - Manufacturers register medicine batches on blockchain
- **QR Code Generation** - Unique QR codes for each batch
- **Supply Chain Tracking** - Track movement from Manufacturer → Warehouse → Pharmacy
- **Temperature Monitoring** - Real-time temperature breach detection (2-8°C safe range)
- **Ownership Transfer** - Secure blockchain-based ownership transfers
- **Consumer Verification** - Anyone can verify product authenticity
- **Interactive Dashboard** - Real-time analytics and monitoring
- **Mobile Responsive** - Works on all devices with camera QR scanning

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Frontend  │ ───> │   Backend    │ ───> │  Blockchain │
│  React App  │      │  Express API │      │   Polygon   │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  PostgreSQL  │
                     │   Database   │
                     └──────────────┘
```

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- Tailwind CSS for styling
- Framer Motion for animations
- Ethers.js for blockchain interaction
- html5-qrcode for camera scanning
- qrcode.react for QR generation

### Backend
- Node.js + Express
- Ethers.js for smart contract interaction
- PostgreSQL (Supabase) for data storage
- CORS enabled for cross-origin requests

### Blockchain
- Solidity ^0.8.20
- Polygon Amoy Testnet
- Hardhat for development
- Gas optimization enabled

### Smart Contract Features
- Batch registration with metadata
- Temperature breach detection
- Ownership transfer validation
- Batch flagging mechanism
- Shipment history tracking

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask wallet
- Polygon Amoy testnet POL tokens ([Get from faucet](https://faucet.polygon.technology/))
- PostgreSQL database (or Supabase account)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/medichain.git
cd medichain
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Root `.env`
```bash
cp .env.example .env
```

Edit `.env`:
```env
AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
PRIVATE_KEY=your_metamask_private_key_here
CONTRACT_ADDRESS=your_deployed_contract_address
```

#### Backend `.env`
```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=5000
CONTRACT_ADDRESS=your_deployed_contract_address
PRIVATE_KEY=your_metamask_private_key_here
AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
DATABASE_URL=your_postgresql_connection_string
```

#### Frontend `.env`
```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:
```env
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=your_deployed_contract_address
```

### 4. Deploy Smart Contract (Optional - Already Deployed)

```bash
# Compile contracts
npx hardhat compile

# Deploy to Polygon Amoy
npx hardhat run scripts/deploy.js --network amoy
```

**Current Deployment:**
- Contract Address: `0x22A04097106757B5165B468818e8593beb554155`
- Network: Polygon Amoy Testnet
- [View on PolygonScan](https://amoy.polygonscan.com/address/0x22A04097106757B5165B468818e8593beb554155)

### 5. Setup Database

The database tables will be created automatically on first run. Alternatively, run:

```bash
cd backend
node src/config/initDatabase.js
```

### 6. Start the Application

#### Option A: Start All Services Together
```bash
# From root directory
npm start
```

#### Option B: Start Services Separately

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

### 7. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📱 Usage Guide

### For Manufacturers
1. Navigate to **Manufacturer** page
2. Fill in batch details (ID, product name, quantity, expiry, storage rules)
3. Click "Register on Blockchain"
4. Download/Print the generated QR code

### For Logistics/Warehouses
1. Navigate to **Shipment** page
2. Enter batch ID
3. Fill in shipment details (from/to locations, temperature)
4. Click "Add Shipment Record"

### For Receivers (Warehouse/Pharmacy)
1. Navigate to **Receiver** page
2. Scan QR code or enter batch ID manually
3. Review batch and shipment history
4. Enter new owner address
5. Click "Accept & Transfer" or "Reject & Flag"

### For Consumers
1. Navigate to **Receiver** page
2. Scan product QR code
3. View complete supply chain history
4. Verify authenticity and temperature compliance

### Dashboard
- View real-time statistics
- Monitor all batches
- Track temperature breaches
- Filter by status (Active/Flagged/Expired)
- Enable auto-refresh for live updates

## 🗂️ Project Structure

```
medichain/
├── contracts/              # Solidity smart contracts
│   └── MediChain.sol
├── scripts/               # Deployment scripts
│   └── deploy.js
├── backend/               # Express API server
│   ├── src/
│   │   ├── config/       # Database & blockchain config
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── services/     # Business logic
│   │   └── app.js
│   └── package.json
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── App.jsx
│   └── package.json
├── hardhat.config.js      # Hardhat configuration
├── package.json           # Root package.json
└── README.md
```

## 🔐 Security Notes

⚠️ **IMPORTANT**: This is a hackathon prototype. For production use:

1. **Never commit private keys** - Use environment variables
2. **Use a dedicated wallet** - Don't use your main wallet
3. **Implement proper authentication** - Add JWT/OAuth
4. **Add input validation** - Sanitize all user inputs
5. **Use HTTPS** - Enable SSL/TLS in production
6. **Implement rate limiting** - Prevent API abuse
7. **Add access control** - Role-based permissions
8. **Audit smart contracts** - Professional security audit required

## 🧪 Testing

### Check Wallet Balance
```bash
node check-balance.js
```

### Test Database Connection
```bash
cd backend
node test-db-connection.js
```

### Run Smart Contract Tests
```bash
npx hardhat test
```

## 📊 Database Schema

### Batches Table
- `batch_id` (PK) - Unique batch identifier
- `product_name` - Medicine name
- `quantity` - Number of units
- `expiry_date` - Unix timestamp
- `storage_rules` - Storage requirements
- `current_owner` - Wallet address
- `is_flagged` - Boolean flag
- `tx_hash` - Blockchain transaction hash

### Shipments Table
- `id` (PK) - Auto-increment
- `batch_id` (FK) - References batches
- `location` - Current location
- `temperature` - Temperature in Celsius
- `is_breach` - Temperature breach flag
- `timestamp` - Unix timestamp
- `from_type/name/address/contact` - Sender details
- `to_type/name/address/contact` - Receiver details
- `tx_hash` - Blockchain transaction hash

## 🌐 API Endpoints

### Batch Routes
- `POST /api/batch/register` - Register new batch
- `GET /api/batch/:batchId` - Get batch details
- `POST /api/batch/transfer` - Transfer ownership
- `POST /api/batch/flag` - Flag batch

### Shipment Routes
- `POST /api/shipment/add` - Add shipment record
- `GET /api/shipment/history/:batchId` - Get shipment history
- `POST /api/shipment/simulate-breach` - Simulate temperature breach

### Dashboard Routes
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/dashboard/batches` - Get all batches
- `GET /api/dashboard/activity` - Get recent activity

### Admin Routes
- `DELETE /api/admin/delete-all` - Delete all data (database only)

## 🎨 Screenshots

(Add screenshots of your application here)

## 🤝 Contributing

This is a hackathon prototype. Contributions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Team

- **Your Name** - [GitHub](https://github.com/yourusername) | [LinkedIn](https://linkedin.com/in/yourprofile)

## 🙏 Acknowledgments

- Polygon for the testnet infrastructure
- Supabase for database hosting
- OpenZeppelin for secure smart contract libraries
- The blockchain community for inspiration

## 📞 Support

For questions or issues:
- Open an issue on GitHub
- Email: your.email@example.com

## 🔗 Links

- [Live Demo](https://your-demo-link.com)
- [Smart Contract on PolygonScan](https://amoy.polygonscan.com/address/0x22A04097106757B5165B468818e8593beb554155)
- [Project Documentation](./TECHNICAL.md)

---

**Built with ❤️ for [Hackathon Name]**
