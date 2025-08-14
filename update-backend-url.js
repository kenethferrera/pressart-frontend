const fs = require('fs');
const path = require('path');

// Read the current .env file
const envPath = path.join(__dirname, '.env');
let envContent = fs.readFileSync(envPath, 'utf8');

// Update the backend URL for production
envContent = envContent.replace(
  /REACT_APP_API_BASE_URL=.*/,
  'REACT_APP_API_BASE_URL=https://pressart-backend.onrender.com/api'
);

// Write the updated content back
fs.writeFileSync(envPath, envContent);

console.log('✅ Backend URL updated to production: https://pressart-backend.onrender.com/api');
console.log('📝 .env file updated successfully!');
