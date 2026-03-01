/**
 * Google Forms Entry ID Extractor
 * 
 * This script helps you quickly extract and map Google Forms entry IDs
 * to your React form fields.
 * 
 * Instructions:
 * 1. Create your Google Form
 * 2. Open it in edit mode
 * 3. Right-click and "View Page Source"
 * 4. Copy the entire HTML source
 * 5. Run this script in browser console with the HTML as input
 */

function extractGoogleFormsEntries(htmlSource) {
  // Extract all entry IDs from the HTML source
  const entryRegex = /entry\.(\d+)/g;
  const matches = [];
  let match;
  
  while ((match = entryRegex.exec(htmlSource)) !== null) {
    matches.push(`entry.${match[1]}`);
  }
  
  // Remove duplicates
  const uniqueEntries = [...new Set(matches)];
  
  // Expected form fields in order
  const formFields = [
    'nombres',
    'apellidos', 
    'cedula',
    'email',
    'telefono',
    'universidad',
    'universidadOtra',
    'carrera',
    'carreraOtra',
    'experienciaProgramacion',
    'areasInteres',
    'areasInteresOtra',
    'herramientasLenguajes',
    'herramientasLenguajesOtro',
    'actividadesInteres',
    'actividadesInteresOtra',
    'colaboracionActiva',
    'tiempoDisponible',
    'nivelCompromiso',
    'proyectosPrevios',
    'liderazgoExperiencia',
    'objetivosPlazo',
    'fortalezasPrincipales',
    'fortalezasPrincipalesOtra',
    'desafiosInteres',
    'desafiosInteresOtro',
    'aprendizajePreferido',
    'contribucionEsperada',
    'comoSeEntero',
    'comentarios'
  ];

  console.log('🎯 Google Forms Entry Mapping Generator');
  console.log('=====================================\n');
  
  console.log('📋 Found Entry IDs:', uniqueEntries);
  console.log(`📊 Total entries found: ${uniqueEntries.length}`);
  console.log(`🎯 Expected fields: ${formFields.length}\n`);

  if (uniqueEntries.length !== formFields.length) {
    console.warn(`⚠️  Mismatch: Found ${uniqueEntries.length} entries but expected ${formFields.length} fields`);
    console.warn('Make sure your Google Form has all required fields in the correct order.\n');
  }

  console.log('🔧 Copy this mapping to your GOOGLE_FORMS_CONFIG:');
  console.log('================================================\n');
  
  const mapping = {};
  formFields.forEach((field, index) => {
    mapping[field] = uniqueEntries[index] || `entry.MISSING_${index}`;
  });

  console.log('fieldMapping: {');
  Object.entries(mapping).forEach(([field, entry]) => {
    console.log(`  ${field}: "${entry}",`);
  });
  console.log('}');

  console.log('\n📝 Usage Instructions:');
  console.log('====================');
  console.log('1. Copy the fieldMapping object above');
  console.log('2. Replace the fieldMapping in GOOGLE_FORMS_CONFIG');
  console.log('3. Update the actionUrl with your form ID');
  console.log('4. Set enabled: true to activate Google Forms submission');

  return mapping;
}

// Example usage:
// const htmlSource = `/* paste your Google Form HTML source here */`;
// const mapping = extractGoogleFormsEntries(htmlSource);

console.log('🚀 Google Forms Integration Helper Loaded!');
console.log('Run: extractGoogleFormsEntries(htmlSource) with your form HTML');

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { extractGoogleFormsEntries };
}
