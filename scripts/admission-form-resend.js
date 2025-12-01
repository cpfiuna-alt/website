// ================================================================================
// 📧 Google Apps Script for Admission Form Email Automation
// ================================================================================
// 
// This script automatically sends confirmation emails when students submit
// your Google Form admission application.
//
// ⚠️ IMPORTANT: This script ONLY works when properly deployed in Google Apps Script
// with a TRIGGER configured. Follow these steps:
//
// 📋 SETUP INSTRUCTIONS:
// 
// 1️⃣ CREATE RESEND ACCOUNT & GET API KEY
//    - Sign up at: https://resend.com/signup
//    - Get API key: https://resend.com/api-keys
//    - Copy the key (starts with 're_')
//
// 2️⃣ OPEN GOOGLE APPS SCRIPT
//    - Open your Google Spreadsheet (linked to form)
//    - Click: Extensions → Apps Script
//    - Paste this entire file
//    - Update line 30 with your Resend API key
//
// 3️⃣ SET UP THE TRIGGER (⚠️ THE MOST IMPORTANT STEP!)
//    - In Apps Script, click the CLOCK ICON ⏰ (Triggers) in left sidebar
//    - Click "+ Add Trigger" (bottom right)
//    - Configure EXACTLY like this:
//      ┌─────────────────────────────────────────────────────┐
//      │ Choose which function to run: onFormSubmit          │
//      │ Choose which deployment should run: Head            │
//      │ Select event source: From spreadsheet              │
//      │ Select event type: On form submit                  │
//      └─────────────────────────────────────────────────────┘
//    - Click "Save"
//    - Authorize when prompted
//
// 4️⃣ TEST IT
//    - First, submit a test form to trigger debugFormStructure()
//    - Check Apps Script → Executions to see column structure
//    - Update the column indices in onFormSubmit() (around line 107-110)
//    - Then test with testEmailSetup() function manually
//    - Submit another test form and check your email
//    - Check Apps Script → Executions for logs
//
// 📚 FULL DOCUMENTATION:
//    See: docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md
//
// ❓ WHAT ABOUT THE WEB APP URL?
//    You DON'T need it! The trigger system handles everything internally.
//    Ignore any mention of web app deployment URLs.
//
// ================================================================================

// ============= CONFIGURATION =============
// 1. Get your API key from: https://resend.com/api-keys
// 2. Paste it here (replace 're_YOUR_API_KEY_HERE')
const RESEND_API_KEY = 're_YOUR_API_KEY_HERE'; // TODO: Add your Resend API key

// 3. Choose email mode:
// TESTING MODE (sandbox - only sends to verified emails in your Resend account)
// const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';

// PRODUCTION MODE - DNS verified ✓
const FROM_EMAIL = 'Club de Programación FIUNA <admisiones@cpfiuna.io>';

// Team emails for notifications
const TEAM_EMAILS = [
  'clubdeprogramacion@ing.una.py',
  // Add more team members:
  // 'presidente@cpfiuna.io',
  // 'secretario@cpfiuna.io',
];
// =========================================


// === UTILITY FUNCTIONS ===
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '');
}

