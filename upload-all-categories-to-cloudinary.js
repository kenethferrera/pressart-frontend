const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a single image to Cloudinary with exact filename
 */
async function uploadImageToCloudinary(localFilePath, folder = '') {
  try {
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found: ${localFilePath}`);
    }
    
    const filename = path.basename(localFilePath, path.extname(localFilePath));
    const ext = path.extname(localFilePath);
    const publicId = folder ? `${folder}/${filename}` : filename;
    
    console.log(`📤 Uploading: ${filename}${ext} to ${folder || 'root'}`);
    
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId,
      overwrite: true,
      resource_type: 'auto',
      use_filename: false,
      unique_filename: false,
      folder: folder || undefined
    });
    
    console.log(`✅ Uploaded: ${result.public_id} (${result.bytes} bytes)`);
    return { 
      success: true, 
      secure_url: result.secure_url, 
      public_id: result.public_id,
      bytes: result.bytes 
    };
  } catch (error) {
    console.error(`❌ Upload failed for ${localFilePath}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Upload all images from a directory to Cloudinary
 */
async function uploadDirectoryToCloudinary(directoryPath, folder = '') {
  console.log(`\n🚀 Uploading directory: ${directoryPath} to Cloudinary folder: ${folder || 'root'}`);
  console.log('='.repeat(60));
  
  if (!fs.existsSync(directoryPath)) {
    console.error(`❌ Directory not found: ${directoryPath}`);
    return { success: false, error: 'Directory not found' };
  }
  
  const files = fs.readdirSync(directoryPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
  });
  
  console.log(`🔍 Found ${imageFiles.length} image files`);
  
  let successCount = 0;
  let failCount = 0;
  const results = [];
  
  for (const file of imageFiles) {
    const filePath = path.join(directoryPath, file);
    const result = await uploadImageToCloudinary(filePath, folder);
    
    if (result.success) {
      successCount++;
      results.push(result);
    } else {
      failCount++;
    }
    
    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Upload Summary for ${folder}:`);
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Total: ${imageFiles.length}`);
  
  return { successCount, failCount, results };
}

/**
 * Main function to upload all categories
 */
async function uploadAllCategories() {
  console.log('🚀 Cloudinary Upload Tool - All Categories');
  console.log('==========================================\n');
  
  // Check if Cloudinary credentials are set
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Cloudinary credentials not found in .env file');
    console.log('Please add the following to your .env file:');
    console.log('CLOUDINARY_CLOUD_NAME=your_cloud_name');
    console.log('CLOUDINARY_API_KEY=your_api_key');
    console.log('CLOUDINARY_API_SECRET=your_api_secret');
    return;
  }
  
  // Get all directories in the parent folder
  const parentDir = '../';
  const allDirs = fs.readdirSync(parentDir).filter(item => {
    const fullPath = path.join(parentDir, item);
    return fs.statSync(fullPath).isDirectory() && item.includes('_2025-08-13_');
  });
  
  console.log('🔍 Found directories:', allDirs);
  console.log('\n📋 Categories to upload:');
  allDirs.forEach(dir => {
    const categoryName = dir.split('_2025-08-13_')[0];
    console.log(`  - ${categoryName}`);
  });
  
  let totalSuccess = 0;
  let totalFail = 0;
  
  for (const dir of allDirs) {
    const categoryName = dir.split('_2025-08-13_')[0];
    const sourceDir = path.join(parentDir, dir);
    
    console.log(`\n🎯 Processing ${categoryName.toUpperCase()}`);
    console.log('='.repeat(50));
    
    const result = await uploadDirectoryToCloudinary(sourceDir, categoryName);
    
    if (result.successCount !== undefined) {
      totalSuccess += result.successCount;
      totalFail += result.failCount;
    }
    
    console.log(`✅ Completed ${categoryName}`);
  }
  
  console.log('\n🎉 All categories uploaded!');
  console.log('==========================');
  console.log(`📊 Total Successful: ${totalSuccess}`);
  console.log(`📊 Total Failed: ${totalFail}`);
  console.log(`📊 Total Processed: ${totalSuccess + totalFail}`);
  
  console.log('\n📋 Next Steps:');
  console.log('1. Test your app: npm start');
  console.log('2. All images should now load from Cloudinary with exact filenames!');
  console.log('3. No more random strings in URLs! 🎉');
}

// Run the script
if (require.main === module) {
  uploadAllCategories().catch(console.error);
}

module.exports = { uploadImageToCloudinary, uploadDirectoryToCloudinary, uploadAllCategories };

