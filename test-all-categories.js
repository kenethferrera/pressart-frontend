// Test script to verify Cloudinary URLs for all categories
import { generateImageKitUrl } from './src/config/categories.js';

console.log('Testing Cloudinary URLs for all categories:');
console.log('===========================================');

// Test different categories
const testCases = [
  { category: 'Among Us', path: 'among-us/AMONG_01' },
  { category: 'Artes Psicodélicas', path: 'psicodelicas/KIT_PSICODELICO_01' },
  { category: 'Collage', path: 'collage/COLAGEM_01' },
  { category: 'DC Heroes', path: 'dc-heroes/HEROIS_001' },
  { category: 'Digital Illustration', path: 'digital-illustration/ID_001' },
  { category: 'Doodle Art', path: 'doodle-art/DOODLE_01' },
  { category: 'Esoteric', path: 'esoteric/ESOTERICAS_001' },
  { category: 'League of Legends', path: 'league-of-legends/LOL_01' },
  { category: 'Mortal Kombat', path: 'mortal-kombat/MORTAL_01' },
  { category: 'Motivational', path: 'motivational/FRASES_30' },
  { category: 'Religion', path: 'religion/FTH_001' },
  { category: 'Space', path: 'space/SPACE_001' }
];

testCases.forEach(test => {
  const url = generateImageKitUrl(test.path);
  console.log(`${test.category}: ${url}`);
});

console.log('\nTest completed!');
