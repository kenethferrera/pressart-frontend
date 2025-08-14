// Test script to verify Cloudinary URLs for motivational images
import { generateImageKitUrl } from './src/config/categories.js';

console.log('Testing Cloudinary URLs for motivational images:');
console.log('===============================================');

// Test motivational images 23-30 (the problematic ones)
for (let i = 23; i <= 30; i++) {
  const imagePath = `motivational/FRASES_${i}`;
  const url = generateImageKitUrl(imagePath, { width: 400, height: 300, quality: 80 });
  console.log(`MOTIVATIONAL-${i}: ${url}`);
}

console.log('\nTesting motivational images 81-90:');
console.log('===================================');

// Test motivational images 81-90 (the ones showing in the screenshot)
for (let i = 81; i <= 90; i++) {
  const imagePath = `motivational/MOTIVATIONAL_${i.toString().padStart(3, '0')}`;
  const url = generateImageKitUrl(imagePath, { width: 400, height: 300, quality: 80 });
  console.log(`MOTIVATIONAL-${i}: ${url}`);
}

console.log('\nTest completed!');

