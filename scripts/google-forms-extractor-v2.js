/**
 * Google Forms Integration Helper Script v2.0
 * 
 * This script helps you extract the entry IDs from your Google Form
 * to configure the GOOGLE_FORMS_CONFIG in AdmissionForm.tsx
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Form
 * 2. Click "Preview" (eye icon)
 * 3. Open Browser DevTools (F12)
 * 4. Go to Console tab
 * 5. Paste this entire script and press Enter
 * 6. Run: copyConfig() to copy the configuration
 * 7. Update GOOGLE_FORMS_CONFIG in src/components/admission/AdmissionForm.tsx
 * 
 * VERSION 2.0 - Enhanced with better detection and auto-mapping
 */

console.log('%c🎯 Google Forms Entry ID Extractor v2.0', 'font-size: 20px; font-weight: bold; color: #4285f4;');
console.log('%cExtracting entry IDs from this form...', 'font-size: 14px; color: #666;');

// Enhanced entry ID extraction with better question detection
const extractEntryIds = () => {
  const entries = [];
  const seenEntries = new Set();
  
  // Method 1: From all input/select/textarea elements
  document.querySelectorAll('input[name^="entry."], textarea[name^="entry."], select[name^="entry."]').forEach(input => {
    const entryId = input.getAttribute('name');
    
    if (seenEntries.has(entryId)) return;
    seenEntries.add(entryId);
    
    // Try multiple selectors to find the question text
    let question = 'Unknown Question';
    const container = input.closest('[role="listitem"], [data-params]');
    
    if (container) {
      const titleElement = container.querySelector('[role="heading"], .freebirdFormviewerComponentsQuestionBaseTitle, .freebirdFormviewerComponentsQuestionBaseHeader');
      if (titleElement) {
        question = titleElement.textContent.trim();
      }
    }
    
    // Detect field type
    let fieldType = 'text';
    if (input.type === 'checkbox' || input.type === 'radio') {
      fieldType = input.type;
    } else if (input.tagName === 'TEXTAREA') {
      fieldType = 'textarea';
    } else if (input.tagName === 'SELECT') {
      fieldType = 'select';
    }
    
    entries.push({ 
      entry: entryId, 
      question: question,
      type: fieldType,
      required: container?.querySelector('[aria-label*="Required"]') !== null
    });
  });
  
  // Method 2: From page source (backup)
  if (entries.length === 0) {
    console.log('%c⚠️ Trying backup extraction method...', 'color: #f9ab00;');
    const pageContent = document.documentElement.innerHTML;
    const entryMatches = pageContent.matchAll(/entry\.(\d+)/g);
    
    for (const match of entryMatches) {
      const entryId = `entry.${match[1]}`;
      if (!seenEntries.has(entryId)) {
        seenEntries.add(entryId);
        entries.push({ 
          entry: entryId, 
          question: `Field ${entries.length + 1}`,
          type: 'unknown',
          required: false
        });
      }
    }
  }
  
  return entries;
};

const entries = extractEntryIds();

