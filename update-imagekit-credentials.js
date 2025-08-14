const fs = require('fs');
const path = require('path');

// Update frontend .env file with actual ImageKit credentials
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace placeholder with actual URL endpoint
  envContent = envContent.replace(
    /REACT_APP_IMAGEKIT_URL_ENDPOINT=your-url-endpoint-here/,
    'REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kenethferrera'
  );
} else {
  // Create new .env file
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=618315283331-bfl8dhgk6flgi3sv35q5s70e1lht77e2.apps.googleusercontent.com
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api

# ImageKit.io Configuration
REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kenethferrera
REACT_APP_IMAGEKIT_PUBLIC_KEY=your-public-key-here
REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=your-auth-endpoint-here
`;
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated ImageKit configuration!');
console.log('📝 Your URL Endpoint: https://ik.imagekit.io/kenethferrera');
console.log('📝 Still need: Public Key & Authentication Endpoint');

console.log('\n🔧 Next Steps:');
console.log('1. Go to "Developer Options" in the left sidebar');
console.log('2. Copy your Public Key (starts with "pk_")');
console.log('3. Copy your Authentication Endpoint');
console.log('4. Tell me those values so I can update the config');

console.log('\n5. Go to Media Library and create folders:');
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

console.log('\n🚀 Your ImageKit URL format will be:');
console.log('https://ik.imagekit.io/kenethferrera/paintings/image-name?tr=w-600,q-80,f-auto');

