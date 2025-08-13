# ImageKit.io Setup Guide

## 🎯 Why ImageKit.io?
- ✅ **25MB file size limit** (vs 10MB Cloudinary)
- ✅ **20GB free storage**
- ✅ **20GB bandwidth/month**
- ✅ **Global CDN**
- ✅ **Automatic optimization**
- ✅ **AVIF/WebP support**

## Step 1: Create ImageKit.io Account
1. Go to https://imagekit.io/
2. Click "Start Free"
3. Sign up with your email/GitHub
4. Verify your email

## Step 2: Get Your Credentials
1. Go to Dashboard
2. Click "Developer Options" in the left sidebar
3. Copy these values:
   - **URL Endpoint** (e.g., `https://ik.imagekit.io/your-endpoint`)
   - **Public Key** (e.g., `pk_abc123def456`)
   - **Authentication Endpoint** (e.g., `https://www.imagekit.io/api/v1/files/upload`)

## Step 3: Update Environment Variables
Replace in your `.env` file:
```
REACT_APP_IMAGEKIT_URL_ENDPOINT=your-actual-url-endpoint
REACT_APP_IMAGEKIT_PUBLIC_KEY=your-actual-public-key
REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=your-actual-auth-endpoint
```

## Step 4: Create Folder Structure
In ImageKit Media Library, create these folders:
- `paintings/`
- `psicodelicas/`
- `space/`
- `digital-illustration/`
- `religion/`
- `motivational/`
- `esoteric/`
- `doodle-art/`
- `collage/`
- `dc-heroes/`
- `league-of-legends/`
- `mortal-kombat/`
- `among-us/`

## Step 5: Upload Images
1. Go to Media Library
2. Upload images to appropriate folders
3. Use descriptive filenames (e.g., `01-mona-lisa.avif`)

## Step 6: Update Vercel Environment Variables
1. Go to Vercel Dashboard
2. Your project → Settings → Environment Variables
3. Add the same ImageKit variables

## Image URL Format
```
https://ik.imagekit.io/your-endpoint/paintings/01-mona-lisa?tr=w-600,q-80,f-auto
```

## Transformations Available
- `w-600` - width 600px
- `h-400` - height 400px
- `q-80` - quality 80%
- `f-auto` - automatic format selection
- `c-at_max` - crop mode
- `fo-auto` - focus mode

## Benefits You'll Get
- ✅ 60-80% faster image loading
- ✅ 50% smaller file sizes
- ✅ Global CDN distribution
- ✅ Automatic format optimization
- ✅ Progressive loading
- ✅ Responsive images
- ✅ 25MB file size support
- ✅ 20GB free storage
- ✅ 20GB bandwidth/month
