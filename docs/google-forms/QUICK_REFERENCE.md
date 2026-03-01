# 🎯 Google Forms Integration - Quick Reference

## One-Page Cheat Sheet

### Setup in 5 Steps

```
1. Create Google Form at forms.google.com
   ├─ Add all fields from your admission form
   ├─ Link to Google Sheets
   └─ Click Preview (eye icon)

2. Extract Entry IDs
   ├─ Open DevTools (F12) in preview
   ├─ Paste: scripts/google-forms-extractor-v2.js
   └─ Run: copyConfig()

3. Update Config
   ├─ File: src/components/admission/AdmissionForm.tsx
   ├─ Find: GOOGLE_FORMS_CONFIG
   └─ Paste your config

4. Test
   ├─ npm run dev
   ├─ Go to /admision
   ├─ Submit test data
   └─ Verify in Google Sheets

5. Go Live
   └─ Set enabled: true
```

---

## Traffic Limits Cheat Sheet

| Metric | Free | Workspace |
|--------|------|-----------|
| Daily responses | 100 | ∞ |
| Sheet cells | 5M | 10M |
| Cost | $0 | $6/mo |

**Rule of thumb:**
- 0-90/day → Free ✅
- 100+/day → Workspace 💼

---

## Configuration Template

```typescript
const GOOGLE_FORMS_CONFIG = {
  enabled: true, // false for testing
  actionUrl: "https://docs.google.com/forms/d/e/FORM_ID/formResponse",
  fieldMapping: {
    nombres: "entry.123456789",
    apellidos: "entry.987654321",
    email: "entry.111111111",
    // ... add all fields
  }
};
```

---

## Common Commands

```javascript
// In browser DevTools (on Google Form preview):

copyConfig()                 // Copy config to clipboard
generateTypeScriptConfig()   // Generate TS code
showMappingSuggestions()     // Show field details
```

---

## Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| Data not appearing | Check actionUrl ends with `/formResponse` |
| Some fields empty | Verify entry IDs match |
| CORS errors | Expected! Use `mode: "no-cors"` |
| Hit 100 limit | Upgrade to Workspace or create new form |
| Spam submissions | Check honeypot field, enable reCAPTCHA |

---

## File Locations

```
📁 Project Structure
├── 📄 src/components/admission/AdmissionForm.tsx  ← Main config
├── 📄 scripts/google-forms-extractor-v2.js        ← Helper script
└── 📁 docs/google-forms/
    ├── 📘 README.md                               ← Overview
    ├── 🚀 GOOGLE_FORMS_QUICK_START.md            ← Step-by-step
    ├── 📊 GOOGLE_FORMS_TRAFFIC_LIMITS.md         ← Limits & reliability
    └── 🔧 GOOGLE_FORMS_SETUP.md                  ← Advanced setup
```

---

## Essential URLs

- **Create Form:** https://forms.google.com
- **Workspace Pricing:** https://workspace.google.com/pricing
- **Apps Script:** https://script.google.com
- **Resend (Email Automation):** https://resend.com/signup

---

## Optional: Email Automation

Want to send automatic confirmation emails? See: [GOOGLE_FORMS_EMAIL_AUTOMATION.md](../GOOGLE_FORMS_EMAIL_AUTOMATION.md)

**Quick setup:**
```
1. Get Resend API key (free)
2. Paste scripts/admission-form-resend.js into Apps Script
3. Set up trigger:
   - Clock icon ⏰ → Add Trigger
   - Function: onFormSubmit
   - Event source: From spreadsheet
   - Event type: On form submit
4. Test and enjoy automatic emails!
```

---

## Success Checklist

Setup:
- [ ] Google Form created with all fields
- [ ] Form linked to Google Sheets
- [ ] Entry IDs extracted
- [ ] Config updated in AdmissionForm.tsx
- [ ] Test submission successful
- [ ] Data appears in Sheets
- [ ] enabled: true set
- [ ] Deployed to production

Monitoring:
- [ ] Email notifications enabled
- [ ] Daily checks scheduled
- [ ] Quota alerts configured
- [ ] Backup export routine

---

## Emergency Contacts & Resources

**Hit 100/day limit?**
1. Create backup form (5 min)
2. Update actionUrl
3. Redeploy
4. Upgrade to Workspace for tomorrow

**Form not working?**
1. Check: Form is "Accepting responses"
2. Check: actionUrl is correct
3. Check: Entry IDs match
4. Test: Manual submission on Google Form

**Need help?**
- Docs: `/docs/google-forms/`
- Code: `src/components/admission/AdmissionForm.tsx`
- Script: `scripts/google-forms-extractor-v2.js`

---

## Pro Tips

💡 **Start free, upgrade only if needed** - Most clubs never hit 100/day

💡 **Test on Sunday nights** - Most students submit then

💡 **Archive quarterly** - Keeps Sheets fast

💡 **Use Apps Script for automation** - Auto-emails, webhooks, etc.

💡 **Monitor first week closely** - Catch issues early

---

## Quick Metrics

**Setup time:** 30-40 minutes  
**Cost (typical):** $0/month  
**Reliability:** 99.9%  
**Maintenance:** 5 min/week  
**Difficulty:** ⭐⭐☆☆☆

---

Print this page or keep it bookmarked! 📌
