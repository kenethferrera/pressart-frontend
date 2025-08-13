// Category definitions for the digital art store
export const categories = [
  {
    id: 'among-us',
    name: 'Among Us',
    description: 'Creative Among Us themed digital artworks',
    path: '/Images/Among Us/',
    previewImage: '/Images/Among Us/AMONG 01.avif',
    itemCount: 60
  },
  {
    id: 'artes-psicodelicas',
    name: 'Artes Psicodélicas',
    description: 'Psychedelic art collections with vibrant patterns',
    path: '/Images/Artes Psicodélicas/',
    previewImage: '/Images/Artes Psicodélicas/Kit Psicodélico 1.avif',
    itemCount: 60
  },
  {
    id: 'collage',
    name: 'Collage',
    description: 'Mixed media collage artworks',
    path: '/Images/Collage/',
    previewImage: '/Images/Collage/COLAGEM-01.avif',
    itemCount: 41
  },
  {
    id: 'dc-heroes',
    name: 'DC Heroes',
    description: 'DC Comics superhero digital art collection',
    path: '/Images/DC Heroes/',
    previewImage: '/Images/DC Heroes/HEROIS 001.avif',
    itemCount: 99
  },
  {
    id: 'digital-illustration',
    name: 'Digital Illustration',
    description: 'Modern digital illustrations and artwork',
    path: '/Images/Digital Illustration/',
    previewImage: '/Images/Digital Illustration/ID_001.avif',
    itemCount: 155
  },
  {
    id: 'doodle-art',
    name: 'Doodle Art',
    description: 'Hand-drawn doodle style artwork',
    path: '/Images/Doodle Art/',
    previewImage: '/Images/Doodle Art/DOODLE_01.avif',
    itemCount: 42
  },
  {
    id: 'esoteric',
    name: 'Esoteric',
    description: 'Mystical and esoteric themed artwork',
    path: '/Images/Esoteric/',
    previewImage: '/Images/Esoteric/ESOTERICAS_001.avif',
    itemCount: 196
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    description: 'League of Legends game-inspired art',
    path: '/Images/League of Legends/',
    previewImage: '/Images/League of Legends/LOL 01.avif',
    itemCount: 58
  },
  {
    id: 'mortal-kombat',
    name: 'Mortal Kombat',
    description: 'Fighting game themed digital art',
    path: '/Images/Mortal Kombat/',
    previewImage: '/Images/Mortal Kombat/MORTAL 01.avif',
    itemCount: 41
  },
  {
    id: 'motivational',
    name: 'Motivational',
    description: 'Inspirational quotes and motivational artwork',
    path: '/Images/Motavational/',
    previewImage: '/Images/Motavational/FRASES 30.avif',
    itemCount: 115
  },
  {
    id: 'paintings',
    name: 'Paintings',
    description: 'Classic and modern painting reproductions',
    path: '/Images/Paintings/',
    previewImage: '/Images/Paintings/01. Mona Lisa by Leonardo Da Vinci.avif',
    itemCount: 50
  },
  {
    id: 'religion',
    name: 'Religion',
    description: 'Religious and spiritual themed artwork',
    path: '/Images/Religion/',
    previewImage: '/Images/Religion/FTH_001.avif',
    itemCount: 103
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Cosmic and space-themed digital art',
    path: '/Images/Space/',
    previewImage: '/Images/Space/SPACE_001.avif',
    itemCount: 134
  },
  {
    id: 'custom-decor',
    name: 'Custom Decor',
    description: 'Request custom artwork for your space',
    path: '/custom-decor',
    previewImage: '/custom-decor-icon.svg',
    isCustom: true
  }
];

