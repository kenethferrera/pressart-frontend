const fs = require('fs');
const path = require('path');

console.log('🎨 Paintings Upload Guide for Cloudinary');
console.log('=========================================');

// Get the painting filenames from the categories config
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

console.log('\n📋 Upload Instructions:');
console.log('1. Go to your Cloudinary Media Library');
console.log('2. Create a folder called "paintings"');
console.log('3. Upload each painting file with the EXACT public ID shown below');
console.log('4. Make sure to set the public ID to match the filename (without .avif extension)');

console.log('\n🎯 Required Public IDs for Cloudinary:');
paintingFilenames.forEach((filename, index) => {
  console.log(`${(index + 1).toString().padStart(2, '0')}. ${filename}`);
});

console.log('\n⚠️  IMPORTANT:');
console.log('- The public ID must match EXACTLY (including underscores and periods)');
console.log('- Do NOT use hyphens (-) - use underscores (_)');
console.log('- Include the period after the number (e.g., "01._Mona_Lisa...")');
console.log('- The folder structure should be: paintings/01._Mona_Lisa_by_Leonardo_Da_Vinci');

console.log('\n🔗 Example Cloudinary URLs after upload:');
console.log('https://res.cloudinary.com/djdbzgoxk/image/upload/paintings/01._Mona_Lisa_by_Leonardo_Da_Vinci.avif');
console.log('https://res.cloudinary.com/djdbzgoxk/image/upload/paintings/02._Lady_with_an_Ermine_by_Leonardo_da_Vinci.avif');

console.log('\n✅ After uploading with correct public IDs, the paintings should load properly!');
