// Google Apps Script for Admission Form Email Automation
// Deploy this in your Google Spreadsheet's Script Editor
// Uses Resend API for better email deliverability

// CONFIGURATION - Add your Resend API key here
const RESEND_API_KEY = 're_YOUR_API_KEY_HERE'; // Paste your Resend API key from onboarding
const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>'; // Sandbox for testing (change to admisiones@cpfiuna.org after domain verification)

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
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return false;
  
  return true;
}

function onFormSubmit(e) {
  try {
    // Extract form responses
    const itemResponses = e.response.getItemResponses();
    const rawData = {};
    
    // Map form fields to data object
    // Based on Google Form entry IDs from fieldMapping
    itemResponses.forEach(itemResponse => {
      const question = itemResponse.getItem().getTitle();
      const answer = itemResponse.getResponse();
      
      // Map exact questions to field names (based on your form)
      if (question === 'Nombres') {
        rawData.nombres = answer;
      } else if (question === 'Apellidos') {
        rawData.apellidos = answer;
      } else if (question === 'Correo Electrónico') {
        rawData.email = answer;
      } else if (question === 'Carrera') {
        rawData.carrera = answer;
      }
    });

    // Validate data
    if (!validateData(rawData)) {
      Logger.log('Invalid data received: ' + JSON.stringify(rawData));
      return;
    }

    // Sanitize data
    const data = {
      nombres: sanitizeInput(rawData.nombres),
      apellidos: sanitizeInput(rawData.apellidos),
      email: sanitizeInput(rawData.email),
      carrera: sanitizeInput(rawData.carrera),
      fecha: Utilities.formatDate(new Date(), 'America/Asuncion', 'dd/MM/yyyy')
    };

    // Save to spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const timestamp = new Date();
    sheet.appendRow([
      timestamp,
      data.nombres,
      data.apellidos,
      data.email,
      data.carrera
    ]);

    // Send confirmation email
    sendConfirmationEmail(data);

    // Optionally send notification to team
    sendTeamNotification(data);

    Logger.log('Successfully processed submission for: ' + data.email);

  } catch (error) {
    Logger.log('Error in onFormSubmit: ' + error.toString());
    
    // Send error notification to admin
    MailApp.sendEmail({
      to: 'clubdeprogramacion@ing.una.py',
      subject: 'Error en formulario de admisión',
      body: 'Error: ' + error.toString()
    });
  }
}

function sendConfirmationEmail(data) {
  // HTML email template
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
'                  <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/cpf-logo.png" alt="Club de Programación FIUNA" style="max-width: 120px; height: auto;">\n' +
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
'                    <a href="https://cpfiuna.vercel.app" style="display: inline-block; padding: 14px 32px; border-radius: 9999px; background-color: rgba(59, 130, 246, 1); color: #ffffff; font-weight: 600; text-decoration: none; text-align: center; border: none; font-family: \'Inter\', Arial, sans-serif; font-size: 16px; line-height: 24px; box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);">Visitar nuestra web</a>\n' +
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
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/github-logo.png" width="24" height="24" alt="GitHub" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://discord.gg/vU4zQb3FAn" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/discord-logo.png" width="24" height="24" alt="Discord" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://twitter.com/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/X-logo.png" width="24" height="24" alt="X" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://instagram.com/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/instagram-logo.png" width="24" height="24" alt="Instagram" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://youtube.com/@cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/youtube-logo.png" width="24" height="24" alt="YouTube" style="border: 0;">\n' +
'                    </a>\n' +
'                    <a href="https://www.linkedin.com/company/cpfiuna" style="margin: 0 10px; display: inline-block; text-decoration: none;">\n' +
'                      <img src="https://cpfiuna.github.io/recursos/Imagenes/Logos/linkedin-logo.png" width="24" height="24" alt="LinkedIn" style="border: 0;">\n' +
'                    </a>\n' +
'                  </td>\n' +
'                </tr>\n' +
'                <tr>\n' +
'                  <td>\n' +
'                    <p style="color: #94a3b8; font-size: 12px; text-align: center; margin: 0;">© 2025 Club de Programación FIUNA | Universidad Nacional de Asunción</p>\n' +
'                    <p style="color: #64748b; font-size: 11px; text-align: center; margin: 8px 0 0 0;">\n' +
'                      Facultad de Ingeniería • San Lorenzo, Paraguay\n' +
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

  // Replace placeholders with actual data
  const emailBody = htmlTemplate
    .replace(/\{\{NOMBRES\}\}/g, data.nombres)
    .replace(/\{\{APELLIDOS\}\}/g, data.apellidos)
    .replace(/\{\{EMAIL\}\}/g, data.email)
    .replace(/\{\{CARRERA\}\}/g, data.carrera)
    .replace(/\{\{FECHA\}\}/g, data.fecha);

  // Send email via Resend API
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
      Logger.log('Confirmation email sent to: ' + data.email + ' (ID: ' + result.id + ')');
    } else {
      Logger.log('Error sending email: ' + response.getContentText());
      throw new Error('Resend API error: ' + result.message);
    }
  } catch (error) {
    Logger.log('Failed to send via Resend, error: ' + error.toString());
    // Fallback to MailApp if Resend fails
    MailApp.sendEmail({
      to: data.email,
      replyTo: 'clubdeprogramacion@ing.una.py',
      subject: 'Confirmación de solicitud - Club de Programación FIUNA',
      htmlBody: emailBody,
      name: 'Club de Programación FIUNA',
      noReply: false
    });
    Logger.log('Sent via MailApp fallback to: ' + data.email);
  }
}function sendTeamNotification(data) {
  const teamEmails = [
    'clubdeprogramacion@ing.una.py',
    // Add additional team member emails as needed:
    // 'presidente@cpfiuna.org',
    // 'secretario@cpfiuna.org',
  ];
  
  const subject = 'Nueva solicitud de admisión - ' + data.nombres + ' ' + data.apellidos;
  const emailBody = 'Nueva solicitud de admisión recibida:\n\n' +
    'Nombre: ' + data.nombres + ' ' + data.apellidos + '\n' +
    'Email: ' + data.email + '\n' +
    'Carrera: ' + data.carrera + '\n' +
    'Fecha: ' + data.fecha + '\n\n' +
    'Revisa el spreadsheet para más detalles.';
  
  // Send to all team members via Resend
  teamEmails.forEach(function(email) {
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
        Logger.log('Team notification sent to: ' + email);
      } else {
        Logger.log('Error sending to ' + email + ': ' + response.getContentText());
      }
    } catch (error) {
      Logger.log('Failed to send team notification to ' + email + ': ' + error.toString());
      // Fallback to MailApp
      MailApp.sendEmail({
        to: email,
        subject: subject,
        body: emailBody,
        name: 'Sistema de Admisión CPF'
      });
    }
  });
  
  Logger.log('Team notification sent to ' + teamEmails.length + ' recipients');
}

// Test function to verify setup
function testEmailSetup() {
  const testData = {
    nombres: 'Juan',
    apellidos: 'Pérez',
    email: 'YOUR_EMAIL@gmail.com', // CHANGE THIS to your actual email for testing
    carrera: 'Ingeniería Informática',
    fecha: '01/12/2025'
  };
  
  Logger.log('Testing email with data: ' + JSON.stringify(testData));
  sendConfirmationEmail(testData);
  Logger.log('Test email sent!');
}
