# 🚀 Quick Start Guide

## Start the Application

### Option 1: Double-click the batch file (Easiest)
Simply double-click: **`start.bat`**

This will:
1. Kill any existing Node processes
2. Start the backend server (Port 5000)
3. Start the frontend server (Port 3000)
4. Automatically open your browser to http://localhost:3000

### Option 2: Use npm command
```bash
npm start
```

### Option 3: Manual start (if above don't work)

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

Then open: **http://localhost:3000**

---

## 🌐 Application URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000
- **Contract on Amoy:** https://amoy.polygonscan.com/address/0x22A04097106757B5165B468818e8593beb554155

---

## 🎯 What to Do After Starting

1. **Connect MetaMask**
   - Make sure you're on Polygon Amoy network
   - Chain ID: 80002

2. **Test the Flow**
   - Go to Manufacturer page
   - Register a batch
   - Generate QR code
   - Add shipment data
   - Transfer ownership
   - Verify as consumer

---

## 🛑 Stop the Application

- Close the terminal windows
- Or press `Ctrl+C` in each terminal

---

## ⚠️ Troubleshooting

**Port already in use?**
- Run `start.bat` again (it kills existing processes)
- Or manually: `taskkill /F /IM node.exe`

**Blank page?**
- Check browser console (F12)
- Make sure MetaMask is installed
- Try refreshing the page

**Backend not responding?**
- Check if backend is running on port 5000
- Check `.env` files are configured

---

## 📞 Need Help?

Check these files:
- `SETUP-GUIDE.md` - Detailed setup instructions
- `QUICK-START.md` - Quick reference
- `PROJECT-REPORT.md` - Complete project details

---

**Ready to go! Just run `start.bat` or `npm start`** 🚀