if (entries.length === 0) {
  console.log('%c❌ No entry IDs found!', 'font-size: 16px; color: #d93025;');
  console.log('%cMake sure you\'re on the Google Form preview page.', 'font-size: 14px; color: #666;');
  console.log('%cTIP: Open the form in "Preview" mode (eye icon), not edit mode.', 'font-size: 12px; color: #666;');
} else {
  console.log(`%c✅ Found ${entries.length} form fields!`, 'font-size: 16px; color: #0f9d58;');
  console.log('\n%c📋 Form Structure:', 'font-size: 14px; font-weight: bold;');
  
  // Display entries in a nice table
  console.table(entries.map((e, i) => ({
    '#': i + 1,
    'Entry ID': e.entry,
    'Question': e.question.substring(0, 50) + (e.question.length > 50 ? '...' : ''),
    'Type': e.type,
    'Required': e.required ? '✓' : ''
  })));
  
  // Generate the config object with smart field mapping
  const formUrl = window.location.href.replace('/viewform', '/formResponse').split('?')[0];
  
  const config = {
    enabled: false, // Set to true when ready for production
    actionUrl: formUrl,
    fieldMapping: {}
  };
  
  // Try to auto-map common fields
  const fieldMappings = {
    'nombres': ['nombre', 'name', 'first name'],
    'apellidos': ['apellido', 'surname', 'last name'],
    'cedula': ['cedula', 'cédula', 'ci', 'id number'],
    'email': ['email', 'correo', 'e-mail'],
    'telefono': ['telefono', 'teléfono', 'phone', 'celular'],
    'universidad': ['universidad', 'university'],
    'carrera': ['carrera', 'major', 'programa'],
    'experienciaProgramacion': ['experiencia', 'programming experience'],
    'areasInteres': ['áreas', 'areas', 'interest'],
    'herramientasLenguajes': ['herramientas', 'lenguajes', 'tools', 'languages'],
    'actividadesInteres': ['actividades', 'activities'],
    'colaboracionActiva': ['colaboración', 'collaboration', 'colaborar'],
    'tiempoDisponible': ['tiempo', 'time', 'disponible', 'available'],
    'nivelCompromiso': ['compromiso', 'commitment', 'nivel'],
    'proyectosPrevios': ['proyectos', 'projects', 'previos'],
    'liderazgoExperiencia': ['liderazgo', 'leadership'],
    'objetivosPlazo': ['objetivos', 'goals', 'plazo'],
    'fortalezasPrincipales': ['fortalezas', 'strengths'],
    'desafiosInteres': ['desafíos', 'challenges'],
    'aprendizajePreferido': ['aprendizaje', 'learning', 'preferido'],
    'contribucionEsperada': ['contribución', 'contribution'],
    'comoSeEntero': ['cómo', 'how', 'enteraste'],
    'comentarios': ['comentarios', 'comments', 'adicional']
  };
  
  entries.forEach((entry, index) => {
    const questionLower = entry.question.toLowerCase();
    let fieldName = null;
    
    // Try to auto-map
    for (const [key, keywords] of Object.entries(fieldMappings)) {
      if (keywords.some(keyword => questionLower.includes(keyword))) {
        fieldName = key;
        break;
      }
    }
    
    if (!fieldName) {
      fieldName = `field${index + 1}`;
    }
    
    config.fieldMapping[fieldName] = entry.entry;
  });
  
  console.log('\n%c📝 Generated Configuration:', 'font-size: 14px; font-weight: bold;');
  console.log(JSON.stringify(config, null, 2));
  
  console.log('\n%c⚠️ IMPORTANT:', 'font-size: 14px; font-weight: bold; color: #f9ab00;');
  console.log('Review the auto-mapped field names above and adjust them to match your AdmissionForm.tsx');
  console.log('The field names should match the keys in your formData state object.');
  
  console.log('\n%c💡 Next Steps:', 'font-size: 14px; font-weight: bold; color: #1a73e8;');
  console.log('1. Run copyConfig() to copy the configuration to clipboard');
  console.log('2. Update GOOGLE_FORMS_CONFIG in src/components/admission/AdmissionForm.tsx');
  console.log('3. Adjust field names to match your form state');
  console.log('4. Test with enabled: false first');
  console.log('5. Set enabled: true when ready for production');
  
  console.log('\n%c📊 Form Statistics:', 'font-size: 14px; font-weight: bold;');
  console.log(`Total fields: ${entries.length}`);
  console.log(`Required fields: ${entries.filter(e => e.required).length}`);
  console.log(`Text inputs: ${entries.filter(e => e.type === 'text').length}`);
  console.log(`Textareas: ${entries.filter(e => e.type === 'textarea').length}`);
  console.log(`Radio buttons: ${entries.filter(e => e.type === 'radio').length}`);
  console.log(`Checkboxes: ${entries.filter(e => e.type === 'checkbox').length}`);
}

