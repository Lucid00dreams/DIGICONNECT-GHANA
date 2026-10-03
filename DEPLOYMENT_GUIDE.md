# 🚀 DigiConnect Ghana — Free Tier Hosting & Deployment Guide

This guide walks you through deploying both the **DigiConnect Ghana Frontend (Next.js)** and **Backend REST API (Node.js/Express)** on the **top-tier 100% free hosting platforms**.

---

## 🌟 Recommended Free-Tier Architecture

| Service | Platform | Why It's Recommended | Free Tier Specs |
| :--- | :--- | :--- | :--- |
| **Frontend** | [Vercel](https://vercel.com) | Creators of Next.js; native React 19 / Turbopack support, automatic global edge CDN, automatic HTTPS, zero configuration. | Unlimited deployments, 100 GB bandwidth, free custom domains & SSL. |
| **Backend API** | [Render](https://render.com) | Native Node.js web services, automatic HTTPS, continuous deployment directly from your GitHub repo. | 750 free instance hours/month (100% free), free custom domain & SSL. |

---

## 📋 Pre-requisite: Push Code to GitHub

Hosting platforms deploy automatically whenever you push code to GitHub.

1. **Initialize Git & Commit**:
   Open a terminal in the project root (`WEBSITE`) and run:
   ```bash
   git init
   git add .
   git commit -m "feat: complete DigiConnect Ghana website and API ready for deployment"
   ```

2. **Create a GitHub Repository**:
   - Go to [github.com/new](https://github.com/new).
   - Name your repository (e.g., `digiconnect-ghana`).
   - Leave it public or private (both work with Vercel and Render).
   - Click **Create repository**.

3. **Push your code**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
   git push -u origin main
   ```

---

## 🛠️ Step 1: Deploy Backend API on Render (Do this first)

Deploying the backend first gives you your live API URL (e.g. `https://digiconnect-backend.onrender.com`), which you'll need for the frontend.

1. **Sign Up / Log In**:
   - Go to [dashboard.render.com](https://dashboard.render.com/) and sign in with GitHub.

2. **Create New Web Service**:
   - Click **New +** > **Web Service**.
   - Select **Build and deploy from a Git repository**.
   - Connect your GitHub account and select your `digiconnect-ghana` repository.

3. **Configure Service Settings**:
   - **Name**: `digiconnect-backend`
   - **Region**: Choose the closest region (e.g., Frankfurt or Ohio)
   - **Branch**: `main`
   - **Root Directory**: `backend` *(CRITICAL: ensure this is set to `backend`)*
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (0.1 CPU, 512 MB RAM)

4. **Add Environment Variables** (Under the "Environment" tab):
   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production security & optimizations |
   | `PORT` | `5000` | Port listened by the backend |
   | `CORS_ORIGIN` | `https://<YOUR-FRONTEND>.vercel.app,http://localhost:3000` | Update this with your Vercel URL once generated |
   | `ADMIN_EMAIL` | `admin@digiconnectghana.org` | ConnectHub Admin login |
   | `ADMIN_PASSWORD` | `DigiConnect@2026!Secure` | ConnectHub Admin password (change to your choice) |
   | `SESSION_SECRET` | *(Click "Generate" or type a random 32+ character string)* | Cryptographic session signing |
   | `API_KEY` | *(Click "Generate" or type a random 32+ character string)* | Internal API authentication key |

5. **Deploy**:
   - Click **Create Web Service**.
   - Render will build and deploy your API in ~2 minutes.
   - Once finished, test the health check endpoint:
     `https://<YOUR-RENDER-URL>.onrender.com/api/health`
     It will return `{"status":"ok", ...}`!

---

## 🌐 Step 2: Deploy Frontend on Vercel

1. **Sign Up / Log In**:
   - Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.

2. **Import Project**:
   - Click **Add New...** > **Project**.
   - Select your `digiconnect-ghana` repository and click **Import**.

3. **Configure Project Settings**:
   - **Project Name**: `digiconnect-ghana` (or your preferred name)
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click **Edit** and select `frontend` *(CRITICAL: must be `frontend`)*

4. **Add Environment Variables** (Under "Environment Variables"):
   | Key | Value |
   | :--- | :--- |
   | `NEXT_PUBLIC_API_URL` | `https://<YOUR-RENDER-URL>.onrender.com/api` |

5. **Deploy**:
   - Click **Deploy**.
   - Vercel will build and launch your site in ~1 minute.
   - Your live website will be accessible at: `https://<your-project>.vercel.app`!

---

## 🔄 Step 3: Link & Finalize Cross-Origin Setup

Now that you have both live URLs:
1. Copy your Vercel domain (e.g., `https://digiconnect-ghana.vercel.app`).
2. Go back to your **Render Dashboard** > `digiconnect-backend` > **Environment**.
3. Update `CORS_ORIGIN` to:
   ```env
   https://digiconnect-ghana.vercel.app,http://localhost:3000
   ```
4. Render will automatically re-deploy with the updated CORS setting in seconds!

---

## 💡 Important Free-Tier Notes & Tips

> [!NOTE]
> **Render Free Web Service "Cold Starts"**:
> On the free tier, Render automatically spins down services that receive no traffic for 15 minutes to save resources. When someone visits after inactivity, the first API request may take ~30–45 seconds to wake up the server. Subsequent requests will be instant!
> 
> *Tip: You can use a free uptime monitor like [UptimeRobot.com](https://uptimerobot.com) to ping `https://<your-backend>.onrender.com/api/health` every 10 minutes to keep it warm 24/7!*

> [!TIP]
> **Data Persistence on Free Tier**:
> The backend currently uses local JSON storage (`db.json`) and local disk uploads (`/uploads`).
> On free container hosts like Render, local disk writes are ephemeral (they reset on restart/redeploy).
> For permanent storage at scale in the future, you can connect a free cloud database (such as **Supabase** or **MongoDB Atlas** Free Tier) and image hosting (such as **Cloudinary** Free Tier).

---

## 🔀 Alternative Free-Tier Platform Options

If you prefer alternative providers:
- **Frontend Alternative**:
  - **Netlify**: Connect your GitHub repo, set base directory to `frontend`, build command `npm run build`, publish directory `.next`.
  - **Cloudflare Pages**: Connect repo with Next.js preset.
- **Backend Alternative**:
  - **Koyeb**: Free nano instance with automatic SSL and continuous deployment from GitHub.
  - **Railway**: $5 free starting credit / trial.
