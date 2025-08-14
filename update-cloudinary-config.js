const fs = require('fs');
const path = require('path');

// Update frontend .env file with actual Cloudinary cloud name
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace placeholder with actual cloud name
  envContent = envContent.replace(
    /REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name-here/,
    'REACT_APP_CLOUDINARY_CLOUD_NAME=djdbzgoxk'
  );
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

console.log('✅ Updated Cloudinary configuration!');
console.log('📝 Your Cloud Name: djdbzgoxk');
console.log('📝 Upload Preset: pressart-images');

console.log('\n🔧 Next Steps:');
console.log('1. Go to Cloudinary Dashboard → Settings → Upload');
console.log('2. Create Upload Preset:');
console.log('   - Name: pressart-images');
console.log('   - Signing Mode: Unsigned');
console.log('   - Folder: pressart/');
console.log('   - Save');

console.log('\n3. Go to Media Library and create folders:');
console.log('   - pressart/paintings/');
console.log('   - pressart/psicodelicas/');
console.log('   - pressart/space/');
console.log('   - pressart/digital-illustration/');
console.log('   - pressart/religion/');
console.log('   - pressart/motivational/');
console.log('   - pressart/esoteric/');
console.log('   - pressart/doodle-art/');
console.log('   - pressart/collage/');
console.log('   - pressart/dc-heroes/');
console.log('   - pressart/league-of-legends/');
console.log('   - pressart/mortal-kombat/');
console.log('   - pressart/among-us/');

console.log('\n4. Upload your images to appropriate folders');
console.log('5. Update Vercel environment variables with the same values');
console.log('6. Deploy and test!');

console.log('\n🚀 Your Cloudinary URL format will be:');
console.log('https://res.cloudinary.com/djdbzgoxk/image/upload/f_auto,q_auto,w_600/pressart/paintings/image-name');

