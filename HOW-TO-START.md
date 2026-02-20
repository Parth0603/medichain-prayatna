# 🚀 How to Start MediChain

## Simple One Command Start

Just run this command in the root directory:

```bash
npm start
```

This will:
1. ✅ Kill any existing Node processes
2. ✅ Start Backend on port 5000
3. ✅ Start Frontend on port 3000
4. ✅ Show both logs in one terminal

## Open Your Browser

After running `npm start`, open:

**http://localhost:3000**

(If port 3000 is busy, it will use 3001 - check the terminal output)

## Stop the Servers

Press `Ctrl + C` in the terminal

## Troubleshooting

**If you see "port already in use":**
1. Close the terminal
2. Run this command first:
   ```bash
   taskkill /F /IM node.exe
   ```
3. Then run `npm start` again

**If frontend shows blank page:**
1. Check browser console (F12)
2. Make sure MetaMask is installed
3. Try refreshing the page

## What You'll See

```
[BACKEND] Server running on port 5000
[FRONTEND] Local: http://localhost:3000
```

That's it! Your blockchain supply chain app is running! 🎉
