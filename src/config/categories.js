// Category definitions for the digital art store

// Development mode flag - set to false to use Cloudinary, true for local images
const USE_LOCAL_IMAGES = false; // Changed to false to use Cloudinary

// Helper function to get image path based on environment
const getImagePath = (imagePath) => {
  if (USE_LOCAL_IMAGES) {
    // Use local images for development
    return `/Images/${imagePath}.avif`;
  } else {
    // Use ImageKit for production
    return imagePath;
  }
};

export const categories = [
  {
    id: 'among-us',
    name: 'Among Us',
    description: 'Creative Among Us themed digital artworks',
    path: 'among-us/',
    previewImage: 'among-us/among-01',
    itemCount: 60
  },
  {
    id: 'artes-psicodelicas',
    name: 'Artes Psicodélicas',
    description: 'Psychedelic art collections with vibrant patterns',
    path: 'psicodelicas/',
    previewImage: 'psicodelicas/kit-psicodelico-01',
    itemCount: 60
  },
  {
    id: 'collage',
    name: 'Collage',
    description: 'Mixed media collage artworks',
    path: 'collage/',
    previewImage: 'collage/colagem-01',
    itemCount: 41
  },
  {
    id: 'dc-heroes',
    name: 'DC Heroes',
    description: 'DC Comics superhero digital art collection',
    path: 'dc-heroes/',
    previewImage: 'dc-heroes/herois-001',
    itemCount: 99
  },
  {
    id: 'digital-illustration',
    name: 'Digital Illustration',
    description: 'Modern digital illustrations and artwork',
    path: 'digital-illustration/',
    previewImage: 'digital-illustration/id-001',
    itemCount: 155
  },
  {
    id: 'doodle-art',
    name: 'Doodle Art',
    description: 'Hand-drawn doodle style artwork',
    path: 'doodle-art/',
    previewImage: 'doodle-art/doodle-01',
    itemCount: 42
  },
  {
    id: 'esoteric',
    name: 'Esoteric',
    description: 'Mystical and esoteric themed artwork',
    path: 'esoteric/',
    previewImage: 'esoteric/esotericas-001',
    itemCount: 196
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    description: 'League of Legends game-inspired art',
    path: 'league-of-legends/',
    previewImage: 'league-of-legends/lol-01',
    itemCount: 58
  },
  {
    id: 'mortal-kombat',
    name: 'Mortal Kombat',
    description: 'Fighting game themed digital art',
    path: 'mortal-kombat/',
    previewImage: 'mortal-kombat/mortal-01',
    itemCount: 41
  },
  {
    id: 'motivational',
    name: 'Motivational',
    description: 'Inspirational quotes and motivational artwork',
    path: 'motivational/',
    previewImage: 'motivational/frases-30',
    itemCount: 115
  },
  {
    id: 'paintings',
    name: 'Paintings',
    description: 'Classic and modern painting reproductions',
    path: 'paintings/',
    previewImage: 'paintings/01-mona-lisa-by-leonardo-da-vinci',
    itemCount: 50
  },
  {
    id: 'religion',
    name: 'Religion',
    description: 'Religious and spiritual themed artwork',
    path: 'religion/',
    previewImage: 'religion/fth-001',
    itemCount: 103
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Cosmic and space-themed digital art',
    path: 'space/',
    previewImage: 'space/space-001',
    itemCount: 60
  }
];

// Helper function to get category by ID
export const getCategoryById = (id) => {
  return categories.find(category => category.id === id);
};

// Helper function to generate item code
export const generateItemCode = (filename, categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return 'UNKNOWN-01';

  const prefix = categoryId.toUpperCase().replace('-', '');
  const numberMatch = filename.match(/(\d+)/);
  const number = numberMatch ? parseInt(numberMatch[1]) : 1;
  
  return `${prefix}-${number.toString().padStart(2, '0')}`;
};

