const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Frontend Environment Variables');
console.log('==========================================');

const envContent = `# Frontend Environment Variables
REACT_APP_API_BASE_URL=http://localhost:10000/api

# Google OAuth Configuration
# Get these from Google Cloud Console: https://console.cloud.google.com/
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id-here

# Cloudinary Configuration (if using Cloudinary)
REACT_APP_CLOUDINARY_CLOUD_NAME=your-cloud-name
REACT_APP_CLOUDINARY_UPLOAD_PRESET=pressart-images

# ImageKit Configuration (if using ImageKit)
REACT_APP_IMAGEKIT_URL_ENDPOINT=your-url-endpoint
REACT_APP_IMAGEKIT_PUBLIC_KEY=your-public-key
REACT_APP_IMAGEKIT_AUTHENTICATION_ENDPOINT=your-auth-endpoint
`;

const envPath = path.join(__dirname, '.env');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📁 Location:', envPath);
  console.log('');
  console.log('⚠️  IMPORTANT:');
  console.log('1. Get your Google Client ID from: https://console.cloud.google.com/');
  console.log('   - Go to APIs & Services > Credentials');
  console.log('   - Create or use an existing OAuth 2.0 Client ID');
  console.log('   - Add http://localhost:3000 to Authorized JavaScript origins');
  console.log('   - Add http://localhost:3000 to Authorized redirect URIs');
  console.log('');
  console.log('2. Update REACT_APP_GOOGLE_CLIENT_ID with your actual client ID');
  console.log('');
  console.log('3. Restart the frontend server after updating:');
  console.log('   npm start');
  console.log('');
  console.log('🔗 Google Cloud Console: https://console.cloud.google.com/');
} catch (error) {
  console.error('❌ Error creating .env file:', error.message);
}
