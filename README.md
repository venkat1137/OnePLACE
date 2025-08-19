# Oneplace TechSolutions – Complete Website

This package contains:
- `index.html` – Premium Tailwind landing page
- `assets/logo.png` – Company logo
- `api/sendmail` – Azure Function (Node.js) to send contact form emails using SMTP
- `api/package.json` – Declares the `nodemailer` dependency

## Deploy to Azure Static Web Apps

1. Create a new **Azure Static Web App** (Free plan is fine).
2. Source can be GitHub (recommended) or **Other** for manual upload.
3. Build details:
   - **App location**: `/`
   - **API location**: `api`
   - **Output location**: `/`

> When using GitHub, the SWA workflow installs `api` dependencies automatically.

## Configure SMTP (Required for email)

In the **Static Web App → Configuration** add these application settings (values from your SMTP provider, e.g., Outlook, Gmail SMTP, SendGrid, etc.).

```
SMTP_HOST = <smtp host>
SMTP_PORT = 587
SMTP_USER = <username>
SMTP_PASS = <password or app password>
MAIL_TO   = info@oneplacetech.com
MAIL_FROM = ONEPLACE TechSolutions <no-reply@oneplacetech.com>
```

Save and restart the app. The contact form posts to `/api/sendmail`.

## Custom Domain

Add `oneplacetech.com` and/or `www.oneplacetech.com` in **Custom domains**.
- For root (`@`) use **ALIAS/ANAME** to your `*.azurestaticapps.net` host.
- For `www` use **CNAME** to your `*.azurestaticapps.net` host.

Azure will issue free HTTPS automatically after validation.

## Local preview (optional)

You can open `index.html` directly in a browser for a quick preview.
API requires Azure Functions runtime to test locally.
