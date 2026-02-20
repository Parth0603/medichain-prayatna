# Technical Approach - MediChain

## Chosen Technology Stack

### Blockchain Layer
- **Solidity ^0.8.20** - Smart contract development language
- **Hardhat** - Ethereum development environment for compilation, deployment, and testing
- **Polygon Amoy Testnet** - Layer 2 blockchain network (Chain ID: 80002)
- **Ethers.js v6** - Blockchain interaction library for JavaScript

### Frontend
- **React 18** - UI framework built with Vite for fast development
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **Framer Motion** - Animation library for smooth UI transitions
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API communication
- **html5-qrcode** - Camera-based QR code scanning
- **qrcode.react** - QR code generation
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **PostgreSQL (Neon)** - Cloud-hosted relational database
- **CORS** - Cross-origin resource sharing middleware

### Development Tools
- **npm/npx** - Package management
- **Concurrently** - Run multiple commands simultaneously
- **Git** - Version control

---

## System Workflow / Architecture

### 1. Smart Contract Layer (Blockchain)
```
MediChain.sol (Deployed on Polygon Amoy)
├── Batch Registration
├── Ownership Transfer
├── Shipment Data Recording
├── Temperature Breach Detection
└── Batch Flagging
```

**Contract Address:** `0x22A04097106757B5165B468818e8593beb554155`

### 2. Backend Architecture
```
Express Server (Port 5000)
├── API Routes
│   ├── /api/batch/* - Batch operations
│   ├── /api/shipment/* - Shipment tracking
│   ├── /api/dashboard/* - Analytics
│   └── /api/admin/* - Admin operations
├── Controllers
│   ├── batchController.js
│   ├── shipmentController.js
│   ├── dashboardController.js
│   └── adminController.js
├── Services
│   ├── blockchainService.js - Smart contract interaction
│   ├── databaseService.js - PostgreSQL queries
│   └── iotSimulator.js - Temperature simulation
└── Middleware
    ├── errorHandler.js
    └── validator.js
```

### 3. Frontend Architecture
```
React Application (Port 3000)
├── Pages
│   ├── Home - Hero section & features
│   ├── About - Project information
│   ├── Manufacturer - Batch registration
│   ├── Shipment - Supply chain tracking
│   ├── Receiver - QR scanning & ownership
│   ├── Dashboard - Analytics & stats
│   ├── Admin - Data management
│   └── Verify - Public batch verification
├── Components
│   ├── Navbar - Responsive navigation
│   ├── Footer - Site footer
│   ├── QRScanner - Camera-based scanning
│   ├── QRCodeDisplay - QR generation
│   ├── BatchCard - Batch information
│   ├── ShipmentCard - Supply chain flow
│   └── TransactionStatus - Blockchain feedback
└── Services
    └── api.js - Backend API calls
```

### 4. Database Schema
```sql
batches
├── batch_id (PK)
├── product_name
├── quantity
├── expiry_date
├── storage_rules
├── current_owner
├── is_flagged
├── created_at
└── tx_hash

shipments
├── id (PK)
├── batch_id (FK)
├── location
├── temperature
├── is_breach
├── timestamp
├── from_type
├── from_name
├── from_address
├── from_contact
├── to_type
├── to_name
├── to_address
├── to_contact
├── created_at
└── tx_hash
```

### 5. Data Flow

**Batch Registration Flow:**
```
User Input → Frontend Form → Backend API → Smart Contract → Blockchain
                                    ↓
                              PostgreSQL Database
                                    ↓
                              QR Code Generated
```

**Shipment Tracking Flow:**
```
Shipment Data → Backend API → Smart Contract (Temperature Check)
                        ↓
                  Database Storage
                        ↓
              Breach Detection (2-8°C)
                        ↓
              Flag Batch if Breach
```

**QR Verification Flow:**
```
Mobile Camera → QR Scanner → Batch ID → Backend API
                                            ↓
                                    Blockchain Query
                                            ↓
                                    Database Query
                                            ↓
                              Display Complete History
```

---

## Tools, Platforms, & Frameworks

### Blockchain Development
- **Hardhat** - Smart contract compilation, deployment, testing
- **Polygon Amoy RPC** - `https://rpc-amoy.polygon.technology/`
- **Alchemy** - Blockchain infrastructure provider
- **MetaMask** - Wallet for transaction signing

### Frontend Development
- **Vite** - Build tool and dev server
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing
- **ESLint** - Code linting

### Backend Development
- **Nodemon** - Auto-restart on file changes
- **dotenv** - Environment variable management

### Database
- **Neon PostgreSQL** - Serverless PostgreSQL
- **pg (node-postgres)** - PostgreSQL client for Node.js

### Deployment & Testing
- **Concurrently** - Run frontend + backend simultaneously
- **npm scripts** - Automated workflows

### Version Control
- **Git** - Source code management
- **GitHub** - Code repository hosting

### API Testing
- **Postman** (optional) - API endpoint testing
- **Browser DevTools** - Network inspection

---

## Key Technical Features

### 1. Blockchain Integration
- Immutable record storage on Polygon Amoy
- Gas-optimized smart contract (Solidity optimizer enabled)
- Event emission for all major actions
- Automatic temperature breach detection (2-8°C range)

### 2. Dual Storage System
- **Blockchain** - Immutable source of truth
- **PostgreSQL** - Fast queries and analytics
- Synchronized data across both systems

### 3. Supply Chain Tracking
- Multi-entity support (Manufacturer → Warehouse → Pharmacy)
- Complete shipment history with timestamps
- Temperature monitoring at each step
- Automatic breach flagging

### 4. Responsive Design
- Mobile-first approach
- Touch-friendly interface (44px minimum tap targets)
- Responsive grids and layouts
- Smooth animations with Framer Motion

### 5. QR Code System
- Camera-based scanning with html5-qrcode
- Automatic camera selection (back camera preferred)
- Manual entry fallback
- Real-time QR code generation

### 6. Security Features
- Private key management via environment variables
- CORS protection
- Input validation
- Error handling middleware

---

## Performance Optimizations

1. **Frontend**
   - Code splitting with React Router
   - Lazy loading with Intersection Observer
   - Optimized animations (60fps)
   - Responsive images

2. **Backend**
   - Database connection pooling
   - Indexed database queries
   - Async/await for non-blocking operations

3. **Blockchain**
   - Batch operations to reduce gas costs
   - Optimized smart contract (Solidity optimizer)
   - Event-based updates instead of constant polling

---

## Development Workflow

```bash
# Install dependencies
npm install (root)
cd frontend && npm install
cd backend && npm install

# Start development
npm start (runs both frontend & backend)

# Deploy smart contract
npm run deploy

# Check wallet balance
node check-balance.js
```

---

## Environment Configuration

### Root `.env`
```
ALCHEMY_API_KEY=<your-key>
PRIVATE_KEY=<wallet-private-key>
```

### Backend `.env`
```
PORT=5000
DATABASE_URL=<neon-postgresql-url>
CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
PRIVATE_KEY=<wallet-private-key>
RPC_URL=https://rpc-amoy.polygon.technology/
```

### Frontend `.env`
```
VITE_API_URL=http://localhost:5000/api
VITE_CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
```

---

## Technical Achievements

✅ Full-stack blockchain integration
✅ Real-time temperature monitoring
✅ Camera-based QR scanning
✅ Responsive mobile-first design
✅ Dual storage architecture
✅ Complete supply chain visibility
✅ Automated breach detection
✅ Production-ready prototype
