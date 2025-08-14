// Category definitions for the digital art store

// Development mode flag - set to false to use Cloudinary, true for local images
const USE_LOCAL_IMAGES = false; // Use Cloudinary with correct URL format

console.warn('Categories loaded:', process.env.NODE_ENV);

export const generateImageKitUrl = (imagePath, options = {}) => {
  // Validate input
  if (!imagePath || typeof imagePath !== 'string') {
    console.error('Invalid image path provided', { imagePath });
    return null;
  }

  // Use the global USE_LOCAL_IMAGES flag (no local override)
  if (USE_LOCAL_IMAGES) {
    // Use local images for development
    return `/Images/${imagePath}.avif`;
  } else {
    try {
      // Cloudinary configuration
      const cloudName = 'djdbzgoxk'; // Your Cloudinary cloud name
      if (!cloudName) {
        throw new Error('Cloudinary cloud name is not configured');
      }

      const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
      const {
        width = 'auto',
        height = 'auto',
        quality = 'auto',
        format = 'auto',
        crop = 'fill',
        gravity = 'auto'
      } = options;

      let transformations = [];
      
      // Validate and add transformations
      if (width !== 'auto') {
        if (typeof width !== 'number' && width !== 'auto') {
          console.warn('Invalid width provided, defaulting to auto', { width });
        } else {
          transformations.push(`w_${width}`);
        }
      }
      if (height !== 'auto') {
        if (typeof height !== 'number' && height !== 'auto') {
          console.warn('Invalid height provided, defaulting to auto', { height });
        } else {
          transformations.push(`h_${height}`);
        }
      }
      
      // Other transformation validations
      if (quality !== 'auto') transformations.push(`q_${quality}`);
      if (format !== 'auto') transformations.push(`f_${format}`);
      if (crop !== 'fill') transformations.push(`c_${crop}`);
      if (gravity !== 'auto') transformations.push(`g_${gravity}`);
      
      // Extract and sanitize public ID
      let publicId = imagePath.split('/').pop();
      
      // Validate public ID
      if (!publicId) {
        throw new Error('Could not extract public ID from image path');
      }

      // Keep underscores as they are (Cloudinary supports underscores)
      // publicId = publicId.replace(/_/g, '-');
      
      // Ensure .avif extension
      if (!publicId.endsWith('.avif')) {
        publicId += '.avif';
      }
      
      // Apply transformations if any
      if (transformations.length > 0) {
        const transformString = transformations.join(',');
        return `${baseUrl}/${transformString}/${publicId}`;
      }
      
      // Return the complete Cloudinary URL without transformations
      return `${baseUrl}/${publicId}`;

    } catch (error) {
      console.error('Error generating Cloudinary URL', { 
        imagePath, 
        error: error.message,
        stack: error.stack 
      });
      return null;
    }
  }
};

export const categories = [
  {
    id: 'among-us',
    name: 'Among Us',
    description: 'Creative Among Us themed digital artworks',
    path: 'among-us/',
    previewImage: 'among-us/AMONG_01',
    itemCount: 60
  },

  {
    id: 'collage',
    name: 'Collage',
    description: 'Mixed media collage artworks',
    path: 'collage/',
    previewImage: 'collage/COLAGEM_01',
    itemCount: 41
  },
  {
    id: 'dc-heroes',
    name: 'DC Heroes',
    description: 'DC Comics superhero digital art collection',
    path: 'dc-heroes/',
    previewImage: 'dc-heroes/HEROIS_001',
    itemCount: 99
  },
  {
    id: 'digital-illustration',
    name: 'Digital Illustration',
    description: 'Modern digital illustrations and artwork',
    path: 'digital-illustration/',
    previewImage: 'digital-illustration/ID_001',
    itemCount: 155
  },
  {
    id: 'doodle-art',
    name: 'Doodle Art',
    description: 'Hand-drawn doodle style artwork',
    path: 'doodle-art/',
    previewImage: 'doodle-art/DOODLE_01',
    itemCount: 42
  },
  {
    id: 'esoteric',
    name: 'Esoteric',
    description: 'Mystical and esoteric themed artwork',
    path: 'esoteric/',
    previewImage: 'esoteric/ESOTERICAS_001',
    itemCount: 196
  },
  {
    id: 'league-of-legends',
    name: 'League of Legends',
    description: 'League of Legends game-inspired art',
    path: 'league-of-legends/',
    previewImage: 'league-of-legends/LOL_01',
    itemCount: 58
  },
  {
    id: 'mortal-kombat',
    name: 'Mortal Kombat',
    description: 'Fighting game themed digital art',
    path: 'mortal-kombat/',
    previewImage: 'mortal-kombat/MORTAL_01',
    itemCount: 41
  },
  {
    id: 'motivational',
    name: 'Motivational',
    description: 'Inspirational quotes and motivational artwork',
    path: 'motivational/',
    previewImage: 'motivational/FRASES_30',
    itemCount: 115
  },
  {
    id: 'paintings',
    name: 'Paintings',
    description: 'Classic and modern painting reproductions',
    path: 'paintings/',
    previewImage: 'paintings/01._Mona_Lisa_by_Leonardo_Da_Vinci',
    itemCount: 50
  },
  {
    id: 'religion',
    name: 'Religion',
    description: 'Religious and spiritual themed artwork',
    path: 'religion/',
    previewImage: 'religion/FTH_001',
    itemCount: 100
  },
  {
    id: 'space',
    name: 'Space',
    description: 'Cosmic and space-themed digital art',
    path: 'space/',
    previewImage: 'space/SPACE_001',
    itemCount: 134
  }
];

