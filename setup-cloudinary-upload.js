const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Cloudinary Upload Environment');
console.log('==========================================\n');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the digital-art-store directory.');
  process.exit(1);
}

// Install cloudinary package if not already installed
console.log('📦 Installing cloudinary package...');
try {
  execSync('npm install cloudinary', { stdio: 'inherit' });
  console.log('✅ cloudinary package installed successfully');
} catch (error) {
  console.log('ℹ️  cloudinary package already installed or installation failed');
}

// Create or update .env file
const envPath = '.env';
const envContent = `# Cloudinary Configuration
# Get these from your Cloudinary Dashboard: https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here

# Frontend API Configuration
REACT_APP_API_BASE_URL=http://localhost:10000/api
`;

if (fs.existsSync(envPath)) {
  console.log('📝 Updating existing .env file...');
  let currentEnv = fs.readFileSync(envPath, 'utf8');
  
  // Add Cloudinary config if not present
  if (!currentEnv.includes('CLOUDINARY_CLOUD_NAME')) {
    currentEnv += '\n# Cloudinary Configuration\n';
    currentEnv += 'CLOUDINARY_CLOUD_NAME=your_cloud_name_here\n';
    currentEnv += 'CLOUDINARY_API_KEY=your_api_key_here\n';
    currentEnv += 'CLOUDINARY_API_SECRET=your_api_secret_here\n';
  }
  
  fs.writeFileSync(envPath, currentEnv);
} else {
  console.log('📝 Creating new .env file...');
  fs.writeFileSync(envPath, envContent);
}

console.log('✅ .env file ready');

// Check for category directories
const parentDir = '../';
if (fs.existsSync(parentDir)) {
  const allDirs = fs.readdirSync(parentDir).filter(item => {
    const fullPath = path.join(parentDir, item);
    return fs.statSync(fullPath).isDirectory() && item.includes('_2025-08-13_');
  });
  
  console.log(`\n📁 Found ${allDirs.length} category directories:`);
  allDirs.forEach(dir => {
    const categoryName = dir.split('_2025-08-13_')[0];
    console.log(`  - ${categoryName}`);
  });
  
  if (allDirs.length === 0) {
    console.log('\n⚠️  No category directories found. Make sure your downloaded folders are in the parent directory.');
  }
} else {
  console.log('\n⚠️  Parent directory not found. Make sure your category folders are in the correct location.');
}

console.log('\n🎉 Setup Complete!');
console.log('\n📋 Next Steps:');
console.log('1. Edit .env file and add your Cloudinary credentials:');
console.log('   - CLOUDINARY_CLOUD_NAME (from your Cloudinary dashboard)');
console.log('   - CLOUDINARY_API_KEY (from your Cloudinary dashboard)');
console.log('   - CLOUDINARY_API_SECRET (from your Cloudinary dashboard)');
console.log('\n2. Run the upload script:');
console.log('   node upload-all-categories-to-cloudinary.js');
console.log('\n3. The script will upload all images with exact filenames (no random strings)!');
console.log('\n4. After upload, test your app: npm start');
