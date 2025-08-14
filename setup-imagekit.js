const fs = require('fs');
const path = require('path');

// Update frontend .env file with ImageKit.io configuration
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Remove Cloudinary config and add ImageKit config
  envContent = envContent.replace(/# Cloudinary Configuration[\s\S]*?REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images\n/g, '');
  
  // Add ImageKit configuration
  if (!envContent.includes('REACT_APP_IMAGEKIT_URL_ENDPOINT')) {
    envContent += '\n# ImageKit.io Configuration\n';
    envContent += 'REACT_APP_IMAGEKIT_URL_ENDPOINT=your-url-endpoint-here\n';
    envContent += 'REACT_APP_IMAGEKIT_PUBLIC_KEY=your-public-key-here\n';
    envContent += 'REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=your-auth-endpoint-here\n';
  }
} else {
  // Create new .env file
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=618315283331-bfl8dhgk6flgi3sv35q5s70e1lht77e2.apps.googleusercontent.com
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api

# ImageKit.io Configuration
REACT_APP_IMAGEKIT_URL_ENDPOINT=your-url-endpoint-here
REACT_APP_IMAGEKIT_PUBLIC_KEY=your-public-key-here
REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=your-auth-endpoint-here
`;
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Switched to ImageKit.io configuration!');
console.log('📝 ImageKit.io Benefits:');
console.log('   - 25MB file size limit (vs 10MB Cloudinary)');
console.log('   - 20GB free storage');
console.log('   - 20GB bandwidth/month');
console.log('   - Global CDN');
console.log('   - Automatic optimization');
console.log('   - AVIF/WebP support');

console.log('\n🔧 Next Steps:');
console.log('1. Go to https://imagekit.io/');
console.log('2. Sign up for free account');
console.log('3. Go to Dashboard → Developer Options');
console.log('4. Copy your credentials:');
console.log('   - URL Endpoint');
console.log('   - Public Key');
console.log('   - Authentication Endpoint');

console.log('\n5. Replace "your-url-endpoint-here" etc. in .env file');
console.log('6. Create folders in ImageKit Media Library:');
console.log('   - paintings/');
console.log('   - psicodelicas/');
console.log('   - space/');
console.log('   - digital-illustration/');
console.log('   - religion/');
console.log('   - motivational/');
console.log('   - esoteric/');
console.log('   - doodle-art/');
console.log('   - collage/');
console.log('   - dc-heroes/');
console.log('   - league-of-legends/');
console.log('   - mortal-kombat/');
console.log('   - among-us/');

console.log('\n🚀 ImageKit URL format will be:');
console.log('https://ik.imagekit.io/your-endpoint/paintings/image-name?tr=w-600,q-80,f-auto');