// Helper function to get category by ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Helper function to generate image paths for a category
export const generateImagePaths = (category) => {
  if (category.isCustom) return [];
  
  const images = [];
  
  // Special handling for different naming patterns
  switch (category.id) {
    case 'among-us':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}AMONG ${num}.avif`);
      }
      break;
      
    case 'artes-psicodelicas':
      // Generate images in the exact order they appear in the folder
      // First all main kit files, then all parte files
      const allPsychedelicFiles = [];
      
      // Add main kit files first (Kit Psicodélico 1.avif, Kit Psicodélico 2.avif, etc.)
      for (let kit = 1; kit <= 18; kit++) {
        allPsychedelicFiles.push(`${category.path}Kit Psicodélico ${kit}.avif`);
      }
      
      // Then add all parte files in order
      const partCounts = {
        1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 6: 3, 7: 3, 8: 2, 9: 2,
        10: 3, 11: 3, 12: 3, 13: 3, 14: 3, 15: 3, 16: 3, 17: 4, 18: 2
      };
      
      for (let kit = 1; kit <= 18; kit++) {
        for (let part = 1; part <= (partCounts[kit] || 3); part++) {
          allPsychedelicFiles.push(`${category.path}Kit Psicodélico ${kit} - Parte ${part}.avif`);
        }
      }
      
      // Sort to match actual folder order (alphabetical)
      allPsychedelicFiles.sort((a, b) => {
        const fileA = a.split('/').pop();
        const fileB = b.split('/').pop();
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' });
      });
      
      images.push(...allPsychedelicFiles);
      break;
      
    case 'collage':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}COLAGEM-${num}.avif`);
      }
      break;
      
    case 'dc-heroes':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}HEROIS ${num}.avif`);
      }
      break;
      
    case 'digital-illustration':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}ID_${num}.avif`);
      }
      break;
      
    case 'doodle-art':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}DOODLE_${num}.avif`);
      }
      break;
      
    case 'esoteric':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}ESOTERICAS_${num}.avif`);
      }
      break;
      
    case 'league-of-legends':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}LOL ${num}.avif`);
      }
      break;
      
    case 'mortal-kombat':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}MORTAL ${num}.avif`);
      }
      break;
      
    case 'motivational':
      // Generate all motivational images and sort them properly
      const motivationalImages = [];
      for (let i = 30; i <= 144; i++) {
        motivationalImages.push(`${category.path}FRASES ${i}.avif`);
      }
      // Sort numerically to match folder order
      motivationalImages.sort((a, b) => {
        const numA = parseInt(a.match(/FRASES (\d+)/)[1]);
        const numB = parseInt(b.match(/FRASES (\d+)/)[1]);
        return numA - numB;
      });
      images.push(...motivationalImages);
      break;
      
    case 'paintings':
      // Use actual filenames from the directory listing
      const paintingFiles = [
        '01. Mona Lisa by Leonardo Da Vinci.avif',
        '02. Lady with an Ermine by Leonardo da Vinci.avif',
        '03. Girl with a Pearl Earring by Johannes Vermeer.avif'
        // Add more as needed based on actual files
      ];
      paintingFiles.forEach(file => {
        images.push(`${category.path}${file}`);
      });
      break;
      
    case 'religion':
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}FTH_${num}.avif`);
      }
      break;
      
    case 'space':
      // Generate all space images and sort them to match folder order
      const spaceImages = [];
      // Add the special file
      spaceImages.push(`${category.path}536A.avif`);
      // Add numbered space files
      for (let i = 1; i <= category.itemCount - 1; i++) {
        const num = i.toString().padStart(3, '0');
        spaceImages.push(`${category.path}SPACE_${num}.avif`);
      }
      // Sort to match actual folder order (alphabetical)
      spaceImages.sort((a, b) => {
        const fileA = a.split('/').pop();
        const fileB = b.split('/').pop();
        return fileA.localeCompare(fileB, undefined, { numeric: true, sensitivity: 'base' });
      });
      images.push(...spaceImages);
      break;
      
    default:
      // Generic pattern
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}${category.name.toUpperCase()}_${num}.avif`);
      }
  }
  
  return images;
};

// Helper function to generate item code from filename
export const generateItemCode = (filename, categoryId) => {
  // Get the category info to determine the numbering system
  const category = getCategoryById(categoryId);
  if (!category) return `${categoryId.toUpperCase()}-001`;
  
  // Create simplified category prefixes
  const categoryPrefixes = {
    'among-us': 'AMONG',
    'artes-psicodelicas': 'PSICODELICAS',
    'collage': 'COLLAGE',
    'dc-heroes': 'HEROES',
    'digital-illustration': 'DIGITAL',
    'doodle-art': 'DOODLE',
    'esoteric': 'ESOTERIC',
    'league-of-legends': 'LOL',
    'mortal-kombat': 'MORTAL',
    'motivational': 'MOTIVATIONAL',
    'paintings': 'PAINTINGS',
    'religion': 'RELIGION',
    'space': 'SPACE'
  };
  
  const prefix = categoryPrefixes[categoryId] || categoryId.toUpperCase();
  
  // Generate images for this category to get the index
  const categoryImages = generateImagePaths(category);
  const imageIndex = categoryImages.findIndex(img => img === filename);
  
  if (imageIndex === -1) {
    // Fallback: try to extract number from filename
    const numberMatch = filename.match(/(\d+)/);
    const number = numberMatch ? parseInt(numberMatch[1]) : 1;
    return `${prefix}-${number.toString().padStart(2, '0')}`;
  }
  
  // Use the index + 1 for the item number
  const itemNumber = (imageIndex + 1).toString().padStart(2, '0');
  return `${prefix}-${itemNumber}`;
};

export default categories;
