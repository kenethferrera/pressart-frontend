const fs = require('fs');
const path = require('path');

// Complete ImageKit configuration with all credentials
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Replace all ImageKit placeholders with actual values
  envContent = envContent.replace(
    /REACT_APP_IMAGEKIT_URL_ENDPOINT=.*/,
    'REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kenethferrera'
  );
  envContent = envContent.replace(
    /REACT_APP_IMAGEKIT_PUBLIC_KEY=.*/,
    'REACT_APP_IMAGEKIT_PUBLIC_KEY=public_Pgbdw9SBPhbhQziEukZdipK2'
  );
  envContent = envContent.replace(
    /REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=.*/,
    'REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=https://www.imagekit.io/api/v1/files/upload'
  );
} else {
  // Create new .env file
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=618315283331-bfl8dhgk6flgi3sv35q5s70e1lht77e2.apps.googleusercontent.com
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api

# ImageKit.io Configuration
REACT_APP_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/kenethferrera
REACT_APP_IMAGEKIT_PUBLIC_KEY=public_Pgbdw9SBPhbhQziEukZdipK2
REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=https://www.imagekit.io/api/v1/files/upload
`;
}

fs.writeFileSync(envPath, envContent);

console.log('🎉 ImageKit.io Configuration Complete!');
console.log('✅ URL Endpoint: https://ik.imagekit.io/kenethferrera');
console.log('✅ Public Key: public_Pgbdw9SBPhbhQziEukZdipK2');
console.log('✅ Authentication Endpoint: https://www.imagekit.io/api/v1/files/upload');

console.log('\n🚀 Next Steps:');
console.log('1. Go to Media Library in ImageKit');
console.log('2. Create these folders:');
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

console.log('\n3. Start uploading your images to appropriate folders');
console.log('4. Update Vercel environment variables with the same values');
console.log('5. Deploy and test!');

console.log('\n📝 Your ImageKit URLs will be:');
console.log('https://ik.imagekit.io/kenethferrera/paintings/01-mona-lisa?tr=w-600,q-80,f-auto');
console.log('https://ik.imagekit.io/kenethferrera/psicodelicas/kit-psicodelico-01?tr=w-600,q-80,f-auto');

console.log('\n🎯 Ready to migrate your images!');

