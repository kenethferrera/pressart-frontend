const fs = require('fs');
const path = require('path');

/**
 * Rename images by removing random strings from filenames
 * Example: AMONG_60_cnbam8.avif → AMONG_60.avif
 */
function renameImagesInDirectory(directoryPath) {
  console.log(`🔄 Renaming images in: ${directoryPath}`);
  console.log('=====================================\n');

  if (!fs.existsSync(directoryPath)) {
    console.error(`❌ Directory not found: ${directoryPath}`);
    return;
  }

  const files = fs.readdirSync(directoryPath);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
  });

  console.log(`🔍 Found ${imageFiles.length} image files`);
  console.log('📄 Files:', imageFiles.join(', '));
  console.log('\n🔄 Starting rename process...\n');

  let successCount = 0;
  let failCount = 0;

  imageFiles.forEach(file => {
    try {
      // Get file extension
      const ext = path.extname(file);
      const nameWithoutExt = path.basename(file, ext);
      
      // Remove random string (everything after the last underscore)
      const parts = nameWithoutExt.split('_');
      if (parts.length >= 2) {
        // Keep everything except the last part (random string)
        const newNameWithoutExt = parts.slice(0, -1).join('_');
        const newFileName = newNameWithoutExt + ext;
        
        const oldPath = path.join(directoryPath, file);
        const newPath = path.join(directoryPath, newFileName);
        
        // Check if new filename already exists
        if (fs.existsSync(newPath)) {
          console.log(`⚠️  Skipped: ${file} → ${newFileName} (already exists)`);
          return;
        }
        
        // Rename the file
        fs.renameSync(oldPath, newPath);
        console.log(`✅ Renamed: ${file} → ${newFileName}`);
        successCount++;
      } else {
        console.log(`ℹ️  No change needed: ${file}`);
      }
    } catch (error) {
      console.log(`❌ Error renaming ${file}: ${error.message}`);
      failCount++;
    }
  });

  console.log('\n📊 Rename Summary');
  console.log('==================');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Total: ${imageFiles.length}`);

  if (successCount > 0) {
    console.log('\n🎉 Rename completed successfully!');
    console.log('📋 Next steps:');
    console.log('1. Copy the renamed images to public/Images/');
    console.log('2. Set USE_LOCAL_IMAGES = true in categories.js');
    console.log('3. Test your app: npm start');
  }
}

/**
 * Copy renamed images to the correct folder structure
 */
function copyImagesToPublicImages(sourceDir, categoryName) {
  console.log(`📁 Copying ${categoryName} images to public/Images/`);
  console.log('===============================================\n');

  const targetDir = path.join('public', 'Images', categoryName);
  
  // Create target directory if it doesn't exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    console.log(`📁 Created directory: ${targetDir}`);
  }

  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Source directory not found: ${sourceDir}`);
    return;
  }

  const files = fs.readdirSync(sourceDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif'].includes(ext);
  });

  console.log(`🔍 Found ${imageFiles.length} image files to copy`);
  console.log('📄 Files:', imageFiles.join(', '));
  console.log('\n📋 Starting copy process...\n');

  let successCount = 0;
  let failCount = 0;

  imageFiles.forEach(file => {
    try {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);
      
      // Copy the file
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`✅ Copied: ${file}`);
      successCount++;
    } catch (error) {
      console.log(`❌ Error copying ${file}: ${error.message}`);
      failCount++;
    }
  });

  console.log('\n📊 Copy Summary');
  console.log('================');
  console.log(`✅ Successful: ${successCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📁 Total: ${imageFiles.length}`);

  if (successCount > 0) {
    console.log('\n🎉 Copy completed successfully!');
    console.log(`📁 Images are now in: ${targetDir}`);
  }
}

// Main execution
async function main() {
  console.log('🚀 Image Rename and Copy Tool');
  console.log('=============================\n');

  // Get all directories in the parent folder that match our pattern
  const parentDir = '../';
  const allDirs = fs.readdirSync(parentDir).filter(item => {
    const fullPath = path.join(parentDir, item);
    return fs.statSync(fullPath).isDirectory() && item.includes('_2025-08-13_');
  });

  console.log('🔍 Found directories:', allDirs);

  // Map directory names to category names
  const categoryMapping = {
    'among-us': 'among-us',

    'collage': 'collage',
    'dc-heroes': 'dc-heroes',
    'digital-illustration': 'digital-illustration',
    'doodle-art': 'doodle-art',
    'esoteric': 'esoteric',
    'league-of-legends': 'league-of-legends',
    'mortal-kombat': 'mortal-kombat',
    'motivational': 'motivational',
    'paintings': 'paintings',
    'religion': 'religion',
    'space': 'space'
  };

  let processedCount = 0;

  for (const dir of allDirs) {
    // Extract category name from directory name
    const categoryName = dir.split('_2025-08-13_')[0];
    
    if (categoryMapping[categoryName]) {
      const sourceDir = path.join(parentDir, dir);
      const targetCategoryName = categoryMapping[categoryName];
      
      console.log(`\n🎯 Processing ${targetCategoryName.toUpperCase()} category`);
      console.log(`📁 Source: ${sourceDir}`);
      console.log('='.repeat(50));
      
      // First rename the images
      renameImagesInDirectory(sourceDir);
      
      // Then copy them to public/Images/
      copyImagesToPublicImages(sourceDir, targetCategoryName);
      
      processedCount++;
    } else {
      console.log(`⚠️  Unknown category: ${categoryName} (${dir})`);
    }
  }

  console.log('\n🎉 All categories processed!');
  console.log(`📊 Processed ${processedCount} categories`);
  console.log('\n📋 Final Steps:');
  console.log('1. Set USE_LOCAL_IMAGES = true in categories.js');
  console.log('2. Test your app: npm start');
  console.log('3. All images should now load correctly!');
}

// Run the script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { renameImagesInDirectory, copyImagesToPublicImages };