function validateData(data) {
  if (!data || typeof data !== 'object') return false;
  
  const requiredFields = ['nombres', 'apellidos', 'email', 'carrera'];
  for (const field of requiredFields) {
    if (!data[field] || typeof data[field] !== 'string') return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return false;
  
  return true;
}


// === MAIN TRIGGER FUNCTION ===
// This function runs automatically when someone submits the Google Form
function onFormSubmit(e) {
  try {
    // Log event structure for debugging
    Logger.log('Event received. Keys: ' + Object.keys(e).join(', '));
    
    // METHOD 1: Try to get from event values
    let values = e.values;
    
    // METHOD 2: If e.values doesn't work, read from the sheet directly
    if (!values || values.length === 0) {
      Logger.log('No e.values found, reading from sheet directly...');
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const lastRow = sheet.getLastRow();
      values = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
      Logger.log('Read from sheet row ' + lastRow + ': ' + JSON.stringify(values));
    } else {
      Logger.log('Form values from e.values: ' + JSON.stringify(values));
    }
    
    if (!values || values.length === 0) {
      Logger.log('❌ Error: No values found anywhere!');
      return;
    }
    
    // Based on your actual form structure:
    // Column 0: Timestamp
    // Column 1: Nombres ✅
    // Column 2: Apellidos ✅
    // Column 3: Cédula
    // Column 4: Email ✅
    // Column 5: Teléfono
    // Column 6: Universidad
    // Column 7: Universidad (otra)
    // Column 8: Facultad
    // Column 9: Facultad (otra)
    // Column 10: Carrera ✅
    
    const rawData = {
      nombres: values[1],
      apellidos: values[2],
      email: values[4],        // ← Fixed: Email is in column 4
      carrera: values[10]      // ← Fixed: Carrera is in column 10
    };
    
    Logger.log('Extracted data: ' + JSON.stringify(rawData));

    // Sanitize and prepare data (skip validation for now to see what we get)
    const data = {
      nombres: sanitizeInput(rawData.nombres || ''),
      apellidos: sanitizeInput(rawData.apellidos || ''),
      email: sanitizeInput(rawData.email || ''),
      carrera: sanitizeInput(rawData.carrera || ''),
      fecha: Utilities.formatDate(new Date(), 'America/Asuncion', 'dd/MM/yyyy')
    };
    
    Logger.log('Sanitized data: ' + JSON.stringify(data));

    // Basic validation (more lenient)
    if (!data.email || !data.email.includes('@')) {
      Logger.log('❌ Invalid email, skipping email send: ' + data.email);
      return;
    }
    
    if (!data.nombres || !data.apellidos) {
      Logger.log('❌ Missing name fields, skipping email send');
      return;
    }

    // Note: Spreadsheet is already updated by the form submission
    // No need to append row again

    // Send emails
    Logger.log('Attempting to send confirmation email...');
    sendConfirmationEmail(data);
    
    Logger.log('Attempting to send team notification...');
    sendTeamNotification(data);

    Logger.log('Successfully processed submission for: ' + data.email);

  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
    
    // Notify admin of error
    try {
      UrlFetchApp.fetch('https://api.resend.com/emails', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify({
          from: FROM_EMAIL,
          to: TEAM_EMAILS[0],
          subject: 'Error en formulario de admisión',
          text: 'Error: ' + error.toString()
        }),
        muteHttpExceptions: true
      });
    } catch (e) {
      Logger.log('Failed to send error notification: ' + e.toString());
    }
  }
}


