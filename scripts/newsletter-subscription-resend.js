// ================================================================================
// 📧 Google Apps Script for Newsletter Subscription Confirmation
// ================================================================================
// 
// @ts-nocheck
// Apps Script globals (suppress VS Code warnings):
/* global Logger, UrlFetchApp, SpreadsheetApp, Utilities */
//
// This script automatically sends confirmation emails when someone subscribes
// to your newsletter through the website.
//
// ⚠️ IMPORTANT: This script ONLY works when properly deployed in Google Apps Script
// with a TRIGGER configured. Follow these steps:
//
// 📋 SETUP INSTRUCTIONS:
// 
// 1️⃣ CREATE RESEND ACCOUNT & GET API KEY (if you haven't already)
//    - Sign up at: https://resend.com/signup
//    - Get API key: https://resend.com/api-keys
//    - Copy the key (starts with 're_')
//
// 2️⃣ OPEN GOOGLE APPS SCRIPT
//    - Open your Newsletter Subscriptions Google Spreadsheet
//    - Click: Extensions → Apps Script
//    - Paste this entire file
//    - Update line 36 with your Resend API key
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
// ================================================================================

// ============= CONFIGURATION =============
const RESEND_API_KEY = 're_YOUR_API_KEY_HERE'; // TODO: Add your Resend API key

// Choose email mode:
// TESTING MODE (sandbox - only sends to verified emails in your Resend account)
// const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';

// PRODUCTION MODE - DNS verified ✓
const FROM_EMAIL = 'Club de Programación FIUNA <newsletter@cpfiuna.io>';

// Team emails for notifications (optional)
const TEAM_EMAILS = [
  'clubdeprogramacion@ing.una.py',
];
// =========================================


// === UTILITY FUNCTIONS ===
function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input.replace(/[<>]/g, '');
}


