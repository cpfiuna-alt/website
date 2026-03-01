// ================================================================================
// 📧 Google Apps Script for Contact Form Email Automation
// ================================================================================
// 
// @ts-nocheck
// Apps Script globals (suppress VS Code warnings):
/* global Logger, UrlFetchApp, SpreadsheetApp, Utilities */
//
// This script automatically sends confirmation emails when someone submits
// your Google Form contact form.
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
//    - Open your Contact Form Google Spreadsheet
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
const FROM_EMAIL = 'Club de Programación FIUNA <contacto@cpfiuna.io>';

// Team emails for notifications
const TEAM_EMAILS = [
  'clubdeprogramacion@ing.una.py',
  // Add more team members:
  // 'presidente@cpfiuna.io',
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
    Logger.log('Contact form submission received');
    
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
    
    // Adjust these column indices based on your contact form structure:
    // Typical contact form: Timestamp, Name, Email, Subject, Message
    const rawData = {
      name: values[1],       // Column 1: Name
      email: values[2],      // Column 2: Email
      subject: values[3],    // Column 3: Subject
      message: values[4]     // Column 4: Message
    };
    
    Logger.log('Extracted data: ' + JSON.stringify(rawData));

    // Sanitize data
    const data = {
      name: sanitizeInput(rawData.name || ''),
      email: sanitizeInput(rawData.email || ''),
      subject: sanitizeInput(rawData.subject || 'Mensaje de contacto'),
      message: sanitizeInput(rawData.message || ''),
      fecha: Utilities.formatDate(new Date(), 'America/Asuncion', 'dd/MM/yyyy'),
      reference: 'MSG-' + Date.now()
    };
    
    Logger.log('Sanitized data: ' + JSON.stringify(data));

    // Basic validation
    if (!data.email || !data.email.includes('@')) {
      Logger.log('❌ Invalid email: ' + data.email);
      return;
    }
    
    if (!data.name) {
      Logger.log('❌ Missing name');
      return;
    }

    // Send confirmation to user
    Logger.log('Sending confirmation email to user...');
    sendConfirmationEmail(data);
    
    // Send notification to team
    Logger.log('Sending notification to team...');
    sendTeamNotification(data);

    Logger.log('✅ Successfully processed contact form for: ' + data.email);

  } catch (error) {
    Logger.log('❌ Error in onFormSubmit: ' + error.toString());
    
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
          subject: 'Error en formulario de contacto',
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
  // HTML email template for contact confirmation
  const htmlTemplate = '<!DOCTYPE html>\n' +
'<html lang="es">\n' +
'<head>\n' +
'<meta charset="UTF-8">\n' +
'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
'<meta http-equiv="Content-Type" content="text/html; charset=utf-8">\n' +
'<title>Club de Programación FIUNA - Respuesta</title>\n' +
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
'                  <h2 style="font-size: 20px; font-weight: 600; color: #fafafa; margin-top: 0; margin-bottom: 12px;">¡Hola {{NAME}}! 👋</h2>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 0; margin-bottom: 16px;">Gracias por escribirnos 😊</p>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 0; margin-bottom: 16px;">\n' +
'                    Hemos recibido tu mensaje con el asunto: <span style="color: #3b82f6; font-weight: 600;">{{SUBJECT}}</span>\n' +
'                  </p>\n' +
'                  <h3 style="font-weight: 500; margin-bottom: 0.5rem; color: #fafafa;">Tu mensaje:</h3>\n' +
'                  <div style="margin-top: 1.5rem; background-color: rgba(59, 130, 246, 0.1); padding: 1rem; border-radius: 0.5rem; border-left: 4px solid #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2);">\n' +
'                    <p style="font-style: italic; font-size: 14px; color: #94a3b8; margin: 0;">{{MESSAGE}}</p>\n' +
'                  </div>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 24px 0 16px 0;">\n' +
'                    Nuestro equipo revisará tu mensaje y te responderá lo más pronto posible.\n' +
'                  </p>\n' +
'                  <div style="text-align: center; margin: 30px 0;">\n' +
'                    <a href="https://cpfiuna.io" style="display: inline-block; padding: 14px 32px; border-radius: 9999px; background-color: rgba(59, 130, 246, 1); color: #ffffff; font-weight: 600; text-decoration: none; text-align: center; border: none; font-family: \'Inter\', Arial, sans-serif; font-size: 16px; line-height: 24px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">Visitar nuestra web</a>\n' +
'                  </div>\n' +
'                  <div style="height: 1px; background: linear-gradient(to right, transparent, rgba(5, 54, 181, 0.2), transparent); margin: 30px 0;"></div>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #94a3b8; margin: 0; margin-bottom: 8px;">¡Un abrazo digital!</p>\n' +
'                  <p style="font-size: 16px; line-height: 1.5; color: #fafafa; margin: 0; font-weight: 600;">El equipo del Club de Programación FIUNA</p>\n' +
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
'                    <p style="font-size: 11px; color: #94a3b8; text-align: center; margin-top: 6px;">Ref: {{REFERENCE}}</p>\n' +
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
    .replace(/\{\{NAME\}\}/g, data.name)
    .replace(/\{\{SUBJECT\}\}/g, data.subject)
    .replace(/\{\{MESSAGE\}\}/g, data.message.replace(/\n/g, '<br>'))
    .replace(/\{\{REFERENCE\}\}/g, data.reference);

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
        subject: '¡Recibimos tu mensaje! - Club de Programación FIUNA',
        html: emailBody,
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


function sendTeamNotification(data) {
  const subject = 'Nuevo mensaje de contacto - ' + data.name;
  const emailBody = 'Nuevo mensaje recibido del formulario de contacto:\n\n' +
    'De: ' + data.name + ' (' + data.email + ')\n' +
    'Asunto: ' + data.subject + '\n' +
    'Fecha: ' + data.fecha + '\n' +
    'Referencia: ' + data.reference + '\n\n' +
    'Mensaje:\n' +
    data.message + '\n\n' +
    '---\n' +
    'Por favor responde a: ' + data.email;
  
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
function testEmailSetup() {
  Logger.log('🧪 Starting contact form email test...');
  
  const testData = {
    name: 'Juan Pérez',
    email: 'YOUR_EMAIL@gmail.com', // ⚠️ CHANGE THIS to your actual email
    subject: 'Prueba de formulario',
    message: 'Este es un mensaje de prueba.\nCon múltiples líneas.',
    fecha: '01/12/2025',
    reference: 'MSG-TEST-' + Date.now()
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
// 1. Use the same Resend API key from admission form
// 2. Open your Contact Form Google Spreadsheet
// 3. Extensions → Apps Script → Paste this file
// 4. Update RESEND_API_KEY at line 36
// 5. ⚠️ SET UP TRIGGER:
//    - Apps Script → Clock Icon ⏰ → Add Trigger
//    - Function: onFormSubmit
//    - Event source: From spreadsheet
//    - Event type: On form submit
// 6. Submit a test contact form
// 7. Check column indices match your form (lines 90-93)
// 8. Adjust if needed and test again