// === EMAIL SENDING FUNCTIONS ===
function sendConfirmationEmail(data) {
  // HTML email template (your existing beautiful email design)
  const htmlTemplate = '<!DOCTYPE html>\n' +
'<html lang="es">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
'<title>Club de Programación FIUNA - Confirmación de Solicitud</title>\n' +
'<style>\n' +
'    @import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\');\n' +
'    .ultima-section {\n' +
'      margin-top: 30px;\n' +
'      clear: both;\n' +
'      visibility: visible !important;\n' +
'      display: block !important;\n' +
'    }\n' +
'</style>\n' +
'</head>\n' +
'<body style="margin: 0; padding: 0; background-image: linear-gradient(to bottom, #070a13, #010101); font-family: \'Inter\', Arial, sans-serif; color: #94a3b8;">\n' +
'<table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#070a13" style="background-image: linear-gradient(to bottom, #070a13, #010101);">\n' +
'  <tr>\n' +
'    <td align="center" style="padding: 20px 0;">\n' +
'      <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; margin: 0 auto; background-color: transparent;">\n' +
'        <tr>\n' +
'          <td style="padding: 20px;">\n' +
'            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 24px;">\n' +
'              <tr>\n' +
'                <td width="50%" style="text-align: left; vertical-align: middle;">\n' +
'                  <img src="https://recursos.cpfiuna.io/Imagenes/Logos/cpf-logo.png" alt="Club de Programación FIUNA" style="max-width: 120px; height: auto;">\n' +
'                </td>\n' +
'                <td width="50%" style="text-align: right; vertical-align: middle;">\n' +
'                  <p style="color: #fafafa; margin: 0; font-size: 13px; font-weight: 500;">Por amor al código y la innovación</p>\n' +
'                </td>\n' +
'              </tr>\n' +
'            </table>\n' +
'            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(0, 0, 0, 0.8); border: 2px solid #1b1b1b; border-radius: 12px; margin-bottom: 24px; box-shadow: 0 4px 15px rgba(5, 54, 181, 0.15);">\n' +
'              <tr>\n' +
'                <td style="padding: 32px;">\n' +
'                  <h2 style="font-size: 20px; font-weight: 600; color: #fafafa; margin-top: 0; margin-bottom: 12px;">¡Hola {{NOMBRES}}! 👋</h2>\n' +
'                  <p style="font-size: 16px; line-height: 1.6; color: #94a3b8; margin: 0; margin-bottom: 16px;">\n' +
'                    Gracias por tu interés en unirte al <strong style="color: #3b82f6;">Club de Programación FIUNA</strong>. \n' +
'                    Hemos recibido tu solicitud de admisión y queremos que sepas que estamos emocionados de conocerte.\n' +
'                  </p>\n' +
'                  <div style="background-color: rgba(59, 130, 246, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); margin: 24px 0;">\n' +
'                    <h3 style="font-size: 18px; font-weight: 600; color: #fafafa; margin: 0 0 12px 0;">Resumen de tu solicitud:</h3>\n' +
'                    <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                      <tr>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong style="color: #fafafa;">Nombre:</strong></td>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">{{NOMBRES}} {{APELLIDOS}}</td>\n' +
'                      </tr>\n' +
'                      <tr>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong style="color: #fafafa;">Email:</strong></td>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">{{EMAIL}}</td>\n' +
'                      </tr>\n' +
'                      <tr>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong style="color: #fafafa;">Carrera:</strong></td>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">{{CARRERA}}</td>\n' +
'                      </tr>\n' +
'                      <tr>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;"><strong style="color: #fafafa;">Fecha de solicitud:</strong></td>\n' +
'                        <td style="padding: 8px 0; color: #94a3b8; font-size: 14px;">{{FECHA}}</td>\n' +
'                      </tr>\n' +
'                    </table>\n' +
'                  </div>\n' +
'                  <h3 style="font-size: 18px; font-weight: 600; color: #fafafa; margin: 24px 0 12px 0;">⏰ ¿Qué sigue ahora?</h3>\n' +
'                  <div style="margin: 16px 0;">\n' +
'                    <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                      <tr>\n' +
'                        <td width="40" valign="top" style="padding-top: 4px;">\n' +
'                          <div style="width: 32px; height: 32px; background-color: rgba(59, 130, 246, 0.2); border-radius: 50%; font-weight: 600; color: #3b82f6; font-size: 14px; text-align: center; line-height: 32px;">1</div>\n' +
'                        </td>\n' +
'                        <td style="padding: 8px 0;">\n' +
'                          <p style="margin: 0; color: #fafafa; font-size: 15px; font-weight: 500;">Revisión de solicitudes</p>\n' +
'                          <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">Nuestro equipo revisará tu perfil cuidadosamente en los próximos días.</p>\n' +
'                        </td>\n' +
'                      </tr>\n' +
'                    </table>\n' +
'                  </div>\n' +
'                  <div style="margin: 16px 0;">\n' +
'                    <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                      <tr>\n' +
'                        <td width="40" valign="top" style="padding-top: 4px;">\n' +
'                          <div style="width: 32px; height: 32px; background-color: rgba(59, 130, 246, 0.2); border-radius: 50%; font-weight: 600; color: #3b82f6; font-size: 14px; text-align: center; line-height: 32px;">2</div>\n' +
'                        </td>\n' +
'                        <td style="padding: 8px 0;">\n' +
'                          <p style="margin: 0; color: #fafafa; font-size: 15px; font-weight: 500;">Te contactaremos por email</p>\n' +
'                          <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 14px; line-height: 1.5;">Recibirás un correo con los siguientes pasos y detalles sobre cómo unirte oficialmente.</p>\n' +
'                        </td>\n' +
'                      </tr>\n' +
'                    </table>\n' +
'                  </div>\n' +
'                  <h3 style="font-size: 18px; font-weight: 600; color: #fafafa; margin: 24px 0 12px 0;">⏱️ Mientras tanto...</h3>\n' +
'                  <p style="font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 16px 0;">\n' +
'                    Te invitamos a explorar nuestros recursos y familiarizarte con nuestra comunidad:\n' +
'                  </p>\n' +
'                  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 16px 0;">\n' +
'                    <tr>\n' +
'                      <td style="padding: 12px 0;">\n' +
'                        <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                          <tr>\n' +
'                            <td width="30" valign="top"><span style="font-size: 18px;">🌐</span></td>\n' +
'                            <td>\n' +
'                              <a href="https://cpfiuna.io" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Explora nuestra página web</a>\n' +
'                              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Conoce nuestros proyectos, eventos y recursos</p>\n' +
'                            </td>\n' +
'                          </tr>\n' +
'                        </table>\n' +
'                      </td>\n' +
'                    </tr>\n' +
'                    <tr>\n' +
'                      <td style="padding: 12px 0;">\n' +
'                        <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                          <tr>\n' +
'                            <td width="30" valign="top"><span style="font-size: 18px;">💬</span></td>\n' +
'                            <td>\n' +
'                              <a href="https://discord.gg/UtRpKw2ay4" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Únete a nuestro Discord</a>\n' +
'                              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Conecta con la comunidad y mantente al día con anuncios</p>\n' +
'                            </td>\n' +
'                          </tr>\n' +
'                        </table>\n' +
'                      </td>\n' +
'                    </tr>\n' +
'                    <tr>\n' +
'                      <td style="padding: 12px 0;">\n' +
'                        <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                          <tr>\n' +
'                            <td width="30" valign="top"><span style="font-size: 18px;">👨‍💻</span></td>\n' +
'                            <td>\n' +
'                              <a href="https://github.com/cpfiuna" style="color: #3b82f6; text-decoration: none; font-weight: 500;">Visita nuestro GitHub</a>\n' +
'                              <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 13px;">Revisa los proyectos open source del club</p>\n' +
'                            </td>\n' +
'                          </tr>\n' +
'                        </table>\n' +
'                      </td>\n' +
'                    </tr>\n' +
'                  </table>\n' +
'                  <div style="background-color: rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; border: 1px solid rgba(16, 185, 129, 0.2); margin: 24px 0;">\n' +
'                    <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">\n' +
'                      <strong style="color: #10b981;">Consejo:</strong> Revisa tu carpeta de <strong>spam o correo no deseado</strong> para no perderte nuestra respuesta. Agrega nuestro correo electrónico <strong>clubdeprogramacion@ing.una.py</strong> a tus contactos.\n' +
'                    </p>\n' +
'                  </div>\n' +
'                  <div style="text-align: center; margin: 30px 0;">\n' +
'                    <a href="https://cpfiuna.io" style="display: inline-block; padding: 14px 32px; border-radius: 9999px; background-color: rgba(59, 130, 246, 1); color: #ffffff; font-weight: 600; text-decoration: none; text-align: center; border: none; font-family: \'Inter\', Arial, sans-serif; font-size: 16px; line-height: 24px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">Visitar nuestra web</a>\n' +
'                  </div>\n' +
'                  <div style="height: 1px; background: linear-gradient(to right, transparent, rgba(5, 54, 181, 0.2), transparent); margin: 30px 0;"></div>\n' +
'                  <p style="font-size: 15px; line-height: 1.6; color: #94a3b8; margin: 0 0 8px 0;">\n' +
'                    Si tenés alguna pregunta o necesitás ayuda, no dudes en responder a este correo o contactarnos.\n' +
'                  </p>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 16px 0 8px 0;">\n' +
'                    Hemos recibido correctamente tu solicitud y quedó registrada. Esta es solo una confirmación de recepción; la decisión final se comunicará una vez concluido el proceso de admisión. Gracias por tu interés y paciencia.\n' +
'                  </p>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #fafafa; margin: 10; font-weight: 600;">El equipo del Club de Programación FIUNA</p>\n' +
'                </td>\n' +
'              </tr>\n' +
'            </table>\n' +
'            <div class="ultima-section" style="margin-top: 30px; clear: both; visibility: visible !important; display: block !important;">\n' +
'              <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                <tr>\n' +
'                  <td>\n' +
'                    <p style="color: #94a3b8; font-size: 16px; text-align: center;">Visitanos en nuestras redes:</p>\n' +
'                  </td>\n' +
'                </tr>\n' +
'                <tr>\n' +
'                  <td align="center" style="padding: 20px 0;">\n' +
'                    <a href="https://github.com/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/github-logo.png" width="24" height="24" alt="GitHub" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://discord.gg/UtRpKw2ay4" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/discord-logo.png" width="24" height="24" alt="Discord" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://twitter.com/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/X-logo.png" width="24" height="24" alt="X" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://instagram.com/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/instagram-logo.png" width="24" height="24" alt="Instagram" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://youtube.com/@cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/youtube-logo.png" width="24" height="24" alt="YouTube" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://www.linkedin.com/company/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://recursos.cpfiuna.io/Imagenes/Logos/linkedin-logo.png" width="24" height="24" alt="LinkedIn" style="border: 0;">\n' +
'                    </a>\n' +
'                  </td>\n' +
'                </tr>\n' +
'                <tr>\n' +
'                  <td>\n' +
'                    <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">© 2025 Club de Programación FIUNA | Universidad Nacional de Asunción</p>\n' +
'                  </td>\n' +
'                </tr>\n' +
'              </table>\n' +
'            </div>\n' +
'          </td>\n' +
'        </tr>\n' +
'      </table>\n' +
'    </td>\n' +
'  </tr>\n' +
'</table>\n' +
'</body>\n' +
'</html>';

  // Replace placeholders with actual data
  const emailBody = htmlTemplate
    .replace(/\{\{NOMBRES\}\}/g, data.nombres)
    .replace(/\{\{APELLIDOS\}\}/g, data.apellidos)
    .replace(/\{\{EMAIL\}\}/g, data.email)
    .replace(/\{\{CARRERA\}\}/g, data.carrera)
    .replace(/\{\{FECHA\}\}/g, data.fecha);

  // Send via Resend API
  try {
    const response = UrlFetchApp.fetch('https://api.resend.com/emails', {
      method: 'post',
      headers: {
        'Authorization': 'Bearer ' + RESEND_API_KEY,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        from: FROM_EMAIL,
        to: data.email,
        subject: 'Confirmación de solicitud - Club de Programación FIUNA',
        html: emailBody,
        reply_to: 'clubdeprogramacion@ing.una.py'
      }),
      muteHttpExceptions: true
    });
    
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      Logger.log('✅ Email sent to: ' + data.email + ' (ID: ' + result.id + ')');
    } else {
      Logger.log('❌ Resend error: ' + response.getContentText());
    }
  } catch (error) {
    Logger.log('❌ Failed to send email: ' + error.toString());
  }
}


