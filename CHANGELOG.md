# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-02-20

### Added
- Initial release of MediChain
- Smart contract deployment on Polygon Amoy testnet
- Batch registration with QR code generation
- Supply chain tracking (Manufacturer → Warehouse → Pharmacy)
- Temperature monitoring with breach detection (2-8°C safe range)
- Ownership transfer functionality
- Consumer verification portal
- Interactive dashboard with real-time analytics
- Mobile-responsive UI with camera QR scanning
- PostgreSQL database integration (Supabase)
- Auto-refresh feature for live updates
- Expiry status tracking
- Activity feed with supply chain flow visualization
- Admin panel for data management

### Features
- **Manufacturer Portal**: Register batches and generate QR codes
- **Shipment Tracking**: Add shipment data with from/to details
- **Receiver Portal**: Scan QR codes and transfer ownership
- **Dashboard**: Real-time stats, batch list, and activity feed
- **Admin Panel**: Delete all data functionality

### Smart Contract
- Contract Address: `0x22A04097106757B5165B468818e8593beb554155`
- Network: Polygon Amoy Testnet
- Gas optimization enabled
- Temperature breach detection
- Ownership transfer validation

### Tech Stack
- Frontend: React 18 + Vite + Tailwind CSS + Framer Motion
- Backend: Node.js + Express + Ethers.js
- Database: PostgreSQL (Supabase)
- Blockchain: Solidity ^0.8.20 + Polygon Amoy
- Tools: Hardhat, html5-qrcode, qrcode.react

### Security
- Environment variable configuration
- Input validation
- CORS enabled
- Private key protection

## [Unreleased]

### Planned Features
- User authentication (JWT/OAuth)
- Role-based access control
- Email notifications
- PDF report generation
- Multi-language support
- Batch analytics and insights
- Integration with IoT temperature sensors
- Mobile app (React Native)
- Mainnet deployment

### Known Issues
- None reported

---

## Version History

- **1.0.0** - Initial hackathon prototype release
