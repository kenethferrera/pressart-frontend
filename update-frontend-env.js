const fs = require('fs');
const path = require('path');

// Update frontend .env file to use backend port 3001
const envPath = path.join(__dirname, '.env');

let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if API_BASE_URL already exists
  if (envContent.includes('REACT_APP_API_BASE_URL')) {
    // Update existing API_BASE_URL
    envContent = envContent.replace(
      /REACT_APP_API_BASE_URL=.*/,
      'REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api'
    );
  } else {
    // Add API_BASE_URL
    envContent += '\nREACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api\n';
  }
} else {
  // Create new .env file (assuming Google Client ID exists)
  envContent = `REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api
`;
}

fs.writeFileSync(envPath, envContent);

console.log('✅ Updated frontend .env file');
console.log('📝 Frontend .env contents:');
console.log(envContent);
console.log('\n🔗 Frontend will now connect to backend at: https://pressart-backend.onrender.com/api');

// Instructions for Google OAuth
console.log('\n🔧 Google OAuth Credentials Update Required:');
console.log('1. Go to: https://console.cloud.google.com/');
console.log('2. Navigate to: APIs & Services → Credentials');
console.log('3. Edit your OAuth 2.0 Client ID');
console.log('4. Add to "Authorized JavaScript origins":');
console.log('   - http://localhost:3000 (frontend)');
console.log('   - http://localhost:3001 (backend)');
console.log('5. Save the changes');

console.log('\n🚀 Now restart both servers:');
console.log('Backend: cd ../pressart-backend && npm run dev');
console.log('Frontend: npm start');