// === MAIN TRIGGER FUNCTION ===
function onFormSubmit(e) {
  try {
    Logger.log('Newsletter subscription received');
    
    // Get values from event or sheet
    let values = e.values;
    
    if (!values || values.length === 0) {
      Logger.log('No e.values found, reading from sheet directly...');
      const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
      const lastRow = sheet.getLastRow();
      values = sheet.getRange(lastRow, 1, 1, sheet.getLastColumn()).getValues()[0];
      Logger.log('Read from sheet row ' + lastRow);
    }
    
    if (!values || values.length === 0) {
      Logger.log('❌ Error: No values found!');
      return;
    }
    
    Logger.log('Form values: ' + JSON.stringify(values));
    
    // Adjust these column indices based on your newsletter form structure:
    // Typical: Timestamp, Email, Source
    const rawData = {
      email: values[1],      // Column 1: Email
      source: values[2]      // Column 2: Source (optional)
    };
    
    Logger.log('Extracted data: ' + JSON.stringify(rawData));

    // Sanitize data
    const data = {
      email: sanitizeInput(rawData.email || ''),
      source: sanitizeInput(rawData.source || 'website'),
      fecha: Utilities.formatDate(new Date(), 'America/Asuncion', 'dd/MM/yyyy')
    };
    
    Logger.log('Sanitized data: ' + JSON.stringify(data));

    // Basic validation
    if (!data.email || !data.email.includes('@')) {
      Logger.log('❌ Invalid email: ' + data.email);
      return;
    }

    // Send confirmation to subscriber
    Logger.log('Sending confirmation email to subscriber...');
    sendConfirmationEmail(data);

    Logger.log('✅ Successfully processed newsletter subscription for: ' + data.email);

  } catch (error) {
    Logger.log('❌ Error in onFormSubmit: ' + error.toString());
    
    // Notify admin of error (optional)
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
          subject: 'Error en suscripción de newsletter',
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
  // HTML email template for newsletter subscription confirmation
  const htmlTemplate = '<!DOCTYPE html>\n' +
'<html lang="es">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
'<title>Club de Programación FIUNA - Confirmación de Suscripción</title>\n' +
'<style>\n' +
'    @import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap\');\n' +
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
'                  <div style="text-align: center; margin-bottom: 24px;">\n' +
'                    <span style="font-size: 48px;">📬</span>\n' +
'                  </div>\n' +
'                  <h2 style="font-size: 24px; font-weight: 600; color: #fafafa; margin-top: 0; margin-bottom: 12px; text-align: center;">¡Bienvenido a nuestro Newsletter!</h2>\n' +
'                  <p style="font-size: 16px; line-height: 1.6; color: #94a3b8; margin: 0; margin-bottom: 24px; text-align: center;">\n' +
'                    Gracias por suscribirte al newsletter del Club de Programación FIUNA.\n' +
'                  </p>\n' +
'                  <div style="background-color: rgba(59, 130, 246, 0.1); padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); margin: 24px 0;">\n' +
'                    <h3 style="font-size: 18px; font-weight: 600; color: #fafafa; margin: 0 0 12px 0;">¿Qué recibirás?</h3>\n' +
'                    <ul style="margin: 0; padding-left: 20px; color: #94a3b8; font-size: 15px; line-height: 1.8;">\n' +
'                      <li>📰 Noticias del mundo tech y programación</li>\n' +
'                      <li>🎓 Tutoriales y recursos de aprendizaje</li>\n' +
'                      <li>🎉 Anuncios de eventos y actividades del club</li>\n' +
'                      <li>💡 Tips y mejores prácticas de desarrollo</li>\n' +
'                      <li>🚀 Proyectos destacados de la comunidad</li>\n' +
'                    </ul>\n' +
'                  </div>\n' +
'                  <p style="font-size: 16px; line-height: 1.6; color: #94a3b8; margin: 24px 0 16px 0; text-align: center;">\n' +
'                    Enviaremos nuestro newsletter periódicamente con contenido seleccionado especialmente para ti.\n' +
'                  </p>\n' +
'                  <div style="text-align: center; margin: 30px 0;">\n' +
'                    <a href="https://cpfiuna.io" style="display: inline-block; padding: 14px 32px; border-radius: 9999px; background-color: rgba(59, 130, 246, 1); color: #ffffff; font-weight: 600; text-decoration: none; text-align: center; border: none; font-family: \'Inter\', Arial, sans-serif; font-size: 16px; line-height: 24px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">Visitar nuestra web</a>\n' +
'                  </div>\n' +
'                  <div style="background-color: rgba(16, 185, 129, 0.1); padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; border: 1px solid rgba(16, 185, 129, 0.2); margin: 24px 0;">\n' +
'                    <p style="margin: 0; color: #94a3b8; font-size: 14px; line-height: 1.6;">\n' +
'                      <strong style="color: #10b981;">Consejo:</strong> Agrega <strong>newsletter@cpfiuna.io</strong> a tus contactos para que nuestros correos no terminen en spam.\n' +
'                    </p>\n' +
'                  </div>\n' +
'                  <div style="height: 1px; background: linear-gradient(to right, transparent, rgba(5, 54, 181, 0.2), transparent); margin: 30px 0;"></div>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 0; margin-bottom: 8px; text-align: center;">¡Nos vemos pronto en tu bandeja de entrada!</p>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #fafafa; margin: 0; font-weight: 600; text-align: center;">El equipo del Club de Programación FIUNA</p>\n' +
'                </td>\n' +
'              </tr>\n' +
'            </table>\n' +
'            <div style="margin-top: 30px; clear: both; display: block;">\n' +
'              <table width="100%" border="0" cellspacing="0" cellpadding="0">\n' +
'                <tr>\n' +
'                  <td>\n' +
'                    <p style="color: #94a3b8; font-size: 16px; text-align: center;">Visítanos en nuestras redes:</p>\n' +
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
'                    <p style="color: #64748b; font-size: 11px; text-align: center; margin-top: 8px;">\n' +
'                      <a href="https://cpfiuna.io/unsubscribe" style="color: #64748b; text-decoration: underline;">Cancelar suscripción</a>\n' +
'                    </p>\n' +
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

  // No placeholders needed for newsletter subscription - it's generic

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
        subject: '¡Bienvenido al Newsletter de CPF! 📬',
        html: htmlTemplate,
        reply_to: 'clubdeprogramacion@ing.una.py'
      }),
      muteHttpExceptions: true
    });
    
    const result = JSON.parse(response.getContentText());
    
    if (response.getResponseCode() === 200) {
      Logger.log('✅ Confirmation email sent to: ' + data.email + ' (ID: ' + result.id + ')');
    } else {
      Logger.log('❌ Resend error: ' + response.getContentText());
    }
  } catch (error) {
    Logger.log('❌ Failed to send confirmation email: ' + error.toString());
  }
}


// === TESTING FUNCTION ===
function testEmailSetup() {
  Logger.log('🧪 Starting newsletter subscription email test...');
  
  const testData = {
    email: 'YOUR_EMAIL@gmail.com', // ⚠️ CHANGE THIS to your actual email
    source: 'test',
    fecha: '01/12/2025'
  };
  
  Logger.log('📧 Test data: ' + JSON.stringify(testData));
  sendConfirmationEmail(testData);
  Logger.log('✅ Test completed! Check your email inbox.');
}


// === INSTRUCTIONS ===
// 
// 📖 COMPLETE SETUP GUIDE: See docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md
//
// QUICK STEPS:
// 1. Use the same Resend API key from other forms
// 2. Open your Newsletter Subscriptions Google Spreadsheet
// 3. Extensions → Apps Script → Paste this file
// 4. Update RESEND_API_KEY at line 36
// 5. ⚠️ SET UP TRIGGER:
//    - Apps Script → Clock Icon ⏰ → Add Trigger
//    - Function: onFormSubmit
//    - Event source: From spreadsheet
//    - Event type: On form submit
// 6. Test by subscribing through your website
// 7. Check column indices match your form (lines 89-90)
// 8. Adjust if needed and test again
