const fs = require('fs');
const path = require('path');

// Migration script to convert local image paths to ImageKit URLs
const MIGRATION_GUIDE = `
# ImageKit Migration Guide

## Step 1: Upload Images to ImageKit
1. Go to ImageKit Media Library
2. Create folders for each category
3. Upload your images to appropriate folders

## Step 2: Update Image Paths
Replace local paths with ImageKit URLs:

OLD: /Images/Paintings/01. Mona Lisa by Leonardo Da Vinci.avif
NEW: paintings/01-mona-lisa-by-leonardo-da-vinci

OLD: /Images/Artes Psicodélicas/Kit Psicodélico 1.avif
NEW: psicodelicas/kit-psicodelico-01

## Step 3: Update Code
The code will be updated to use ImageKit URLs instead of local paths.

## Step 4: Test and Deploy
Test locally, then deploy to Vercel with updated environment variables.
`;

console.log(MIGRATION_GUIDE);

// Helper function to convert local path to ImageKit path
const convertToImageKitPath = (localPath) => {
  // Remove /Images/ prefix and file extension
  let imageKitPath = localPath.replace('/Images/', '').replace('.avif', '');
  
  // Convert to kebab-case
  imageKitPath = imageKitPath
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
  
  return imageKitPath;
};

// Example conversions
const exampleConversions = [
  '/Images/Paintings/01. Mona Lisa by Leonardo Da Vinci.avif',
  '/Images/Artes Psicodélicas/Kit Psicodélico 1.avif',
  '/Images/Space/SPACE_001.avif',
  '/Images/DC Heroes/HEROIS 001.avif'
];

console.log('\n📋 Example Image Path Conversions:');
exampleConversions.forEach(localPath => {
  const imageKitPath = convertToImageKitPath(localPath);
  const fullUrl = `https://ik.imagekit.io/kenethferrera/${imageKitPath}?tr=w-600,q-80,f-auto`;
  console.log(`${localPath} → ${imageKitPath}`);
  console.log(`Full URL: ${fullUrl}\n`);
});

console.log('\n🚀 Ready to migrate! Follow the steps above.');

