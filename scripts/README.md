# Scripts

This directory contains utility scripts for the CPF website.

## 📧 Email Automation Scripts (Resend + Apps Script)

These scripts automate email confirmations using Resend API and Google Apps Script triggers:

### Available Scripts

1. **`admission-form-resend.js`** - Admission form confirmation emails
   - Sends welcome email to new applicants
   - Includes admission info and next steps
   - Notifies team of new submissions

2. **`contact-form-resend.js`** - Contact form confirmation emails
   - Acknowledges received messages
   - Shows message summary with reference number
   - Notifies team of new contacts

3. **`newsletter-subscription-resend.js`** - Newsletter subscription confirmation
   - Welcomes new subscribers
   - Explains what they'll receive
   - Includes unsubscribe option

### Setup Instructions

**Quick Start:** See [`docs/EMAIL_AUTOMATION_SETUP_SUMMARY.md`](../docs/EMAIL_AUTOMATION_SETUP_SUMMARY.md) for complete setup guide.

**Detailed Guide:** See [`docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md`](../docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md) for in-depth documentation.

### Key Points

- ✅ Uses Resend API (100 free emails/day)
- ✅ Trigger-based (no web app URLs needed)
- ✅ Beautiful HTML email templates included
- ✅ Easy to deploy and maintain
- ✅ Detailed logging for debugging

---

## 🔧 Google Forms Helper Scripts

### `google-forms-extractor-v2.js`
Helper script to extract entry IDs from Google Forms for client-side submission.

### `google-forms-helper.js`
Additional utilities for working with Google Forms.

---

## 🚀 Quick Setup for Email Automation

1. **Get Resend API key** (once): [resend.com/api-keys](https://resend.com/api-keys)
2. **For each form:**
   - Open the linked Google Spreadsheet
   - Extensions → Apps Script
   - Copy the appropriate script from this folder
   - Paste and configure API key
   - Set up trigger (⏰ icon → Add Trigger → onFormSubmit)
3. **Test** by submitting a form
4. **Check logs** in Apps Script → Executions

Total time per form: **10-15 minutes**

---

## 📚 Documentation

- **Setup Summary:** [`docs/EMAIL_AUTOMATION_SETUP_SUMMARY.md`](../docs/EMAIL_AUTOMATION_SETUP_SUMMARY.md)
- **Full Guide:** [`docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md`](../docs/GOOGLE_FORMS_EMAIL_AUTOMATION.md)
- **Google Forms Setup:** [`docs/GOOGLE_FORMS_QUICK_START.md`](../docs/GOOGLE_FORMS_QUICK_START.md)
