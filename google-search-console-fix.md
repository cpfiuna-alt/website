# Google Search Console Sitemap Fix Guide

## ✅ **Changes Made:**

### 1. **Fixed Content-Type Headers** (vercel.json)
Added proper XML content type header for sitemap.xml:
```json
{
  "source": "/sitemap.xml",
  "headers": [
    {
      "key": "Content-Type", 
      "value": "application/xml; charset=utf-8"
    }
  ]
}
```

### 2. **Updated Date Format** (sitemap.xml)
Changed from: `2025-09-10`
Changed to: `2025-09-10T00:00:00+00:00` (ISO 8601 format)

## 🔧 **Next Steps:**

### 1. **Deploy the Changes**
Deploy your updated `dist` folder to production

### 2. **Wait for Propagation** 
Wait 5-10 minutes for changes to take effect

### 3. **Test the Sitemap**
- Visit: `https://cpfiuna.io/sitemap.xml`
- Check that it displays properly
- Right-click → "View Page Source" to verify XML format

### 4. **Resubmit to Google Search Console**
1. Go to Google Search Console
2. Navigate to "Sitemaps" section
3. Remove the old sitemap if it shows errors
4. Add the sitemap again: `https://cpfiuna.io/sitemap.xml`
5. Click "Submit"

### 5. **Alternative Testing URLs**
Test your sitemap with these validators:
- https://www.xml-sitemaps.com/validate-xml-sitemap.html
- https://validator.w3.org/feed/check.cgi?url=https://cpfiuna.io/sitemap.xml

## 🚨 **If Issues Persist:**

### Check These Common Problems:
1. **503/404 Errors**: Ensure the sitemap URL is accessible
2. **Encoding Issues**: File should be UTF-8 without BOM
3. **XML Validation**: Use online XML validators
4. **Server Headers**: Verify Content-Type is "application/xml"

### Google Search Console Error Messages:
- "No se ha podido leer el sitemap" = Usually content-type or encoding issue
- "Formato de sitemap no válido" = XML syntax errors
- "No se han encontrado URLs válidas" = Empty or malformed URLs

## 📝 **Expected Result:**
After deployment and resubmission, Google should be able to read your sitemap successfully. The status should change from error to "Success" or "Submitted" within 24-48 hours.

**Your sitemap URL**: `https://cpfiuna.io/sitemap.xml`
