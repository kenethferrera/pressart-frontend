const fs = require('fs');
const path = require('path');

// Update frontend .env file with Cloudinary configuration
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if Cloudinary variables already exist
  if (!envContent.includes('REACT_APP_CLOUDINARY_CLOUD_NAME')) {
    envContent += '\n# Cloudinary Configuration\n';
    envContent += 'REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name-here\n';
    envContent += 'REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images\n';
  }
} else {
  // Create new .env file
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=618315283331-bfl8dhgk6flgi3sv35q5s70e1lht77e2.apps.googleusercontent.com
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api

# Cloudinary Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name-here
REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images
`;
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated frontend .env file with Cloudinary configuration');
console.log('📝 Frontend .env contents:');
console.log(envContent);

console.log('\n🔧 Next Steps:');
console.log('1. Replace "your-cloud-name-here" with your actual Cloudinary cloud name');
console.log('2. Go to Vercel Dashboard → Settings → Environment Variables');
console.log('3. Add the same Cloudinary variables there');
console.log('4. Upload your images to Cloudinary Media Library');
console.log('5. Update your image URLs to use Cloudinary format');

console.log('\n📁 Cloudinary Folder Structure:');
console.log('- pressart/paintings/');
console.log('- pressart/psicodelicas/');
console.log('- pressart/space/');
console.log('- pressart/digital-illustration/');
console.log('- pressart/religion/');
console.log('- pressart/motivational/');
console.log('- pressart/esoteric/');
console.log('- pressart/doodle-art/');
console.log('- pressart/collage/');
console.log('- pressart/dc-heroes/');
console.log('- pressart/league-of-legends/');
console.log('- pressart/mortal-kombat/');
console.log('- pressart/among-us/');
