import React, { useState } from "react";
import { AlertCircle, Check, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Google Forms configuration
const GOOGLE_FORMS_CONFIG = {
  enabled: true, // Set to true when you have your Google Form ready
  // Use the formResponse endpoint (not the viewform URL)
  actionUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSeZhatPR6KhG_nDgMwXQUYHarB97HssP32ITLAIesklW9MhxA/formResponse",
  fieldMapping: {
    // Mapping based on your TEST prefilled URL
    nombres: "entry.1304070415",
    apellidos: "entry.1635670675",
    cedula: "entry.1093009925",
    email: "entry.762187120",
    telefono: "entry.1256368352",
    universidad: "entry.1592837502",
    universidadOtra: "entry.1271897015",
    carrera: "entry.557362533",
    carreraOtra: "entry.204427330",
    experienciaProgramacion: "entry.802203129",
    areasInteres: "entry.1458324455",
    // areasInteres.other_option_response -> handled dynamically
    herramientasLenguajes: "entry.371720195",
    actividadesInteres: "entry.1867042241",
    colaboracionActiva: "entry.1759389033",
    // first comments textarea (section 2)
    comentariosSection1: "entry.1861153507",
    tiempoDisponible: "entry.339603072",
    nivelCompromiso: "entry.212051963",
    proyectosPrevios: "entry.1564733542",
    liderazgoExperiencia: "entry.537832093",
    fortalezasPrincipales: "entry.824450996",
    desafiosInteres: "entry.1289478777",
    objetivosPlazo: "entry.1609289264",
    aprendizajePreferido: "entry.1828706852",
    contribucionEsperada: "entry.1118208089",
    comoSeEntero: "entry.1741093256",
    // second comments textarea (Información General)
    comentariosSection2: "entry.650547013",
  }
};

type FormState = {
  nombres: string;
  apellidos: string;
  cedula: string;
  email: string;
  telefono: string;
  universidad: string;
  universidadOtra: string;
  carrera: string;
  carreraOtra: string;
  experienciaProgramacion: string;
  areasInteres: string[];
  areasInteresOtra: string;
  herramientasLenguajes: string[];
  herramientasLenguajesOtro: string;
  actividadesInteres: string[];
  actividadesInteresOtra: string;
  colaboracionActiva: string;
  comentarios1: string;
  comentarios2: string;
  comoSeEntero: string;
  tiempoDisponible: string;
  nivelCompromiso: string;
  proyectosPrevios: string;
  liderazgoExperiencia: string;
  objetivosPlazo: string;
  fortalezasPrincipales: string[];
  fortalezasPrincipalesOtra: string;
  desafiosInteres: string[];
  desafiosInteresOtro: string;
  aprendizajePreferido: string;
  contribucionEsperada: string;
}

const AdmissionForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormState>({
    // Datos Personales
    nombres: "",
    apellidos: "",
    cedula: "",
    email: "",
    telefono: "",
    universidad: "",
    universidadOtra: "",
    carrera: "",
    carreraOtra: "",
    
    // Experiencia y Expectativas
    experienciaProgramacion: "",
    areasInteres: [] as string[],
    areasInteresOtra: "",
    herramientasLenguajes: [] as string[],
    herramientasLenguajesOtro: "",
    actividadesInteres: [] as string[],
    actividadesInteresOtra: "",
    colaboracionActiva: "",
    comentarios1: "",
    comentarios2: "",
    comoSeEntero: "",
    
    // New assessment questions
    tiempoDisponible: "",
    nivelCompromiso: "",
    proyectosPrevios: "",
    liderazgoExperiencia: "",
    objetivosPlazo: "",
    fortalezasPrincipales: [] as string[],
    fortalezasPrincipalesOtra: "",
    desafiosInteres: [] as string[],
    desafiosInteresOtro: "",
    aprendizajePreferido: "",
    contribucionEsperada: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const carreras = [
    "Ingeniería Civil",
    "Ingeniería Electromecánica", 
    "Ingeniería Electrónica",
    "Ingeniería Geográfica y Ambiental",
    "Ingeniería Industrial",
    "Ingeniería Mecánica",
    "Ingeniería Mecatrónica",
    "Otra"
  ];

  const experienciaOpciones = [
    { value: "bastante", label: "Sí, bastante experiencia" },
    { value: "algo", label: "Sí, algo de experiencia" },
    { value: "aprendiendo", label: "Estoy aprendiendo recién" },
    { value: "quiero-aprender", label: "No, pero quiero aprender" }
  ];

  const areasInteres = [
    "Desarrollo Web Frontend (React, Vue, Angular)",
    "Desarrollo Web Backend (APIs, Bases de Datos)",
    "Desarrollo Mobile (React Native, Flutter)",
    "DevOps e Infraestructura (CI/CD, Cloud)",
    "Inteligencia Artificial / Machine Learning",
    "Ciencia de Datos / Analytics",
    "Programación Competitiva / Algoritmos",
    "Desarrollo de Videojuegos",
    "Ciberseguridad",
    "Blockchain / Web3",
    "Robótica / IoT",
    "Otro"
  ];

  const herramientas = [
    "HTML/CSS", "JavaScript/TypeScript", "React/Vue/Angular", 
    "Node.js", "Python", "Java", "C/C++", "C#", 
    "PHP", "SQL/Bases de Datos", "Git/GitHub", 
    "Docker", "AWS/Azure/GCP", "Otro"
  ];

  const actividades = [
    "Desarrollo de proyectos colaborativos",
    "Participar en hackathons y competencias",
    "Crear y facilitar cursos/talleres",
    "Organización de eventos técnicos",
    "Mentorear a otros estudiantes",
    "Contribuir a proyectos open source",
    "Investigación y desarrollo de nuevas tecnologías",
    "Crear contenido educativo (blogs, videos)",
    "Gestión de redes sociales y marketing",
    "Establecer partnerships con empresas",
    "Participar en competencias de algoritmos",
    "Desarrollar soluciones de IA/ML",
    "No estoy seguro aún, quiero explorar",
    "Otro"
  ];

  const colaboracionOpciones = [
    { value: "si-organizador", label: "Sí, me interesa ser parte del equipo organizador" },
    { value: "tal-vez", label: "Tal vez, dependiendo del tiempo que requiera" },
    { value: "solo-participar", label: "Prefiero participar como miembro en actividades" },
    { value: "no-se", label: "Aún no sé" }
  ];

  const comoSeEnteroOpciones = [
    "Puertas Abiertas",
    "Redes sociales", 
    "Amigo/a o conocido/a",
    "Docente",
    "Sitio web de la FIUNA",
    "Cartel en la facultad"
  ];

  const tiempoDisponibleOpciones = [
    { value: "2-4-horas", label: "2-4 horas por semana" },
    { value: "5-8-horas", label: "5-8 horas por semana" },
    { value: "9-15-horas", label: "9-15 horas por semana" },
    { value: "mas-15-horas", label: "Más de 15 horas por semana" },
    { value: "variable", label: "Variable según la época del año" }
  ];

  const nivelCompromisoOpciones = [
    { value: "casual", label: "Participación casual - asistir a eventos ocasionalmente" },
    { value: "regular", label: "Participación regular - asistir a la mayoría de actividades" },
    { value: "activo", label: "Miembro activo - participar y contribuir regularmente" },
    { value: "lider", label: "Liderazgo - organizar actividades y guiar equipos" }
  ];

  const fortalezasPrincipales = [
    "Resolución de problemas complejos",
    "Trabajo en equipo y colaboración",
    "Liderazgo y gestión de proyectos", 
    "Comunicación y presentaciones",
    "Creatividad e innovación",
    "Análisis y pensamiento crítico",
    "Aprendizaje rápido de nuevas tecnologías",
    "Diseño y experiencia de usuario",
    "Enseñanza y mentoring",
    "Networking y relaciones interpersonales",
    "Otro"
  ];

  const desafiosInteres = [
    "Proyectos de impacto social",
    "Competencias técnicas de alto nivel",
    "Investigación y desarrollo de nuevas tecnologías",
    "Startup y emprendimiento tecnológico",
    "Contribución a proyectos open source importantes",
    "Soluciones empresariales complejas",
    "Educación y democratización de la tecnología",
    "Innovación en IA y automatización",
    "Otro"
  ];

  const aprendizajePreferidoOpciones = [
    { value: "hands-on", label: "Aprendizaje práctico - trabajando en proyectos reales" },
    { value: "teoria-practica", label: "Combinación de teoría y práctica estructurada" },
    { value: "mentoring", label: "Mentoring 1-on-1 con miembros experimentados" },
    { value: "autodidacta", label: "Autoaprendizaje con recursos y orientación" },
    { value: "grupos", label: "Aprendizaje en grupos pequeños y colaborativo" }
  ];

  const handleCheckboxChange = (field: string, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field as keyof typeof prev] as string[]), value]
        : (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
    }));
    // clear errors for this checkbox group
    clearError(field);
  };

  const validateForm = () => {
    const fd = formData as FormState;
    const missing: Array<{ key: string; label: string }> = [];
    const errorsObj: Record<string, string> = {};

    const pushMissing = (key: string, label: string) => {
      missing.push({ key, label });
      errorsObj[key] = `${label} es obligatorio.`;
    };

    if (!fd.nombres?.trim()) pushMissing('nombres', 'Nombres');
    if (!fd.apellidos?.trim()) pushMissing('apellidos', 'Apellidos');
    if (!fd.cedula?.trim()) pushMissing('cedula', 'Número de Cédula');
    if (!fd.email?.trim()) pushMissing('email', 'Correo Electrónico');
    if (!fd.telefono?.trim()) pushMissing('telefono', 'Número de Teléfono');

    if (!fd.universidad) pushMissing('universidad', 'Universidad');
    if (fd.universidad === 'otra' && !fd.universidadOtra?.trim()) pushMissing('universidadOtra', 'Especifica tu universidad');

    if (!fd.carrera) pushMissing('carrera', 'Carrera');
    if (fd.carrera === 'otra' && !fd.carreraOtra?.trim()) pushMissing('carreraOtra', 'Especifica tu carrera');

    if (!fd.experienciaProgramacion) pushMissing('experienciaProgramacion', 'Experiencia en programación');
    if (!fd.areasInteres || fd.areasInteres.length === 0) pushMissing('areasInteres', 'Áreas de interés');
    if (!fd.actividadesInteres || fd.actividadesInteres.length === 0) pushMissing('actividadesInteres', 'Actividades de interés');
    if (!fd.colaboracionActiva) pushMissing('colaboracionActiva', 'Colaboración activa');

    if (!fd.tiempoDisponible) pushMissing('tiempoDisponible', 'Tiempo disponible');
    if (!fd.nivelCompromiso) pushMissing('nivelCompromiso', 'Nivel de compromiso');

    if (!fd.fortalezasPrincipales || fd.fortalezasPrincipales.length === 0) pushMissing('fortalezasPrincipales', 'Fortalezas principales');
    if (!fd.desafiosInteres || fd.desafiosInteres.length === 0) pushMissing('desafiosInteres', 'Desafíos de interés');

    if (!fd.objetivosPlazo?.trim()) pushMissing('objetivosPlazo', 'Objetivos a corto/mediano plazo');
    if (!fd.aprendizajePreferido) pushMissing('aprendizajePreferido', 'Estilo de aprendizaje');
    if (!fd.contribucionEsperada?.trim()) pushMissing('contribucionEsperada', 'Contribución esperada');

    if (!fd.comoSeEntero) pushMissing('comoSeEntero', 'Cómo te enteraste del club');

    setErrors(errorsObj);
    return { valid: missing.length === 0, missing };
  };

  const focusFirstMissing = (missing: Array<{ key: string; label: string }>) => {
    if (!missing || missing.length === 0) return;
    const firstKey = missing[0].key;

    const selectorMap: Record<string, string> = {
      nombres: '#nombres',
      apellidos: '#apellidos',
      cedula: '#cedula',
      email: '#email',
      telefono: '#telefono',
      universidad: '#universidad',
      universidadOtra: '#universidadOtra',
      carrera: '#carrera',
      carreraOtra: '#carreraOtra',
      experienciaProgramacion: 'input[name="experienciaProgramacion"]',
      areasInteres: 'input[type="checkbox"]',
      actividadesInteres: 'input[type="checkbox"]',
      colaboracionActiva: 'input[name="colaboracionActiva"]',
      tiempoDisponible: 'input[name="tiempoDisponible"]',
      nivelCompromiso: 'input[name="nivelCompromiso"]',
      fortalezasPrincipales: 'input[type="checkbox"]',
      desafiosInteres: 'input[type="checkbox"]',
      objetivosPlazo: '#objetivosPlazo',
      aprendizajePreferido: 'input[name="aprendizajePreferido"]',
      contribucionEsperada: '#contribucionEsperada',
      comoSeEntero: '#comoSeEntero',
    };

    const selector = selectorMap[firstKey] || null;
    try {
      let el: Element | null = null;
      if (selector) el = document.querySelector(selector);
      if (!el) el = document.querySelector('input, select, textarea');
      if (el && (el as HTMLElement).focus) (el as HTMLElement).focus();
    } catch (err) {
      // ignore focus errors in non-browser/test env
    }
  };

  const clearError = (key: string) => {
    if (!errors[key]) return;
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const result = validateForm();
    if (!result.valid) {
      console.debug('Validation failed, missing:', result.missing);
      const labels = result.missing.map(m => m.label).slice(0, 6);
      const more = result.missing.length > 6 ? ` y ${result.missing.length - 6} más` : '';
      toast({
        title: 'Campos obligatorios incompletos',
        description: `${labels.join(', ')}${more}. Por favor completá los campos marcados con *.`,
        variant: 'destructive',
      });
      focusFirstMissing(result.missing);
      setIsSubmitting(false);
      return;
    }

    try {
      if (GOOGLE_FORMS_CONFIG.enabled) {
        // Submit to Google Forms
        await submitToGoogleForms();
      } else {
        // Simulate form submission for testing
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      toast({
        title: "Solicitud enviada",
        description: "Hemos recibido tu solicitud. Te contactaremos en las próximas 48-72 horas.",
        variant: "default",
      });

      setIsSubmitted(true);
      resetForm();

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitToGoogleForms = async () => {
    const formDataToSubmit = new FormData();

    // Helper: map internal option values to human-readable labels where needed
    const getLabelForValue = (field: string, value: string) => {
      if (!value) return value;
      switch (field) {
        case 'universidad':
          return value === 'una' ? 'Universidad Nacional de Asunción' : value === 'otra' ? 'Otra' : value;
        case 'carrera':
          // carreras array defined above — try to find original label
          if (value === 'otra') return 'Otra';
          for (const c of carreras) {
            if (c.toLowerCase().replace(/ /g, '-') === value) return c;
          }
          return value;
        case 'experienciaProgramacion':
          return experienciaOpciones.find(o => o.value === value)?.label ?? value;
        case 'tiempoDisponible':
          return tiempoDisponibleOpciones.find(o => o.value === value)?.label ?? value;
        case 'nivelCompromiso':
          return nivelCompromisoOpciones.find(o => o.value === value)?.label ?? value;
        case 'aprendizajePreferido':
          return aprendizajePreferidoOpciones.find(o => o.value === value)?.label ?? value;
        case 'comoSeEntero':
          // front-end stores slugified labels
          return comoSeEnteroOpciones.find(l => l.toLowerCase().replace(/ /g, '-') === value) ?? value;
        case 'colaboracionActiva':
          return colaboracionOpciones.find(o => o.value === value)?.label ?? value;
        default:
          return value;
      }
    }

    // Map form data to Google Forms entry IDs
    const fieldToEntryMapping: Record<string, string> = {
      nombres: GOOGLE_FORMS_CONFIG.fieldMapping.nombres,
      apellidos: GOOGLE_FORMS_CONFIG.fieldMapping.apellidos,
      cedula: GOOGLE_FORMS_CONFIG.fieldMapping.cedula,
      email: GOOGLE_FORMS_CONFIG.fieldMapping.email,
      telefono: GOOGLE_FORMS_CONFIG.fieldMapping.telefono,
      universidad: GOOGLE_FORMS_CONFIG.fieldMapping.universidad,
      universidadOtra: GOOGLE_FORMS_CONFIG.fieldMapping.universidadOtra,
      carrera: GOOGLE_FORMS_CONFIG.fieldMapping.carrera,
      carreraOtra: GOOGLE_FORMS_CONFIG.fieldMapping.carreraOtra,
      experienciaProgramacion: GOOGLE_FORMS_CONFIG.fieldMapping.experienciaProgramacion,
      areasInteres: GOOGLE_FORMS_CONFIG.fieldMapping.areasInteres,
      herramientasLenguajes: GOOGLE_FORMS_CONFIG.fieldMapping.herramientasLenguajes,
      actividadesInteres: GOOGLE_FORMS_CONFIG.fieldMapping.actividadesInteres,
      colaboracionActiva: GOOGLE_FORMS_CONFIG.fieldMapping.colaboracionActiva,
      tiempoDisponible: GOOGLE_FORMS_CONFIG.fieldMapping.tiempoDisponible,
      nivelCompromiso: GOOGLE_FORMS_CONFIG.fieldMapping.nivelCompromiso,
      proyectosPrevios: GOOGLE_FORMS_CONFIG.fieldMapping.proyectosPrevios,
      liderazgoExperiencia: GOOGLE_FORMS_CONFIG.fieldMapping.liderazgoExperiencia,
      fortalezasPrincipales: GOOGLE_FORMS_CONFIG.fieldMapping.fortalezasPrincipales,
      desafiosInteres: GOOGLE_FORMS_CONFIG.fieldMapping.desafiosInteres,
      objetivosPlazo: GOOGLE_FORMS_CONFIG.fieldMapping.objetivosPlazo,
      aprendizajePreferido: GOOGLE_FORMS_CONFIG.fieldMapping.aprendizajePreferido,
      contribucionEsperada: GOOGLE_FORMS_CONFIG.fieldMapping.contribucionEsperada,
      comoSeEntero: GOOGLE_FORMS_CONFIG.fieldMapping.comoSeEntero,
    };

    // Iterate through actual form data fields
    for (const [key, entryId] of Object.entries(fieldToEntryMapping)) {
      const value = (formData as FormState)[key as keyof FormState];

      if (Array.isArray(value)) {
        // Checkbox groups: append each selected option as a separate entry param
        for (const v of value) {
          // If user selected "Otro", append __other_option__ and the response separately
          if (v === 'Otro') {
            formDataToSubmit.append(entryId, '__other_option__');
          } else {
            formDataToSubmit.append(entryId, v);
          }
        }

        // For checkbox groups with an associated text field (e.g., areasInteresOtra)
        if ((key as string).endsWith('areasInteres') && formData.areasInteresOtra) {
          formDataToSubmit.append(`${entryId}.other_option_response`, formData.areasInteresOtra);
        }
        if ((key as string).endsWith('herramientasLenguajes') && formData.herramientasLenguajesOtro) {
          formDataToSubmit.append(`${entryId}.other_option_response`, formData.herramientasLenguajesOtro);
        }
        if ((key as string).endsWith('actividadesInteres') && formData.actividadesInteresOtra) {
          formDataToSubmit.append(`${entryId}.other_option_response`, formData.actividadesInteresOtra);
        }
        if ((key as string).endsWith('fortalezasPrincipales') && formData.fortalezasPrincipalesOtra) {
          formDataToSubmit.append(`${entryId}.other_option_response`, formData.fortalezasPrincipalesOtra);
        }
        if ((key as string).endsWith('desafiosInteres') && formData.desafiosInteresOtro) {
          formDataToSubmit.append(`${entryId}.other_option_response`, formData.desafiosInteresOtro);
        }

      } else if (value) {
        // Single value fields — translate internal value to label when necessary
        const label = getLabelForValue(key, String(value));
        formDataToSubmit.append(entryId, label);

        // Handle special 'Otra' text fields (these won't re-append since they're checked in the condition)
        // These are already in the mapping, so skip extra appends
      }
    }

    // Map comentarios fields separately (they're not in the fieldMapping loop)
    if (formData.comentarios1) {
      const eid1 = GOOGLE_FORMS_CONFIG.fieldMapping['comentariosSection1'] as string;
      formDataToSubmit.append(eid1, formData.comentarios1);
    }
    if (formData.comentarios2) {
      const eid2 = GOOGLE_FORMS_CONFIG.fieldMapping['comentariosSection2'] as string;
      formDataToSubmit.append(eid2, formData.comentarios2);
    }

    // Debug: Log what we're sending
    console.log('=== Form Submission Debug ===');
    console.log('Submitting to:', GOOGLE_FORMS_CONFIG.actionUrl);
    for (const pair of formDataToSubmit.entries()) {
      console.log(pair[0], '=', pair[1]);
    }
    console.log('=== End Debug ===');

    // Submit to Google Forms
    // We must use no-cors from the browser; this returns an opaque response. For more control,
    // consider creating a server endpoint that forwards submissions (recommended).
    const response = await fetch(GOOGLE_FORMS_CONFIG.actionUrl, {
      method: 'POST',
      body: formDataToSubmit,
      mode: 'no-cors',
    });

    return response;
  };

  const resetForm = () => {
    setFormData({
      nombres: "",
      apellidos: "",
      cedula: "",
      email: "",
      telefono: "",
      universidad: "",
      universidadOtra: "",
      carrera: "",
      carreraOtra: "",
      experienciaProgramacion: "",
      areasInteres: [],
      areasInteresOtra: "",
      herramientasLenguajes: [],
      herramientasLenguajesOtro: "",
      actividadesInteres: [],
      actividadesInteresOtra: "",
      colaboracionActiva: "",
      comentarios1: "",
      comentarios2: "",
      comoSeEntero: "",
      tiempoDisponible: "",
      nivelCompromiso: "",
      proyectosPrevios: "",
      liderazgoExperiencia: "",
      objetivosPlazo: "",
      fortalezasPrincipales: [],
      fortalezasPrincipalesOtra: "",
      desafiosInteres: [],
      desafiosInteresOtro: "",
      aprendizajePreferido: "",
      contribucionEsperada: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="glass-card-static p-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-xl font-semibold">¡Solicitud Enviada Exitosamente!</h3>
          <p className="text-muted-foreground max-w-md">
            Gracias por tu interés en unirte al Club de Programación FIUNA. 
            Revisaremos tu solicitud y te contactaremos lo antes posible.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 rounded-full bg-background border border-input hover:bg-accent hover:text-accent-foreground transition-all"
          >
            Enviar Otra Solicitud
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card-static p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Solicitud de Admisión</h2>
        <p className="text-muted-foreground">
          Completa este formulario para unirte al Club de Programación FIUNA. 
          Todos los campos marcados con * son obligatorios.
        </p>
      </div>

      <div className="space-y-8">
        {/* Datos Personales */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            Datos Personales
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nombres" className="text-sm font-medium">Nombres *</label>
              <input
                id="nombres"
                type="text"
                required
                value={formData.nombres}
                onChange={(e) => { setFormData(prev => ({ ...prev, nombres: e.target.value })); clearError('nombres'); }}
                aria-invalid={!!errors.nombres}
                aria-describedby={errors.nombres ? 'nombres-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.nombres ? ' border-red-600' : ''}`}
                placeholder="Ej: Juan Carlos"
              />
              {errors.nombres && (
                <p id="nombres-error" className="text-sm text-red-600 mt-1">{errors.nombres}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="apellidos" className="text-sm font-medium">Apellidos *</label>
              <input
                id="apellidos"
                type="text"
                required
                value={formData.apellidos}
                onChange={(e) => { setFormData(prev => ({ ...prev, apellidos: e.target.value })); clearError('apellidos'); }}
                aria-invalid={!!errors.apellidos}
                aria-describedby={errors.apellidos ? 'apellidos-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.apellidos ? ' border-red-600' : ''}`}
                placeholder="Ej: González Pérez"
              />
              {errors.apellidos && (
                <p id="apellidos-error" className="text-sm text-red-600 mt-1">{errors.apellidos}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="cedula" className="text-sm font-medium">Número de Cédula de Identidad *</label>
              <input
                id="cedula"
                type="text"
                required
                value={formData.cedula}
                onChange={(e) => { setFormData(prev => ({ ...prev, cedula: e.target.value })); clearError('cedula'); }}
                aria-invalid={!!errors.cedula}
                aria-describedby={errors.cedula ? 'cedula-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.cedula ? ' border-red-600' : ''}`}
                placeholder="Ej: 1.234.567"
              />
              {errors.cedula && (
                <p id="cedula-error" className="text-sm text-red-600 mt-1">{errors.cedula}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Correo Electrónico *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => { setFormData(prev => ({ ...prev, email: e.target.value })); clearError('email'); }}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.email ? ' border-red-600' : ''}`}
                placeholder="nombre@fiuna.edu.py"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="telefono" className="text-sm font-medium">Número de Teléfono *</label>
              <input
                id="telefono"
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => { setFormData(prev => ({ ...prev, telefono: e.target.value })); clearError('telefono'); }}
                aria-invalid={!!errors.telefono}
                aria-describedby={errors.telefono ? 'telefono-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.telefono ? ' border-red-600' : ''}`}
                placeholder="Ej: 0981 123 456"
              />
              {errors.telefono && (
                <p id="telefono-error" className="text-sm text-red-600 mt-1">{errors.telefono}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="universidad" className="text-sm font-medium">Universidad *</label>
              <select
                id="universidad"
                name="universidad"
                aria-label="Seleccionar universidad"
                required
                value={formData.universidad}
                onChange={(e) => { setFormData(prev => ({ ...prev, universidad: e.target.value })); clearError('universidad'); }}
                aria-invalid={!!errors.universidad}
                aria-describedby={errors.universidad ? 'universidad-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.universidad ? ' border-red-600' : ''}`}
              >
                <option value="">Selecciona tu universidad</option>
                <option value="una">Universidad Nacional de Asunción</option>
                <option value="otra">Otra</option>
              </select>
              {errors.universidad && (
                <p id="universidad-error" className="text-sm text-red-600 mt-1">{errors.universidad}</p>
              )}
            </div>
          </div>
          
          {formData.universidad === "otra" && (
            <div className="mt-4 space-y-2">
              <label htmlFor="universidadOtra" className="text-sm font-medium">Especifica tu universidad</label>
              <input
                id="universidadOtra"
                type="text"
                value={formData.universidadOtra}
                onChange={(e) => { setFormData(prev => ({ ...prev, universidadOtra: e.target.value })); clearError('universidadOtra'); }}
                aria-invalid={!!errors.universidadOtra}
                aria-describedby={errors.universidadOtra ? 'universidadOtra-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.universidadOtra ? ' border-red-600' : ''}`}
                placeholder="Nombre de tu universidad"
              />
              {errors.universidadOtra && (
                <p id="universidadOtra-error" className="text-sm text-red-600 mt-1">{errors.universidadOtra}</p>
              )}
            </div>
          )}
          
          <div className="mt-4 space-y-2">
            <label htmlFor="carrera" className="text-sm font-medium">Carrera *</label>
            <select
              id="carrera"
              name="carrera"
              aria-label="Seleccionar carrera"
              required
              value={formData.carrera}
              onChange={(e) => { setFormData(prev => ({ ...prev, carrera: e.target.value })); clearError('carrera'); }}
              aria-invalid={!!errors.carrera}
              aria-describedby={errors.carrera ? 'carrera-error' : undefined}
              className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.carrera ? ' border-red-600' : ''}`}
            >
              <option value="">Selecciona tu carrera</option>
              {carreras.map((carrera) => (
                <option key={carrera} value={carrera.toLowerCase().replace(/ /g, "-")}>
                  {carrera}
                </option>
              ))}
            </select>
            {errors.carrera && (
              <p id="carrera-error" className="text-sm text-red-600 mt-1">{errors.carrera}</p>
            )}
          </div>
          
          {formData.carrera === "otra" && (
            <div className="mt-4 space-y-2">
              <label htmlFor="carreraOtra" className="text-sm font-medium">Especifica tu carrera</label>
              <input
                id="carreraOtra"
                type="text"
                value={formData.carreraOtra}
                onChange={(e) => { setFormData(prev => ({ ...prev, carreraOtra: e.target.value })); clearError('carreraOtra'); }}
                aria-invalid={!!errors.carreraOtra}
                aria-describedby={errors.carreraOtra ? 'carreraOtra-error' : undefined}
                className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.carreraOtra ? ' border-red-600' : ''}`}
                placeholder="Nombre de tu carrera"
              />
              {errors.carreraOtra && (
                <p id="carreraOtra-error" className="text-sm text-red-600 mt-1">{errors.carreraOtra}</p>
              )}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Experiencia y Expectativas */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            Experiencia y Expectativas
          </h3>
          
          {/* Experiencia en programación */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Tenés experiencia previa en programación? *</label>
            <div className="space-y-2">
              {experienciaOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="experienciaProgramacion"
                    value={opcion.value}
                    checked={formData.experienciaProgramacion === opcion.value}
                    onChange={(e) => { setFormData(prev => ({ ...prev, experienciaProgramacion: e.target.value })); clearError('experienciaProgramacion'); }}
                    className={`text-primary focus:ring-primary${errors.experienciaProgramacion ? ' border-red-600' : ''}`}
                    aria-invalid={!!errors.experienciaProgramacion}
                    aria-describedby={errors.experienciaProgramacion ? 'experienciaProgramacion-error' : undefined}
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
                    {errors.experienciaProgramacion && (
                      <p id="experienciaProgramacion-error" className="text-sm text-red-600 mt-1">{errors.experienciaProgramacion}</p>
                    )}
            
            </div>
          </div>
          
          {/* Áreas de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué áreas te interesan más dentro de la programación? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {areasInteres.map((area) => (
                <label key={area} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.areasInteres.includes(area)}
                    onChange={(e) => handleCheckboxChange('areasInteres', area, e.target.checked)}
                    className="text-primary focus:ring-primary"
                    aria-invalid={!!errors.areasInteres}
                    aria-describedby={errors.areasInteres ? 'areasInteres-error' : undefined}
                  />
                  <span className="text-sm">{area}</span>
                </label>
              ))}
            </div>
            {formData.areasInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.areasInteresOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, areasInteresOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otras áreas te interesan"
              />
            )}
            {errors.areasInteres && (
              <p id="areasInteres-error" className="text-sm text-red-600 mt-1">{errors.areasInteres}</p>
            )}
          </div>
          
          {/* Herramientas y lenguajes */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué herramientas o lenguajes manejás actualmente (si alguno)?</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {herramientas.map((herramienta) => (
                <label key={herramienta} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.herramientasLenguajes.includes(herramienta)}
                    onChange={(e) => handleCheckboxChange('herramientasLenguajes', herramienta, e.target.checked)}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="text-sm">{herramienta}</span>
                </label>
              ))}
            </div>
            {formData.herramientasLenguajes.includes("Otro") && (
              <input
                type="text"
                value={formData.herramientasLenguajesOtro}
                onChange={(e) => setFormData(prev => ({ ...prev, herramientasLenguajesOtro: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otros lenguajes o herramientas conocés"
              />
            )}
          </div>
          
          {/* Actividades de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿En qué tipo de actividades te gustaría participar en el club? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {actividades.map((actividad) => (
                <label key={actividad} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.actividadesInteres.includes(actividad)}
                    onChange={(e) => handleCheckboxChange('actividadesInteres', actividad, e.target.checked)}
                    className="text-primary focus:ring-primary"
                    aria-invalid={!!errors.actividadesInteres}
                    aria-describedby={errors.actividadesInteres ? 'actividadesInteres-error' : undefined}
                  />
                  <span className="text-sm">{actividad}</span>
                </label>
              ))}
            </div>
            {formData.actividadesInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.actividadesInteresOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, actividadesInteresOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otras actividades te interesan"
              />
            )}
            {errors.actividadesInteres && (
              <p id="actividadesInteres-error" className="text-sm text-red-600 mt-1">{errors.actividadesInteres}</p>
            )}
          </div>
          
          {/* Colaboración activa */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Te gustaría colaborar activamente en la organización y trabajo del club? *</label>
            <div className="space-y-2">
              {colaboracionOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="colaboracionActiva"
                    value={opcion.value}
                    checked={formData.colaboracionActiva === opcion.value}
                    onChange={(e) => { setFormData(prev => ({ ...prev, colaboracionActiva: e.target.value })); clearError('colaboracionActiva'); }}
                    className={`text-primary focus:ring-primary${errors.colaboracionActiva ? ' border-red-600' : ''}`}
                    aria-invalid={!!errors.colaboracionActiva}
                    aria-describedby={errors.colaboracionActiva ? 'colaboracionActiva-error' : undefined}
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            {errors.colaboracionActiva && (
              <p id="colaboracionActiva-error" className="text-sm text-red-600 mt-1">{errors.colaboracionActiva}</p>
            )}
            </div>
          </div>
          
          {/* Comentarios */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comentarios1" className="text-sm font-medium">¿Querés agregar algún comentario, sugerencia o idea para el club?</label>
            <textarea
              id="comentarios1"
              value={formData.comentarios1}
              onChange={(e) => setFormData(prev => ({ ...prev, comentarios1: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Comparte tus ideas, sugerencias o cualquier comentario que consideres relevante..."
            />
          </div>
          
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Assessment and Placement */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              3
            </div>
            Evaluación y Ubicación en el Club
          </h3>

          {/* Tiempo disponible */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuánto tiempo podrías dedicar al club semanalmente? *</label>
            <div className="space-y-2">
              {tiempoDisponibleOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="tiempoDisponible"
                    value={opcion.value}
                    checked={formData.tiempoDisponible === opcion.value}
                    onChange={(e) => { setFormData(prev => ({ ...prev, tiempoDisponible: e.target.value })); clearError('tiempoDisponible'); }}
                    className={`text-primary focus:ring-primary${errors.tiempoDisponible ? ' border-red-600' : ''}`}
                    aria-invalid={!!errors.tiempoDisponible}
                    aria-describedby={errors.tiempoDisponible ? 'tiempoDisponible-error' : undefined}
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            {errors.tiempoDisponible && (
              <p id="tiempoDisponible-error" className="text-sm text-red-600 mt-1">{errors.tiempoDisponible}</p>
            )}
            </div>
          </div>

          {/* Nivel de compromiso */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué nivel de compromiso buscás con el club? *</label>
            <div className="space-y-2">
              {nivelCompromisoOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="nivelCompromiso"
                    value={opcion.value}
                    checked={formData.nivelCompromiso === opcion.value}
                    onChange={(e) => { setFormData(prev => ({ ...prev, nivelCompromiso: e.target.value })); clearError('nivelCompromiso'); }}
                    className={`text-primary focus:ring-primary${errors.nivelCompromiso ? ' border-red-600' : ''}`}
                    aria-invalid={!!errors.nivelCompromiso}
                    aria-describedby={errors.nivelCompromiso ? 'nivelCompromiso-error' : undefined}
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            {errors.nivelCompromiso && (
              <p id="nivelCompromiso-error" className="text-sm text-red-600 mt-1">{errors.nivelCompromiso}</p>
            )}
            </div>
          </div>

          {/* Proyectos previos */}
          <div className="mb-6 space-y-2">
            <label htmlFor="proyectosPrevios" className="text-sm font-medium">Describe brevemente algún proyecto personal o académico de programación del que te sientas orgulloso/a</label>
            <p className="text-xs text-muted-foreground mb-2">Esto nos ayuda a entender tu nivel técnico y tipo de proyectos que te interesan</p>
            <textarea
              id="proyectosPrevios"
              value={formData.proyectosPrevios}
              onChange={(e) => { setFormData(prev => ({ ...prev, proyectosPrevios: e.target.value })); clearError('proyectosPrevios'); }}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Desarrollé una app móvil para organizar tareas usando React Native y Firebase. Me gustó porque aprendí sobre autenticación y bases de datos en tiempo real..."
            />
          </div>

          {/* Experiencia de liderazgo */}
          <div className="mb-6 space-y-2">
            <label htmlFor="liderazgoExperiencia" className="text-sm font-medium">¿Tenés experiencia liderando equipos o proyectos? (académicos, laborales, voluntarios, etc.)</label>
            <textarea
              id="liderazgoExperiencia"
              value={formData.liderazgoExperiencia}
              onChange={(e) => { setFormData(prev => ({ ...prev, liderazgoExperiencia: e.target.value })); clearError('liderazgoExperiencia'); }}
              rows={3}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Ej: Coordiné un grupo de estudio para el examen de Algoritmos, organizamos sesiones semanales y creamos material de apoyo..."
            />
          </div>

          {/* Fortalezas principales */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuáles considerás que son tus principales fortalezas? *</label>
            <p className="text-xs text-muted-foreground mb-3">Selecciona las 3-5 que mejor te representen</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {fortalezasPrincipales.map((fortaleza) => (
                <label key={fortaleza} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.fortalezasPrincipales.includes(fortaleza)}
                    onChange={(e) => handleCheckboxChange('fortalezasPrincipales', fortaleza, e.target.checked)}
                    className="text-primary focus:ring-primary"
                    aria-invalid={!!errors.fortalezasPrincipales}
                    aria-describedby={errors.fortalezasPrincipales ? 'fortalezasPrincipales-error' : undefined}
                  />
                  <span className="text-sm">{fortaleza}</span>
                </label>
              ))}
            </div>
            {formData.fortalezasPrincipales.includes("Otro") && (
              <input
                type="text"
                value={formData.fortalezasPrincipalesOtra}
                onChange={(e) => setFormData(prev => ({ ...prev, fortalezasPrincipalesOtra: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica tu otra fortaleza principal"
              />
            )}
            {errors.fortalezasPrincipales && (
              <p id="fortalezasPrincipales-error" className="text-sm text-red-600 mt-1">{errors.fortalezasPrincipales}</p>
            )}
          </div>

          {/* Desafíos de interés */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Qué tipo de desafíos técnicos te emocionan más? *</label>
            <p className="text-xs text-muted-foreground mb-3">Puedes seleccionar múltiples opciones</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {desafiosInteres.map((desafio) => (
                <label key={desafio} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.desafiosInteres.includes(desafio)}
                    onChange={(e) => handleCheckboxChange('desafiosInteres', desafio, e.target.checked)}
                    className="text-primary focus:ring-primary"
                    aria-invalid={!!errors.desafiosInteres}
                    aria-describedby={errors.desafiosInteres ? 'desafiosInteres-error' : undefined}
                  />
                  <span className="text-sm">{desafio}</span>
                </label>
              ))}
            </div>
            {formData.desafiosInteres.includes("Otro") && (
              <input
                type="text"
                value={formData.desafiosInteresOtro}
                onChange={(e) => setFormData(prev => ({ ...prev, desafiosInteresOtro: e.target.value }))}
                className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                placeholder="Especifica qué otros desafíos te interesan"
              />
            )}
            {errors.desafiosInteres && (
              <p id="desafiosInteres-error" className="text-sm text-red-600 mt-1">{errors.desafiosInteres}</p>
            )}
          </div>

          {/* Objetivos a corto/mediano plazo */}
          <div className="mb-6 space-y-2">
            <label htmlFor="objetivosPlazo" className="text-sm font-medium">¿Cuáles son tus objetivos profesionales/académicos en los próximos 1-2 años? *</label>
            <p className="text-xs text-muted-foreground mb-2">Esto nos ayuda a alinear las oportunidades del club con tus metas</p>
            <textarea
              id="objetivosPlazo"
              required
              value={formData.objetivosPlazo}
              onChange={(e) => { setFormData(prev => ({ ...prev, objetivosPlazo: e.target.value })); clearError('objetivosPlazo'); }}
              rows={3}
              className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.objetivosPlazo ? ' border-red-600' : ''}`}
              placeholder="Ej: Quiero especializarme en desarrollo web, conseguir una pasantía en una empresa de tech, y eventualmente trabajar en productos que impacten positivamente..."
              aria-invalid={!!errors.objetivosPlazo}
              aria-describedby={errors.objetivosPlazo ? 'objetivosPlazo-error' : undefined}
            />
            {errors.objetivosPlazo && (
              <p id="objetivosPlazo-error" className="text-sm text-red-600 mt-1">{errors.objetivosPlazo}</p>
            )}
          </div>

          {/* Estilo de aprendizaje preferido */}
          <div className="mb-6 space-y-2">
            <label className="text-sm font-medium">¿Cuál es tu estilo de aprendizaje preferido? *</label>
            <div className="space-y-2">
              {aprendizajePreferidoOpciones.map((opcion) => (
                <label key={opcion.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="aprendizajePreferido"
                    value={opcion.value}
                    checked={formData.aprendizajePreferido === opcion.value}
                    onChange={(e) => { setFormData(prev => ({ ...prev, aprendizajePreferido: e.target.value })); clearError('aprendizajePreferido'); }}
                    className={`text-primary focus:ring-primary${errors.aprendizajePreferido ? ' border-red-600' : ''}`}
                    aria-invalid={!!errors.aprendizajePreferido}
                    aria-describedby={errors.aprendizajePreferido ? 'aprendizajePreferido-error' : undefined}
                  />
                  <span className="text-sm">{opcion.label}</span>
                </label>
              ))}
            {errors.aprendizajePreferido && (
              <p id="aprendizajePreferido-error" className="text-sm text-red-600 mt-1">{errors.aprendizajePreferido}</p>
            )}
            </div>
          </div>

          {/* Contribución esperada */}
          <div className="mb-6 space-y-2">
            <label htmlFor="contribucionEsperada" className="text-sm font-medium">¿Cómo te gustaría contribuir al crecimiento y éxito del club? *</label>
            <p className="text-xs text-muted-foreground mb-2">Pensá en qué valor único podrías aportar basado en tu experiencia y habilidades</p>
            <textarea
              id="contribucionEsperada"
              required
              value={formData.contribucionEsperada}
              onChange={(e) => { setFormData(prev => ({ ...prev, contribucionEsperada: e.target.value })); clearError('contribucionEsperada'); }}
              rows={4}
              className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.contribucionEsperada ? ' border-red-600' : ''}`}
              placeholder="Ej: Me gustaría ayudar a organizar talleres de React para principiantes, contribuir al desarrollo de la página web del club, y ser mentor de nuevos miembros..."
              aria-invalid={!!errors.contribucionEsperada}
              aria-describedby={errors.contribucionEsperada ? 'contribucionEsperada-error' : undefined}
            />
            {errors.contribucionEsperada && (
              <p id="contribucionEsperada-error" className="text-sm text-red-600 mt-1">{errors.contribucionEsperada}</p>
            )}
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Información General - Renumbered to 4 */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
              4
            </div>
            Información General
          </h3>
          
          {/* Cómo se enteró */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comoSeEntero" className="text-sm font-medium">¿Cómo te enteraste del club? *</label>
            <select
              id="comoSeEntero"
              name="comoSeEntero"
              aria-label="Seleccionar cómo se enteró del club"
              required
              value={formData.comoSeEntero}
              onChange={(e) => { setFormData(prev => ({ ...prev, comoSeEntero: e.target.value })); clearError('comoSeEntero'); }}
              className={`w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all${errors.comoSeEntero ? ' border-red-600' : ''}`}
              aria-invalid={!!errors.comoSeEntero}
              aria-describedby={errors.comoSeEntero ? 'comoSeEntero-error' : undefined}
            >
              <option value="">Selecciona una opción</option>
              {comoSeEnteroOpciones.map((opcion) => (
                <option key={opcion} value={opcion.toLowerCase().replace(/ /g, "-")}>
                  {opcion}
                </option>
              ))}
            </select>
            {errors.comoSeEntero && (
              <p id="comoSeEntero-error" className="text-sm text-red-600 mt-1">{errors.comoSeEntero}</p>
            )}
          </div>

          {/* Comentarios adicionales */}
          <div className="mb-6 space-y-2">
            <label htmlFor="comentarios2" className="text-sm font-medium">¿Querés agregar algún comentario, sugerencia o pregunta adicional?</label>
            <textarea
              id="comentarios2"
              value={formData.comentarios2}
              onChange={(e) => setFormData(prev => ({ ...prev, comentarios2: e.target.value }))}
              rows={4}
              className="w-full px-4 py-2 rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Cualquier información adicional que consideres relevante para tu candidatura..."
            />
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-border"></div>

        {/* Información adicional */}
        <div className="bg-muted/50 dark:bg-black/20 p-4 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground">
            Al enviar esta solicitud, acepto que mis datos sean procesados por el Club de Programación FIUNA 
            para evaluar mi candidatura. Los datos serán tratados de forma confidencial y solo se utilizarán 
            para el proceso de admisión y comunicaciones relacionadas con el club.
          </div>
        </div>

        {/* Botón de envío */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all min-w-[200px] ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-neon-blue'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⏳</span>
                Enviando...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Enviar Solicitud
              </span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdmissionForm;