// Helper function to get category by ID
export const getCategoryById = (id) => {
  console.error('getCategoryById called', { 
    id, 
    categories: categories.map(c => c.id),
    match: categories.find(category => category.id === id)
  });
  return categories.find(category => category.id === id);
};

// Helper function to generate item code
export const generateItemCode = (filename, categoryId) => {
  const category = getCategoryById(categoryId);
  if (!category) return 'UNKNOWN-01';

  const numberMatch = filename.match(/(\d+)/);
  const number = numberMatch ? parseInt(numberMatch[1]) : 1;
  
  // Map category IDs to shorter prefixes
  const categoryPrefixMap = {
    'among-us': 'AMONG',
    'dc-heroes': 'HEROIS',
    'collage': 'COLLAGE',
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
  
  const prefix = categoryPrefixMap[categoryId];
  if (!prefix) return 'UNKNOWN-01';
  
  return `${prefix}-${number.toString().padStart(2, '0')}`;
};

// Helper function to generate image paths for a category
export const generateImagePaths = (categoryId) => {
  console.error('generateImagePaths DETAILED DEBUG', {
    input: categoryId,
    inputType: typeof categoryId,
    category: getCategoryById(categoryId)
  });
  const category = getCategoryById(categoryId);
  if (!category) return [];

  const images = [];
  
  switch (categoryId) {
    case 'paintings':
      // Generate all 50 painting files with actual filenames
      const paintingFilenames = [
        '01._Mona_Lisa_by_Leonardo_Da_Vinci',
        '02._Lady_with_an_Ermine_by_Leonardo_da_Vinci',
        '03._Girl_with_a_Pearl_Earring_by_Johannes_Vermeer',
        '04._Las_Meninas_by_Diego_Velázquez',
        '05._The_Storm_on_the_Sea_of_Galilee_by_Rembrandt',
        '06._The_Woman_with_a_Parasol_by_Claude_Oscar_Monet',
        '07._Dante_And_Virgil_In_Hell_by_William-Adolphe_Bouguereau',
        '08._Napoleon_Crossing_the_Alps_by_Jacques-Louis_David',
        '09._St._George_and_the_Dragon_by_Raphael_Raffaello',
        '10._The_Swing_by_Jean-Honoré_Fragonard',
        '11._When_Will_You_Marry_by_Paul_Gauguin',
        '12._View_of_Toledo_by_El_Greco',
        '13._Wanderer_above_the_Sea_of_Fog_by_Caspar_David_Friedrich',
        '14._The_Scream_by_Edvard_Munch',
        '15._The_Kiss_by_Gustav_Klimt',
        '16._The_Arnolfini_Portrait_by_Jan_van_Eyck',
        '17._American_Gothic_by_Grant_Wood',
        '18._Battle_Of_Issus_by_Albrecht_Altdorfer',
        '19._Bacchus_by_Caravaggio',
        '20._La_Virgen_de_los_Lirios_by_Willian-Adolphe_Bouguereau',
        '21._The_Starry_Night_By_Vincent_Van_Gogh',
        '22._The_Gulf_Stream_by_Winslow_Homer',
        '23._The_Birth_of_Venus_by_Sandro_Botticelli',
        '24._Stag_Night_At_Sharkeys_by_George_Bellows',
        '25._The_Raft_of_the_Medusa_by_Théodore_Géricault',
        '26._The_Triumph_of_Venus_by_Francois_Boucher',
        '27._A_Bar_at_the_Folies-Bergère_by_Édouard_Manet',
        '28._A_Cotton_Office_In_New_Orleans_by_Edgar_Degas',
        '29._Bal_du_moulin_de_la_Galette_by_Pierre-Auguste_Renoir',
        '30._A_Sunday_Afternoon_on_the_Island_of_La_Grande_Jatte_by_Georges_Seurat',
        '31._Luncheon_of_the_Boating_Party_by_Pierre-Auguste_Renoir',
        '32._Le_Déjeuner_sur_l_herbe_by_Édouard_Manet',
        '33._Liberty_Leading_the_People_by_Eugène_Delacroix',
        '34._The_Card_Players_by_Paul_Cézanne',
        '35._Wheat_Field_with_Cypresses_at_the_Haude_Galline_near_Eygalieres_by_Vincent_van_Gogh',
        '36._The_Third_of_May_1808_by_Francisco_Goya',
        '37._The_Sleeping_Gypsy_by_Henri_Rousseau',
        '38._The_Night_Watch_by_Rembrandt',
        '39._The_Lady_Of_Shalott_by_John_William_Waterhouse',
        '40._The_Harvesters_by_Pieter_Bruegel_the_Elder',
        '41._Boulevard_Montmartre_Spring_by_Camille_Pissarro',
        '42._Impression_Sunrise_by_Claude_Monet',
        '43._Paris_Street_In_Rainy_Weather_by_Gustave_Caillebotte',
        '44._Saint_Jerome_Writing_by_Caravaggio',
        '45._Breezing_Up_also_known_as_A_Fair_Wind_by_Winslow_Homer',
        '46._The_Last_Supper_by_Leonardo_da_Vinci',
        '47._Nighthawks_by_Edward_Hopper',
        '48._Grande_Odalisque_by_Jean_Auguste_Dominique_Ingres',
        '49._The_Naked_Maja_by_Francisco_de_Goya_y_Lucientes',
        '50._The_Creation_Of_Adam_by_Michelangelo'
      ];
      
      paintingFilenames.forEach(filename => {
        images.push(`${category.path}${filename}`);
      });
      break;
      
    case 'collage':
      // Generate 41 collage files
      for (let i = 1; i <= 41; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}COLAGEM_${num}`);
      }
      break;

    case 'among-us':
      // Generate 60 among us files
      for (let i = 1; i <= 60; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}AMONG_${num}`);
      }
      break;

    case 'dc-heroes':
      // Generate 99 DC heroes files
      for (let i = 1; i <= 99; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}HEROIS_${num}`);
      }
      break;

    case 'digital-illustration':
      // Generate 155 digital illustration files
      for (let i = 1; i <= 155; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}ID_${num}`);
      }
      break;

    case 'doodle-art':
      // Generate 42 doodle art files
      for (let i = 1; i <= 42; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}DOODLE_${num}`);
      }
      break;

    case 'esoteric':
      // Generate 196 esoteric files
      for (let i = 1; i <= 196; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}ESOTERICAS_${num}`);
      }
      break;

    case 'league-of-legends':
      // Generate 58 league of legends files
      for (let i = 1; i <= 58; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}LOL_${num}`);
      }
      break;

    case 'mortal-kombat':
      // Generate 41 mortal kombat files
      for (let i = 1; i <= 41; i++) {
        const num = i.toString().padStart(2, '0');
        images.push(`${category.path}MORTAL_${num}`);
      }
      break;

    case 'motivational':
      // Generate 115 motivational files
      for (let i = 1; i <= 115; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}MOTIVATIONAL_${num}`);
      }
      break;

    case 'religion':
      // Generate 100 religion files
      for (let i = 1; i <= 100; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}FTH_${num}`);
      }
      break;

    case 'space':
      // Generate 134 space files
      for (let i = 1; i <= 134; i++) {
        const num = i.toString().padStart(3, '0');
        images.push(`${category.path}SPACE_${num}`);
      }
      break;
  }
  
  return images;
};

export default categories;