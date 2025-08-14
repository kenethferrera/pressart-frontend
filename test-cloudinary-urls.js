const { generateImageKitUrl, generateImagePaths } = require('./src/config/categories.js');

console.log('Testing Cloudinary URL generation for paintings...');

// Test the paintings category
const paintingPaths = generateImagePaths('paintings');

console.log('\nFirst 5 painting paths:');
paintingPaths.slice(0, 5).forEach((path, index) => {
  console.log(`${index + 1}. ${path}`);
});

console.log('\nGenerated Cloudinary URLs:');
paintingPaths.slice(0, 5).forEach((path, index) => {
  const url = generateImageKitUrl(path, { width: 400, height: 300, quality: 80 });
  console.log(`${index + 1}. ${url}`);
});

