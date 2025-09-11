# Quick Fix for EmailJS Contact Form

## 🚨 Current Issue: "Failed to send message" Error

### Immediate Steps to Fix:

#### 1. Check Browser Console (CRITICAL)
1. Open your portfolio website
2. Press `F12` or right-click → "Inspect Element"
3. Click the "Console" tab
4. Try submitting the contact form again
5. **Look for specific error messages** - this will tell us exactly what's wrong

#### 2. Verify EmailJS Service Connection
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. Click on "Services" tab
3. Find service ID: `service_s2insp8`
4. **Make sure it shows "Connected" status**
5. If it shows "Disconnected", click and reconnect your Gmail account

#### 3. Check Template Configuration
1. In EmailJS dashboard, go to "Templates" tab
2. Find template ID: `template_qgp35tb`
3. Click to edit the template
4. **Make sure the template content includes these variables:**
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{message}}`
   - `{{time}}`

#### 4. Verify Template Subject
Make sure your template subject is:
```
New Contact Form Message from {{from_name}}
```

#### 5. Check Gmail Settings
1. **Check your spam folder** - emails might be going there
2. **Gmail Security**: If using 2FA, you need an App Password
3. **Less Secure Apps**: Enable this in Gmail settings if needed

### Most Common Issues:

#### Issue 1: Gmail Service Disconnected
- **Fix**: Reconnect Gmail in EmailJS dashboard

#### Issue 2: Template Variables Wrong
- **Fix**: Make sure template uses exact variable names: `{{from_name}}`, `{{from_email}}`, `{{message}}`, `{{time}}`

#### Issue 3: Gmail Blocking Emails
- **Fix**: Check spam folder, enable less secure apps, or use app password

#### Issue 4: Wrong Template Content
- **Fix**: Copy the HTML template from the troubleshooting guide

### Test Steps:
1. Fill out the contact form with test data
2. Check browser console for errors
3. Check your email inbox AND spam folder
4. If still failing, share the console error messages

### Quick Test Template:
If the HTML template is causing issues, try this simple template in EmailJS:

```
Subject: New Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Message: {{message}}
Time: {{time}}
```

### Still Not Working?
Share the console error messages and I'll help you fix the specific issue!
