const fs = require('fs');
const path = require('path');

// Cloudinary migration helper
const MIGRATION_GUIDE = `
# Cloudinary Migration Guide

## Step 1: Get Your Cloud Name
1. Go to your Cloudinary Dashboard
2. Copy your Cloud Name (e.g., "abc123def456")
3. Replace "your-cloud-name-here" in .env file

## Step 2: Create Upload Preset
1. Go to Settings → Upload
2. Create new preset:
   - Name: pressart-images
   - Signing Mode: Unsigned
   - Folder: pressart/
   - Save

## Step 3: Upload Images to Cloudinary
1. Go to Media Library
2. Create folders for each category:
   - pressart/paintings/
   - pressart/psicodelicas/
   - pressart/space/
   - pressart/digital-illustration/
   - pressart/religion/
   - pressart/motivational/
   - pressart/esoteric/
   - pressart/doodle-art/
   - pressart/collage/
   - pressart/dc-heroes/
   - pressart/league-of-legends/
   - pressart/mortal-kombat/
   - pressart/among-us/

3. Upload images to appropriate folders

## Step 4: Update Environment Variables
1. Update .env file with your cloud name
2. Add to Vercel Dashboard:
   - REACT_APP_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
   - REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images

## Step 5: Update Image URLs
Replace local image paths with Cloudinary URLs:

OLD: /Images/Paintings/01. Mona Lisa by Leonardo Da Vinci.avif
NEW: pressart/paintings/01-mona-lisa

## Step 6: Test the Migration
1. Deploy to Vercel
2. Test image loading
3. Verify performance improvements

## Benefits You'll Get:
✅ 60-80% faster image loading
✅ 50% smaller file sizes
✅ Global CDN distribution
✅ Automatic format optimization
✅ Progressive loading
✅ Responsive images
✅ 25GB free storage
✅ 25GB bandwidth/month
`;

console.log(MIGRATION_GUIDE);

// Helper function to generate Cloudinary public IDs
const generateCloudinaryPublicId = (filePath) => {
  const fileName = path.basename(filePath, path.extname(filePath));
  const category = path.dirname(filePath).split('/').pop();
  
  // Convert to kebab-case and remove special characters
  const cleanName = fileName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return `pressart/${category}/${cleanName}`;
};

// Example conversion
const exampleFiles = [
  '/Images/Paintings/01. Mona Lisa by Leonardo Da Vinci.avif',
  '/Images/Space/SPACE_001.avif',
  '/Images/Artes Psicodélicas/Kit Psicodélico 1.avif'
];

console.log('\n📋 Example Image URL Conversions:');
exampleFiles.forEach(filePath => {
  const publicId = generateCloudinaryPublicId(filePath);
  console.log(`${filePath} → ${publicId}`);
});

console.log('\n🚀 Ready to migrate! Follow the steps above.');
