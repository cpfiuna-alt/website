# 📧 Google Forms Email Automation Setup Guide

This guide explains how to set up automatic email confirmations when someone submits your admission form using Google Apps Script and Resend API.

## 🎯 What This Does

When someone submits your Google Form:
1. ✅ Data is saved to Google Sheets
2. ✅ Student receives a beautiful confirmation email
3. ✅ Team receives a notification about the new submission
4. ✅ All happens automatically with **zero manual work**

## 📋 Prerequisites

Before starting, you need:
- ✅ A Google Form connected to a Google Spreadsheet
- ✅ A Resend account (free tier is fine)
- ✅ Your Resend API key
- ✅ 10-15 minutes

## 🚀 Step-by-Step Setup

### Step 1: Get Your Resend API Key (5 minutes)

1. **Create Resend Account**
   - Go to [resend.com/signup](https://resend.com/signup)
   - Sign up with your email
   - Verify your email address

2. **Get API Key**
   - Go to [resend.com/api-keys](https://resend.com/api-keys)
   - Click "Create API Key"
   - Name it: "CPF Admissions Form"
   - Copy the key (starts with `re_`)
   - **IMPORTANT:** Save it somewhere safe - you can't see it again!

3. **Verify Domain (for Production)**
   - Go to [resend.com/domains](https://resend.com/domains)
   - Add your domain: `cpfiuna.io`
   - Follow DNS verification steps
   - Wait for verification (can take up to 24 hours)
   - **For Testing:** Use `onboarding@resend.dev` (no verification needed)

### Step 2: Open Google Apps Script (2 minutes)

1. **Open Your Google Spreadsheet**
   - Go to the spreadsheet linked to your Google Form
   - Example: "Admisiones CPF 2025"

2. **Open Script Editor**
   - Click: `Extensions` → `Apps Script`
   - A new tab opens with the script editor

3. **Clear Default Code**
   - Delete any default code that appears
   - You'll paste the new code in the next step

### Step 3: Add the Email Script (3 minutes)

1. **Copy the Script**
   - Open `scripts/admission-form-resend.js` from your project
   - Copy the entire file contents

2. **Paste in Apps Script**
   - Paste the code into the Apps Script editor
   - The file will be named `Code.gs` by default

3. **Configure API Key**
   - Find line 7: `const RESEND_API_KEY = 're_YOUR_API_KEY_HERE';`
   - Replace `re_YOUR_API_KEY_HERE` with your actual Resend API key
   - Example: `const RESEND_API_KEY = 're_abc123xyz';`

4. **Choose Email Mode**
   - **For Testing:** Use line 11 (sandbox mode)
     ```javascript
     const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';
     ```
   - **For Production:** Use line 14 (requires DNS verification)
     ```javascript
     const FROM_EMAIL = 'Club de Programación FIUNA <admisiones@cpfiuna.io>';
     ```

5. **Update Team Emails**
   - Find lines 17-21
   - Add all team members who should receive notifications
   - Example:
     ```javascript
     const TEAM_EMAILS = [
       'clubdeprogramacion@ing.una.py',
       'presidente@cpfiuna.io',
       'secretario@cpfiuna.io',
     ];
     ```

6. **Save the Script**
   - Click the disk icon (💾) or press `Ctrl+S`
   - Name your project: "CPF Admissions Emailer"

### Step 4: Set Up Form Trigger (⚠️ THE IMPORTANT PART)

**This is what actually makes it work!**

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

   It should look like this:
   ```
   Choose which function to run: onFormSubmit
   Choose which deployment should run: Head
   Select event source: From spreadsheet
   Select event type: On form submit
   ```

4. **Save the Trigger**
   - Click **`Save`** button
   - You'll be asked to authorize the script

5. **Authorize the Script**
   - A popup will appear: "Authorization required"
   - Click **`Review permissions`**
   - Choose your Google account
   - Click **`Advanced`** if you see a warning
   - Click **`Go to CPF Admissions Emailer (unsafe)`**
   - Click **`Allow`**
   
   **Why "unsafe"?** Google shows this for custom scripts. It's your own code, so it's safe!

6. **Verify Trigger is Active**
   - You should see the trigger listed with:
     - Function: `onFormSubmit`
     - Event: Spreadsheet → On form submit
     - Status: Enabled

### Step 5: Test the Setup (5 minutes)

#### Option A: Test with Manual Script Run

1. **Find the Test Function**
   - In Apps Script editor, find dropdown at the top
   - Select function: `testEmailSetup`

2. **Update Test Email**
   - Scroll to line 395 in the script
   - Change `YOUR_EMAIL@gmail.com` to your actual email
   ```javascript
   email: 'your.actual.email@gmail.com',
   ```

3. **Run the Test**
   - Click the **`Run`** (▶️) button
   - Wait 5-10 seconds
   - Check the **Execution log** at bottom

4. **Check Your Email**
   - You should receive a test confirmation email
   - If you don't see it, check spam/junk folder

#### Option B: Test with Real Form Submission

1. **Submit Test Form**
   - Open your Google Form
   - Fill it out with test data
   - Use your own email address
   - Submit

2. **Check Multiple Places**
   - ✅ Google Sheets: Data should appear
   - ✅ Your inbox: Confirmation email
   - ✅ Team inbox: Notification email

3. **Check Apps Script Logs**
   - In Apps Script: Click `Executions` (📋) in left sidebar
   - You should see a successful execution
   - Click on it to see detailed logs

### Step 6: Verify Everything Works ✅

Before going live, verify:

- [ ] Test submission appears in Google Sheets
- [ ] Confirmation email is received (check spam too)
- [ ] Team notification email is received
- [ ] Email template looks good (colors, formatting, links)
- [ ] All placeholders are replaced (no `{{NOMBRES}}` in email)
- [ ] Links in email work (website, Discord, GitHub)
- [ ] Trigger is listed as "Enabled" in Triggers panel

## 🎨 Customizing the Email Template

The email template is embedded in the script. To customize:

1. **Find the Template**
   - Look for `const htmlTemplate =` around line 129
   - It's a large HTML string

2. **Make Changes**
   - Update text, colors, or links
   - **Tip:** Use placeholders like `{{NOMBRES}}` for dynamic content

3. **Test Changes**
   - Run `testEmailSetup()` after each change
   - Verify the email looks good

4. **Common Customizations**
   - Change colors: Search for color codes like `#3b82f6`
   - Update links: Change URLs like `https://cpfiuna.io`
   - Modify text: Edit any Spanish text
   - Add/remove sections: Edit the HTML structure

## 🔧 Troubleshooting

### Problem: Trigger Doesn't Fire

**Check:**
1. Is trigger set to `onFormSubmit` (not `onSubmit` or something else)?
2. Is event source set to "From spreadsheet"?
3. Is event type "On form submit"?
4. Is trigger status "Enabled"?

**Fix:**
- Delete the trigger and create a new one
- Make sure you authorized the script

### Problem: Emails Not Sending

**Check:**
1. Is `RESEND_API_KEY` correct?
2. Is `FROM_EMAIL` verified in Resend?
3. Are you using sandbox mode for testing?

**Fix:**
```javascript
// For testing, use sandbox:
const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';

// Check API key format:
const RESEND_API_KEY = 're_abc123xyz'; // Should start with 're_'
```

### Problem: Script Errors in Logs

**Check Apps Script Execution Log:**
1. Click `Executions` (📋) in left sidebar
2. Find failed executions (marked with ❌)
3. Click on them to see error details

**Common Errors:**

| Error | Cause | Fix |
|-------|-------|-----|
| `ReferenceError: RESEND_API_KEY is not defined` | Missing API key | Add your Resend API key at line 7 |
| `Invalid API key` | Wrong API key format | Check it starts with `re_` |
| `Domain not verified` | Using unverified domain | Use sandbox email or verify domain |
| `TypeError: Cannot read property...` | Form field mismatch | Check field question names match script |

### Problem: Some Fields Not in Email

**Check Field Mapping:**

The script maps form questions to data fields. Update lines 53-69:

```javascript
// Map form questions to data fields
if (question === 'Nombres') {
  rawData.nombres = answer;
} else if (question === 'Apellidos') {
  rawData.apellidos = answer;
}
// ... etc
```

Make sure the questions **exactly match** your Google Form questions.

### Problem: "No authorization" Error

**Fix:**
1. Go to Apps Script
2. Click on trigger
3. Click the three dots (⋮)
4. Select "Delete trigger"
5. Re-create the trigger
6. Re-authorize when prompted

## 📊 Monitoring & Maintenance

### Daily Checks

1. **Review Submissions**
   - Open Google Sheets
   - Check new rows
   - Verify data looks correct

2. **Check Email Delivery**
   - Go to [resend.com/emails](https://resend.com/emails)
   - Review sent emails
   - Check delivery status

### Weekly Maintenance

1. **Check Error Logs**
   - Apps Script → Executions
   - Look for failed executions
   - Fix any recurring issues

2. **Monitor Quotas**
   - Resend free tier: 100 emails/day
   - Apps Script: 100 emails/day (MailApp)
   - Upgrade if you exceed limits

### Monthly Tasks

1. **Review Email Template**
   - Is information still accurate?
   - Do all links work?
   - Is design still good?

2. **Clean Up Sheets**
   - Archive old submissions
   - Keep only current semester data
   - Export backups

## 🚀 Going to Production

Once testing is successful:

1. **Switch to Production Email**
   ```javascript
   // Comment out sandbox:
   // const FROM_EMAIL = 'Club de Programación FIUNA <onboarding@resend.dev>';
   
   // Use production (DNS must be verified):
   const FROM_EMAIL = 'Club de Programación FIUNA <admisiones@cpfiuna.io>';
   ```

2. **Save Script**
   - Press `Ctrl+S` to save

3. **Test One More Time**
   - Submit a test form
   - Verify email comes from `admisiones@cpfiuna.io`

4. **Monitor First Week**
   - Check daily for issues
   - Verify all emails send successfully
   - Ask team to report any problems

## 💡 Pro Tips

### Tip 1: Add WhatsApp Notifications

Add to `sendTeamNotification()`:

```javascript
// Send to WhatsApp via API (if you have one)
const whatsappMsg = `🎓 Nueva solicitud: ${data.nombres} ${data.apellidos}`;
// Implement your WhatsApp API call here
```

### Tip 2: Rich Email Styling

The template already includes:
- Dark theme design
- Responsive layout
- Social media links
- Professional formatting

Feel free to customize colors and fonts!

### Tip 3: Track Email Opens

Resend automatically tracks:
- Delivery status
- Open rates
- Click rates

Check your dashboard at [resend.com/emails](https://resend.com/emails)

### Tip 4: Rate Limiting

The script includes automatic error handling. For high volumes, add:

```javascript
// At top of onFormSubmit()
Utilities.sleep(1000); // Wait 1 second between sends
```

## 🆘 Getting Help

If you're stuck:

1. **Check Logs**
   - Apps Script → Executions
   - Look for error messages

2. **Review Documentation**
   - Resend docs: [resend.com/docs](https://resend.com/docs)
   - Apps Script docs: [developers.google.com/apps-script](https://developers.google.com/apps-script)

3. **Common Resources**
   - This guide
   - Script comments
   - Resend support chat

## 📈 Scaling Up

### For High Volume (100+ submissions/day):

1. **Upgrade Resend**
   - Free: 100 emails/day
   - Pro: 50,000 emails/month ($20)

2. **Use Queue System**
   ```javascript
   // Store submissions, send in batches
   function queueEmail(data) {
     PropertiesService.getScriptProperties()
       .setProperty('queue_' + Date.now(), JSON.stringify(data));
   }
   
   // Time-based trigger to process queue
   function processQueue() {
     // Send queued emails in batches
   }
   ```

3. **Add Monitoring**
   - Set up alerts for failures
   - Track success rates
   - Monitor API quotas

## 🎉 You're Done!

Your automated email system is now live! Students will receive beautiful confirmation emails automatically, and your team will be notified instantly of new submissions.

---

## 📝 Quick Reference

### Important Lines to Customize:

| Line | What to Change | Example |
|------|----------------|---------|
| 7 | Resend API key | `re_abc123xyz` |
| 14 | From email | `admisiones@cpfiuna.io` |
| 17-21 | Team emails | Add team members |
| 53-69 | Field mapping | Match your form questions |

### Trigger Configuration:

```
Function: onFormSubmit
Deployment: Head
Event Source: From spreadsheet
Event Type: On form submit
```

### Testing Commands:

```javascript
// In Apps Script:
testEmailSetup()  // Test email sending
```

---

**Setup Time:** 15-20 minutes  
**Cost:** $0 (free tier)  
**Maintenance:** 5 min/week  
**Difficulty:** ⭐⭐⚪⚪⚪

Happy automating! 🚀