// Helper functions
window.copyConfig = () => {
  const formUrl = window.location.href.replace('/viewform', '/formResponse').split('?')[0];
  const config = {
    enabled: false,
    actionUrl: formUrl,
    fieldMapping: {}
  };
  
  const fieldMappings = {
    'nombres': ['nombre', 'name', 'first name'],
    'apellidos': ['apellido', 'surname', 'last name'],
    'cedula': ['cedula', 'cédula', 'ci'],
    'email': ['email', 'correo'],
    'telefono': ['telefono', 'teléfono', 'phone'],
    'universidad': ['universidad', 'university'],
    'carrera': ['carrera', 'major'],
    'experienciaProgramacion': ['experiencia', 'programming'],
    'areasInteres': ['áreas', 'areas', 'interest'],
    'herramientasLenguajes': ['herramientas', 'lenguajes', 'tools'],
    'actividadesInteres': ['actividades', 'activities'],
    'colaboracionActiva': ['colaboración', 'collaboration'],
    'tiempoDisponible': ['tiempo', 'time'],
    'nivelCompromiso': ['compromiso', 'commitment'],
    'proyectosPrevios': ['proyectos', 'projects'],
    'liderazgoExperiencia': ['liderazgo', 'leadership'],
    'objetivosPlazo': ['objetivos', 'goals'],
    'fortalezasPrincipales': ['fortalezas', 'strengths'],
    'desafiosInteres': ['desafíos', 'challenges'],
    'aprendizajePreferido': ['aprendizaje', 'learning'],
    'contribucionEsperada': ['contribución', 'contribution'],
    'comoSeEntero': ['cómo', 'how'],
    'comentarios': ['comentarios', 'comments']
  };
  
  entries.forEach((entry, index) => {
    const questionLower = entry.question.toLowerCase();
    let fieldName = `field${index + 1}`;
    
    for (const [key, keywords] of Object.entries(fieldMappings)) {
      if (keywords.some(keyword => questionLower.includes(keyword))) {
        fieldName = key;
        break;
      }
    }
    
    config.fieldMapping[fieldName] = entry.entry;
  });
  
  navigator.clipboard.writeText(JSON.stringify(config, null, 2))
    .then(() => console.log('%c✅ Configuration copied to clipboard!', 'color: #0f9d58; font-weight: bold;'))
    .catch(() => console.log('%c❌ Failed to copy. Please copy manually from above.', 'color: #d93025;'));
};

window.showMappingSuggestions = () => {
  console.log('%c💡 Suggested Field Mappings:', 'font-size: 14px; font-weight: bold;');
  entries.forEach((entry, index) => {
    console.log(`%c${index + 1}. ${entry.question}`, 'font-weight: bold;');
    console.log(`   Entry ID: %c${entry.entry}`, 'color: #0f9d58;');
    console.log(`   Type: ${entry.type}, Required: ${entry.required}`);
    console.log('');
  });
};

window.generateTypeScriptConfig = () => {
  const formUrl = window.location.href.replace('/viewform', '/formResponse').split('?')[0];
  
  let tsConfig = `const GOOGLE_FORMS_CONFIG = {\n`;
  tsConfig += `  enabled: false, // Set to true when ready for production\n`;
  tsConfig += `  actionUrl: "${formUrl}",\n`;
  tsConfig += `  fieldMapping: {\n`;
  
  entries.forEach((entry, index) => {
    const questionLower = entry.question.toLowerCase();
    let fieldName = `field${index + 1}`;
    
    // Auto-mapping logic
    const fieldMappings = {
      'nombres': ['nombre', 'name'],
      'apellidos': ['apellido', 'surname'],
      'cedula': ['cedula', 'cédula', 'ci'],
      'email': ['email', 'correo'],
      'telefono': ['telefono', 'teléfono', 'phone'],
    };
    
    for (const [key, keywords] of Object.entries(fieldMappings)) {
      if (keywords.some(keyword => questionLower.includes(keyword))) {
        fieldName = key;
        break;
      }
    }
    
    tsConfig += `    ${fieldName}: "${entry.entry}", // ${entry.question.substring(0, 40)}...\n`;
  });
  
  tsConfig += `  }\n};\n`;
  
  console.log('%c📝 TypeScript Configuration:', 'font-size: 14px; font-weight: bold;');
  console.log(tsConfig);
  
  navigator.clipboard.writeText(tsConfig)
    .then(() => console.log('%c✅ TypeScript config copied to clipboard!', 'color: #0f9d58; font-weight: bold;'))
    .catch(() => console.log('%c❌ Failed to copy. Please copy manually from above.', 'color: #d93025;'));
};

console.log('\n%c🔧 Available Helper Functions:', 'font-size: 14px; font-weight: bold; color: #7e57c2;');
console.log('%ccopyConfig()%c - Copy JSON configuration to clipboard', 'background: #f1f3f4; padding: 2px 4px; border-radius: 2px; font-family: monospace;', '');
console.log('%cgenerateTypeScriptConfig()%c - Generate TypeScript config code', 'background: #f1f3f4; padding: 2px 4px; border-radius: 2px; font-family: monospace;', '');
console.log('%cshowMappingSuggestions()%c - Show detailed field mapping suggestions', 'background: #f1f3f4; padding: 2px 4px; border-radius: 2px; font-family: monospace;', '');
