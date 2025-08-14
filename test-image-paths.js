// Test script to verify image path conversions
console.log('🧪 Testing Image Path Conversions');
console.log('================================');

// Test the path conversion logic
const testPaths = [
  'paintings/01-mona-lisa-by-leonardo-da-vinci',
  'paintings/32-le-dejeuner-sur-lherbe-by-edouard-manet',
  'psicodelicas/kit-psicodelico-64',
  'psicodelicas/kit-psicodelico-67',
  'motivational/frases-22',
  'motivational/frases-23',
  'space/space-001',
  'dc-heroes/herois-001',
  'among-us/among-01',
  'digital-illustration/id-001',
  'religion/fth-001',
  'esoteric/esotericas-001',
  'doodle-art/doodle-01',
  'collage/colagem-01',
  'league-of-legends/lol-01',
  'mortal-kombat/mortal-01'
];

console.log('\n📝 Testing Path Conversions:');
testPaths.forEach(imagePath => {
  // Simulate the conversion logic
  let localPath = imagePath;
  
  if (imagePath.startsWith('paintings/')) {
    const filename = imagePath.replace('paintings/', '');
    const originalName = filename
      .replace(/(\d+)-/g, '$1. ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
    localPath = `Paintings/${originalName}`;
  } else if (imagePath.startsWith('psicodelicas/')) {
    const number = imagePath.replace('psicodelicas/kit-psicodelico-', '');
    localPath = `Artes Psicodélicas/Kit Psicodélico ${number}`;
  } else if (imagePath.startsWith('space/')) {
    const number = imagePath.replace('space/space-', '').padStart(3, '0');
    localPath = `Space/SPACE_${number}`;
  } else if (imagePath.startsWith('dc-heroes/')) {
    const number = imagePath.replace('dc-heroes/herois-', '').padStart(3, '0');
    localPath = `DC Heroes/HEROIS_${number}`;
  } else if (imagePath.startsWith('among-us/')) {
    const number = imagePath.replace('among-us/among-', '').padStart(2, '0');
    localPath = `Among Us/among-${number}`;
  } else if (imagePath.startsWith('digital-illustration/')) {
    const number = imagePath.replace('digital-illustration/id-', '').padStart(3, '0');
    localPath = `Digital Illustration/id-${number}`;
  } else if (imagePath.startsWith('religion/')) {
    const number = imagePath.replace('religion/fth-', '').padStart(3, '0');
    localPath = `Religion/fth-${number}`;
  } else if (imagePath.startsWith('motivational/')) {
    const number = imagePath.replace('motivational/frases-', '');
    localPath = `Motivational/frases-${number}`;
  } else if (imagePath.startsWith('esoteric/')) {
    const number = imagePath.replace('esoteric/esotericas-', '').padStart(3, '0');
    localPath = `Esoteric/esotericas-${number}`;
  } else if (imagePath.startsWith('doodle-art/')) {
    const number = imagePath.replace('doodle-art/doodle-', '').padStart(2, '0');
    localPath = `Doodle Art/doodle-${number}`;
  } else if (imagePath.startsWith('collage/')) {
    const number = imagePath.replace('collage/colagem-', '').padStart(2, '0');
    localPath = `Collage/colagem-${number}`;
  } else if (imagePath.startsWith('league-of-legends/')) {
    const number = imagePath.replace('league-of-legends/lol-', '').padStart(2, '0');
    localPath = `League of Legends/lol-${number}`;
  } else if (imagePath.startsWith('mortal-kombat/')) {
    const number = imagePath.replace('mortal-kombat/mortal-', '').padStart(2, '0');
    localPath = `Mortal Kombat/mortal-${number}`;
  }
  
  const fullPath = `/Images/${localPath}.avif`;
  console.log(`${imagePath} → ${fullPath}`);
});

console.log('\n✅ Path conversion test completed!');
console.log('🔧 If images are still not loading, check that the files exist in the /Images/ folder');
console.log('📁 Make sure your Images folder structure matches the converted paths above');

