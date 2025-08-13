const fs = require('fs');
const path = require('path');

// Update frontend .env file with Cloudinary configuration
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Remove old ImageKit config and add Cloudinary config
  envContent = envContent.replace(/# ImageKit\.io Configuration[\s\S]*?REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=.*\n/g, '');
  
  // Add Cloudinary configuration
  if (!envContent.includes('REACT_APP_CLOUDINARY_CLOUD_NAME')) {
    envContent += '\n# Cloudinary Configuration\n';
    envContent += 'REACT_APP_CLOUDINARY_CLOUD_NAME=djdbzgoxk\n';
    envContent += 'REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images\n';
  }
} else {
  // Create new .env file
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=618315283331-bfl8dhgk6flgi3sv35q5s70e1lht77e2.apps.googleusercontent.com
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api

# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=djdbzgoxk
REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images
`;
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated frontend .env file with Cloudinary configuration!');
console.log('📝 Frontend .env contents:');
console.log(envContent);
console.log('\n🔗 Frontend will now use Cloudinary for image hosting');
console.log('☁️ Cloudinary Cloud Name: djdbzgoxk');
console.log('📁 Upload Preset: pressart-images');

console.log('\n🚀 Next Steps:');
console.log('1. Restart your development server: npm start');
console.log('2. Test the application - all images should now load from Cloudinary');
console.log('3. Deploy to Vercel with the updated environment variables');

console.log('\n📋 Cloudinary Benefits:');
console.log('   - 25GB free storage');
console.log('   - 25GB bandwidth/month');
console.log('   - Global CDN');
console.log('   - Automatic optimization');
console.log('   - AVIF/WebP support');
console.log('   - 10MB file size limit (increased from previous limit)');
