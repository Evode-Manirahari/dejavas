# Vercel Deployment Guide

## 🚀 Deploying to Vercel

This project is configured for automatic deployment on Vercel when you push to the main branch.

### Configuration Files

- `vercel.json` - Root Vercel configuration
- `frontend/vercel.json` - Frontend-specific configuration
- `package.json` - Root workspace configuration
- `frontend/package.json` - Frontend build configuration

### Build Process

1. **Vercel detects** the `frontend/package.json` file
2. **Installs dependencies** in the frontend directory
3. **Runs build command** (`npm run vercel-build`)
4. **Serves static files** from `frontend/dist` directory

### Manual Deployment

If automatic deployment doesn't work:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Set **Root Directory** to `frontend`

2. **Build Settings:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

3. **Environment Variables:**
   - Add any required environment variables in Vercel dashboard

### Troubleshooting

If deployment fails:

1. **Check build logs** in Vercel dashboard
2. **Verify Node.js version** (requires 18+)
3. **Ensure all dependencies** are in `package.json`
4. **Check file paths** are correct

### Local Testing

Test the build locally:

```bash
# From root directory
npm run build

# Or from frontend directory
cd frontend
npm install
npm run build
```

The built files will be in `frontend/dist/` directory.
