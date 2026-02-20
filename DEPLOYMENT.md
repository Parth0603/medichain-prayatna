# MediChain Deployment Guide

Complete guide to deploy MediChain to production.

## 🌐 Deployment Architecture

```
Frontend (Netlify) → Backend (Render) → Database (Supabase) → Blockchain (Polygon Amoy)
```

## 📦 What You Need

- [x] GitHub repository (already done)
- [ ] Netlify account (you have this)
- [ ] Render account (for backend)
- [ ] Supabase database (you have this)
- [ ] Environment variables ready

---

## 🎨 Frontend Deployment (Netlify) - Already Done ✅

Your frontend is already on Netlify. We'll update it after backend deployment.

---

## 🔧 Backend Deployment (Render)

### Step 1: Create Render Account

1. Go to [Render.com](https://render.com/)
2. Sign up with GitHub
3. Authorize Render to access your repositories

### Step 2: Create New Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repository: `Parth0603/medichain-prayatna`
3. Configure the service:

**Basic Settings:**
- **Name**: `medichain-backend`
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Instance Type:**
- Select **Free** tier

### Step 3: Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

```env
PORT=5000
CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
PRIVATE_KEY=0x5a530a247a78a3bab5b7b52521bc0a21e1de4a7e001783884da0691ebcaf8555
AMOY_RPC_URL=https://rpc-amoy.polygon.technology/
DATABASE_URL=postgresql://postgres.myemcksdcgufklbntplu:CoLqm7P5ebP4Kv2x@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres
NODE_ENV=production
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Copy your backend URL: `https://medichain-backend.onrender.com`

---

## 🔄 Update Frontend to Use Deployed Backend

### Step 1: Update Netlify Environment Variables

1. Go to Netlify Dashboard
2. Select your site
3. Go to "Site settings" → "Environment variables"
4. Add/Update:

```env
VITE_API_URL=https://medichain-backend.onrender.com/api
VITE_CONTRACT_ADDRESS=0x22A04097106757B5165B468818e8593beb554155
```

### Step 2: Redeploy Frontend

**Option A: Through Netlify Dashboard**
1. Go to "Deploys" tab
2. Click "Trigger deploy" → "Clear cache and deploy site"

**Option B: Push to GitHub**
```bash
git add .
git commit -m "Update API URL for production"
git push origin main
```

Netlify will auto-deploy.

---

## 🧪 Test Your Deployment

### 1. Test Backend API

Visit: `https://medichain-backend.onrender.com/`

Expected response:
```json
{
  "message": "MediChain API Server"
}
```

### 2. Test Frontend

Visit your Netlify URL and test:
- [ ] Register a batch
- [ ] Add shipment
- [ ] Transfer ownership
- [ ] View dashboard
- [ ] Scan QR code

---

## 🐛 Troubleshooting

### Backend Issues

**"Application failed to respond"**
- Check Render logs: Dashboard → Logs
- Verify all environment variables are set
- Check database connection

**CORS Errors**
- Backend should have CORS enabled (already configured)
- Check browser console for specific errors

**Database Connection Failed**
- Verify DATABASE_URL is correct
- Check Supabase is not paused
- Try Session Pooler (port 6543) instead of Direct (5432)

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Verify VITE_API_URL is correct
- Check backend is running
- Open browser DevTools → Network tab

**Environment Variables Not Working**
- Netlify requires rebuild after env var changes
- Clear cache and redeploy

---

## 🔒 Security Considerations

### ⚠️ IMPORTANT: Your Private Key is Exposed!

Your current private key is in this guide. For production:

1. **Create a new wallet** for production
2. **Transfer only necessary POL** tokens
3. **Update environment variables** on Render
4. **Never commit private keys** to GitHub

### Additional Security

- [ ] Enable HTTPS (automatic on Netlify/Render)
- [ ] Add rate limiting
- [ ] Implement authentication
- [ ] Use secrets management
- [ ] Monitor for suspicious activity

---

## 💰 Cost Breakdown

| Service | Plan | Cost |
|---------|------|------|
| Netlify | Free | $0/month |
| Render | Free | $0/month |
| Supabase | Free | $0/month |
| Polygon Amoy | Testnet | $0 (free tokens) |
| **Total** | | **$0/month** |

**Note:** Free tiers have limitations:
- Render: Spins down after 15 min inactivity (cold starts)
- Netlify: 100GB bandwidth/month
- Supabase: 500MB database, 2GB bandwidth

---

## 🚀 Alternative Deployment Options

### Backend Alternatives

**1. Railway** (Similar to Render)
- Free tier available
- Easy deployment
- Good for Node.js

**2. Vercel** (Serverless)
- Free tier
- Requires serverless functions
- Need to refactor backend

**3. Heroku** (Paid)
- $5/month minimum
- More reliable than free tiers
- Better uptime

**4. DigitalOcean App Platform**
- $5/month
- More control
- Better performance

### Frontend Alternatives

**1. Vercel**
- Similar to Netlify
- Great for React
- Free tier

**2. GitHub Pages**
- Free
- Static sites only
- Custom domain support

---

## 📊 Monitoring

### Render Dashboard
- View logs
- Monitor CPU/Memory
- Check uptime

### Netlify Analytics
- Page views
- Performance
- Bandwidth usage

### Supabase Dashboard
- Database size
- Query performance
- Connection count

---

## 🔄 Continuous Deployment

Both Netlify and Render auto-deploy when you push to GitHub:

```bash
# Make changes
git add .
git commit -m "Your changes"
git push origin main

# Automatic deployment happens!
```

---

## 📝 Post-Deployment Checklist

- [ ] Backend is accessible
- [ ] Frontend connects to backend
- [ ] Database queries work
- [ ] Blockchain transactions work
- [ ] QR code generation works
- [ ] Camera scanning works (mobile)
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Test on mobile device
- [ ] Share URL with team/judges

---

## 🎯 Your Deployed URLs

**Frontend (Netlify):**
- URL: `https://your-site-name.netlify.app`
- Update in README.md

**Backend (Render):**
- URL: `https://medichain-backend.onrender.com`
- API: `https://medichain-backend.onrender.com/api`

**Smart Contract:**
- Network: Polygon Amoy
- Address: `0x22A04097106757B5165B468818e8593beb554155`
- Explorer: https://amoy.polygonscan.com/address/0x22A04097106757B5165B468818e8593beb554155

---

## 🆘 Need Help?

**Render Issues:**
- [Render Docs](https://render.com/docs)
- [Render Community](https://community.render.com/)

**Netlify Issues:**
- [Netlify Docs](https://docs.netlify.com/)
- [Netlify Support](https://www.netlify.com/support/)

**General Issues:**
- Check GitHub Issues
- Review application logs
- Test locally first

---

**Good luck with your deployment! 🚀**