function sendTeamNotification(data) {
  const subject = 'Nueva solicitud de admisión - ' + data.nombres + ' ' + data.apellidos;
  const emailBody = 'Nueva solicitud de admisión recibida:\n\n' +
    'Nombre: ' + data.nombres + ' ' + data.apellidos + '\n' +
    'Email: ' + data.email + '\n' +
    'Carrera: ' + data.carrera + '\n' +
    'Fecha: ' + data.fecha + '\n\n' +
    'Revisa el spreadsheet para más detalles.';
  
  TEAM_EMAILS.forEach(function(email) {
    try {
      const response = UrlFetchApp.fetch('https://api.resend.com/emails', {
        method: 'post',
        headers: {
          'Authorization': 'Bearer ' + RESEND_API_KEY,
          'Content-Type': 'application/json'
        },
        payload: JSON.stringify({
          from: FROM_EMAIL,
          to: email,
          subject: subject,
          text: emailBody,
          reply_to: data.email
        }),
        muteHttpExceptions: true
      });
      
      if (response.getResponseCode() === 200) {
        Logger.log('✅ Team notification sent to: ' + email);
      }
    } catch (error) {
      Logger.log('❌ Failed to notify ' + email + ': ' + error.toString());
    }
  });
}


// === TESTING FUNCTION ===
// Run this to test your setup before going live
function testEmailSetup() {
  Logger.log('🧪 Starting email test...');
  
  const testData = {
    nombres: 'Juan',
    apellidos: 'Pérez',
    email: 'YOUR_EMAIL@gmail.com', // ⚠️ CHANGE THIS to your actual email
    carrera: 'Ingeniería Informática',
    fecha: '01/12/2025'
  };
  
  Logger.log('📧 Test data: ' + JSON.stringify(testData));
  sendConfirmationEmail(testData);
  Logger.log('✅ Test completed! Check your email inbox.');
}


