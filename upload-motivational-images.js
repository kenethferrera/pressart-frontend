const { uploadImageToCloudinary } = require('./upload-to-cloudinary.js');
const fs = require('fs');
const path = require('path');

/**
 * Upload motivational images with correct naming pattern
 * This script uploads images with the exact names that the code expects
 */
async function uploadMotivationalImages() {
  console.log('🎯 Uploading Motivational Images to Cloudinary');
  console.log('==============================================\n');

  const imagesDir = './images';
  
  // Check if images directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Images directory not found: ${imagesDir}`);
    console.log('📁 Please create the images directory and place your motivational images there.');
    return;
  }

  // Get all image files
  const files = fs.readdirSync(imagesDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
  });

  if (imageFiles.length === 0) {
    console.log('❌ No image files found in images directory');
    console.log('📁 Please add some image files to the images/ directory');
    return;
  }

  console.log(`🔍 Found ${imageFiles.length} image files`);
  console.log('📄 Files:', imageFiles.join(', '));
  console.log('\n📤 Starting upload...\n');

  const results = [];
  let successCount = 0;
  let failCount = 0;

  // Upload each image
  for (const file of imageFiles) {
    const filePath = path.join(imagesDir, file);
    
    try {
      // Get filename without extension
      const filename = path.basename(file, path.extname(file));
      
      // Determine the correct public_id based on the filename
      let publicId;
      let folder = 'motivational';
      
      // Check if it's a FRASES file (1-50) or MOTIVATIONAL file (51+)
      if (filename.toLowerCase().includes('frases')) {
        // Extract number from FRASES filename
        const match = filename.match(/frases[_-]?(\d+)/i);
        if (match) {
          const number = parseInt(match[1]);
          if (number <= 50) {
            publicId = `FRASES_${number}`;
          } else {
            console.log(`⚠️  FRASES file with number > 50: ${filename}`);
            publicId = filename;
          }
        } else {
          publicId = filename;
        }
      } else if (filename.toLowerCase().includes('motivational')) {
        // Extract number from MOTIVATIONAL filename
        const match = filename.match(/motivational[_-]?(\d+)/i);
        if (match) {
          const number = parseInt(match[1]);
          publicId = `MOTIVATIONAL_${number.toString().padStart(3, '0')}`;
        } else {
          publicId = filename;
        }
      } else {
        // Use filename as is
        publicId = filename;
      }

      console.log(`📤 Uploading: ${file}`);
      console.log(`📄 Public ID: ${publicId}`);
      
      const result = await uploadImageToCloudinary(filePath, folder);
      
      if (result.success) {
        successCount++;
        console.log(`✅ Success: ${file} → ${result.public_id}`);
      } else {
        failCount++;
        console.log(`❌ Failed: ${file} - ${result.error}`);
      }
      
      results.push({
        file,
        publicId,
        ...result
      });
      
    } catch (error) {
      failCount++;
      console.log(`❌ Error uploading ${file}: ${error.message}`);
      results.push({
        file,
        success: false,
        error: error.message
      });
    }
    
    console.log('---');
  }

  // Summary
  console.log('\n📊 Upload Summary');
  console.log('==================');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Total: ${imageFiles.length}`);

  if (successCount > 0) {
    console.log('\n🎉 Upload completed successfully!');
    console.log('📋 Next steps:');
    console.log('1. Test your app: npm start');
    console.log('2. Go to the motivational category');
    console.log('3. All images should now load correctly!');
  }

  return results;
}

// Run the upload
if (require.main === module) {
  uploadMotivationalImages().catch(console.error);
}

module.exports = { uploadMotivationalImages };

