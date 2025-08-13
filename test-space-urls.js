// Test script to verify Cloudinary URLs for space images
import { generateImageKitUrl } from './src/config/categories.js';

console.log('Testing Cloudinary URLs for space images:');
console.log('==========================================');

// Test space images 1-10
for (let i = 1; i <= 10; i++) {
  const num = i.toString().padStart(3, '0');
  const imagePath = `space/SPACE_${num}`;
  const url = generateImageKitUrl(imagePath, { width: 400, height: 300, quality: 80 });
  console.log(`SPACE-${num}: ${url}`);
}

console.log('\nTest completed!');
