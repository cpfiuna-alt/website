# 📧 Resend Email Automation - Setup Summary

This document provides a quick reference for setting up all three email automation scripts using Resend API and Google Apps Script triggers.

## 📋 Scripts Overview

You now have **three** email automation scripts ready to deploy:

### 1. **Admission Form** (`admission-form-resend.js`)
- **Purpose:** Send confirmation emails when students submit the admission form
- **Email Type:** Admission confirmation with next steps
- **Spreadsheet:** Admissions form responses

### 2. **Contact Form** (`contact-form-resend.js`)
- **Purpose:** Send confirmation emails when someone contacts the club
- **Email Type:** Contact acknowledgment with message summary
- **Spreadsheet:** Contact form responses

### 3. **Newsletter Subscription** (`newsletter-subscription-resend.js`)
- **Purpose:** Send welcome emails to new newsletter subscribers
- **Email Type:** Newsletter subscription welcome
- **Spreadsheet:** Newsletter subscription list

---

## 🚀 Setup Process (Same for All Three)

### Step 1: Get Resend API Key (Once)

1. Sign up at [resend.com/signup](https://resend.com/signup)
2. Get API key at [resend.com/api-keys](https://resend.com/api-keys)
3. **Save the key** - you'll use it for all three scripts

### Step 2: Deploy Each Script

For **each** of the three scripts, follow these steps:

#### A. Open Google Spreadsheet
- Go to the spreadsheet linked to your Google Form
- Click: `Extensions` → `Apps Script`

#### B. Paste the Script
- Clear any existing code
- Copy the entire content of the script file:
  - `scripts/admission-form-resend.js` for admissions
  - `scripts/contact-form-resend.js` for contact
  - `scripts/newsletter-subscription-resend.js` for newsletter
- Paste into Apps Script editor

#### C. Configure API Key
Find this line (around line 36-60 depending on script):
```javascript
const RESEND_API_KEY = 're_YOUR_API_KEY_HERE';
```

Replace with your actual Resend API key:
```javascript
const RESEND_API_KEY = 're_abc123xyz...';
```

#### D. Choose Email Mode
For **testing**, use sandbox mode (sends only to verified emails):
```javascript
const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';
```

For **production** (requires DNS verification):
```javascript
const FROM_EMAIL = 'Club de Programación FIUNA <admisiones@cpfiuna.io>'; // or contacto@, newsletter@
```

#### E. Save the Script
- Click the disk icon 💾 or press `Ctrl+S`
- Name your project (e.g., "CPF Admissions Emailer")

### Step 3: Set Up the Trigger ⏰ (THE CRITICAL PART!)

**This is the most important step!** Without the trigger, emails won't send automatically.

1. **Open Triggers Panel**
   - In Apps Script, look at the left sidebar
   - Click the **clock icon ⏰** (Triggers)

2. **Add New Trigger**
   - Click **`+ Add Trigger`** button (bottom right)

3. **Configure Trigger Settings**
   
   Set these values **exactly**:
   
   | Setting | Value |
   |---------|-------|
   | **Choose which function to run** | `onFormSubmit` |
   | **Choose which deployment should run** | `Head` |
   | **Select event source** | `From spreadsheet` |
   | **Select event type** | `On form submit` |

4. **Save the Trigger**
   - Click **`Save`**
   - You'll be asked to authorize the script

5. **Authorize the Script**
   - Click **`Review permissions`**
   - Choose your Google account
   - Click **`Advanced`** (if warning appears)
   - Click **`Go to [Your Project Name] (unsafe)`**
   - Click **`Allow`**

### Step 4: Test It!

1. **Submit a Test Form**
   - Fill out the form with test data
   - Use your real email address
   - Submit

2. **Check Logs**
   - Go to Apps Script → **Executions** (📋 icon in sidebar)
   - Look for the latest execution
   - Click on it to see logs

3. **Verify Email Sent**
   - Check your email inbox
   - Look in spam folder too
   - Confirm you received the confirmation email

4. **Adjust Column Indices** (if needed)
   
   If data looks wrong, check the logs to see actual column structure:
   ```
   Form values: ["timestamp", "David", "Giménez", "email@example.com", ...]
   ```
   
   Update the column indices in the script:
   ```javascript
   const rawData = {
     nombres: values[1],    // Adjust these numbers
     apellidos: values[2],  // to match your form
     email: values[4],      // structure
     carrera: values[10]
   };
   ```

---

## 🔧 Column Index Reference

Each script needs to map form columns to data fields. Here's what you need to know:

### Admission Form
```javascript
// Based on your form:
const rawData = {
  nombres: values[1],     // Column 1: Nombres
  apellidos: values[2],   // Column 2: Apellidos
  email: values[4],       // Column 4: Email
  carrera: values[10]     // Column 10: Carrera
};
```

### Contact Form
```javascript
// Typical contact form:
const rawData = {
  name: values[1],        // Column 1: Name
  email: values[2],       // Column 2: Email
  subject: values[3],     // Column 3: Subject
  message: values[4]      // Column 4: Message
};
```

### Newsletter Subscription
```javascript
// Simple subscription form:
const rawData = {
  email: values[1],       // Column 1: Email
  source: values[2]       // Column 2: Source (optional)
};
```

**How to find your column indices:**
1. Submit a test form
2. Check Apps Script → Executions → Logs
3. Look for: `Form values: [...]`
4. Count from 0 to find which column contains what

---

## 📊 Quick Checklist

Use this checklist for each script:

### Admission Form Setup
- [ ] Resend API key added
- [ ] Email mode configured (sandbox or production)
- [ ] Script saved in Apps Script
- [ ] Trigger created (`onFormSubmit`, spreadsheet, on form submit)
- [ ] Trigger authorized
- [ ] Test form submitted
- [ ] Confirmation email received
- [ ] Column indices verified (names: 1, 2; email: 4; carrera: 10)
- [ ] Production mode enabled (if ready)

### Contact Form Setup
- [ ] Resend API key added
- [ ] Email mode configured
- [ ] Script saved in Apps Script
- [ ] Trigger created
- [ ] Trigger authorized
- [ ] Test contact submitted
- [ ] Confirmation email received
- [ ] Column indices verified
- [ ] Production mode enabled (if ready)

### Newsletter Setup
- [ ] Resend API key added
- [ ] Email mode configured
- [ ] Script saved in Apps Script
- [ ] Trigger created
- [ ] Trigger authorized
- [ ] Test subscription submitted
- [ ] Welcome email received
- [ ] Column indices verified
- [ ] Production mode enabled (if ready)

---

## 🎨 Email Templates

Each script sends a different styled email:

### Admission Form Email Includes:
- ✅ Personalized greeting with student name
- ✅ Summary of submitted information
- ✅ Next steps in the admission process
- ✅ Links to resources (website, Discord, GitHub)
- ✅ Important reminders about spam folders

### Contact Form Email Includes:
- ✅ Personalized greeting with sender name
- ✅ Echo of the subject and message sent
- ✅ Acknowledgment that team will respond
- ✅ Reference number for tracking
- ✅ Links to social media

### Newsletter Email Includes:
- ✅ Welcome message with 📬 icon
- ✅ List of what subscribers will receive
- ✅ Frequency information
- ✅ Tip to add to contacts (avoid spam)
- ✅ Unsubscribe link (required)

---

## 🔄 Maintenance

### Daily Tasks
- Monitor Apps Script → Executions for errors
- Check Resend dashboard for delivery status: [resend.com/emails](https://resend.com/emails)

### Weekly Tasks
- Review submission counts
- Check for any failed executions
- Verify all emails are being delivered

### Monthly Tasks
- Export spreadsheet data as backup
- Review and update email templates if needed
- Check Resend quota usage (free: 100 emails/day)

---

## 🆘 Troubleshooting

### Problem: Emails not sending

**Check:**
1. Is the trigger set up correctly?
2. Is the API key correct (starts with `re_`)?
3. Are column indices correct?
4. Check Apps Script → Executions for error logs

**Fix:**
- Delete trigger and recreate it
- Verify API key in Resend dashboard
- Submit test form and check logs for actual column structure
- Update column indices in script

### Problem: Wrong data in emails

**Check:**
- Apps Script logs: Look for "Extracted data" log
- Compare with "Form values" log to see actual structure

**Fix:**
- Adjust column indices in the `rawData` object
- Save and test again

### Problem: Emails going to spam

**Solution:**
- Verify domain in Resend: [resend.com/domains](https://resend.com/domains)
- Add SPF/DKIM records to DNS
- Ask users to add sender to contacts
- Use production email (not sandbox)

---

## 📈 Scaling Up

### When to Upgrade Resend

**Free Tier:**
- 100 emails/day
- 3,000 emails/month
- Perfect for testing and small clubs

**Upgrade When:**
- Sending 100+ admission confirmations/day
- Combined with newsletter blasts
- Need higher deliverability guarantees

**Pricing:**
- Pro: $20/month for 50,000 emails
- Enterprise: Custom pricing

### Alternative: Batch Processing

If hitting limits, implement queuing:
```javascript
// Queue emails and send in batches
// Process queue every hour/day
// Useful for high-volume periods
```

---

## 🎯 Next Steps

1. **Start with Admission Form** (highest priority)
2. **Add Contact Form** (medium priority)
3. **Add Newsletter** (optional, but nice to have)

Each setup takes **10-15 minutes** once you know the process.

---

## 📚 Additional Resources

- **Full Documentation:** `docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md`
- **Resend Docs:** [resend.com/docs](https://resend.com/docs)
- **Apps Script Docs:** [developers.google.com/apps-script](https://developers.google.com/apps-script)

---

**Questions?** Check the execution logs first, then review the full documentation.

**Ready to deploy?** Start with Step 1 above! 🚀