// === DEBUG FUNCTION ===
// Run this ONCE after setting up the trigger to see your form's column structure
// This will help you identify the correct indices for rawData mapping
function debugFormStructure(e) {
  try {
    Logger.log('=== FORM SUBMISSION DEBUG ===');
    Logger.log('Event object keys: ' + Object.keys(e).join(', '));
    
    if (e.values) {
      Logger.log('Form values (e.values):');
      e.values.forEach(function(value, index) {
        Logger.log('  Column ' + index + ': ' + value);
      });
    }
    
    if (e.range) {
      Logger.log('Range: ' + e.range.getA1Notation());
    }
    
    Logger.log('=== END DEBUG ===');
    Logger.log('\nℹ️  Now update the column indices in onFormSubmit() based on the output above.');
  } catch (error) {
    Logger.log('Debug error: ' + error.toString());
  }
}


// === INSTRUCTIONS ===
// 
// 📖 COMPLETE SETUP GUIDE: See docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md
//
// QUICK STEPS:
// 1. Create Resend account: https://resend.com/signup
// 2. Get API key and paste it at line 30
// 3. Update FROM_EMAIL after domain verification (line 35) or use sandbox for testing
// 4. Add team member emails at lines 40-44
// 5. Run testEmailSetup() to verify it works
// 6. ⚠️ SET UP TRIGGER (THE CRITICAL STEP):
//    - Apps Script → Click Clock Icon ⏰ → Add Trigger
//    - Function: onFormSubmit  (or debugFormStructure for first test)
//    - Deployment: Head
//    - Event source: From spreadsheet
//    - Event type: On form submit
//    - Save & Authorize
// 7. DEBUG COLUMN INDICES (First time only):
//    - Submit a test form
//    - Check Apps Script → Executions → View logs
//    - Note which column contains Nombres, Apellidos, Email, Carrera
//    - Update line 107-110 with correct column indices
//    - Change trigger back to onFormSubmit
// 8. Test with a real form submission
// 9. Check Apps Script → Executions to see logs
//
// ⚠️ IMPORTANT: Without the trigger, emails won't send automatically!
//               The trigger connects form submissions to this script.
//
// ❓ DO I NEED THE WEB APP URL?
//    NO! You don't need it. Ignore the web app deployment URL.
//    The trigger system handles everything internally.
