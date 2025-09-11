# EmailJS Troubleshooting Guide

## 🚨 Problem: Emails Not Reaching Your Inbox

### Step 1: Check Browser Console
1. Open your portfolio website
2. Press `F12` or right-click → "Inspect" → "Console" tab
3. Try submitting the contact form
4. Look for any error messages in the console

### Step 2: Verify EmailJS Configuration

#### Check Your EmailJS Dashboard:
1. Go to [https://dashboard.emailjs.com/](https://dashboard.emailjs.com/)
2. **Services Tab**: Make sure your Gmail service is connected and active
3. **Templates Tab**: Verify your template exists and has the correct ID
4. **Account Tab**: Confirm your public key is correct

#### Current Configuration in Your Code:
```javascript
serviceId: 'service_s2insp8'
templateId: 'template_qgp35tb' 
publicKey: 'Y7GRL7nldIkn1u3t0'
```

### Step 3: Common Issues & Solutions

#### Issue 1: Gmail Service Not Connected
**Solution:**
1. Go to EmailJS Dashboard → Services
2. Click on your Gmail service
3. Make sure it shows "Connected" status
4. If disconnected, reconnect your Gmail account

#### Issue 2: Template Variables Don't Match
**Your template should use these variables:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - The message content
- `{{time}}` - Timestamp

**Check your EmailJS template:**
1. Go to Templates tab
2. Edit your template
3. Make sure it uses the exact variable names above

#### Issue 3: Gmail Security Settings
**Solution:**
1. Enable "Less secure app access" in Gmail (if using personal Gmail)
2. Or use "App Passwords" for Gmail 2FA accounts
3. Check Gmail's spam folder

#### Issue 4: Domain Restrictions
**Solution:**
1. Go to EmailJS Dashboard → Account
2. Check if there are domain restrictions
3. Add your domain to allowed origins

### Step 4: Test EmailJS Directly

#### Simple Test Template:
Create a basic template in EmailJS with just:
```
Subject: Test Email

From: {{from_name}}
Email: {{from_email}}
Message: {{message}}
Time: {{time}}
```

### Step 5: Debug Information

The updated code now includes detailed logging. Check the browser console for:
- EmailJS initialization messages
- Template parameters being sent
- Response status and details
- Specific error messages

### Step 6: Alternative Email Services

If Gmail continues to have issues, try:
1. **Outlook/Hotmail**: Often more reliable
2. **Yahoo Mail**: Good alternative
3. **Custom SMTP**: More control but complex setup

### Step 7: Quick Fixes to Try

1. **Clear browser cache** and try again
2. **Use incognito/private mode** to test
3. **Try different email address** for testing
4. **Check email in spam folder**
5. **Wait 5-10 minutes** - emails can be delayed

### Step 8: Verify Template in EmailJS

Make sure your EmailJS template has:
1. **Subject**: `New Contact Form Message from {{from_name}}`
2. **Content**: The HTML template we created
3. **Variables**: All required variables (from_name, from_email, message, time)

### Still Not Working?

If emails still don't arrive:
1. Share the console error messages
2. Check your Gmail spam folder
3. Verify EmailJS service status
4. Try with a different email provider

### Success Indicators

You'll know it's working when:
- Console shows "Email sent successfully"
- Response status is 200
- You receive emails in your inbox (or spam folder)
- No error messages in console