// Helper function to generate ImageKit URL or local image path
export const generateImageKitUrl = (imagePath, options = {}) => {
  // Development mode flag - set to false to use Cloudinary, true for local images
  const USE_LOCAL_IMAGES = false; // Changed to false to use Cloudinary
  
  if (USE_LOCAL_IMAGES) {
    // Use local images for development
    return `/Images/${imagePath}.avif`;
  } else {
    // Use Cloudinary for production
    const {
      width = 'auto',
      height = 'auto',
      quality = 'auto',
      format = 'auto',
      crop = 'fill',
      gravity = 'auto'
    } = options;

    // Cloudinary configuration
    const cloudName = 'djdbzgoxk'; // Your Cloudinary cloud name
    const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
    let transformations = [];
    
    if (width !== 'auto') transformations.push(`w_${width}`);
    if (height !== 'auto') transformations.push(`h_${height}`);
    if (quality !== 'auto') transformations.push(`q_${quality}`);
    if (format !== 'auto') transformations.push(`f_${format}`);
    if (crop !== 'fill') transformations.push(`c_${crop}`);
    if (gravity !== 'auto') transformations.push(`g_${gravity}`);
    
    const transformString = transformations.length > 0 ? `/${transformations.join(',')}` : '';
    
    // For Cloudinary, we need to use just the filename as the public ID
    // Extract just the filename from the path and add .avif extension
    const publicId = imagePath.split('/').pop() + '.avif';
    
    // Return the complete Cloudinary URL without transformations first
    // Cloudinary will handle the transformations automatically
    return `${baseUrl}/${publicId}`;
  }
};

