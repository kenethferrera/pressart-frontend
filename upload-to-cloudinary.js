const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload an image to Cloudinary with exact filename (no random strings)
 * @param {string} localFilePath - Path to the local image file
 * @param {string} folder - Optional folder name in Cloudinary (default: '')
 * @returns {Promise<Object>} - Returns the upload result with secure URL
 */
async function uploadImageToCloudinary(localFilePath, folder = '') {
  try {
    // Check if file exists
    if (!fs.existsSync(localFilePath)) {
      throw new Error(`File not found: ${localFilePath}`);
    }

    // Get the filename without extension
    const filename = path.basename(localFilePath, path.extname(localFilePath));
    
    // Create public_id with folder if specified
    const publicId = folder ? `${folder}/${filename}` : filename;

    console.log(`📤 Uploading: ${localFilePath}`);
    console.log(`📁 Public ID: ${publicId}`);

    // Upload to Cloudinary with exact filename
    const result = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId,
      overwrite: true, // Overwrite if file with same name exists
      resource_type: 'auto', // Auto-detect resource type
      use_filename: false, // Don't use filename as public_id
      unique_filename: false, // Don't add unique suffixes
      folder: folder || undefined // Set folder if specified
    });

    console.log(`✅ Upload successful!`);
    console.log(`🔗 Secure URL: ${result.secure_url}`);
    console.log(`📄 Public ID: ${result.public_id}`);
    console.log(`📏 Size: ${result.bytes} bytes`);
    console.log('---');

    return {
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
      bytes: result.bytes,
      format: result.format,
      width: result.width,
      height: result.height
    };

  } catch (error) {
    console.error(`❌ Upload failed: ${error.message}`);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Upload multiple images from a directory
 * @param {string} directoryPath - Path to directory containing images
 * @param {string} folder - Optional folder name in Cloudinary
 * @param {Array<string>} extensions - Array of file extensions to upload (default: ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'])
 * @returns {Promise<Array>} - Returns array of upload results
 */
async function uploadDirectoryToCloudinary(directoryPath, folder = '', extensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif']) {
  try {
    // Check if directory exists
    if (!fs.existsSync(directoryPath)) {
      throw new Error(`Directory not found: ${directoryPath}`);
    }

    console.log(`📁 Scanning directory: ${directoryPath}`);
    console.log(`📂 Cloudinary folder: ${folder || 'root'}`);
    console.log(`📄 Extensions: ${extensions.join(', ')}`);

    // Get all files in directory
    const files = fs.readdirSync(directoryPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return extensions.includes(ext);
    });

    console.log(`🔍 Found ${imageFiles.length} image files`);

    const results = [];
    
    // Upload each image
    for (const file of imageFiles) {
      const filePath = path.join(directoryPath, file);
      const result = await uploadImageToCloudinary(filePath, folder);
      results.push({
        file,
        ...result
      });
    }

    // Summary
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    
    console.log(`\n📊 Upload Summary:`);
    console.log(`✅ Successful: ${successful}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📁 Total: ${results.length}`);

    return results;

  } catch (error) {
    console.error(`❌ Directory upload failed: ${error.message}`);
    return [];
  }
}

// Example usage
async function exampleUsage() {
  console.log('🚀 Cloudinary Upload Examples');
  console.log('=============================\n');

  // Example 1: Upload single file
  console.log('📤 Example 1: Upload single file');
  const result1 = await uploadImageToCloudinary('./images/1_Mappel.jpg', 'motivational');
  
  // Example 2: Upload multiple files from directory
  console.log('\n📤 Example 2: Upload directory');
  const results = await uploadDirectoryToCloudinary('./images', 'motivational');
  
  // Example 3: Upload with specific extensions
  console.log('\n📤 Example 3: Upload only AVIF files');
  const avifResults = await uploadDirectoryToCloudinary('./images', 'motivational', ['.avif']);
}

// Export functions for use in other files
module.exports = {
  uploadImageToCloudinary,
  uploadDirectoryToCloudinary
};

// Run example if this file is executed directly
if (require.main === module) {
  exampleUsage().catch(console.error);
}
