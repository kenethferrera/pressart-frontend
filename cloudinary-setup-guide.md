# Cloudinary Setup Guide

## Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/
2. Click "Sign Up Free"
3. Fill in your details
4. Verify your email

## Step 2: Get Your Credentials
1. Go to Dashboard
2. Note your **Cloud Name** (e.g., "my-cloud-name")
3. Go to Settings → Upload
4. Create an **Upload Preset**:
   - Name: `pressart-images`
   - Signing Mode: `Unsigned`
   - Folder: `pressart/`
   - Save

## Step 3: Upload Your Images
1. Go to Media Library
2. Create folders for each category:
   - `pressart/paintings/`
   - `pressart/psicodelicas/`
   - `pressart/space/`
   - etc.

3. Upload your images to appropriate folders

## Step 4: Update Environment Variables
Add to your `.env` file:
```
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images
```

## Step 5: Update Vercel Environment Variables
1. Go to Vercel Dashboard
2. Your project → Settings → Environment Variables
3. Add the same variables as above

## Benefits You'll Get:
- ✅ Automatic image optimization
- ✅ Global CDN (faster loading)
- ✅ Responsive images
- ✅ Format conversion (AVIF, WebP, JPG)
- ✅ Progressive loading
- ✅ 25GB free storage
- ✅ 25GB bandwidth/month

## Image URL Format:
```
https://res.cloudinary.com/your-cloud-name/image/upload/f_auto,q_auto,w_600/pressart/paintings/mona-lisa.jpg
```

## Transformations Available:
- `f_auto` - automatic format selection
- `q_auto` - automatic quality optimization
- `w_600` - width 600px
- `h_400` - height 400px
- `c_fill` - crop mode
- `g_auto` - automatic gravity