// Helper function to generate image paths for a category
export const generateImagePaths = (categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const images = [];
  
  switch (categoryId) {
    case 'paintings':
      // Generate all 50 painting files in numerical order
      for (let i = 1; i <= 50; i++) {
        const num = i.toString().padStart(2, '0');
        // Handle special cases for files with different naming patterns
        let filename;
        if (i === 1) filename = '01-mona-lisa-by-leonardo-da-vinci';
        else if (i === 2) filename = '02-lady-with-an-ermine-by-leonardo-da-vinci';
        else if (i === 3) filename = '03-girl-with-a-pearl-earring-by-johannes-vermeer';
        else if (i === 4) filename = '04-las-meninas-by-diego-velazquez';
        else if (i === 5) filename = '05-the-storm-on-the-sea-of-galilee-by-rembrandt';
        else if (i === 6) filename = '06-the-woman-with-a-parasol-by-claude-oscar-monet';
        else if (i === 7) filename = '07-dante-and-virgil-in-hell-by-william-adolphe-bouguereau';
        else if (i === 8) filename = '08-napoleon-crossing-the-alps-by-jacques-louis-david';
        else if (i === 9) filename = '09-st-george-and-the-dragon-by-raphael-raffaello';
        else if (i === 10) filename = '10-the-swing-by-jean-honore-fragonard';
        else if (i === 11) filename = '11-when-will-you-marry-by-paul-gauguin';
        else if (i === 12) filename = '12-view-of-toledo-by-el-greco';
        else if (i === 13) filename = '13-wanderer-above-the-sea-of-fog-by-caspar-david-friedrich';
        else if (i === 14) filename = '14-the-scream-by-edvard-munch';
        else if (i === 15) filename = '15-the-kiss-by-gustav-klimt';
        else if (i === 16) filename = '16-the-arnolfini-portrait-by-jan-van-eyck';
        else if (i === 17) filename = '17-american-gothic-by-grant-wood';
        else if (i === 18) filename = '18-battle-of-issus-by-albrecht-altdorfer';
        else if (i === 19) filename = '19-bacchus-by-caravaggio';
        else if (i === 20) filename = '20-la-virgen-de-los-lirios-by-willian-adolphe-bouguereau';
        else if (i === 21) filename = '21-the-starry-night-by-vincent-van-gogh';
        else if (i === 22) filename = '22-the-gulf-stream-by-winslow-homer';
        else if (i === 23) filename = '23-the-birth-of-venus-by-sandro-botticelli';
        else if (i === 24) filename = '24-stag-night-at-sharkeys-by-george-bellows';
        else if (i === 25) filename = '25-the-raft-of-the-medusa-by-theodore-gericault';
        else if (i === 26) filename = '26-the-triumph-of-venus-by-francois-boucher';
        else if (i === 27) filename = '27-a-bar-at-the-folies-bergere-by-edouard-manet';
        else if (i === 28) filename = '28-a-cotton-office-in-new-orleans-by-edgar-degas';
        else if (i === 29) filename = '29-bal-du-moulin-de-la-galette-by-pierre-auguste-renoir';
        else if (i === 30) filename = '30-a-sunday-afternoon-on-the-island-of-la-grande-jatte-by-georges-seurat';
        else if (i === 31) filename = '31-luncheon-of-the-boating-party-by-pierre-auguste-renoir';
        else if (i === 32) filename = '32-le-dejeuner-sur-lherbe-by-edouard-manet';
        else if (i === 33) filename = '33-liberty-leading-the-people-by-eugene-delacroix';
        else if (i === 34) filename = '34-the-card-players-by-paul-cezanne';
        else if (i === 35) filename = '35-wheat-field-with-cypresses-at-the-haude-galline-near-eygalieres-by-vincent-van-gogh';
        else if (i === 36) filename = '36-the-third-of-may-1808-by-francisco-goya';
        else if (i === 37) filename = '37-the-sleeping-gypsy-by-henri-rousseau';
        else if (i === 38) filename = '38-the-night-watch-by-rembrandt';
        else if (i === 39) filename = '39-the-lady-of-shalott-by-john-william-waterhouse';
        else if (i === 40) filename = '40-the-harvesters-by-pieter-bruegel-the-elder';
        else if (i === 41) filename = '41-boulevard-montmartre-spring-by-camille-pissarro';
        else if (i === 42) filename = '42-impression-sunrise-by-claude-monet';
        else if (i === 43) filename = '43-paris-street-in-rainy-weather-by-gustave-caillebotte';
        else if (i === 44) filename = '44-saint-jerome-writing-by-caravaggio';
        else if (i === 45) filename = '45-breezing-up-also-known-as-a-fair-wind-by-winslow-homer';
        else if (i === 46) filename = '46-the-last-supper-by-leonardo-da-vinci';
        else if (i === 47) filename = '47-nighthawks-by-edward-hopper';
        else if (i === 48) filename = '48-grande-odalisque-by-jean-auguste-dominique-ingres';
        else if (i === 49) filename = '49-the-naked-maja-by-francisco-de-goya-y-lucientes';
        else if (i === 50) filename = '50-the-creation-of-adam-by-michelangelo';
        else filename = `${num}-painting-${i}`; // Fallback
        
        images.push(`${category.path}${filename}`);
      }
      break;
      
    case 'artes-psicodelicas':
      // Generate 60 psychedelic art files
      for (let i = 1; i <= 60; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}kit-psicodelico-${num}`);
      }
      break;

    case 'motivational':
      // Generate motivational images using two patterns:
      // 1..50 use 'FRASES_X' (no zero-padding), >50 use 'MOTIVATIONAL_XXX'
      for (let i = 1; i <= category.itemCount; i++) {
        if (i <= 50) {
          images.push(`${category.path}FRASES_${i}`);
        } else {
          const num = i.toString().padStart(3, '0');
          images.push(`${category.path}MOTIVATIONAL_${num}`);
        }
      }
      break;
      
    case 'space':
      // Generate 60 space art files
      for (let i = 1; i <= 60; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}space-${num}`);
      }
      break;
      
    default:
      // For other categories, generate a basic pattern
      for (let i = 1; i <= category.itemCount; i++) {
        const num = i.toString().padStart(3, '0');
        const prefix = categoryId.replace('-', '');
        images.push(`${category.path}${prefix}-${num}`);
      }
      break;
  }
  
  return images;
};

export default categories;
